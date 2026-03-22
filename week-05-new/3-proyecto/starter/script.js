// ============================================
// PROYECTO SEMANA 05: Clasificador de Certificaciones
// ============================================

// ============================================
// SECCIÓN 1: Datos del Examen
// ============================================

const elementName = "Cloud Architect Professional"; 
const elementStatus = "active"; // "active", "retired", "beta"
const elementValue = 850;       // Puntaje obtenido (Escala 0-1000)
const elementType = "CLOUD";    // "CLOUD", "DEV", "DATA", "SECURITY"
const elementInfo = {
    provider: "Google Cloud",
    validityYears: 3,
    requirements: "Associate Cloud Engineer"
};

// ============================================
// SECCIÓN 2: Clasificación con if / else if / else
// ============================================

let classification;

if (elementValue >= 900) {
    classification = "Sobresaliente (Honors)";
} else if (elementValue >= 700) {
    classification = "Aprobado (Pass)";
} else if (elementValue >= 500) {
    classification = "Reprobado (Fail) - Requiere refuerzo";
} else {
    classification = "No apto - Reintentar curso base";
}

// ============================================
// SECCIÓN 3: Estado binario con operador ternario
// ============================================

// Determinamos si el examen está disponible para compra o no
const statusLabel = elementStatus === "active" ? "Disponible para Registro" : "No Disponible / Retirado";

// ============================================
// SECCIÓN 4: Tipo con switch
// ============================================

let typeLabel;

switch (elementType) {
    case "CLOUD":
        typeLabel = "Infraestructura y Servicios en la Nube";
        break;
    case "DEV":
        typeLabel = "Desarrollo de Software y DevOps";
        break;
    case "DATA":
        typeLabel = "Análisis de Datos e IA";
        break;
    case "SECURITY":
        typeLabel = "Ciberseguridad y Cumplimiento";
        break;
    default:
        typeLabel = "Categoría General de TI";
}

// ============================================
// SECCIÓN 5: Valor por defecto con ??
// ============================================

const displayName = elementName ?? "Certificación sin título";
const infoDetail = elementInfo?.provider ?? "Proveedor independiente";

// ============================================
// SECCIÓN 6: Acceso seguro con ?.
// ============================================

// Accedemos a los años de validez si el objeto elementInfo existe
const safeProperty = elementInfo?.validityYears ?? "Vigencia no definida";

// ============================================
// SECCIÓN 7: Ficha de salida (Template Literals)
// ============================================

console.log("=".repeat(45));
console.log("💎 SISTEMA DE GESTIÓN DE CERTIFICACIONES 💎");
console.log("=".repeat(45));
console.log(`Examen:         ${displayName}`);
console.log(`Proveedor:      ${infoDetail}`);
console.log(`Categoría:      ${typeLabel}`);
console.log(`Estado:         ${statusLabel}`);
console.log(`Puntaje:        ${elementValue} pts`);
console.log(`Resultado:      ${classification.toUpperCase()}`);
console.log(`Vigencia:       ${safeProperty} años`);
console.log("=".repeat(45));
console.log("Generado por: Platform Admin v1.0");
console.log("=".repeat(45));
