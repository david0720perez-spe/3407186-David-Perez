// certificationsManager.js
// Sistema profesional de gestión de certificaciones (con persistencia en LocalStorage)

// ============================================
// CONFIGURACIÓN - CATEGORÍAS Y PRIORIDADES (ajustado al dominio)
// ============================================
const CATEGORIES = {
  it_digital:       { name: "Tecnología y Transformación Digital", emoji: "💻" },
  cybersecurity:    { name: "Ciberseguridad",                  emoji: "🔒" },
  data_ai:          { name: "Datos e Inteligencia Artificial", emoji: "📊" },
  project_mgmt:     { name: "Gestión de Proyectos y Ágil",     emoji: "📈" },
  business:         { name: "Negocios y Liderazgo",            emoji: "👔" },
  finance_fintech:  { name: "Finanzas y Fintech",              emoji: "💰" },
  cloud_devops:     { name: "Cloud y DevOps",                  emoji: "☁️" },
  sustainability:   { name: "Sostenibilidad y ESG",            emoji: "🌱" },
  design_ux:        { name: "Diseño y UX/UI",                  emoji: "🎨" },
  languages:        { name: "Idiomas y Comunicación",          emoji: "🗣️" },
  emerging:         { name: "Emergentes 2025–2026",            emoji: "🚀" }
};

const PRIORITIES = {
  must:    { name: "Imprescindible", color: "#e63946" },
  high:    { name: "Alta",           color: "#f4a261" },
  medium:  { name: "Media",          color: "#2a9d8f" },
  low:     { name: "Baja",           color: "#457b9d" },
  nice:    { name: "Opcional / Nice-to-have", color: "#a8dadc" }
};

// Estado global
let items = [];
let editingItemId = null;

// ============================================
// TODO 2: PERSISTENCIA (LocalStorage)
// ============================================

/**
 * Carga los elementos desde LocalStorage
 * @returns {Array} Array de certificaciones guardadas, o array vacío
 */
const loadItems = () => {
  // TODO: Implementa la carga desde localStorage
  return JSON.parse(localStorage.getItem('myCertifications') ?? '[]');
};

/**
 * Guarda los elementos en LocalStorage
 * @param {Array} items - Array de certificaciones a guardar
 */
const saveItems = itemsToSave => {
  // TODO: Implementa el guardado en localStorage
  localStorage.setItem('myCertifications', JSON.stringify(itemsToSave));
};

// ============================================
// TODO 3: CRUD - CREAR ELEMENTO
// ============================================

/**
 * Crea una nueva certificación con los datos proporcionados
 * @param {Object} itemData - Datos de la nueva certificación
 * @returns {Array} Nuevo array de certificaciones (sin mutar el original)
 */
const createItem = (itemData = {}) => {
  // TODO: Implementa la creación de una nueva certificación
  const newItem = {
    id: Date.now(),
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: null,
    
    // Valores por defecto combinados con itemData
    title:       itemData.title       ?? '',
    issuer:      itemData.issuer      ?? '',
    category:    itemData.category    ?? 'it_digital',
    priority:    itemData.priority    ?? 'medium',
    issueDate:   itemData.issueDate   ?? '',
    expiryDate:  itemData.expiryDate  ?? '',
    credentialId:itemData.credentialId?? '',
    url:         itemData.url         ?? '',
    notes:       itemData.notes       ?? '',
    ...itemData
  };

  const newItems = [...items, newItem];
  saveItems(newItems);
  return newItems;
};

// ============================================
// TODO 4: CRUD - ACTUALIZAR ELEMENTO
// ============================================

/**
 * Actualiza una certificación existente
 * @param {Number} id - ID de la certificación a actualizar
 * @param {Object} updates - Propiedades a actualizar
 * @returns {Array} Nuevo array con la certificación actualizada
 */
const updateItem = (id, updates) => {
  // TODO: Implementa la actualización usando map
  const updatedItems = items.map(item =>
    item.id === id
      ? { ...item, ...updates, updatedAt: new Date().toISOString() }
      : item
  );
  saveItems(updatedItems);
  return updatedItems;
};

// ============================================
// TODO 5: CRUD - ELIMINAR ELEMENTO
// ============================================

/**
 * Elimina una certificación por su ID
 * @param {Number} id - ID de la certificación a eliminar
 * @returns {Array} Nuevo array sin la certificación eliminada
 */
const deleteItem = id => {
  // TODO: Implementa la eliminación usando filter
  const filtered = items.filter(item => item.id !== id);
  saveItems(filtered);
  return filtered;
};

// ============================================
// TODO 6: CRUD - TOGGLE ESTADO ACTIVO
// ============================================

/**
 * Alterna el estado activo/inactivo de una certificación
 * @param {Number} id - ID de la certificación
 * @returns {Array} Nuevo array con el estado actualizado
 */
const toggleItemActive = id => {
  // TODO: Implementa el toggle usando map
  const updated = items.map(item =>
    item.id === id
      ? { ...item, active: !item.active, updatedAt: new Date().toISOString() }
      : item
  );
  saveItems(updated);
  return updated;
};

/**
 * Elimina todas las certificaciones inactivas
 * @returns {Array} Nuevo array solo con certificaciones activas
 */
const clearInactive = () => {
  // TODO: Implementa usando filter
  const activeOnly = items.filter(item => item.active);
  saveItems(activeOnly);
  return activeOnly;
};

// ============================================
// TODO 7: FILTROS Y BÚSQUEDA
// ============================================

/**
 * Filtra certificaciones por estado (activo/inactivo)
 * @param {Array} itemsToFilter - Array de certificaciones
 * @param {String} status - 'all' | 'active' | 'inactive'
 * @returns {Array} Certificaciones filtradas
 */
const filterByStatus = (itemsToFilter, status = 'all') => {
  // TODO: Implementa el filtro por estado
  if (status === 'all')      return itemsToFilter;
  if (status === 'active')   return itemsToFilter.filter(i => i.active);
  if (status === 'inactive') return itemsToFilter.filter(i => !i.active);
  return itemsToFilter;
};

/**
 * Filtra certificaciones por categoría
 * @param {Array} itemsToFilter - Array de certificaciones
 * @param {String} category - Categoría a filtrar o 'all'
 * @returns {Array} Certificaciones filtradas
 */
const filterByCategory = (itemsToFilter, category = 'all') => {
  // TODO: Implementa el filtro por categoría
  if (category === 'all') return itemsToFilter;
  return itemsToFilter.filter(i => i.category === category);
};

/**
 * Filtra certificaciones por prioridad
 * @param {Array} itemsToFilter - Array de certificaciones
 * @param {String} priority - Prioridad a filtrar o 'all'
 * @returns {Array} Certificaciones filtradas
 */
const filterByPriority = (itemsToFilter, priority = 'all') => {
  // TODO: Similar a filterByCategory
  if (priority === 'all') return itemsToFilter;
  return itemsToFilter.filter(i => i.priority === priority);
};

/**
 * Busca certificaciones por texto en título, emisor, notas o credential ID
 * @param {Array} itemsToFilter - Array de certificaciones
 * @param {String} query - Texto a buscar
 * @returns {Array} Certificaciones que coinciden
 */
const searchItems = (itemsToFilter, query) => {
  // TODO: Implementa la búsqueda
  if (!query || query.trim() === '') return itemsToFilter;
  const term = query.toLowerCase();
  return itemsToFilter.filter(item =>
    item.title.toLowerCase().includes(term) ||
    (item.issuer  ?? '').toLowerCase().includes(term) ||
    (item.notes   ?? '').toLowerCase().includes(term) ||
    (item.credentialId ?? '').toLowerCase().includes(term)
  );
};

/**
 * Aplica todos los filtros de forma encadenada
 * @param {Array} itemsToFilter - Array de certificaciones
 * @param {Object} filters - Objeto con todos los filtros
 * @returns {Array} Certificaciones filtradas
 */
const applyFilters = (itemsToFilter, filters = {}) => {
  // TODO: Implementa aplicación de filtros encadenada
  const {
    status    = 'all',
    category  = 'all',
    priority  = 'all',
    search    = ''
  } = filters;

  let result = filterByStatus(itemsToFilter, status);
  result = filterByCategory(result, category);
  result = filterByPriority(result, priority);
  result = searchItems(result, search);
  return result;
};

// ============================================
// TODO 8: ESTADÍSTICAS
// ============================================

/**
 * Calcula estadísticas generales de la colección de certificaciones
 * @param {Array} itemsToAnalyze - Array de certificaciones
 * @returns {Object} Objeto con estadísticas
 */
const getStats = (itemsToAnalyze = []) => {
  // TODO: Implementa el cálculo de estadísticas usando reduce
  const total    = itemsToAnalyze.length;
  const active   = itemsToAnalyze.filter(i => i.active).length;
  const inactive = total - active;

  const byCategory = itemsToAnalyze.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] ?? 0) + 1;
    return acc;
  }, {});

  const byPriority = itemsToAnalyze.reduce((acc, item) => {
    acc[item.priority] = (acc[item.priority] ?? 0) + 1;
    return acc;
  }, {});

  return { total, active, inactive, byCategory, byPriority };
};

// ============================================
// TODO 9: RENDERIZADO - ELEMENTO INDIVIDUAL
// ============================================

/**
 * Obtiene el emoji de una categoría
 * @param {String} category - Clave de la categoría
 * @returns {String} Emoji de la categoría
 */
const getCategoryEmoji = category => {
  return CATEGORIES[category]?.emoji ?? '📜';
};

/**
 * Formatea una fecha ISO a formato legible
 * @param {String} dateString - Fecha en formato ISO
 * @returns {String} Fecha formateada
 */
const formatDate = dateString => {
  if (!dateString) return '—';
  const date = new Date(dateString);
  // Validación por si la fecha no es válida
  if (isNaN(date.getTime())) return dateString; 
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

/**
 * Renderiza una certificación individual como HTML
 * @param {Object} item - Objeto de la certificación
 * @returns {String} HTML de la certificación
 */
const renderItem = item => {
  // TODO: Implementa el renderizado usando template literals
  const { id, title, issuer, category, priority, active, issueDate, expiryDate, credentialId, url, notes } = item;

  return `
    <div class="cert-item ${active ? '' : 'inactive'} priority-${priority}" data-item-id="${id}">
      <input type="checkbox" class="cert-checkbox" ${active ? 'checked' : ''}>
      <div class="cert-content">
        <h3 class="cert-title">${title}</h3>
        <div class="cert-issuer">${issuer || 'Emisor no especificado'}</div>
        <div class="cert-meta">
          <span class="badge badge-category">${getCategoryEmoji(category)} ${CATEGORIES[category]?.name ?? category}</span>
          <span class="badge badge-priority" style="background-color: ${PRIORITIES[priority]?.color}">${PRIORITIES[priority]?.name ?? priority}</span>
          <span class="cert-date">📅 ${formatDate(issueDate)}</span>
          ${expiryDate ? `<span class="cert-date">⌛ Expira: ${formatDate(expiryDate)}</span>` : ''}
        </div>
        ${credentialId ? `<div class="cert-credential">ID: <code>${credentialId}</code></div>` : ''}
        ${url ? `<a href="${url}" target="_blank" class="cert-link">🔗 Ver Credencial</a>` : ''}
        ${notes ? `<p class="cert-notes">📝 ${notes}</p>` : ''}
      </div>
      <div class="cert-actions">
        <button class="btn-edit" title="Editar">✏️</button>
        <button class="btn-delete" title="Eliminar">🗑️</button>
      </div>
    </div>
  `;
};

// ============================================
// TODO 10: RENDERIZADO - LISTA COMPLETA
// ============================================

/**
 * Renderiza la lista completa de certificaciones
 * @param {Array} itemsToRender - Array de certificaciones a renderizar
 */
const renderItems = itemsToRender => {
  const itemList = document.getElementById('cert-list');
  const emptyState = document.getElementById('empty-state');

  if (!itemList) return;

  // TODO: Implementa el renderizado de la lista
  if (itemsToRender.length === 0) {
    itemList.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
  } else {
    if (emptyState) emptyState.style.display = 'none';
    itemList.innerHTML = itemsToRender.map(renderItem).join('');
  }
};

/**
 * Renderiza las estadísticas en el DOM
 * @param {Object} stats - Objeto con estadísticas
 */
const renderStats = stats => {
  // TODO: Actualiza los elementos del DOM con las estadísticas
  const totalEl = document.getElementById('stat-total');
  const activeEl = document.getElementById('stat-active');
  const inactiveEl = document.getElementById('stat-inactive');
  const categoriesEl = document.getElementById('stats-categories');

  if (totalEl) totalEl.textContent = stats.total;
  if (activeEl) activeEl.textContent = stats.active;
  if (inactiveEl) inactiveEl.textContent = stats.inactive;

  if (categoriesEl) {
    const catStats = Object.entries(stats.byCategory)
      .map(([cat, count]) => `${getCategoryEmoji(cat)} ${count}`)
      .join('  ');
    categoriesEl.textContent = catStats || 'Sin datos';
  }
};

// ============================================
// TODO 11: EVENT HANDLERS
// ============================================

/**
 * Maneja el envío del formulario (crear/editar certificación)
 * @param {Event} e - Evento del formulario
 */
const handleFormSubmit = e => {
  e.preventDefault();

  // TODO: Obtén los valores del formulario
  const title        = document.getElementById('cert-title').value.trim();
  const issuer       = document.getElementById('cert-issuer').value.trim();
  const category     = document.getElementById('cert-category').value;
  const priority     = document.getElementById('cert-priority').value;
  const issueDate    = document.getElementById('cert-issue-date').value;
  const expiryDate   = document.getElementById('cert-expiry-date').value;
  const credentialId = document.getElementById('cert-credential-id').value.trim();
  const url          = document.getElementById('cert-url').value.trim();
  const notes        = document.getElementById('cert-notes').value.trim();

  // TODO: Valida que el título no esté vacío
  if (!title) {
    alert('El título de la certificación es obligatorio');
    return;
  }

  // TODO: Crea el objeto con los datos
  const itemData = {
    title, issuer, category, priority,
    issueDate, expiryDate, credentialId, url, notes
  };

  // TODO: Si hay editingItemId, actualiza; si no, crea nuevo
  if (editingItemId) {
    items = updateItem(editingItemId, itemData);
  } else {
    items = createItem(itemData);
  }

  // TODO: Resetea el formulario y re-renderiza
  resetForm();
  renderItems(applyCurrentFilters());
  renderStats(getStats(items));
};

/**
 * Maneja el click en checkbox de una certificación
 * @param {Number} itemId - ID de la certificación
 */
const handleItemToggle = itemId => {
  // TODO: Implementa el toggle
  items = toggleItemActive(itemId);
  renderItems(applyCurrentFilters());
  renderStats(getStats(items));
};

/**
 * Maneja el click en botón editar
 * @param {Number} itemId - ID de la certificación a editar
 */
const handleItemEdit = itemId => {
  // TODO: Implementa la edición
  const cert = items.find(item => item.id === itemId);
  if (!cert) return;

  document.getElementById('cert-title').value        = cert.title;
  document.getElementById('cert-issuer').value       = cert.issuer || '';
  document.getElementById('cert-category').value     = cert.category;
  document.getElementById('cert-priority').value     = cert.priority;
  document.getElementById('cert-issue-date').value   = cert.issueDate || '';
  document.getElementById('cert-expiry-date').value  = cert.expiryDate || '';
  document.getElementById('cert-credential-id').value= cert.credentialId || '';
  document.getElementById('cert-url').value          = cert.url || '';
  document.getElementById('cert-notes').value        = cert.notes || '';

  const formTitle = document.getElementById('form-title');
  const submitBtn = document.getElementById('submit-btn');
  const cancelBtn = document.getElementById('cancel-btn');

  if (formTitle) formTitle.textContent = '✏️ Editar Certificación';
  if (submitBtn) submitBtn.textContent = 'Actualizar Cambios';
  if (cancelBtn) cancelBtn.style.display = 'inline-block';

  editingItemId = itemId;
  // Scroll suave al formulario
  document.getElementById('cert-form').scrollIntoView({ behavior: 'smooth' });
};

/**
 * Maneja el click en botón eliminar
 * @param {Number} itemId - ID de la certificación a eliminar
 */
const handleItemDelete = itemId => {
  // TODO: Implementa la eliminación con confirmación
  if (!confirm('¿Seguro que quieres eliminar esta certificación? Esta acción no se puede deshacer.')) return;
  items = deleteItem(itemId);
  renderItems(applyCurrentFilters());
  renderStats(getStats(items));
};

/**
 * Obtiene los filtros actuales del DOM
 * @returns {Object} Objeto con los valores de los filtros
 */
const getCurrentFilters = () => {
  // TODO: Retorna un objeto con los valores actuales de los filtros
  return {
    status:   document.getElementById('filter-status')?.value ?? 'all',
    category: document.getElementById('filter-category')?.value ?? 'all',
    priority: document.getElementById('filter-priority')?.value ?? 'all',
    search:   document.getElementById('search-input')?.value ?? ''
  };
};

/**
 * Aplica los filtros actuales y retorna las certificaciones filtradas
 * @returns {Array} Certificaciones filtradas
 */
const applyCurrentFilters = () => {
  const filters = getCurrentFilters();
  return applyFilters(items, filters);
};

/**
 * Maneja cambios en los filtros
 */
const handleFilterChange = () => {
  // TODO: Aplica filtros y re-renderiza
  const filtered = applyCurrentFilters();
  renderItems(filtered);
};

/**
 * Resetea el formulario a su estado inicial
 */
const resetForm = () => {
  // TODO: Limpia el formulario
  const form = document.getElementById('cert-form');
  if (form) form.reset();
  
  const formTitle = document.getElementById('form-title');
  const submitBtn = document.getElementById('submit-btn');
  const cancelBtn = document.getElementById('cancel-btn');

  if (formTitle) formTitle.textContent = '➕ Nueva Certificación';
  if (submitBtn) submitBtn.textContent = 'Añadir Certificación';
  if (cancelBtn) cancelBtn.style.display = 'none';
  
  editingItemId = null;
};

// ============================================
// TODO 12: EVENT LISTENERS
// ============================================

/**
 * Adjunta todos los event listeners necesarios
 */
const attachEventListeners = () => {
  const form = document.getElementById('cert-form');
  const cancelBtn = document.getElementById('cancel-btn');
  const clearBtn = document.getElementById('clear-inactive');
  const list = document.getElementById('cert-list');

  // TODO: Form submit
  if (form) form.addEventListener('submit', handleFormSubmit);
  
  // TODO: Cancel button
  if (cancelBtn) cancelBtn.addEventListener('click', resetForm);

  // TODO: Filtros - cada cambio dispara handleFilterChange
  ['filter-status', 'filter-category', 'filter-priority'].forEach(id => {
    document.getElementById(id)?.addEventListener('change', handleFilterChange);
  });
  document.getElementById('search-input')?.addEventListener('input', handleFilterChange);

  // TODO: Botón limpiar inactivos
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('¿Eliminar todas las certificaciones marcadas como inactivas?')) {
        items = clearInactive();
        renderItems(applyCurrentFilters());
        renderStats(getStats(items));
      }
    });
  }

  // TODO: Event delegation para la lista de elementos
  if (list) {
    list.addEventListener('click', e => {
      const certElement = e.target.closest('.cert-item');
      if (!certElement) return;

      const itemId = parseInt(certElement.dataset.itemId);

      if (e.target.classList.contains('cert-checkbox')) {
        handleItemToggle(itemId);
      } else if (e.target.closest('.btn-edit')) { // closest por si el click es en el emoji
        handleItemEdit(itemId);
      } else if (e.target.closest('.btn-delete')) {
        handleItemDelete(itemId);
      }
    });
  }
};

// ============================================
// TODO 13: INICIALIZACIÓN
// ============================================

/**
 * Inicializa la aplicación
 */
const init = () => {
  // TODO: Implementa la inicialización
  items = loadItems();
  renderItems(applyCurrentFilters());
  renderStats(getStats(items));
  attachEventListeners();
  console.log('✅ Gestor de Certificaciones Profesionales 2026 inicializado');
};

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);