// ============================================
// SEMANA 08 — PROYECTO: Gestión de Inventario
// Dominio: Certificaciones Profesionales
// ============================================

// ---- CONFIGURA TU DOMINIO ----
const DOMAIN_NAME = "Certificaciones Profesionales";
const VALUE_LABEL = "certificaciones";

// ============================================
// 1. ARRAY INICIAL — Define tu inventario
// ============================================

const items = [
  {
    id: 1,
    name: "AWS Cloud Practitioner",
    provider: "Amazon",
    price: 100,
    durationHours: 20,
    available: true,
    level: "Básico"
  },
  {
    id: 2,
    name: "Google Data Analytics",
    provider: "Google",
    price: 120,
    durationHours: 40,
    available: true,
    level: "Intermedio"
  },
  {
    id: 3,
    name: "Scrum Master Certification",
    provider: "Scrum.org",
    price: 150,
    durationHours: 15,
    available: false,
    level: "Intermedio"
  },
  {
    id: 4,
    name: "Cisco CCNA",
    provider: "Cisco",
    price: 300,
    durationHours: 60,
    available: true,
    level: "Avanzado"
  },
  {
    id: 5,
    name: "Microsoft Azure Fundamentals",
    provider: "Microsoft",
    price: 110,
    durationHours: 25,
    available: true,
    level: "Básico"
  }
];

// ============================================
// 2. FUNCIONES DE GESTIÓN
// ============================================

const addItem = (newItem) => {
  items.push(newItem);
  console.log(`Agregado: ${newItem.name}`);
};

const removeLastItem = () => {
  const removed = items.pop();
  console.log(`Eliminado: ${removed.name}`);
  return removed;
};

const addPriorityItem = (priorityItem) => {
  items.unshift(priorityItem);
  console.log(`Elemento prioritario agregado: ${priorityItem.name}`);
};

const removeByIndex = (index) => {
  const removed = items.splice(index, 1);
  console.log(`Eliminado por índice: ${removed[0].name}`);
};

const getActiveItems = () => {
  return items.filter(item => item.available === true);
};

const findByName = (name) => {
  return items.find(item => item.name === name);
};

const formatItem = (item) => {
  return `[${item.id}] ${item.name} — ${item.provider} | Nivel: ${item.level} | $${item.price} | ${item.durationHours}h | Disponible: ${item.available}`;
};

// ============================================
// 3. REPORTE
// ============================================

console.log(`\n${"=".repeat(50)}`);
console.log(`📦 GESTIÓN DE ${DOMAIN_NAME.toUpperCase()}`);
console.log(`${"=".repeat(50)}\n`);

// Estado inicial
console.log(`📋 Inventario inicial (${items.length} ${VALUE_LABEL}):`);
items.forEach((item) => {
  console.log(`  ${formatItem(item)}`);
});

console.log("\n--- Operaciones de mutación ---\n");

// Agregar nuevo elemento
addItem({
  id: 6,
  name: "Python for Data Science",
  provider: "IBM",
  price: 130,
  durationHours: 35,
  available: true,
  level: "Intermedio"
});

// Agregar prioritario
addPriorityItem({
  id: 0,
  name: "Cybersecurity Essentials",
  provider: "Cisco",
  price: 90,
  durationHours: 18,
  available: true,
  level: "Básico"
});

// Eliminar del medio
removeByIndex(2);

// Eliminar último
removeLastItem();

console.log("\n--- Inventario después de mutaciones ---\n");
items.forEach((item) => {
  console.log(`  ${formatItem(item)}`);
});

console.log("\n--- Búsqueda y filtrado ---\n");

// Buscar certificación
const found = findByName("Cisco CCNA");
console.log("Búsqueda:", found ? formatItem(found) : "No encontrado");

// Filtrar disponibles
const activeItems = getActiveItems();
console.log(`Certificaciones disponibles: ${activeItems.length}`);

// Snapshot inmutable
const snapshot = [...items, {
  id: 999,
  name: "DevOps Engineer",
  provider: "AWS",
  price: 200,
  durationHours: 50,
  available: true,
  level: "Avanzado"
}];

console.log("Snapshot (no modifica el original):", snapshot.length);

console.log("\n--- Transformación con map ---\n");

// Solo nombres
const names = items.map(item => item.name);
console.log("Nombres:", names);

// Precios con descuento (10%)
const discounted = items.map(item => ({
  ...item,
  price: item.price * 0.9
}));
console.log("Precios con descuento:", discounted);

console.log("\n--- Resumen final ---\n");
console.log(`Total en inventario: ${items.length} ${VALUE_LABEL}`);

const activeCount = getActiveItems().length;
console.log(`Activos: ${activeCount} | Inactivos: ${items.length - activeCount}`);

console.log(`\n${"=".repeat(50)}`);
console.log("✅ Reporte completado");
console.log(`${"=".repeat(50)}\n`);
