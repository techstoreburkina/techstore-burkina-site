/*
   ==========================================================================
   VERSION FINALE ROBUSTE (v8) - assets/script.js
   - Grille automatique et alignée (1:1)
   - Vue Détails (Modal) fonctionnelle au clic
   - Synchronisation Supabase en temps réel
   ==========================================================================
*/

// 1. CONFIGURATION SUPABASE
const SUPABASE_URL = "https://iaoftqelvnkrfiwsdtiy.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlhb2Z0cWVsdm5rcmZpd3NkdGl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQyMzgyNTAsImV4cCI6MjA5OTgxNDI1MH0.BZjBJ1XhMact7HB0JIupu9y8VHJZ7Tkj5U_JLmH6wRo";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const CATEGORIES = [
  { key: "laptops",      label: "PC portables gaming",      icon: "💻" },
  { key: "cameras",      label: "Caméras Wi-Fi",             icon: "📷" },
  { key: "peripheriques",label: "Claviers & souris",         icon: "⌨️" },
  { key: "casques",      label: "Casques gaming",            icon: "🎧" },
  { key: "audio",        label: "Enceintes & barres de son", icon: "🔊" },
  { key: "stockage",     label: "Stockage, RAM & boîtiers",  icon: "🗄️" },
  { key: "dongles",      label: "Dongles Wi-Fi / Bluetooth",  icon: "📶" },
  { key: "av",           label: "Adaptateurs audio/vidéo",    icon: "🔌" },
  { key: "dock",         label: "Stations d'accueil",        icon: "🖥️" },
  { key: "refroidissement", label: "Refroidissement PC",     icon: "🌀" },
  { key: "gonflables",   label: "Mobilier gonflable",        icon: "🛋️" },
  { key: "domotique",    label: "Maison connectée",          icon: "🏠" },
];

let PRODUCTS = [];

// Fonction robuste d'extraction d'ID Google Drive
function driveImg(input) {
    if (!input) return null;
    if (input.startsWith('http')) {
        let id = null;
        if (input.includes('/file/d/')) {
            id = input.split('/file/d/')[1].split('/')[0];
        } else if (input.includes('id=')) {
            id = input.split('id=')[1].split('&')[0];
        }
        return id ? `https://lh3.googleusercontent.com/d/${id}` : input;
    }
    return `https://lh3.googleusercontent.com/d/${input}`;
}

function fmtPrice(p){
  return p > 0 ? new Intl.NumberFormat('fr-FR').format(p) + " FCFA" : "Sur devis";
}

function stockLabel(q){
  if (q > 5) return { l: "En stock", c: "in" };
  if (q > 0) return { l: "Stock limité", c: "low" };
  return { l: "Sur commande", c: "out" };
}

function waLink(nom){
  const msg = encodeURIComponent(`Bonjour TechStore, je suis intéressé(e) par : ${nom}. Est-ce disponible ?`);
  return `https://wa.me/22676963696?text=${msg}`;
}

// RÉCUPÉRATION DYNAMIQUE
async function fetchProductsFromSupabase() {
    const grid = document.getElementById("product-grid");
    if(grid) grid.innerHTML = `<div class="no-results">Récupération des stocks en cours...</div>`;

    try {
        const { data, error } = await supabaseClient
            .from('catalogue')
            .select('*')
            .order('nom', { ascending: true });

        if (error) throw error;

        PRODUCTS = data
            .filter(item => item.quantite > 0 || item.afficherSiRupture !== false)
            .map(item => ({
                id: item.id.toString(),
                nom: item.nom,
                cat1: item.site_category || findCategoryKey(item.categorie),
                cat2: item.site_category2 || null,
                specs: item.specs_site || "",
                prix: item.prixVente,
                stockQty: item.quantite,
                port: item.site_tag || "",
                img: driveImg(item.url_visuel)
            }));

        console.log(`${PRODUCTS.length} produits chargés.`);
        initCatalogueLogic();
    } catch (err) {
        console.error("Erreur Supabase:", err);
        if(grid) grid.innerHTML = `<div class="no-results">Serveur injoignable. Vérifiez votre connexion.</div>`;
    }
}

function findCategoryKey(dbLabel) {
    const normalized = dbLabel.toLowerCase();
    const match = CATEGORIES.find(c => c.label.toLowerCase() === normalized || c.key === normalized);
    if (match) return match.key;
    if (normalized.includes("pc") || normalized.includes("laptop")) return "laptops";
    if (normalized.includes("caméra") || normalized.includes("camera")) return "cameras";
    if (normalized.includes("clavier") || normalized.includes("souris")) return "peripheriques";
    if (normalized.includes("casque")) return "casques";
    if (normalized.includes("enceinte") || normalized.includes("son") || normalized.includes("audio")) return "audio";
    if (normalized.includes("ram") || normalized.includes("disque") || normalized.includes("stockage")) return "stockage";
    if (normalized.includes("wifi") || normalized.includes("bluetooth") || normalized.includes("dongle")) return "dongles";
    if (normalized.includes("adaptateur") || normalized.includes("câble")) return "av";
    if (normalized.includes("dock") || normalized.includes("station")) return "dock";
    if (normalized.includes("ventilateur") || normalized.includes("refroidissement")) return "refroidissement";
    if (normalized.includes("gonflable") || normalized.includes("matelas")) return "gonflables";
    if (normalized.includes("maison") || normalized.includes("connecté") || normalized.includes("domotique")) return "domotique";
    return "peripheriques";
}

// RENDU DE LA GRILLE
function renderProductGrid(list){
  const grid = document.getElementById("product-grid");
  const count = document.getElementById("result-count");
  if(!grid) return;
  if(count) count.textContent = `${list.length} article${list.length>1?"s":""}`;

  if(!list.length){
    grid.innerHTML = `<div class="no-results">Aucun article trouvé.<br>Écrivez-nous sur WhatsApp pour une commande spéciale !</div>`;
    return;
  }

  const catIcon = p => (CATEGORIES.find(c=>c.key===p.cat1) || {}).icon || "📦";

  grid.innerHTML = list.map(p => {
    const s = stockLabel(p.stockQty);
    // On force l'appel à showProductDetails sur toute la carte
    return `
    <div class="p-card" onclick="showProductDetails('${p.id}')">
      <div class="p-thumb">
        ${p.img ? `<img src="${p.img}" alt="${p.nom}" loading="lazy">` : `<span style="font-size:40px">${catIcon(p)}</span>`}
      </div>
      ${p.port ? `<span class="p-port">${p.port}</span>` : ''}
      <h3>${p.nom}</h3>
      <div class="p-spec">${p.specs}</div>
      <div class="p-foot">
        <div>
          <div class="p-price">${fmtPrice(p.prix)}</div>
          <div class="p-stock ${s.c}">${s.l}</div>
        </div>
        <button class="btn btn-primary btn-sm">Détails</button>
      </div>
    </div>
  `}).join("");
}

// GESTION DU MODAL (VUE DÉTAILS)
function showProductDetails(id) {
    const p = PRODUCTS.find(prod => prod.id === id);
    if (!p) return;

    // Supprime un éventuel modal déjà existant
    const oldModal = document.getElementById('modal-container');
    if (oldModal) oldModal.remove();

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay active';
    overlay.id = 'modal-container';

    const s = stockLabel(p.stockQty);
    const catIcon = (CATEGORIES.find(c=>c.key===p.cat1) || {}).icon || "📦";

    overlay.innerHTML = `
        <div class="modal-content" onclick="event.stopPropagation()">
            <div class="modal-close" onclick="closeModal()">✕</div>
            <div class="modal-left">
                ${p.img ? `<img src="${p.img}" alt="${p.nom}">` : `<span style="font-size:120px">${catIcon}</span>`}
            </div>
            <div class="modal-right">
                ${p.port ? `<span class="p-port">${p.port}</span>` : ''}
                <h2>${p.nom}</h2>
                <div class="full-specs">${p.specs || "Aucune description technique détaillée disponible pour le moment."}</div>

                <div class="modal-price-row">
                    <div>
                        <div class="p-price" style="font-size:26px">${fmtPrice(p.prix)}</div>
                        <div class="p-stock ${s.c}" style="font-size:14px; margin-top:4px;">${s.l}</div>
                    </div>
                    <a href="${waLink(p.nom)}" target="_blank" class="btn btn-whatsapp" style="padding: 14px 28px;">
                        💬 Commander sur WhatsApp
                    </a>
                </div>
            </div>
        </div>
    `;

    overlay.onclick = closeModal;
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modal-container');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// INITIALISATION
function initCatalogueLogic(){
  const params = new URLSearchParams(window.location.search);
  let activeCat = params.get("cat") || "all";
  let query = "";
  const filterBar = document.getElementById("filters");
  if(!filterBar) return;

  filterBar.innerHTML = [{key:"all", label:"Tout"}, ...CATEGORIES].map(c => `
    <button class="filter-btn ${c.key===activeCat?'active':''}" data-cat="${c.key}">${c.icon ? c.icon+" " : ""}${c.label}</button>
  `).join("");

  function apply(){
    let list = PRODUCTS;
    if (activeCat !== "all") {
        list = list.filter(p => p.cat1 === activeCat || p.cat2 === activeCat);
    }
    if(query.trim()){
      const q = query.toLowerCase();
      list = list.filter(p => p.nom.toLowerCase().includes(q) || p.specs.toLowerCase().includes(q));
    }
    renderProductGrid(list);
  }

  filterBar.addEventListener("click", e => {
    const btn = e.target.closest(".filter-btn");
    if(!btn) return;
    activeCat = btn.dataset.cat;
    filterBar.querySelectorAll(".filter-btn").forEach(b=>b.classList.toggle("active", b===btn));
    apply();
  });

  const search = document.getElementById("search-input");
  if(search) search.addEventListener("input", e => { query = e.target.value; apply(); });

  apply();
}

document.addEventListener("DOMContentLoaded", () => {
  fetchProductsFromSupabase();
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("main-nav");
  if(toggle && nav) toggle.addEventListener("click", () => nav.classList.toggle("open"));

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
});
