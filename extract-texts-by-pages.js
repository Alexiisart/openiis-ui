const fs = require("fs");
const path = require("path");

// Carpeta de páginas donde buscar plantillas inline
const pagesDir = path.join(__dirname, "src", "app", "pages");

// Ruta del fichero de salida
const outputPath = path.join(__dirname, "src", "assets", "i18n", "es.json");

/**
 * Devuelve una lista con todas las rutas de fichero .ts dentro de un directorio (recursivo)
 */
function getTsFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getTsFiles(fullPath));
    } else if (file.endsWith(".ts")) {
      results.push(fullPath);
    }
  });
  return results;
}

/**
 * Extrae las cadenas de texto literales que aparecen entre etiquetas HTML y en atributos
 */
function extractStringsFromTemplate(template) {
  const texts = new Set();

  // Captura texto entre > y <
  const betweenTagsRegex = />([^<>]+)</g;
  let match;
  while ((match = betweenTagsRegex.exec(template)) !== null) {
    const str = match[1].trim();
    if (
      str &&
      !str.includes("{{") &&
      !str.includes("*ngFor") &&
      !str.includes("*ngIf") &&
      str.length > 0
    ) {
      texts.add(str);
    }
  }

  // Captura atributos text="..."
  const attrRegex = /\btext="([^"]+)"/g;
  while ((match = attrRegex.exec(template)) !== null) {
    const str = match[1].trim();
    if (str) {
      texts.add(str);
    }
  }

  // También placeholder=, label=, title=, alt=, etc.
  const otherAttrRegex =
    /\b(?:placeholder|label|title|alt|name|aria-label|data-label)="([^"]+)"/g;
  while ((match = otherAttrRegex.exec(template)) !== null) {
    const str = match[1].trim();
    if (str && !str.includes("{{")) {
      texts.add(str);
    }
  }

  return Array.from(texts);
}

/**
 * Convierte texto a una clave válida para JSON
 */
function textToKey(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9áéíóúñü\s]+/gi, "")
    .replace(/\s+/g, "_")
    .replace(/^_|_$/g, "")
    .substring(0, 40);
}

/**
 * Obtiene el nombre de la sección basado en el nombre del archivo
 */
function getSectionName(filePath) {
  const fileName = path.basename(filePath, ".ts");

  // Casos especiales para archivos en subdirectorios
  if (filePath.includes("main")) {
    if (fileName.includes("home")) return "home";
    if (fileName.includes("header")) return "header";
  }

  // Remover sufijos comunes
  return fileName
    .replace("-sec.component", "")
    .replace(".component", "")
    .replace("-sec", "");
}

function main() {
  const files = getTsFiles(pagesDir);
  const translations = {};

  files.forEach((filePath) => {
    const content = fs.readFileSync(filePath, "utf-8");
    const templateMatch = content.match(/template:\s*`([\s\S]*?)`/);

    if (templateMatch) {
      const template = templateMatch[1];
      const strings = extractStringsFromTemplate(template);
      const sectionName = getSectionName(filePath);

      if (strings.length > 0) {
        translations[sectionName] = {};

        strings.forEach((str) => {
          const key = textToKey(str);

          // Evitar colisiones de claves dentro de la misma sección
          let finalKey = key;
          let counter = 1;
          while (translations[sectionName][finalKey]) {
            finalKey = `${key}_${counter}`;
            counter++;
          }

          translations[sectionName][finalKey] = str;
        });

        // Ordenar las claves dentro de cada sección
        const sortedKeys = Object.keys(translations[sectionName]).sort();
        const sortedSection = {};
        sortedKeys.forEach((k) => {
          sortedSection[k] = translations[sectionName][k];
        });
        translations[sectionName] = sortedSection;
      }
    }
  });

  // Ordenar las secciones alfabéticamente
  const sortedSections = Object.keys(translations).sort();
  const orderedTranslations = {};
  sortedSections.forEach((section) => {
    orderedTranslations[section] = translations[section];
  });

  // Escribir el archivo JSON
  fs.writeFileSync(
    outputPath,
    JSON.stringify(orderedTranslations, null, 2),
    "utf-8"
  );

  const totalTexts = Object.values(orderedTranslations).reduce(
    (sum, section) => sum + Object.keys(section).length,
    0
  );
  console.log(
    `✅ Se han extraído ${totalTexts} textos organizados en ${
      Object.keys(orderedTranslations).length
    } secciones:`
  );

  Object.keys(orderedTranslations).forEach((section) => {
    const count = Object.keys(orderedTranslations[section]).length;
    console.log(`   📄 ${section}: ${count} textos`);
  });

  console.log(`\n📁 Archivo generado: ${outputPath}`);
}

main();
