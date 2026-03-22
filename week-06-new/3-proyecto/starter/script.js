// ============================================
// PROYECTO SEMANA 06: Reporte con Bucles
// Dominio: Plataforma de Certificaciones IT
// ============================================

// ============================================
// SECCIÓN 1: Datos del dominio
// ============================================

const certifications = [
  { name: "Cloud Architect Professional", category: "CLOUD", score: 850 },
  { name: "Cybersecurity Analyst+", category: "SECURITY", score: 720 },
  { name: "Fullstack Developer Expert", category: "DEV", score: 910 },
  { name: "Data Science Associate", category: "DATA", score: 680 },
  { name: "DevOps Engineer Professional", category: "DEV", score: 890 },
  { name: "Network Security Specialist", category: "SECURITY", score: 740 },
  { name: "Azure Solutions Architect", category: "CLOUD", score: 810 }
];

const categories = ["CLOUD", "SECURITY", "DEV", "DATA"];

// El valor numérico representa el "Puntaje de Aprobación" obtenido
const valueLabel = "Puntaje Promedio";

// ============================================
// SECCIÓN 2: Listado completo con for...of
// ============================================
console.log("=== CATÁLOGO DE CERTIFICACIONES ===");

let lineNumber = 0;

for (const cert of certifications) {
  lineNumber++;
  console.log(`${lineNumber}. ${cert.name} — [${cert.category}] — Score: ${cert.score} pts`);
}

console.log("");

// ============================================
// SECCIÓN 3: Contadores por categoría
// ============================================
console.log("=== CONTEO POR ÁREA TECNOLÓGICA ===");

for (const category of categories) {
  let count = 0;

  for (const cert of certifications) {
    if (cert.category === category) {
      count++;
    }
  }

  console.log(`${category}: ${count} examen(es) disponible(s)`);
}

console.log("");

// ============================================
// SECCIÓN 4: Totales y promedio (acumulador)
// ============================================
console.log("=== ESTADÍSTICAS GLOBALES ===");

let totalScore = 0;

for (const cert of certifications) {
  totalScore += cert.score;
}

const averageScore = certifications.length > 0 ? totalScore / certifications.length : 0;

console.log(`Total acumulado de puntos: ${totalScore}`);
console.log(`Promedio general de aprobación: ${averageScore.toFixed(2)} pts`);

console.log("");

// ============================================
// SECCIÓN 5: Máximo y mínimo
// ============================================
console.log("=== TOP Y BOTTOM PERFORMANCE ===");

let maxCert = certifications[0] ?? null;
let minCert = certifications[0] ?? null;

if (certifications.length > 0) {
  for (const cert of certifications) {
    // Buscar el puntaje más alto
    if (cert.score > maxCert.score) {
      maxCert = cert;
    }
    // Buscar el puntaje más bajo
    if (cert.score < minCert.score) {
      minCert = cert;
    }
  }

  console.log(`Dificultad Máxima (Top Score): ${maxCert?.name} (${maxCert?.score} pts)`);
  console.log(`Dificultad Mínima (Base Score): ${minCert?.name} (${minCert?.score} pts)`);
}

console.log("");

// ============================================
// SECCIÓN 6: Reporte numerado con for clásico
// ============================================
console.log("=== ANÁLISIS DE RENDIMIENTO RELATIVO ===");

for (let i = 0; i < certifications.length; i++) {
  const cert = certifications[i];

  // Determinamos si el examen es más o menos exigente que el promedio
  const comparison = cert.score >= averageScore 
    ? "EXIGENCIA ALTA (Arriba del promedio)" 
    : "EXIGENCIA ESTÁNDAR (Debajo del promedio)";

  console.log(`${i + 1}. ${cert.name} — ${comparison}`);
}

console.log("");
console.log("=== FIN DEL REPORTE PROFESIONAL ===");