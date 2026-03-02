/**
 * ============================================
 * GESTOR DE CERTIFICACIONES PROFESIONALES 2026
 * ============================================
 *
 * - CRUD completo
 * - Filtros dinámicos
 * - Estadísticas por categoría
 * - Persistencia LocalStorage
 * - Inmutabilidad
 * - ES2023
 *
 * ============================================
 */

/**
 * ==============================
 * ESTADO GLOBAL Y CONFIGURACIÓN
 * ==============================
 */

// Aquí guardamos todas las certificaciones
let items = [];

// Si tiene un ID significa que estamos editando.
// Si es null significa que estamos creando una nueva certificación.
let editingItemId = null;

// Categorías disponibles
// Cada categoría tiene un nombre y un emoji
const CATEGORIES = {
    it_digital: { name: "Tecnología", emoji: "💻" },
    cybersecurity: { name: "Ciberseguridad", emoji: "🔒" },
    data_ai: { name: "Datos e IA", emoji: "📊" },
    business: { name: "Negocios", emoji: "👔" },
    languages: { name: "Idiomas", emoji: "🗣️" }
};

// Niveles de prioridad
const PRIORITIES = {
    must: { name: "Imprescindible" },
    high: { name: "Alta" },
    medium: { name: "Media" },
    low: { name: "Baja" }
};


/**
 * ==============================
 * GUARDAR Y CARGAR DATOS
 * (LocalStorage)
 * ==============================
 */

// Cargar datos guardados en el navegador.
// Si no hay nada guardado, devuelve un array vacío.
const loadItems = () => 
    JSON.parse(localStorage.getItem("certifications") ?? "[]");

// Guardar los datos en el navegador.
// Convertimos el array en texto (JSON) antes de guardarlo.
const saveItems = (itemsToSave) => 
    localStorage.setItem("certifications", JSON.stringify(itemsToSave));


/**
 * ==============================
 * OPERACIONES CRUD
 * (Crear, Actualizar, Borrar)
 * ==============================
 */

// CREAR una nueva certificación
const createItem = (itemData = {}) => {

    // Creamos un nuevo objeto con datos adicionales automáticos
    const newItem = {
        id: Date.now(), // ID único usando fecha actual
        active: true, // Por defecto está activa
        createdAt: new Date().toISOString(), // Fecha de creación
        ...itemData // Aquí agregamos los datos del formulario
    };

    // Creamos un nuevo array con la certificación añadida
    const newItems = [...items, newItem];

    // Guardamos en localStorage
    saveItems(newItems);

    return newItems;
};


// ACTUALIZAR una certificación existente
const updateItem = (id, updates) => {

    // Recorremos todos los items
    const updatedItems = items.map(item =>
        // Si el ID coincide, actualizamos sus datos
        item.id === id
            ? { ...item, ...updates, updatedAt: new Date().toISOString() }
            : item // Si no coincide, lo dejamos igual
    );

    saveItems(updatedItems);
    return updatedItems;
};


// BORRAR una certificación
const deleteItem = (id) => {

    // Creamos un nuevo array sin el elemento que tenga ese ID
    const filtered = items.filter(item => item.id !== id);

    saveItems(filtered);
    return filtered;
};


/**
 * ==============================
 * INTERFAZ (UI)
 * ==============================
 */

// Aplicar filtros (estado, categoría y búsqueda)
const applyFilters = (itemsToFilter, filters = {}) => {

    const { status, category, search } = filters;

    return itemsToFilter.filter(item => {

        // Filtrar por estado (activo / inactivo)
        const matchesStatus =
            status === "all"
                ? true
                : (status === "active" ? item.active : !item.active);

        // Filtrar por categoría
        const matchesCat =
            category === "all"
                ? true
                : item.category === category;

        // Filtrar por texto (búsqueda)
        const term = search.toLowerCase();
        const matchesSearch =
            item.title.toLowerCase().includes(term) ||
            (item.issuer ?? "").toLowerCase().includes(term);

        return matchesStatus && matchesCat && matchesSearch;
    });
};


// Dibujar las tarjetas en el HTML
const renderItems = (itemsToRender) => {

    const list = document.getElementById("cert-list");
    const emptyState = document.getElementById("empty-state");

    // Si no hay certificaciones, mostramos mensaje vacío
    if (itemsToRender.length === 0) {
        list.innerHTML = "";
        emptyState.style.display = "block";
    } else {

        emptyState.style.display = "none";

        // Creamos el HTML dinámicamente
        list.innerHTML = itemsToRender.map(item => `
            <div class="cert-item ${item.active ? "" : "inactive"}" data-id="${item.id}">
                
                <div class="cert-header">
                    <h3>${item.title} ${CATEGORIES[item.category]?.emoji ?? "🎓"}</h3>
                </div>

                <p><strong>Emisor:</strong> ${item.issuer || "N/A"}</p>
                <p><strong>Prioridad:</strong> ${PRIORITIES[item.priority]?.name}</p>

                <div class="actions">
                    <button class="btn-toggle">✅</button>
                    <button class="btn-edit">✏️</button>
                    <button class="btn-delete">🗑️</button>
                </div>

            </div>
        `).join("");
    }
};


/**
 * ==============================
 * EVENTOS (INTERACCIÓN)
 * ==============================
 */

// Cuando se envía el formulario
const handleFormSubmit = (e) => {

    e.preventDefault(); // Evita que la página se recargue

    // Recogemos los datos del formulario
    const itemData = {
        title: document.getElementById("cert-title").value.trim(),
        issuer: document.getElementById("cert-issuer").value.trim(),
        category: document.getElementById("cert-category").value,
        priority: document.getElementById("cert-priority").value,
    };

    // Si estamos editando, actualizamos
    if (editingItemId) {
        items = updateItem(editingItemId, itemData);
    } 
    // Si no, creamos uno nuevo
    else {
        items = createItem(itemData);
    }

    resetForm();
    updateUI();
};


// Detecta clicks dentro de la lista (borrar, editar, activar/desactivar)
const handleListClick = (e) => {

    const itemElement = e.target.closest(".cert-item");
    if (!itemElement) return;

    const id = Number(itemElement.dataset.id);

    // Si clic en borrar
    if (e.target.classList.contains("btn-delete")) {

        if (confirm("¿Seguro que deseas borrar esto?"))
            items = deleteItem(id);
    }

    // Si clic en activar/desactivar
    else if (e.target.classList.contains("btn-toggle")) {

        items = updateItem(id, {
            active: !items.find(i => i.id === id).active
        });
    }

    // Si clic en editar
    else if (e.target.classList.contains("btn-edit")) {

        const item = items.find(i => i.id === id);
        fillFormForEdit(item);
    }

    updateUI();
};


// Rellenar el formulario con los datos para editar
const fillFormForEdit = (item) => {

    document.getElementById("cert-title").value = item.title;
    document.getElementById("cert-issuer").value = item.issuer;
    document.getElementById("cert-category").value = item.category;
    document.getElementById("cert-priority").value = item.priority;

    editingItemId = item.id;

    document.querySelector(".btn-save").textContent = "Actualizar Cambios";
};


// Resetear el formulario
const resetForm = () => {

    document.getElementById("cert-form").reset();
    editingItemId = null;

    document.querySelector(".btn-save").textContent = "Guardar Certificación";
};


// Actualizar toda la interfaz
const updateUI = () => {

    const filters = {
        status: document.getElementById("filter-status").value,
        category: "all",
        search: document.getElementById("search-input").value
    };

    const filtered = applyFilters(items, filters);
    renderItems(filtered);
};


/**
 * ==============================
 * INICIO DEL SISTEMA
 * ==============================
 */

// Cuando el HTML termina de cargar
document.addEventListener("DOMContentLoaded", () => {

    // Cargamos datos guardados
    items = loadItems();

    // Pintamos la interfaz
    updateUI();

    // Activamos eventos
    document.getElementById("cert-form")
        .addEventListener("submit", handleFormSubmit);

    document.getElementById("cert-list")
        .addEventListener("click", handleListClick);

    document.getElementById("search-input")
        .addEventListener("input", updateUI);

    document.getElementById("filter-status")
        .addEventListener("change", updateUI);

    console.log("Sistema listo 🚀");
});
