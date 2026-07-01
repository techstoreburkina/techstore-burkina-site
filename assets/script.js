/* ==========================================================================
   TechStore Burkina — catalogue.js
   Liste de produits éditable : ajoute / modifie / supprime des entrées ici.
   Chaque produit : id, nom, categorie, specs, prix (FCFA, 0 = "sur devis"),
   stock: "in" | "low" | "out", emoji (icône rapide en attendant les photos).
   ========================================================================== */

const CATEGORIES = [
  { key: "laptops",  label: "PC portables gaming", icon: "💻" },
  { key: "cameras",  label: "Caméras Wi-Fi",        icon: "📷" },
  { key: "peripheriques", label: "Claviers & souris", icon: "⌨️" },
  { key: "stockage", label: "Boîtiers & adaptateurs disque", icon: "🗄️" },
  { key: "dongles",  label: "Dongles Wi-Fi / Bluetooth", icon: "📶" },
  { key: "av",       label: "Adaptateurs audio/vidéo", icon: "🔌" },
  { key: "domotique",label: "Maison connectée",     icon: "🏠" },
  { key: "dock",     label: "Stations d'accueil",   icon: "🖥️" },
];

const PRODUCTS = [
  { id:"acer-nitro-5", nom:"Acer Nitro 5", categorie:"laptops", specs:"Intel Core i5 · RTX · 16 Go RAM · 512 Go SSD", prix:0, stock:"in", port:"GAMING" },
  { id:"asus-tuf", nom:"Asus TUF Gaming", categorie:"laptops", specs:"AMD Ryzen 5 · GTX/RTX · 16 Go RAM", prix:0, stock:"in", port:"GAMING" },
  { id:"msi-gaming", nom:"MSI Gaming", categorie:"laptops", specs:"Intel Core i7 · RTX · châssis renforcé", prix:0, stock:"low", port:"GAMING" },
  { id:"hp-omen", nom:"HP Omen", categorie:"laptops", specs:"Intel/AMD · GPU dédié · clavier RGB", prix:0, stock:"in", port:"GAMING" },
  { id:"dell", nom:"Dell (gamme pro/gaming)", categorie:"laptops", specs:"Configurations bureautique et gaming", prix:0, stock:"in", port:"POLYVALENT" },
  { id:"lenovo", nom:"Lenovo (gamme pro/gaming)", categorie:"laptops", specs:"Configurations bureautique et gaming", prix:0, stock:"in", port:"POLYVALENT" },

  { id:"cam-wifi-interieur", nom:"Caméra Wi-Fi intérieure", categorie:"cameras", specs:"Vision nocturne · détection de mouvement · app mobile", prix:0, stock:"in", port:"2.4GHZ" },
  { id:"cam-wifi-exterieur", nom:"Caméra Wi-Fi extérieure", categorie:"cameras", specs:"Étanche · vision nocturne · app mobile", prix:0, stock:"in", port:"2.4GHZ" },

  { id:"clavier-usb", nom:"Clavier filaire USB", categorie:"peripheriques", specs:"AZERTY/QWERTY · anti-éclaboussures", prix:0, stock:"in", port:"USB" },
  { id:"clavier-sans-fil", nom:"Clavier sans fil", categorie:"peripheriques", specs:"Récepteur USB · autonomie longue durée", prix:0, stock:"in", port:"2.4GHZ" },
  { id:"souris-usb", nom:"Souris filaire USB", categorie:"peripheriques", specs:"Précision optique · usage bureautique", prix:0, stock:"in", port:"USB" },
  { id:"souris-sans-fil", nom:"Souris sans fil", categorie:"peripheriques", specs:"Récepteur USB · ergonomique", prix:0, stock:"in", port:"2.4GHZ" },

  { id:"boitier-disque-25", nom:"Boîtier disque dur 2.5\"", categorie:"stockage", specs:"SATA vers USB 3.0 · pour SSD/HDD portable", prix:0, stock:"in", port:"USB 3.0" },
  { id:"boitier-disque-35", nom:"Boîtier disque dur 3.5\"", categorie:"stockage", specs:"SATA vers USB 3.0 · alimentation secteur", prix:0, stock:"in", port:"USB 3.0" },
  { id:"adapt-sata-usb", nom:"Adaptateur SATA vers USB", categorie:"stockage", specs:"Pour disques nus 2.5\"/3.5\"", prix:0, stock:"in", port:"USB" },

  { id:"dongle-wifi-usb", nom:"Dongle Wi-Fi USB", categorie:"dongles", specs:"USB vers Wi-Fi · voir guide de compatibilité", prix:0, stock:"in", port:"2.4GHZ" },
  { id:"dongle-bluetooth", nom:"Dongle Bluetooth USB", categorie:"dongles", specs:"Ajoute le Bluetooth à un PC fixe", prix:0, stock:"in", port:"BT" },

  { id:"adapt-hdmi-vga", nom:"Adaptateur HDMI ↔ VGA", categorie:"av", specs:"Pour projecteurs et anciens écrans", prix:0, stock:"in", port:"HDMI/VGA" },
  { id:"cable-hdmi", nom:"Câble HDMI", categorie:"av", specs:"1080p/4K · différentes longueurs", prix:0, stock:"in", port:"HDMI" },
  { id:"adapt-usbc-hdmi", nom:"Adaptateur USB-C vers HDMI", categorie:"av", specs:"Pour laptops et téléphones USB-C", prix:0, stock:"in", port:"USB-C" },

  { id:"prise-connectee", nom:"Prise connectée Wi-Fi", categorie:"domotique", specs:"Contrôle via app · compatible assistants vocaux", prix:0, stock:"in", port:"2.4GHZ" },

  { id:"station-accueil", nom:"Station d'accueil USB-C", categorie:"dock", specs:"HDMI + USB + lecteur de cartes", prix:0, stock:"in", port:"USB-C" },
];

/* ---------------- Rendu ---------------- */

function fmtPrice(p){
  return p > 0 ? p.toLocaleString("fr-FR") + " FCFA" : "Sur devis";
}
function stockLabel(s){
  return { in:"En stock", low:"Stock limité", out:"Sur commande" }[s] || "Sur commande";
}
function waLink(nom){
  const msg = encodeURIComponent(`Bonjour TechStore, je suis intéressé(e) par : ${nom}. Est-ce disponible ?`);
  return `https://wa.me/22676963696?text=${msg}`;
}

function renderCategoryStrip(targetId){
  const el = document.getElementById(targetId);
  if(!el) return;
  el.innerHTML = CATEGORIES.map(c => `
    <a class="cat-card" href="catalogue.html?cat=${c.key}">
      <div class="ic">${c.icon}</div>
      <h3>${c.label}</h3>
      <p>${PRODUCTS.filter(p=>p.categorie===c.key).length} référence(s)</p>
    </a>
  `).join("");
}

function renderProductGrid(list){
  const grid = document.getElementById("product-grid");
  const count = document.getElementById("result-count");
  if(count) count.textContent = `${list.length} produit${list.length>1?"s":""}`;
  if(!list.length){
    grid.innerHTML = `<div class="no-results">Aucun produit ne correspond à ta recherche.<br>Écris-nous sur WhatsApp, on te dira si on peut le trouver.</div>`;
    return;
  }
  const catIcon = key => (CATEGORIES.find(c=>c.key===key) || {}).icon || "🔧";
  grid.innerHTML = list.map(p => `
    <div class="p-card">
      <div class="p-thumb">${catIcon(p.categorie)}</div>
      <span class="p-port">${p.port}</span>
      <h3>${p.nom}</h3>
      <p class="p-spec">${p.specs}</p>
      <div class="p-foot">
        <div>
          <div class="p-price">${fmtPrice(p.prix)}</div>
          <div class="p-stock ${p.stock}">${stockLabel(p.stock)}</div>
        </div>
        <a class="btn btn-whatsapp btn-sm" href="${waLink(p.nom)}" target="_blank" rel="noopener">Commander</a>
      </div>
    </div>
  `).join("");
}

function initCatalogue(){
  const grid = document.getElementById("product-grid");
  if(!grid) return;

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
  renderCategoryStrip("cat-strip");
  initCatalogue();

  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("main-nav");
  if(toggle && nav){
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
  }
});
