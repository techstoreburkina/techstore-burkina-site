/*
   ==========================================================================
   VERSION AVEC TÉLÉCHARGEMENT DIRECT (v12) - assets/script.js
   - Grille 1:1 et Vue Détails (Modal)
   - Synchronisation Supabase en temps réel
   - Téléchargement APK DIRECT (bypass l'interface Drive)
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

// Extrait l'ID Google Drive pour les images
function driveImg(input) {
    if (!input) return null;
    if (input.startsWith('http')) {
        let id = null;
        if (input.includes('/file/d/')) id = input.split('/file/d/')[1].split('/')[0];
        else if (input.includes('id=')) id = input.split('id=')[1].split('&')[0];
        return id ? `https://lh3.googleusercontent.com/d/${id}` : input;
    }
    return `https://lh3.googleusercontent.com/d/${input}`;
}

// Extrait l'ID Google Drive pour le TÉLÉCHARGEMENT DIRECT
function getDirectDownloadLink(input) {
    if (!input) return "#";
    let id = input;
    if (input.startsWith('http')) {
        if (input.includes('/file/d/')) id = input.split('/file/d/')[1].split('/')[0];
        else if (input.includes('id=')) id = input.split('id=')[1].split('&')[0];
    }
    return `https://drive.google.com/uc?export=download&id=${id}`;
}

const fmtPrice = (p) => p > 0 ? new Intl.NumberFormat('fr-FR').format(p) + " F CFA" : "Sur devis";
const stockLabel = (q) => q > 5 ? {l:"En stock",c:"in"} : (q > 0 ? {l:"Stock limité",c:"low"} : {l:"Stock épuisé",c:"out"});
const waLink = (nom) => `https://wa.me/22676963696?text=${encodeURIComponent("Bonjour TechStore, je suis intéressé par l'article : " + nom)}`;

// 2. RÉCUPÉRATION DES PRODUITS
async function fetchProducts() {
    try {
        const { data, error } = await supabaseClient.from('catalogue').select('*').order('nom', { ascending: true });
        if (error) throw error;
        PRODUCTS = data.filter(item => item.quantite > 0 || item.afficherSiRupture !== false).map(item => ({
            id: item.id.toString(), nom: item.nom,
            cat1: item.site_category || findCategoryKey(item.categorie),
            cat2: item.site_category2 || null, specs: item.specs_site || "",
            prix: item.prixVente, stockQty: item.quantite, port: item.site_tag || "", img: driveImg(item.url_visuel)
        }));
        if (document.getElementById("product-grid")) initCatalogueLogic();
        if (document.getElementById("cat-strip")) renderCategoryStrip("cat-strip");
    } catch (err) { console.error(err); }
}

// 3. MISE À JOUR APK DYNAMIQUE (DIRECTE)
async function fetchUpdateInfo() {
    try {
        const { data, error } = await supabaseClient.from('controle_version').select('*').eq('app_id', 'client').single();
        if (error || !data) return;

        const btnDl = document.getElementById('btn-download-apk');
        if (btnDl && data.download_url) {
            // TRANSFORMATION EN LIEN DIRECT
            btnDl.href = getDirectDownloadLink(data.download_url);

            if (data.updated_at_long > 0) {
                const date = new Date(data.updated_at_long * 1000);
                const dateStr = `${date.getDate().toString().padStart(2,'0')}-${(date.getMonth()+1).toString().padStart(2,'0')}-${date.getFullYear()}`;
                btnDl.innerHTML = `⬇️ Télécharger l'App (Mise à jour le ${dateStr})`;
            } else {
                btnDl.innerHTML = `⬇️ Télécharger l'Application`;
            }
        }
    } catch (err) { console.error(err); }
}

// --- LOGIQUE RENDU ---

function renderCategoryStrip(targetId){
  const el = document.getElementById(targetId);
  if(!el) return;
  el.innerHTML = CATEGORIES.map(c => {
    const count = PRODUCTS.filter(p => p.cat1 === c.key || p.cat2 === c.key).length;
    return `
    <a class="cat-card" href="catalogue.html?cat=${c.key}">
      <div class="ic">${c.icon}</div>
      <h3>${c.label}</h3>
      <p>${count} référence(s)</p>
    </a>
  `}).join("");
}

function renderProductGrid(list){
  const grid = document.getElementById("product-grid");
  const count = document.getElementById("result-count");
  if(!grid) return;
  if(count) count.textContent = `${list.length} article${list.length>1?"s":""}`;
  const catIcon = p => (CATEGORIES.find(c=>c.key===p.cat1) || {}).icon || "📦";
  grid.innerHTML = list.map(p => {
    const s = stockLabel(p.stockQty);
    return `
    <div class="p-card" onclick="showProductDetails('${p.id}')">
      <div class="p-thumb">${p.img ? `<img src="${p.img}" alt="${p.nom}" loading="lazy">` : `<span style="font-size:40px">${catIcon(p)}</span>`}</div>
      ${p.port ? `<span class="p-port">${p.port}</span>` : ''}
      <h3>${p.nom}</h3>
      <div class="p-spec">${p.specs}</div>
      <div class="p-foot">
        <div><div class="p-price">${fmtPrice(p.prix)}</div><div class="p-stock ${s.c}">${s.l}</div></div>
        <button class="btn btn-primary btn-sm">Détails</button>
      </div>
    </div>
  `}).join("");
}

function showProductDetails(id) {
    const p = PRODUCTS.find(prod => prod.id === id); if (!p) return;
    const oldModal = document.getElementById('modal-container'); if (oldModal) oldModal.remove();
    const overlay = document.createElement('div'); overlay.className = 'modal-overlay active'; overlay.id = 'modal-container';
    const s = stockLabel(p.stockQty); const catIcon = (CATEGORIES.find(c=>c.key===p.cat1) || {}).icon || "📦";
    overlay.innerHTML = `<div class="modal-content" onclick="event.stopPropagation()"><div class="modal-close" onclick="closeModal()">✕</div><div class="modal-left">${p.img ? `<img src="${p.img}" alt="${p.nom}">` : `<span style="font-size:120px">${catIcon}</span>`}</div><div class="modal-right">${p.port ? `<span class="p-port">${p.port}</span>` : ''}<h2>${p.nom}</h2><div class="full-specs">${p.specs || "Détails à venir."}</div><div class="modal-price-row"><div><div class="p-price" style="font-size:26px">${fmtPrice(p.prix)}</div><div class="p-stock ${s.c}" style="font-size:14px; margin-top:4px;">${s.l}</div></div><a href="${waLink(p.nom)}" target="_blank" class="btn btn-whatsapp" style="padding: 14px 28px;">💬 WhatsApp</a></div></div></div>`;
    overlay.onclick = closeModal; document.body.appendChild(overlay); document.body.style.overflow = 'hidden';
}
function closeModal() { const modal = document.getElementById('modal-container'); if (modal) { modal.remove(); document.body.style.overflow = ''; } }

function initCatalogueLogic(){
  const params = new URLSearchParams(window.location.search);
  let activeCat = params.get("cat") || "all";
  let query = "";
  const filterBar = document.getElementById("filters");
  if(filterBar) {
    filterBar.innerHTML = [{key:"all", label:"Tout"}, ...CATEGORIES].map(c => `<button class="filter-btn ${c.key===activeCat?'active':''}" data-cat="${c.key}">${c.icon ? c.icon+" " : ""}${c.label}</button>`).join("");
    filterBar.addEventListener("click", e => { const btn = e.target.closest(".filter-btn"); if(!btn) return; activeCat = btn.dataset.cat; filterBar.querySelectorAll(".filter-btn").forEach(b=>b.classList.toggle("active", b===btn)); apply(); });
  }
  const search = document.getElementById("search-input");
  if(search) search.addEventListener("input", e => { query = e.target.value; apply(); });
  function apply(){
    let list = PRODUCTS;
    if (activeCat !== "all") list = list.filter(p => p.cat1 === activeCat || p.cat2 === activeCat);
    if(query.trim()){ const q = query.toLowerCase(); list = list.filter(p => p.nom.toLowerCase().includes(q) || p.specs.toLowerCase().includes(q)); }
    renderProductGrid(list);
  }
  apply();
}

function findCategoryKey(dbLabel) {
    const normalized = dbLabel.toLowerCase();
    const match = CATEGORIES.find(c => c.label.toLowerCase() === normalized || c.key === normalized);
    if (match) return match.key;
    if (normalized.includes("pc") || normalized.includes("laptop")) return "laptops";
    if (normalized.includes("caméra") || normalized.includes("camera")) return "cameras";
    if (normalized.includes("clavier") || normalized.includes("souris")) return "peripheriques";
    if (normalized.includes("casque")) return "casques";
    if (normalized.includes("son")) return "audio";
    if (normalized.includes("ram") || normalized.includes("disque")) return "stockage";
    if (normalized.includes("wifi") || normalized.includes("dongle")) return "dongles";
    if (normalized.includes("adaptateur")) return "av";
    if (normalized.includes("dock")) return "dock";
    if (normalized.includes("refroidissement")) return "refroidissement";
    if (normalized.includes("gonflable")) return "gonflables";
    if (normalized.includes("maison")) return "domotique";
    return "peripheriques";
}

document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
  fetchUpdateInfo();
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("main-nav");
  if(toggle && nav) toggle.addEventListener("click", () => nav.classList.toggle("open"));
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
});
