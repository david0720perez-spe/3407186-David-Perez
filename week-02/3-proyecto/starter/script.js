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

// ============================================
// ESTADO GLOBAL
// ============================================

let items = [];
let editingItemId = null;

// ============================================
// CATEGORÍAS (DEBEN COINCIDIR CON EL HTML)
// ============================================

const CATEGORIES = {
  it_digital: { name: "Tecnología y Transformación Digital", emoji: "💻" },
  cybersecurity: { name: "Ciberseguridad", emoji: "🔒" },
  data_ai: { name: "Datos e IA", emoji: "📊" },
  project_mgmt: { name: "Gestión de Proyectos", emoji: "📈" },
  business: { name: "Negocios y Liderazgo", emoji: "👔" },
  finance_fintech: { name: "Finanzas y Fintech", emoji: "💰" },
  cloud_devops: { name: "Cloud y DevOps", emoji: "☁️" },
  sustainability: { name: "Sostenibilidad", emoji: "🌱" },
  design_ux: { name: "Diseño y UX/UI", emoji: "🎨" },
  languages: { name: "Idiomas", emoji: "🗣️" },
  emerging: { name: "Emergentes 2025–2026", emoji: "🚀" }
};

const PRIORITIES = {
  must: { name: "Imprescindible" },
  high: { name: "Alta" },
  medium: { name: "Media" },
  low: { name: "Baja" },
  nice: { name: "Opcional" }
};

// ============================================
// PERSISTENCIA
// ============================================

const loadItems = () =>
  JSON.parse(localStorage.getItem("certifications") ?? "[]");

const saveItems = (itemsToSave) =>
  localStorage.setItem("certifications", JSON.stringify(itemsToSave));

// ============================================
// CRUD
// ============================================

const createItem = (itemData = {}) => {
  const newItem = {
    id: Date.now(),
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: null,
    ...itemData
  };

  const newItems = [...items, newItem];
  saveItems(newItems);
  return newItems;
};

const updateItem = (id, updates) => {
  const updatedItems = items.map(item =>
    item.id === id
      ? { ...item, ...updates, updatedAt: new Date().toISOString() }
      : item
  );

  saveItems(updatedItems);
  return updatedItems;
};

const deleteItem = (id) => {
  const filtered = items.filter(item => item.id !== id);
  saveItems(filtered);
  return filtered;
};

const toggleItemActive = (id) => {
  const updated = items.map(item =>
    item.id === id
      ? { ...item, active: !item.active }
      : item
  );
  saveItems(updated);
  return updated;
};

const clearInactive = () => {
  const activeOnly = items.filter(item => item.active);
  saveItems(activeOnly);
  return activeOnly;
};

// ============================================
// FILTROS
// ============================================

const applyFilters = (itemsToFilter, filters = {}) => {
  const {
    status = "all",
    category = "all",
    priority = "all",
    search = ""
  } = filters;

  return itemsToFilter
    .filter(item =>
      status === "all"
        ? true
        : status === "active"
        ? item.active
        : !item.active
    )
    .filter(item =>
      category === "all" ? true : item.category === category
    )
    .filter(item =>
      priority === "all" ? true : item.priority === priority
    )
    .filter(item => {
      const term = search.toLowerCase();
      return (
        item.title.toLowerCase().includes(term) ||
        (item.issuer ?? "").toLowerCase().includes(term) ||
        (item.notes ?? "").toLowerCase().includes(term)
      );
    });
};

// ============================================
// ESTADÍSTICAS
// ============================================

const getStats = (itemsToAnalyze = []) => {
  const total = itemsToAnalyze.length;
  const active = itemsToAnalyze.filter(i => i.active).length;
  const inactive = total - active;

  const byCategory = itemsToAnalyze.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] ?? 0) + 1;
    return acc;
  }, {});

  return { total, active, inactive, byCategory };
};

const renderStats = (stats) => {
  document.getElementById("stat-total").textContent = stats.total;
  document.getElementById("stat-active").textContent = stats.active;
  document.getElementById("stat-inactive").textContent = stats.inactive;

  const categoryBar = document.getElementById("stats-categories");

  categoryBar.innerHTML = Object.entries(stats.byCategory)
    .map(([cat, count]) => `
      <span class="category-pill">
        ${CATEGORIES[cat]?.emoji ?? "🎓"} ${count}
      </span>
    `)
    .join("");
};

// ============================================
// RENDER CERTIFICACIÓN
// ============================================

const renderItem = (item) => {
  const {
    id,
    title,
    issuer,
    credentialId,
    category,
    priority,
    issueDate,
    expiryDate,
    url,
    notes,
    active
  } = item;

  return `
    <div class="cert-item ${active ? "" : "inactive"}" data-id="${id}">
      <div class="cert-header">
        <h3>${title}</h3>
        <span>${CATEGORIES[category]?.emoji ?? ""}</span>
      </div>

      <p><strong>Emisor:</strong> ${issuer ?? "-"}</p>
      <p><strong>ID:</strong> ${credentialId ?? "-"}</p>
      <p><strong>Prioridad:</strong> ${PRIORITIES[priority]?.name ?? "-"}</p>
      <p><strong>Emisión:</strong> ${issueDate ?? "-"}</p>
      <p><strong>Expira:</strong> ${expiryDate ?? "No aplica"}</p>

      ${url ? `<p><a href="${url}" target="_blank">🔗 Ver credencial</a></p>` : ""}

      ${notes ? `<p>${notes}</p>` : ""}

      <div class="actions">
        <button class="btn-toggle">✔</button>
        <button class="btn-edit">✏️</button>
        <button class="btn-delete">🗑️</button>
      </div>
    </div>
  `;
};

const renderItems = (itemsToRender) => {
  const list = document.getElementById("cert-list");
  const emptyState = document.getElementById("empty-state");

  if (itemsToRender.length === 0) {
    list.innerHTML = "";
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";
    list.innerHTML = itemsToRender.map(renderItem).join("");
  }
};

// ============================================
// EVENT HANDLERS
// ============================================

const handleFormSubmit = (e) => {
  e.preventDefault();

  const itemData = {
    title: document.getElementById("cert-title").value.trim(),
    issuer: document.getElementById("cert-issuer").value.trim(),
    credentialId: document.getElementById("cert-credential-id").value.trim(),
    category: document.getElementById("cert-category").value,
    priority: document.getElementById("cert-priority").value,
    issueDate: document.getElementById("cert-issue-date").value,
    expiryDate: document.getElementById("cert-expiry-date").value,
    url: document.getElementById("cert-url").value,
    notes: document.getElementById("cert-notes").value.trim()
  };

  if (!itemData.title) {
    alert("El nombre de la certificación es obligatorio");
    return;
  }

  items = editingItemId
    ? updateItem(editingItemId, itemData)
    : createItem(itemData);

  resetForm();
  updateUI();
};

const handleListClick = (e) => {
  const itemElement = e.target.closest(".cert-item");
  if (!itemElement) return;

  const id = Number(itemElement.dataset.id);

  if (e.target.classList.contains("btn-delete")) {
    items = deleteItem(id);
  }

  if (e.target.classList.contains("btn-toggle")) {
    items = toggleItemActive(id);
  }

  updateUI();
};

// ============================================
// UTILIDADES UI
// ============================================

const getCurrentFilters = () => ({
  status: document.getElementById("filter-status").value,
  category: document.getElementById("filter-category").value,
  priority: document.getElementById("filter-priority").value,
  search: document.getElementById("search-input").value
});

const updateUI = () => {
  const filtered = applyFilters(items, getCurrentFilters());
  renderItems(filtered);
  renderStats(getStats(items));
};

const resetForm = () => {
  document.getElementById("cert-form").reset();
  editingItemId = null;
};

// ============================================
// INICIALIZACIÓN
// ============================================

const init = () => {
  items = loadItems();
  updateUI();

  const form = document.getElementById("cert-form");

  if (!form) {
    console.error("❌ No se encontró el formulario cert-form");
    return;
  }

  form.addEventListener("submit", handleFormSubmit);

  document
    .getElementById("cert-list")
    .addEventListener("click", handleListClick);

  document
    .getElementById("filter-status")
    .addEventListener("change", updateUI);

  document
    .getElementById("filter-category")
    .addEventListener("change", updateUI);

  document
    .getElementById("filter-priority")
    .addEventListener("change", updateUI);

  document
    .getElementById("search-input")
    .addEventListener("input", updateUI);

  document
    .getElementById("clear-inactive")
    .addEventListener("click", () => {
      items = clearInactive();
      updateUI();
    });

  console.log("🎓 Sistema de Certificaciones listo");
};
console.log("JS conectado correctamente");
document.addEventListener("DOMContentLoaded", init);