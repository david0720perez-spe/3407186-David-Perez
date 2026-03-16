// ============================================
// PROYECTO SEMANA 04: Generador de Mensajes
// ============================================

// ============================================
// SECCIÓN 1: Datos del dominio
// ============================================

// TODO: Define el nombre de tu dominio
const DOMAIN_NAME = "Certificaciones Profesionales";

// TODO: Define el nombre de la entidad principal
const rawEntityName = "  Certificado en Gestión de Proyectos  ";

// TODO: Define una categoría o tipo (string)
const entityCategory = "Certificación Internacional";

// TODO: Define un código identificador (string)
const entityCode = "CERT-2026-001";

// TODO: Define una descripción corta (string)
const entityDescription = "Certificación avalada internacionalmente para profesionales en gestión de proyectos ágiles.";

// TODO: Define un dato numérico relevante (number)
const mainValue = 40; // Horas de formación

// TODO: Define un estado booleano
const isActive = true;

// ============================================
// SECCIÓN 2: Transformaciones de string
// ============================================

// TODO: Limpia el nombre con trim()
const entityName = rawEntityName.trim();

// TODO: Obtén el nombre en mayúsculas para el encabezado
const entityNameUpper = entityName.toUpperCase();

// TODO: Obtén el nombre en minúsculas para el código
const entityNameLower = entityName.toLowerCase();

// TODO: Extrae las primeras letras del código con slice()
const codePrefix = entityCode.slice(0, 4);

// ============================================
// SECCIÓN 3: Validaciones con búsqueda
// ============================================

// TODO: Verifica si el código empieza con el prefijo correcto
const hasValidPrefix = entityCode.startsWith(codePrefix);

// TODO: Verifica si la descripción contiene una palabra clave
const descriptionIsRelevant = entityDescription.includes("internacional");

// TODO: Verifica si el código termina con los dígitos
const hasValidSuffix = entityCode.endsWith("001");

// ============================================
// SECCIÓN 4: Generación de la ficha principal
// ============================================

const separator = "=".repeat(45);
const subSeparator = "-".repeat(45);

// TODO: Construye la ficha multilínea usando template literals
const mainCard = `
${separator}
  ${DOMAIN_NAME.toUpperCase()} — FICHA DE CERTIFICACIÓN
${separator}
Nombre:      ${entityNameUpper}
Categoría:   ${entityCategory}
Código:      ${entityCode}
Prefijo:     ${codePrefix}
Duración:    ${mainValue} horas
Estado:      ${isActive ? "Vigente" : "No vigente"}

${subSeparator}
Descripción:
${entityDescription}
${separator}
`;

console.log(mainCard);

// ============================================
// SECCIÓN 5: Validaciones
// ============================================

console.log("--- Validaciones ---");
// TODO: Muestra los resultados de las validaciones con template literals
console.log(`¿Código empieza con '${codePrefix}'?: ${hasValidPrefix}`);
console.log(`¿Descripción contiene 'internacional'?: ${descriptionIsRelevant}`);
console.log(`¿Código termina con '001'?: ${hasValidSuffix}`);
console.log("");

// ============================================
// SECCIÓN 6: Mensaje de notificación corto
// ============================================

console.log("--- Notificación ---");

// TODO: Construye un mensaje corto de una línea
const notification = `📢 Nueva certificación disponible: ${entityName} (${entityCode})`;
console.log(notification);
console.log("");

