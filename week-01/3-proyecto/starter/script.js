/* ============================================
   PROYECTO SEMANA 01 - FICHA DE INFORMACIÓN INTERACTIVA
   ============================================ */

// ============================================
// TODO 1: Crear el objeto de datos de tu dominio
  // Crea un objeto constante con los datos de la entidad principal de tu dominio.

// Consulta con tu instructor cuál es tu dominio asignado.
// Tu objeto debe incluir:
// - Propiedades básicas (strings, numbers, booleans)
// - Un array de elementos relacionados (cada uno con name/level o similar)
// - Un objeto de estadísticas o contadores
// EJEMPLO (Planetario - NO es un dominio asignable):
// const exhibitData = {
//   name: 'Sistema Solar Interactivo',
//   description: 'Exhibición inmersiva del sistema solar',
//   code: 'EXH-001'
//   location: { room: 'Sala Principal', floor: 2 },
//   features: [
//     { name: 'Proyección 360°', level: 95 },
//     { name: 'Audio envolvente', level: 88 }
//   ],
//   stats: { visitors: 15000, rating: 4.8, duration: 45 }
// };
// ============================================
const entityData = {
    name: 'CertificaPro Professional',
    description: 'Plataforma líder en gestión y seguimiento de certificaciones profesionales de alto impacto.',
    identifier: 'PCP-2026-COL',

    contact: {
        email: 'certificationsprofesional2026@gmail.com',
        phone: '3124260721',
        location: 'Bogotá, Colombia'
    },

    items: [
        { name: 'Technical Skills', level: 90, category: 'Core' },
        { name: 'Soft Skills', level: 85, category: 'Supporting' },
        { name: 'Industry Knowledge', level: 75, category: 'Specialized' },
        { name: 'Cloud Computing', level: 80, category: 'Tech' },
        { name: 'Project Management', level: 95, category: 'Management' }
    ],

    links: [
        { platform: 'LinkedIn', url: 'https://linkedin.com/company/certipro', icon: 'linkedin-icon' },
        { platform: 'Oficial Web', url: 'https://certipro.com', icon: 'globe-icon' },
        { platform: 'Support', url: 'mailto:contacto@certipro.com', icon: 'mail-icon' }
    ],

    stats: {
        total: 15400,       
        active: 850,        
        rating: 4.2,        
        issuingEntities: 12
    }
};

// ============================================
// TODO 2: Referencias a elementos del DOM
// Obtén referencias a todos los elementos del DOM necesarios usando const.
// Usa document.getElementById() o document.querySelector()
// Necesitarás referencias para:
// - Elementos de información principal (nombre, descripción, etc.)
// - Contenedor de la lista de items
// - Contenedor de estadísticas
// - Botones de interacción (tema, copiar, mostrar/ocultar)
// - Elementos de notificación (toast)
// TODO: Agrega tus referencias al DOM aquí
// ============================================
const entityName = document.getElementById('entity-name');
const entityDescription = document.getElementById('entity-description');
const itemsList = document.getElementById('items-list');
const statsContainer = document.getElementById('stats');
const themeToggle = document.getElementById('theme-toggle');
const copyBtn = document.getElementById('copy-btn');
const toggleItemsBtn = document.getElementById('toggle-items');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

// ============================================
// TODO 3: Renderizar información básica
// Crea una arrow function llamada 'renderBasicInfo' que:
// 1. Use destructuring para extraer propiedades de entityData
// 2. Actualice los elementos del DOM con template literals
// 3. Muestre la información principal de tu entidad
// ============================================
const renderBasicInfo = () => {
    const { name, description, contact: { email, phone } } = entityData;
    
    if (entityName) entityName.textContent = name;
    if (entityDescription) {
        entityDescription.innerHTML = `
            <p>${description}</p>
            <small>📧 ${email} | 📱 ${phone}</small>
        `;
    }
};

// ============================================
// TODO 4: Renderizar lista de elementos
// Crea una arrow function llamada 'renderItems' que:
// 1. Reciba un parámetro 'showAll' (por defecto false)
// 2. Filtre los items para mostrar solo los primeros 4 si showAll es false
// 3. Use map() para crear el HTML de cada item
// 4. Use template literals para generar la estructura HTML
// 5. Actualice el innerHTML del contenedor de items
// ============================================
const renderItems = (showAll = false) => {
    const { items } = entityData;
    const itemsToShow = showAll ? items : items.slice(0, 3);

    const itemsHtml = itemsToShow.map(({ name, level, category }) => `
        <div class="item">
            <div class="item-name">${name} <small>(${category})</small></div>
            <div class="item-level">
                <span>${level}%</span>
                <div class="level-bar">
                    <div class="level-fill" style="width: ${level}%"></div>
                </div>
            </div>
        </div>
    `).join('');

    if (itemsList) itemsList.innerHTML = itemsHtml;
};

// ============================================
// TODO 5: Renderizar enlaces/referencias
// Crea una arrow function llamada 'renderLinks' que:
// 1. Use destructuring para extraer el array de links de entityData
// 2. Use map() para crear HTML de cada enlace
// 3. Use template literals para generar etiquetas anchor
// 4. Actualice el contenedor de links
// ============================================
const renderLinks = () => {
    const { links } = entityData;
    // Podemos agregar estos links al pie de página o consola
    console.table(links); 
};

// ============================================
// TODO 6: Calcular y renderizar estadísticas
// Crea una arrow function llamada 'renderStats' que:
// 1. Use destructuring para extraer el objeto stats de entityData
// 2. Crea un array de objetos con label y value para cada estadística
// 3. Use map() para generar HTML de cada estadística
// 4. Use template literals para la estructura HTML
// 5. Actualice el contenedor de stats
// ============================================
const renderStats = () => {
    const { stats } = entityData;

    const statsArray = [
        { label: 'Certificados', value: stats.total },
        { label: 'Cursos Activos', value: stats.active },
        { label: 'Puntaje', value: `⭐ ${stats.rating}` },
        { label: 'Entidades', value: stats.issuingEntities }
    ];

    const statsHtml = statsArray.map(({ value, label }) => `
        <div class="stat-card">
            <div class="stat-value">${value}</div>
            <div class="stat-label">${label}</div>
        </div>
    `).join('');

    if (statsContainer) statsContainer.innerHTML = statsHtml;
};

// ============================================
// TODO 7: Funcionalidad de cambio de tema
// Crea una arrow function llamada 'toggleTheme' que:
// 1. Obtenga el tema actual de document.documentElement.dataset.theme
// 2. Calcule el nuevo tema (si es 'dark' cambia a 'light' y viceversa)
// 3. Actualice document.documentElement.dataset.theme
// 4. Actualice el ícono del botón (🌙 para modo claro, ☀️ para modo oscuro)
// 5. (Opcional) Guarde la preferencia en localStorage
// ============================================
const toggleTheme = () => {
    const currentTheme = document.documentElement.dataset.theme || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.dataset.theme = newTheme;
    themeToggle.textContent = newTheme === 'dark' ? '☀️ Modo Claro' : '🌙 Modo Oscuro';
    localStorage.setItem('theme', newTheme);
    themeToggle.addEventListener('click', toggleTheme);
};

const loadTheme = () => {
    const savedTheme = localStorage.getItem('theme') ?? 'light';
    document.documentElement.dataset.theme = savedTheme;
    if (themeToggle) themeToggle.textContent = savedTheme === 'dark' ? '☀️ Modo Claro' : '🌙 Modo Oscuro';
};

// ============================================
// TODO 8: Funcionalidad de copiar información
// Crea una arrow function llamada 'copyInfo' que:
// 1. Construya un string con la información principal usando template literals
// 2. Use navigator.clipboard.writeText() para copiar al portapapeles
// 3. Muestre una notificación toast de éxito
// 4. Use la función auxiliar showToast
// ============================================
const copyInfo = () => {
    const { name, identifier, contact: { email } } = entityData;
    const infoText = `Plataforma: ${name}\nID: ${identifier}\nContacto: ${email}`;

    navigator.clipboard.writeText(infoText)
        .then(() => showToast('¡Datos de contacto copiados!'))
        .catch(err => console.error('Error al copiar', err));
};

const showToast = message => {
    if (toast && toastMessage) {
        toastMessage.textContent = message;
        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('hidden'), 3000);
    }
};

// ============================================
// TODO 9: Funcionalidad de mostrar/ocultar items
// Crea una arrow function llamada 'handleToggleItems' que:
// 1. Use una variable para rastrear si todos los items están visibles
// 2. Alterne la visibilidad
// 3. Llame a renderItems con el parámetro apropiado
// 4. Actualice el texto del botón ("Mostrar más" / "Mostrar menos")
// ============================================
let showingAllItems = false;

const handleToggleItems = () => {
    showingAllItems = !showingAllItems;
    renderItems(showingAllItems);
    toggleItemsBtn.textContent = showingAllItems ? 'Mostrar menos' : 'Mostrar más';
};

// ============================================
// TODO 10: Event Listeners
// Agrega event listeners para:
// 1. Click en botón de tema -> toggleTheme
// 2. Click en botón de copiar -> copyInfo
// 3. Click en botón de toggle items -> handleToggleItems
// ============================================
if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
if (copyBtn) copyBtn.addEventListener('click', copyInfo);
if (toggleItemsBtn) toggleItemsBtn.addEventListener('click', handleToggleItems);

// ============================================
// TODO 11: Inicializar la aplicación
// Crea una arrow function llamada 'init' que:
// 1. Llame a loadTheme()
// 2. Llame a renderBasicInfo()
// 3. Llame a renderItems()
// 4. Llame a renderLinks()
// 5. Llame a renderStats()
// 6. Muestre un mensaje de éxito en la consola
// ============================================
const init = () => {
    loadTheme();
    renderBasicInfo();
    renderItems();
    renderLinks();
    renderStats();
    console.log('✅ CertificaPro inicializada correctamente');
};

init();