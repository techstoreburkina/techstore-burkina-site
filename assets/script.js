/*
   ==========================================================================
   VERSION FINALE (v3) - assets/script.js
   Synchronisation dynamique avec Supabase (Catalogue en temps réel)
   ==========================================================================
*/

// 1. CONFIGURATION SUPABASE (Vérifiez bien ces clés)
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
        // Extraction de l'ID à partir d'un lien complet
        let id = null;
        if (input.includes('/file/d/')) {
            id = input.split('/file/d/')[1].split('/')[0];
        } else if (input.includes('id=')) {
            id = input.split('id=')[1].split('&')[0];
        }
        return id ? `https://lh3.googleusercontent.com/d/${id}` : input;
    }
    // Si c'est juste l'ID
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

// RÉCUPÉRATION DYNAMIQUE DEPUIS SUPABASE
async function fetchProductsFromSupabase() {
    const grid = document.getElementById("product-grid");
    if(grid) grid.innerHTML = `<div class="no-results">Chargement des articles...</div>`;

    try {
        const { data, error } = await supabaseClient
            .from('catalogue')
            .select('*')
            .order('nom', { ascending: true });

        if (error) throw error;

        // Transformation et filtrage (Masquer rupture si option décochée)
        PRODUCTS = data
            .filter(item => item.quantite > 0 || item.afficherSiRupture !== false)
            .map(item => ({
                id: item.id.toString(),
                nom: item.nom,
                // On essaie de faire matcher le nom de la catégorie (ex: "PC portables gaming") avec sa clé ("laptops")
                categorie: findCategoryKey(item.categorie),
                specs: item.commentaire || "",
                prix: item.prixVente,
                stockQty: item.quantite,
                port: item.site_tag || "",
                img: driveImg(item.url_visuel)
            }));

        initCatalogueLogic();
    } catch (err) {
        console.error("Erreur Supabase:", err);
        if(grid) grid.innerHTML = `<div class="no-results">Erreur de connexion. Veuillez rafraîchir la page.</div>`;
    }
}

// Trouve la clé (laptops, audio, etc) à partir du nom saisi dans l'app
function findCategoryKey(dbLabel) {
    const normalized = dbLabel.toLowerCase();
    // 1. Recherche par label exact
    const match = CATEGORIES.find(c => c.label.toLowerCase() === normalized);
    if (match) return match.key;

    // 2. Recherche par mot-clé (ex: si l'app contient "PC", on met dans "laptops")
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

    return "peripheriques"; // Par défaut
}

function renderProductGrid(list){
  const grid = document.getElementById("product-grid");
  const count = document.getElementById("result-count");
  if(!grid) return;

  if(count) count.textContent = `${list.length} article${list.length>1?"s":""}`;

  if(!list.length){
    grid.innerHTML = `<div class="no-results">Aucun article ne correspond à votre recherche.<br>Contactez-nous sur WhatsApp pour une commande spéciale.</div>`;
    return;
  }

  const catIcon = key => (CATEGORIES.find(c=>c.key===key) || {}).icon || "📦";

  grid.innerHTML = list.map(p => {
    const s = stockLabel(p.stockQty);
    return `
    <div class="p-card">
      <div class="p-thumb">${
        p.img
          ? `<img src="${p.img}" alt="${p.nom}" loading="lazy" onerror="this.parentElement.innerHTML='${catIcon(p.categorie)}';">`
          : `<span>${catIcon(p.categorie)}</span>`
      }</div>
      ${p.port ? `<span class="p-port">${p.port}</span>` : ''}
      <h3>${p.nom}</h3>
      <p class="p-spec">${p.specs}</p>
      <div class="p-foot">
        <div>
          <div class="p-price">${fmtPrice(p.prix)}</div>
          <div class="p-stock ${s.c}">${s.l}</div>
        </div>
        <a class="btn btn-whatsapp btn-sm" href="${waLink(p.nom)}" target="_blank" rel="noopener">Commander</a>
      </div>
    </div>
  `}).join("");
}

function initCatalogueLogic(){
  const params = new URLSearchParams(window.location.search);
  let activeCat = params.get("cat") || "all";
  let query = "";

  const filterBar = document.getElementById("filters");
  filterBar.innerHTML = [{key:"all", label:"Tout"}, ...CATEGORIES].map(c => `
    <button class="filter-btn ${c.key===activeCat?'active':''}" data-cat="${c.key}">${c.icon ? c.icon+" " : ""}${c.label}</button>
  `).join("");

  function apply(){
    let list = activeCat === "all" ? PRODUCTS : PRODUCTS.filter(p=>p.categorie===activeCat);
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
  if(search){
    search.addEventListener("input", e => { query = e.target.value; apply(); });
  }

  apply();
}

document.addEventListener("DOMContentLoaded", () => {
  fetchProductsFromSupabase();

  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("main-nav");
  if(toggle && nav){
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
  }
});
