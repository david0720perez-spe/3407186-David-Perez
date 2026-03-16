// ============================================
// PROYECTO SEMANA 03: Calculadora de Certificaciones Profesionales
// ============================================

// ============================================
// SECCIÓN 1: Datos del dominio
// ============================================

// Precio base del diploma
const DIPLOMA_PRICE = 500_000; // $500,000 COP
// Porcentaje que se queda la plataforma (15%)
const PLATFORM_FEE_PERCENTAGE = 0.15;
// IVA (19%)
const IVA_PERCENTAGE = 0.19;

// ============================================
// SECCIÓN 2: Operaciones aritméticas
// ============================================
console.log("=== Operaciones básicas ===");

// Datos de ejemplo
const studentsEnrolled = 25; // Estudiantes inscritos
const discountAmount = 50_000; // Descuento por pronto pago

// 1. Ingreso bruto (sin descuentos)
const grossRevenue = DIPLOMA_PRICE * studentsEnrolled;
console.log("Ingreso bruto:", grossRevenue);

// 2. Ingreso después de aplicar descuento
const revenueWithDiscount = grossRevenue - (discountAmount * studentsEnrolled);
console.log("Ingreso tras descuento:", revenueWithDiscount);

// 3. IVA a pagar (19% del ingreso con descuento)
const ivaAmount = revenueWithDiscount * IVA_PERCENTAGE;
console.log("IVA a pagar:", ivaAmount);

// 4. Ganancia neta (ingreso con descuento - IVA)
const netProfit = revenueWithDiscount - ivaAmount;
console.log("Ganancia neta:", netProfit);

console.log(""); // Espacio

// ============================================
// SECCIÓN 3: Asignación compuesta
// ============================================
console.log("=== Asignación compuesta ===");

// Empezamos con un balance de ingresos de 0
let totalAcumulado = 0;
console.log("Valor inicial:", totalAcumulado);

// 1. Sumamos la primera venta
totalAcumulado += DIPLOMA_PRICE;
console.log("Tras primera venta:", totalAcumulado);

// 2. Sumamos otra venta
totalAcumulado += DIPLOMA_PRICE;
console.log("Tras segunda venta:", totalAcumulado);

// 3. Aplicamos un cargo administrativo extra
totalAcumulado += 15_000;
console.log("Con cargo administrativo:", totalAcumulado);

// 4. Aplicamos un descuento global del 10%
totalAcumulado *= 0.90;
console.log("Total final con descuento (10%):", totalAcumulado);

console.log(""); // Espacio

// ============================================
// SECCIÓN 4: Comparación estricta
// ============================================
console.log("=== Validaciones con === ===");

// Ejemplo: ¿El total acumulado es exactamente 1,000,000?
const expectedValue = 1_000_000;
const isExpectedValue = totalAcumulado === expectedValue;
console.log("¿El total es exactamente 1,000,000?:", isExpectedValue);

console.log(""); // Espacio

// ============================================
// SECCIÓN 5: Operadores lógicos
// ============================================
console.log("=== Condiciones lógicas ===");

// Datos de ejemplo
const hasPaid = true; // ¿El estudiante pagó?
const completedModules = 10; // Módulos completados
const totalModules = 10; // Total de módulos

// ¿Puede descargar el diploma? (Debe haber pagado Y terminado los módulos)
const canGetDiploma = hasPaid && completedModules === totalModules;
console.log("¿Puede descargar el diploma?:", canGetDiploma);

// ¿Tiene acceso a soporte? (Si es becado O si pagó)
const isScholarshipStudent = false;
const hasSupportAccess = isScholarshipStudent || hasPaid;
console.log("¿Tiene acceso a soporte?:", hasSupportAccess);

console.log(""); // Espacio

// ============================================
// SECCIÓN 6: Resumen final
// ============================================
console.log("=== Resumen ===");

console.log("Métricas clave de hoy:");
console.log("- Precio base del diploma:", DIPLOMA_PRICE);
console.log("- Estudiantes inscritos:", studentsEnrolled);
console.log("- Ingresos acumulados:", totalAcumulado);
console.log("- ¿Puede descargar el diploma?:", canGetDiploma ? "Sí" : "No");

