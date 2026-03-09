/*
 * script.js — Proyecto Semana 02
 * Dominio: Plataforma de Certificaciones Profesionales
 * Aprendiz: David (Santiago Perez)
 */

// ============================================
// SECCIÓN 1: DATOS PRINCIPALES
// ============================================

const DOMAIN_NAME = "CertiTech Pro"; // Nombre de la plataforma
const certName = "Certified JavaScript Developer (ES2023)"; // Nombre del examen
const certCategory = "Desarrollo Web - Frontend"; // Clasificación
const examPrice = 149.99; // Precio del examen (Decimal/Float)
const isVoucherActive = true; // Boolean: indica si el cupón es válido
const instructorAssigned = null; // Valor nulo: aún no hay tutor asignado a este registro


// ============================================
// SECCIÓN 2: MOSTRAR FICHA DE DATOS
// ============================================
console.log("===========================");
console.log(`FICHA DE DATOS: ${DOMAIN_NAME}`);
console.log("===========================");
console.log("");

// Uso de Template Literals (las comillas invertidas `` permiten usar variables dentro del texto)
console.log(`Certificación:  ${certName}`);
console.log(`Categoría:      ${certCategory}`);
console.log(`Costo Examen:   $${examPrice} USD`);
console.log(`¿Está activo?:  ${isVoucherActive}`);
console.log("");


// ============================================
// SECCIÓN 3: VERIFICACIÓN DE TIPOS CON typeof
// ============================================
console.log("--- Tipos de datos ---");

console.log("typeof certName:      ", typeof certName);      // Debería ser 'string'
console.log("typeof examPrice:     ", typeof examPrice);     // Debería ser 'number'
console.log("typeof isVoucherActive:", typeof isVoucherActive); // Debería ser 'boolean'
console.log("");


// ============================================
// SECCIÓN 4: CONVERSIONES EXPLÍCITAS
// ============================================
console.log("--- Conversiones ---");

// Convertimos el precio (number) a un string para simular un formato de factura
const priceFormatted = String(examPrice);
console.log("Precio convertido a texto: $", priceFormatted);
console.log("Nuevo tipo de dato:        ", typeof priceFormatted);

console.log("");


// ============================================
// SECCIÓN 5: VALOR NULL
// ============================================
console.log("--- Valor nulo ---");

console.log("Tutor asignado: ", instructorAssigned);
// Nota: typeof null devuelve "object", es un comportamiento conocido de JS
console.log("Tipo de null:   ", typeof instructorAssigned); 
console.log("¿Es nulo?:      ", instructorAssigned === null); // Comparación estricta
console.log("");


// ============================================
// CIERRE
// ============================================
console.log("===========================");
console.log("FIN DE FICHA - SEMANA 02");
console.log("===========================");