// ============================================
// PROYECTO SEMANA 07 — Librería de Funciones
// Dominio: Certificaciones Profesionales
// ============================================

"use strict"; // activa el modo estricto — mejores errores

// ============================================
// SECCIÓN 1: Constantes y datos del dominio
// ============================================

// TODO: Define las constantes globales de tu dominio
const DOMAIN_NAME = "Certificaciones Profesionales";
const VALUE_LABEL = "costo"; // Ej: "precio", "duración", "créditos"

// TODO: Define un array con al menos 5 certificaciones.
// Cada certificación debe ser un objeto con propiedades relevantes.
const items = [
  { id: 1, name: "Certificación en JavaScript Avanzado", category: "Programación", value: 250, active: true, duration: 40 },
  { id: 2, name: "Certificación en Gestión de Proyectos", category: "Administración", value: 300, active: false, duration: 60 },
  { id: 3, name: "Certificación en Marketing Digital", category: "Marketing", value: 200, active: true, duration: 30 },
  { id: 4, name: "Certificación en Seguridad Informática", category: "Tecnología", value: 350, active: true, duration: 50 },
  { id: 5, name: "Certificación en Inglés Avanzado", category: "Idiomas", value: 180, active: false, duration: 80 },
];

// ============================================
// SECCIÓN 2: Función de formato
// ============================================

// TODO: Implementa una arrow function que reciba una certificación
// y devuelva un string formateado para mostrar en pantalla.
// Debe usar template literals y al menos 2 propiedades del elemento.
const formatItem = (cert) =>
  `📜 ${cert.name} [${cert.category}] — $${cert.value} — ${cert.duration} horas`;

// ============================================
// SECCIÓN 3: Función de cálculo (pura)
// ============================================

// TODO: Implementa una función pura que calcule algún valor relevante
// del dominio a partir de parámetros numéricos.
// Ejemplo: calcular costo total con descuento
const calculateValue = (baseValue, quantity = 1, discountPct = 0) =>
  +(baseValue * quantity * (1 - discountPct / 100)).toFixed(2);

// ============================================
// SECCIÓN 4: Función de validación
// ============================================

// TODO: Implementa una función que reciba una certificación y devuelva
// true o false según si está activa.
const isValid = (cert) => cert.active === true;

// ============================================
// SECCIÓN 5: Función con parámetro por defecto
// ============================================

// TODO: Implementa una función que use al menos un parámetro
// por defecto significativo para tu dominio.
const formatWithDefault = (value, label = VALUE_LABEL, currency = "USD") =>
  currency
    ? `${label}: ${currency} ${value}`
    : `${label}: ${value}`;

// ============================================
// SECCIÓN 6: Reporte usando las funciones
// ============================================

console.log(`\n${"═".repeat(45)}`);
console.log(`   REPORTE — ${DOMAIN_NAME}`);
console.log(`${"═".repeat(45)}`);

if (items.length === 0) {
  console.log("\n⚠️  No hay certificaciones. Agrega datos en la Sección 1.");
} else {
  // --- Listado ---
  console.log("\n📋 Listado de Certificaciones:");
  let lineNumber = 1;
  for (const item of items) {
    console.log(`  ${lineNumber}. ${formatItem(item)}`);
    lineNumber++;
  }

  // --- Validación ---
  let validCount = 0;
  for (const item of items) {
    if (isValid(item)) {
      validCount++;
    }
  }
  console.log(`\n✅ Certificaciones activas: ${validCount} / ${items.length}`);

  // --- Cálculo ---
  let totalValue = 0;
  for (const item of items) {
    totalValue += calculateValue(item.value);
  }
  console.log(formatWithDefault(totalValue, `Total ${VALUE_LABEL}`));
}

console.log(`\n${"═".repeat(45)}\n`);
