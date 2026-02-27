// ============================================
// SISTEMA DE CERTIFICACIONES PROFESIONAL
//DAVID SAMUEL PEREZ
//3407186
//ERICK GRANADOS
// ============================================
//============================================
//CLASE CERTIFICATION
//============================================
class Certification {
  #id;
  #title;
  #institution;
  #issuedAt;
  #expiresAt;
  #active;

  constructor(title, institution, expiresAt) {
    this.#id = crypto.randomUUID();
    this.#title = title;
    this.#institution = institution;
    this.#issuedAt = new Date().toISOString();
    this.#expiresAt = expiresAt;
    this.#active = true;
  }

  get id() {
    return this.#id;
  }

  get active() {
    return this.#active;
  }

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

  deactivate() {
    this.#active = false;
  }

  activate() {
    this.#active = true;
  }

  checkExpiration() {
    if (new Date(this.#expiresAt) < new Date()) {
      this.#active = false;
    }
  }
}
//============================================
//CLASE CANDIDATE
//============================================
class Candidate {
  #id;
  #name;
  #email;
  #registeredAt;

  constructor(name, email) {
    this.#id = crypto.randomUUID();
    this.#name = name;
    this.#email = email;
    this.#registeredAt = new Date().toISOString();
  }

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
//============================================
//CLASE PRINCIPAL
//============================================
class CertificationSystem {
  #certifications = [];
  #candidates = [];

  addCertification(cert) {
    this.#certifications.push(cert);
  }

  removeCertification(id) {
    this.#certifications = this.#certifications.filter(c => c.id !== id);
  }

  findCertification(id) {
    return this.#certifications.find(c => c.id === id);
  }

  getAllCertifications() {
    return [...this.#certifications];
  }

  addCandidate(candidate) {
    this.#candidates.push(candidate);
  }

  getAllCandidates() {
    return [...this.#candidates];
  }

  getStats() {
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
const system = new CertificationSystem();
//============================================
//Renders
//============================================
function renderCertifications() {
  const certifications = system.getAllCertifications();

  if (certifications.length === 0) {
    itemList.innerHTML = "<p>No hay certificaciones registradas</p>";
    return;
  }

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
function renderStats() {
  const stats = system.getStats();

  statTotal.textContent = stats.total;
  statActive.textContent = stats.active;
  statInactive.textContent = stats.expired;
  statUsers.textContent = stats.candidates;
}
const title = document.getElementById("item-name").value;
const institution = document.getElementById("item-location").value;
const expiresAt = document.getElementById("item-expiration").value;

const cert = new Certification(title, institution, expiresAt);
system.addCertification(cert);
// ============================================
// REFERENCIAS DOM
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
// SISTEMA DE TABS
// ============================================

const tabs = document.querySelectorAll(".tab-btn");
const sections = document.querySelectorAll(".tab-section");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;

    // quitar activo a todos
    tabs.forEach(t => t.classList.remove("active"));
    sections.forEach(s => s.classList.remove("active"));

    // activar el seleccionado
    tab.classList.add("active");
    document.getElementById(target).classList.add("active");
  });
});
// ============================================
// ACCIONES CERTIFICACIONES
// ============================================

itemList.addEventListener("click", (e) => {
  const id = e.target.dataset.id;
  if (!id) return;

  const certification = system.findCertification(id);
  if (!certification) return;

  if (e.target.classList.contains("btn-toggle")) {
    certification.active
      ? certification.deactivate()
      : certification.activate();
  }

  if (e.target.classList.contains("btn-delete")) {
    if (confirm("¿Eliminar esta certificación?")) {
      system.removeCertification(id);
    }
  }

  renderCertifications();
  renderStats();
});
// ============================================
// MODAL CERTIFICACIONES
// ============================================

itemForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("item-name").value;
  const institution = document.getElementById("item-location").value;
  const expiresAt = document.getElementById("item-expiration").value;

  const certification = new Certification(
    title,
    institution,
    expiresAt
  );

  system.addCertification(certification);

  itemForm.reset();
  itemModal.style.display = "none";

  renderCertifications();
  renderStats();
});
addItemBtn.addEventListener("click", () => {
  itemModal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
  itemModal.style.display = "none";
});

cancelBtn.addEventListener("click", () => {
  itemModal.style.display = "none";
});

itemForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const certification = new Certification(
    title,
    institution,
    expiresAt
  );

  system.addCertification(certification);

  itemForm.reset();
  itemModal.style.display = "none";

  renderCertifications();
  renderStats();
});
// ============================================
// MODAL CANDIDATOS
// ============================================

addUserBtn.addEventListener("click", () => {
  userModal.style.display = "flex";
});

closeUserModal.addEventListener("click", () => {
  userModal.style.display = "none";
});

cancelUserBtn.addEventListener("click", () => {
  userModal.style.display = "none";
});

userForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("user-name").value;
  const email = document.getElementById("user-email").value;

  const candidate = new Candidate(name, email);
  system.addCandidate(candidate);

  userForm.reset();
  userModal.style.display = "none";

  renderUsers();
  renderStats();
});
// ============================================
// INIT
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  renderCertifications();
  renderUsers();
  renderStats();
});