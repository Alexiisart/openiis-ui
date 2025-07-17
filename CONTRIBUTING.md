# 🤝 Contribuir

¡Gracias por contribuir a **Openiis-UI**!

## 🚀 Proceso Rápido

```bash
# 1. Fork el repositorio
git https://github.com/Alexiisart/openiis-ui.git
cd openiis-ui

# 2. Crear rama
git checkout -b feature/nueva-funcionalidad

# 3. Instalar dependencias
npm install

# 4. Desarrollar
npm start  # http://localhost:4200
```

## ✅ Requisitos Obligatorios

**Toda contribución debe incluir:**

### 🧪 Pruebas Unitarias

```bash
npm test  # Mínimo 80% cobertura
```

### 📸 Screenshots

Si cambias UI, incluye imágenes:

- Antes y después
- Móvil y desktop
- Tema claro y oscuro

### 📝 Descripción Clara

En tu PR explica:

- **¿Qué problema resuelve?**
- **¿Cómo lo probaste?**
- **¿Qué cambia para el usuario?**

## 🎯 Convenciones

### Ramas

- `feature/` - Nuevas funcionalidades
- `fix/` - Corrección de bugs
- `docs/` - Documentación

### Commits

```bash
# Ejemplos
git commit -m "feat: añadir exportación a Excel"
git commit -m "fix: corregir error en auto-guardado"
git commit -m "docs: actualizar README"
```

### Código

```typescript
// ✅ CORRECTO
interface UserData {
  id: string;
  name: string;
}

// ❌ INCORRECTO
interface userData {
  id: any;
  name: any;
}
```

## 📋 Checklist Pre-PR

- [ ] Tests pasan (`npm test`)
- [ ] Sin errores lint (`npm run lint`)
- [ ] Screenshots incluidos (si aplica)
- [ ] Documentación actualizada
- [ ] Descripción clara del cambio

## 🔍 Aprobación

Tu PR será aprobado si:

- ✅ Todos los tests pasan
- ✅ Cobertura >= 80%
- ✅ Screenshots incluidos
- ✅ Código sigue convenciones
- ✅ Descripción clara

## 🎯 Contribuciones Buscadas

**Alta prioridad:**

- 🚀 Compartir listas (Firebase)
- 📱 PWA features
- 🔒 Colaboración en tiempo real

**Siempre bienvenidas:**

- 🐛 Bugs fixes
- 📖 Documentación
- 🎨 Mejoras UI/UX
- ♿ Accesibilidad

## 🆘 ¿Dudas?

- [Issues](https://github.com/Alexiisart/checklist/issues) - Reportar problemas

---

¡Gracias por contribuir! 🚀
