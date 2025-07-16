import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

export interface UploadConfig {
  maxFileSize?: number; // en MB
  allowedTypes?: string[];
  maxFiles?: number;
  compressionQuality?: number; // 0-1 para imágenes
  enableResize?: boolean;
  maxWidth?: number;
  maxHeight?: number;
}

export interface FileUploadItem {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  url?: string;
  thumbnailUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class OpeniisUploadService {
  private uploadQueue$ = new BehaviorSubject<FileUploadItem[]>([]);

  private defaultConfig: UploadConfig = {
    maxFileSize: 10, // 10MB
    allowedTypes: ['image/*', 'application/pdf', '.doc', '.docx'],
    maxFiles: 5,
    compressionQuality: 0.8,
    enableResize: false,
    maxWidth: 1920,
    maxHeight: 1080,
  };

  constructor() {}

  /**
   * Obtener la cola de archivos como Observable
   */
  get uploadQueue(): Observable<FileUploadItem[]> {
    return this.uploadQueue$.asObservable();
  }

  /**
   * Obtener cola actual de forma síncrona
   */
  getCurrentQueue(): FileUploadItem[] {
    return this.uploadQueue$.value;
  }

  /**
   * Validar un archivo individual
   */
  validateFile(
    file: File,
    config: UploadConfig = this.defaultConfig
  ): { valid: boolean; error?: string } {
    const maxSize = (config.maxFileSize || 10) * 1024 * 1024; // MB a bytes
    const allowedTypes =
      config.allowedTypes || this.defaultConfig.allowedTypes!;

    if (file.size > maxSize) {
      return {
        valid: false,
        error: `El archivo es demasiado grande. Máximo: ${config.maxFileSize}MB`,
      };
    }

    const isValidType = allowedTypes.some((type) => {
      if (type === '*') return true;
      if (type.startsWith('.')) {
        return file.name.toLowerCase().endsWith(type.toLowerCase());
      }
      if (type.includes('/*')) {
        const [mainType] = type.split('/');
        return file.type.startsWith(mainType);
      }
      return file.type === type;
    });

    if (!isValidType) {
      return {
        valid: false,
        error: `Tipo de archivo no permitido. Tipos aceptados: ${allowedTypes.join(
          ', '
        )}`,
      };
    }

    return { valid: true };
  }

  /**
   * Agregar archivos a la cola
   */
  addFiles(
    files: FileList | File[],
    config: UploadConfig = this.defaultConfig
  ): Observable<FileUploadItem[]> {
    return new Observable((observer) => {
      const currentQueue = this.getCurrentQueue();
      const fileArray = Array.from(files);
      const maxFiles = config.maxFiles || this.defaultConfig.maxFiles!;

      if (currentQueue.length + fileArray.length > maxFiles) {
        observer.error(`Máximo ${maxFiles} archivos permitidos`);
        return;
      }

      const newItems: FileUploadItem[] = [];

      fileArray.forEach((file) => {
        const validation = this.validateFile(file, config);
        if (!validation.valid) {
          observer.error(validation.error);
          return;
        }

        const item: FileUploadItem = {
          id: this.generateId(),
          file: file,
          name: file.name,
          size: file.size,
          type: file.type,
        };

        // Generar preview para imágenes
        if (file.type.startsWith('image/')) {
          this.generatePreview(file).then((previewUrl) => {
            item.thumbnailUrl = previewUrl;
            this.updateItem(item);
          });
        }

        newItems.push(item);
      });

      // Actualizar cola
      const updatedQueue = [...currentQueue, ...newItems];
      this.uploadQueue$.next(updatedQueue);

      observer.next(newItems);
      observer.complete();
    });
  }

  /**
   * Obtener archivo por ID
   */
  getFile(id: string): File | null {
    const item = this.getCurrentQueue().find((item) => item.id === id);
    return item ? item.file : null;
  }

  /**
   * Obtener todos los archivos
   */
  getAllFiles(): { id: string; file: File; name: string }[] {
    return this.getCurrentQueue().map((item) => ({
      id: item.id,
      file: item.file,
      name: item.name,
    }));
  }

  /**
   * Eliminar archivo de la cola
   */
  removeFile(id: string): void {
    const currentQueue = this.getCurrentQueue();
    const updatedQueue = currentQueue.filter((item) => item.id !== id);
    this.uploadQueue$.next(updatedQueue);
  }

  /**
   * Limpiar toda la cola
   */
  clearQueue(): void {
    this.uploadQueue$.next([]);
  }

  /**
   * Comprimir imagen
   */
  compressImage(
    file: File,
    quality: number = 0.8,
    maxWidth?: number,
    maxHeight?: number
  ): Promise<File> {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        resolve(file);
        return;
      }

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        let { width, height } = img;

        // Redimensionar si es necesario
        if (maxWidth && width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        if (maxHeight && height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;

        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              reject(new Error('Error al comprimir la imagen'));
            }
          },
          file.type,
          quality
        );
      };

      img.onerror = () => reject(new Error('Error al cargar la imagen'));
      img.src = URL.createObjectURL(file);
    });
  }

  /**
   * Generar preview de imagen
   */
  private generatePreview(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /**
   * Actualizar un elemento en la cola
   */
  private updateItem(updatedItem: FileUploadItem): void {
    const currentQueue = this.getCurrentQueue();
    const index = currentQueue.findIndex((item) => item.id === updatedItem.id);
    if (index !== -1) {
      currentQueue[index] = { ...updatedItem };
      this.uploadQueue$.next([...currentQueue]);
    }
  }

  /**
   * Generar ID único
   */
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
