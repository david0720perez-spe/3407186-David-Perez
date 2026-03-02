// ============================================
// SISTEMA DE CERTIFICACIONES PROFESIONAL
// DAVID SAMUEL PEREZ
// 3407186
// ERICK GRANADOS
// ============================================



// ============================================
// CLASE CERTIFICATION
// Representa una certificación individual
// ============================================

class Certification {

  // Propiedades privadas (no se pueden modificar desde afuera)
  #id;
  #title;
  #institution;
  #issuedAt;
  #expiresAt;
  #active;

  // Constructor: se ejecuta cuando creamos una nueva certificación
  constructor(title, institution, expiresAt) {

    // Genera un ID único automáticamente
    this.#id = crypto.randomUUID();

    // Guarda los datos recibidos
    this.#title = title;
    this.#institution = institution;

    // Fecha actual automática
    this.#issuedAt = new Date().toISOString();

    // Fecha de vencimiento enviada por el usuario
    this.#expiresAt = expiresAt;

    // Por defecto inicia activa
    this.#active = true;
  }

  // Permite leer el ID desde afuera
  get id() {
    return this.#id;
  }

  // Permite saber si está activa
  get active() {
    return this.#active;
  }

  // Devuelve toda la información en formato objeto
  getInfo() {
    return {
      id: this.#id,
      title: this.#title,
      institution: this.#institution,
      issuedAt: this.#issuedAt,
      expiresAt: this.#expiresAt,
      active: this.#active,
    };
  }

  // Cambia estado a inactiva
  deactivate() {
    this.#active = false;
  }

  // Cambia estado a activa
  activate() {
    this.#active = true;
  }

  // Verifica si ya expiró
  checkExpiration() {
    if (new Date(this.#expiresAt) < new Date()) {
      this.#active = false;
    }
  }
}



// ============================================
// CLASE CANDIDATE
// Representa una persona registrada en el sistema
// ============================================

class Candidate {

  #id;
  #name;
  #email;
  #registeredAt;

  constructor(name, email) {

    // ID único automático
    this.#id = crypto.randomUUID();

    // Datos básicos
    this.#name = name;
    this.#email = email;

    // Fecha de registro automática
    this.#registeredAt = new Date().toISOString();
  }

  // Getters para poder leer datos
  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get email() {
    return this.#email;
  }
}



// ============================================
// CLASE PRINCIPAL
// Maneja todo el sistema
// ============================================

class CertificationSystem {

  // Arrays privados
  #certifications = [];
  #candidates = [];

  // Agregar certificación
  addCertification(cert) {
    this.#certifications.push(cert);
  }

  // Eliminar certificación por ID
  removeCertification(id) {
    this.#certifications =
      this.#certifications.filter(c => c.id !== id);
  }

  // Buscar certificación por ID
  findCertification(id) {
    return this.#certifications.find(c => c.id === id);
  }

  // Obtener todas (copia del array)
  getAllCertifications() {
    return [...this.#certifications];
  }

  // Agregar candidato
  addCandidate(candidate) {
    this.#candidates.push(candidate);
  }

  // Obtener todos los candidatos
  getAllCandidates() {
    return [...this.#candidates];
  }

  // Obtener estadísticas generales
  getStats() {

    // Primero verifica expiraciones
    this.#certifications.forEach(c => c.checkExpiration());

    const total = this.#certifications.length;
    const active = this.#certifications.filter(c => c.active).length;
    const expired = total - active;

    return {
      total,
      active,
      expired,
      candidates: this.#candidates.length
    };
  }
}



// Crear instancia global del sistema
const system = new CertificationSystem();



// ============================================
// RENDER CERTIFICACIONES
// Muestra las certificaciones en pantalla
// ============================================

function renderCertifications() {

  const certifications = system.getAllCertifications();

  // Si no hay nada
  if (certifications.length === 0) {
    itemList.innerHTML = "<p>No hay certificaciones registradas</p>";
    return;
  }

  // Crear HTML dinámico
  itemList.innerHTML = certifications
    .map(cert => {

      const info = cert.getInfo();

      return `
        <div class="item ${info.active ? "" : "inactive"}">
          <div class="item-header">
            <h3>${info.title}</h3>
            <span class="badge">Certificación</span>
          </div>
          <div class="item-details">
            <p>Institución: ${info.institution}</p>
            <p>Emitida: ${new Date(info.issuedAt).toLocaleDateString()}</p>
            <p>Vence: ${new Date(info.expiresAt).toLocaleDateString()}</p>
            <p>Estado: ${info.active ? "Vigente" : "Expirada"}</p>
          </div>
          <div class="item-actions">
            <button class="btn-toggle" data-id="${info.id}">
              ${info.active ? "Desactivar" : "Activar"}
            </button>
            <button class="btn-delete" data-id="${info.id}">
              Eliminar
            </button>
          </div>
        </div>
      `;
    })
    .join("");
}



// ============================================
// RENDER ESTADÍSTICAS
// ============================================

function renderStats() {

  const stats = system.getStats();

  statTotal.textContent = stats.total;
  statActive.textContent = stats.active;
  statInactive.textContent = stats.expired;
  statUsers.textContent = stats.candidates;
}



// ============================================
// REFERENCIAS DEL DOM
// Guardamos los elementos HTML en variables
// ============================================

const itemList = document.getElementById("item-list");
const userList = document.getElementById("user-list");

const addItemBtn = document.getElementById("add-item-btn");
const itemModal = document.getElementById("item-modal");
const closeModal = document.getElementById("close-modal");
const cancelBtn = document.getElementById("cancel-btn");
const itemForm = document.getElementById("item-form");

const addUserBtn = document.getElementById("add-user-btn");
const userModal = document.getElementById("user-modal");
const closeUserModal = document.getElementById("close-user-modal");
const cancelUserBtn = document.getElementById("cancel-user-btn");
const userForm = document.getElementById("user-form");

const statTotal = document.getElementById("stat-total");
const statActive = document.getElementById("stat-active");
const statInactive = document.getElementById("stat-inactive");
const statUsers = document.getElementById("stat-users");



// ============================================
// ACCIONES EN LISTA (Delegación de eventos)
// ============================================

itemList.addEventListener("click", (e) => {

  const id = e.target.dataset.id;
  if (!id) return;

  const certification = system.findCertification(id);
  if (!certification) return;

  // Botón activar / desactivar
  if (e.target.classList.contains("btn-toggle")) {
    certification.active
      ? certification.deactivate()
      : certification.activate();
  }

  // Botón eliminar
  if (e.target.classList.contains("btn-delete")) {
    if (confirm("¿Eliminar esta certificación?")) {
      system.removeCertification(id);
    }
  }

  renderCertifications();
  renderStats();
});



// ============================================
// FORMULARIO CERTIFICACIONES
// ============================================

itemForm.addEventListener("submit", (e) => {

  e.preventDefault(); // Evita recargar página

  const title = document.getElementById("item-name").value;
  const institution = document.getElementById("item-location").value;
  const expiresAt = document.getElementById("item-expiration").value;

  const certification =
    new Certification(title, institution, expiresAt);

  system.addCertification(certification);

  itemForm.reset();
  itemModal.style.display = "none";

  renderCertifications();
  renderStats();
});



// ============================================
// FORMULARIO CANDIDATOS
// ============================================

userForm.addEventListener("submit", (e) => {

  e.preventDefault();

  const name = document.getElementById("user-name").value;
  const email = document.getElementById("user-email").value;

  const candidate = new Candidate(name, email);
  system.addCandidate(candidate);

  userForm.reset();
  userModal.style.display = "none";

  renderStats();
});



// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener("DOMContentLoaded", () => {

  // Cuando carga la página, mostramos todo
  renderCertifications();
  renderStats();
});
