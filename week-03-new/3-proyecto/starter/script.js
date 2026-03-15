// ============================================
// PROYECTO SEMANA 03: Calculadora de Dominio
// ============================================
// Adapta este archivo a tu dominio asignado.
//
// Ejemplos con dominios no asignables:
// - Planetario    → calcular ingresos por función, capacidad disponible
// - Acuario       → calcular costo de alimentación, volumen total de tanques
// - Museo         → calcular valor de exhibición, costo de entrada
// - Zoológico     → calcular gasto diario por especie, total de visitantes
// - Observatorio  → calcular duración total de eventos, aforo restante
// ============================================

// ============================================
// SECCIÓN 1: Datos del dominio
// ============================================

// TODO: Define las constantes base de tu dominio
// Ejemplos con dominios no asignables:
//   Planetario:   TICKET_PRICE = 12_000, MAX_CAPACITY = 45
//   Acuario:      DAILY_FEEDING_KG = 150, ENTRY_PRICE = 35_000
//   Museo:        ADULT_TICKET = 20_000, GUIDED_TOUR = 15_000
//   Zoológico:    FOOD_COST_PER_DAY = 500_000, MAX_VISITORS = 800
//   Observatorio: SESSION_DURATION = 90, TICKET_PRICE = 18_000

 const Diploma_Price = 500_000; const platform_free_percentage=0.15//15% de la platafroma
 const Iva_price=0.19// Ejemplo iva de el 19%
 //  // TODO: Reemplazar con tus constantes

// ============================================
// SECCIÓN 2: Operaciones aritméticas
// ============================================
console.log("=== Operaciones básicas ===");

//1 Definimos variables
const students_Enrolled=25;
const discount_Amount=50000;
console.log("Descuento por pronto pago");
//2 Creamos las operaciones 

const gross_Revenue =Diploma_Price * students_Enrolled;
console.log("Ingreso total de la empresa");

const revenuewithdiscount=gross_Revenue-(discount_Amount*students_Enrolled);
console.log("Ingreso tras aplicar descuento");
const IVA_price=revenuewithdiscount*0.19;
console.log("Total de iva a pagar");

const netProfit=revenuewithdiscount - IVA_price;
console.log("Ganancia neta real");
// TODO: Calcula totales, subtotales o valores clave de tu dominio
// Usa: +, -, *, /, %, **
// Etiqueta cada resultado con console.log()

// Ejemplo con dominio Planetario (NO copiar):
// const ticketPrice = 12_000;
// const attendees = 38;
// const totalRevenue = ticketPrice * attendees;
// console.log("Ingresos función:", totalRevenue);
// const remainingSeats = 45 - attendees;
// console.log("Asientos disponibles:", remainingSeats);

// ============================================
// SECCIÓN 3: Asignación compuesta
// ============================================
console.log("=== Asignación compuesta ===");
// Empezamos con un balance de ingresos de 0
let totalAcumulado = 0;
console.log("Valor inicial:", totalAcumulado);

// 1. Sumamos la primera certificación vendida (+=)
totalAcumulado += Diploma_Price; 
console.log("Tras primera venta:", totalAcumulado);

// 2. Sumamos otra certificación (+=)
totalAcumulado += Diploma_Price; 
console.log("Tras segunda venta:", totalAcumulado);

// 3. Aplicamos un cargo administrativo extra (+=)
totalAcumulado += 15000; 
console.log("Con cargo administrativo extra:", totalAcumulado);

// 4. Aplicamos un descuento global del 10% por temporada (*=)
// Multiplicar por 0.90 es quitarle el 10%
totalAcumulado *= 0.90; 
console.log("Total final con descuento de temporada (10%):", totalAcumulado);

// TODO: Usa +=, -=, *=, /= para actualizar valores acumulados
// Muestra el valor antes y después de cada operación

// Ejemplo (NO copiar):
// let runningTotal = 0;
// runningTotal += 25_000;
// console.log("Tras primer item:", runningTotal);
// runningTotal += 18_000;
// console.log("Tras segundo item:", runningTotal);
// runningTotal *= 0.90; // descuento del 10%
// console.log("Con descuento:", runningTotal);

console.log("");

// ============================================
// SECCIÓN 4: Comparación estricta
// ============================================
console.log("=== Validaciones con === ===");

// Empezamos con un balance de ingresos de 0
let total_Acumulado = 0;
console.log("Valor inicial:", totalAcumulado);

// 1. Sumamos la primera certificación vendida (+=)
totalAcumulado += Diploma_Price; 
console.log("Tras primera venta:", totalAcumulado);

// 2. Sumamos otra certificación (+=)
totalAcumulado += Diploma_Price; 
console.log("Tras segunda venta:", totalAcumulado);

// 3. Aplicamos un cargo administrativo extra (+=)
totalAcumulado += 15000; 
console.log("Con cargo administrativo extra:", totalAcumulado);

// 4. Aplicamos un descuento global del 10% por temporada (*=)
// Multiplicar por 0.90 es quitarle el 10%
totalAcumulado *= 0.90; 
console.log("Total final con descuento de temporada (10%):", totalAcumulado);

console.log(""); // Espacio
// ============================================
// SECCIÓN 5: Operadores lógicos
// ============================================
console.log("=== Condiciones lógicas ===");


const hasPaid = true;
const completedModules = 10;
const totalModules = 10;

// ¿Puede descargar el diploma? (Debe haber pagado Y haber terminado los módulos)
const canGetDiploma = hasPaid && completedModules === totalModules;
console.log("¿Puede descargar el diploma?:", canGetDiploma);

// ¿Tiene acceso a soporte? (Si es becado O si pagó el curso)
const isScholarshipStudent = false;
const hasSupportAccess = isScholarshipStudent || hasPaid;
console.log("¿Tiene acceso a soporte técnico?:", hasSupportAccess);
// TODO: Combina condiciones con &&, ||, !
// Al menos una condición con && y una con ||

// Ejemplo (NO copiar):
// const isMember = true;
// const purchaseAmount = 150_000;
// const qualifiesForDiscount = isMember && purchaseAmount >= 100_000;
// console.log("¿Descuento aplicable?", qualifiesForDiscount);

console.log("");

// ============================================
// SECCIÓN 6: Resumen final
// ============================================
console.log("=== Resumen ===");

console.log("Métricas clave de hoy:");
console.log("- Precio base del diploma:", Diploma_Price);
console.log("- Estudiantes evaluados:", studentsEnrolled); // Variable de la sección 2
console.log("- Ingresos acumulados en simulación:", totalAcumulado); // De la sección 3
console.log("- Estado de aprobación del último estudiante:", hasPassed ? "Aprobado" : "Reprobado");
// TODO: Muestra un resumen con los valores más importantes
// calculados en las secciones anteriores

console.log("");
