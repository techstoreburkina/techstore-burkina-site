/* ==========================================================================
   TechStore Burkina — catalogue.js
   Liste de produits éditable : ajoute / modifie / supprime des entrées ici.
   Chaque produit : id, nom, categorie, specs, prix (FCFA, 0 = "sur devis"),
   stock: "in" | "low" | "out", img (photo réelle) ou emoji (icône de secours).
   ========================================================================== */

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
  { key: "domotique",    label: "Maison connectée",          icon: "🏠" },
];

// Image Drive : gabarit d'URL utilisant l'ID du fichier partagé.
function driveImg(id){ return `https://drive.google.com/thumbnail?id=${id}&sz=w600`; }

const PRODUCTS = [
  // ---------- PC portables gaming ----------
  { id:"hp-omen-16", nom:"HP Omen 16", categorie:"laptops", specs:"Intel Core i9-12900H · RTX 3060 6 Go · 16 Go RAM · 512 Go SSD · 15.6\" 240Hz", prix:680000, stock:"in", port:"GAMING", img:driveImg("1i9Sj-Sz1TyFVExkTtQ3SBVM5jjtzes3v") },
  { id:"hp-omen-15", nom:"HP Omen 15", categorie:"laptops", specs:"AMD Ryzen 7 · RTX 2060 6 Go · 16 Go RAM · 15.6\" 144Hz", prix:450000, stock:"in", port:"GAMING", img:driveImg("1Bw1YaIg9vYmeeG6ti6zue5X4RY-dWaul") },
  { id:"hp-pavillon-gaming-15", nom:"HP Pavillon Gaming 15", categorie:"laptops", specs:"Intel Core i7-8750H · GTX 1060 6 Go · 16 Go RAM · 512 Go SSD", prix:335000, stock:"in", port:"GAMING", img:driveImg("1F5etDZoBDR_lKHLnkcSuzs6Mppec0GWS") },
  { id:"dell-g3-3579", nom:"Dell G3 3579", categorie:"laptops", specs:"Intel Core i7-8750H · GTX 1060 Max-Q 6 Go · 16 Go RAM · 512 Go SSD NVMe", prix:320000, stock:"in", port:"GAMING", img:driveImg("1Uy4WqyqAXp2Rd6Qtr0s_c5tWrgYZk80m") },
  { id:"dell-g7-7588", nom:"Dell G7 7588", categorie:"laptops", specs:"Intel Core i5-8300H · GTX 1050 Ti 4 Go · 16 Go RAM · 512 Go SSD", prix:250000, stock:"in", port:"GAMING", img:driveImg("1m4dS3N7_Kr07TWgDpDqYtV7D1xi0MV28") },
  { id:"dell-15-g5-5500", nom:"Dell 15 G5-5500", categorie:"laptops", specs:"Intel Core i7 10e gen · RTX 2060 6 Go · 16 Go RAM · 512 Go SSD NVMe · 144Hz", prix:440000, stock:"in", port:"GAMING", img:driveImg("1-dzbYrcN06TYmwHGNQFcxDi3y6ZDDivs") },
  { id:"lenovo-legion-y7000p", nom:"Lenovo Legion Y7000P", categorie:"laptops", specs:"Intel Core i5-8300H · GTX 1060 6 Go · 16 Go RAM · 512 Go SSD", prix:285000, stock:"in", port:"GAMING", img:driveImg("1erbfkynFNQ6auOPoFeWYYSVH4LNvkKoy") },
  { id:"xiaomi-mi-gtx1060", nom:"Xiaomi Mi Gaming Laptop (GTX 1060)", categorie:"laptops", specs:"Intel Core i7-8750H · GTX 1060 6 Go · 16 Go RAM · 512 Go SSD", prix:300000, stock:"in", port:"GAMING", img:driveImg("1vCbMNVNdK-imTGRiE8tD9DhKRFDoS_GN") },
  { id:"xiaomi-mi-rtx2060", nom:"Xiaomi Mi Gaming Laptop (RTX 2060)", categorie:"laptops", specs:"Intel Core i7-9750H · RTX 2060 6 Go · 16 Go RAM · 512 Go SSD", prix:375000, stock:"in", port:"GAMING", img:driveImg("1WGvh_lFLWT7RPQsN9ebDSdVGFjZ704v5") },
  { id:"msi-leopard-gl65", nom:"MSI Leopard GL65", categorie:"laptops", specs:"Intel Core i7-10750H · RTX 2070 8 Go · 16 Go RAM · 512 Go SSD", prix:470000, stock:"in", port:"GAMING", img:driveImg("179N7WC2-wnPL86LKDgI5gzIzTBUqb5ty") },
  { id:"msi-vector-gp76hx", nom:"MSI Vector GP76HX", categorie:"laptops", specs:"Intel Core i7-12800HX · RTX 3080 Ti 16 Go · 16 Go RAM DDR5 · 1 To SSD · 17.3\" QHD", prix:799000, stock:"in", port:"GAMING", img:driveImg("1CdTUu6as5vMiWxtjKC-gJqWO2W-WITX6") },
  { id:"asus-tuf-a15-r7", nom:"Asus TUF Gaming A15 (Ryzen 7)", categorie:"laptops", specs:"AMD Ryzen 7 · RTX 2060 6 Go · 16 Go RAM · 512 Go SSD", prix:430000, stock:"in", port:"GAMING", img:driveImg("1u5JMgZYIvLEypvfHrSmhHgh1F5s8OKHY") },
  { id:"asus-tuf-a15-r9", nom:"Asus TUF Gaming A15 (Ryzen 9)", categorie:"laptops", specs:"AMD Ryzen 9 · RTX 2060 6 Go · 16 Go RAM · 512 Go SSD", prix:450000, stock:"in", port:"GAMING", img:driveImg("1__iSiwRa3p3XU1Swgp0qfDTUsytKrlae") },
  { id:"acer-nitro5-an515-58", nom:"Acer Nitro 5 (AN515-58)", categorie:"laptops", specs:"Intel Core i9-12900H · RTX 3060 6 Go · 16 Go RAM DDR5 · 512 Go SSD · 144Hz", prix:525000, stock:"in", port:"GAMING", img:driveImg("1Wv97RdlcbOEF8GkF4wS4CJOJOUSNYrMS") },
  { id:"acer-nitro5-an515-45", nom:"Acer Nitro 5 (AN515-45)", categorie:"laptops", specs:"AMD Ryzen 7 5800H · RTX 3060 6 Go · 16 Go RAM · 512 Go SSD · 144Hz", prix:470000, stock:"in", port:"GAMING", img:driveImg("1XDKYH0ObnDukLdBGSg6XVMlNoiHXg8_s") },

  // ---------- Caméras Wi-Fi ----------
  { id:"cam-wifi-interieur", nom:"Caméra Wi-Fi Smart Indoor 360°", categorie:"cameras", specs:"Rotative · détection et suivi de mouvement · vision nocturne · carte SD", prix:25000, stock:"in", port:"2.4GHZ", img:driveImg("13mprrEjGFwdxL0tuVdsm7o_E7R9H6BHB") },
  { id:"cam-wifi-exterieur-360", nom:"Caméra Wi-Fi Smart Outdoor 360°", categorie:"cameras", specs:"Étanche IP66 · rotative · vision nocturne couleur · double sens audio", prix:35000, stock:"in", port:"2.4GHZ", img:driveImg("1koZ16uL0cTi4H00UcseqK20uV2GcRcmS") },
  { id:"cam-wifi-exterieur", nom:"Caméra Wi-Fi Smart Outdoor/Indoor", categorie:"cameras", specs:"Étanche IP66 · vision nocturne couleur · alarme et notifications", prix:18000, stock:"in", port:"2.4GHZ", img:driveImg("1AkPuAALs4hzGDzk8E73XpLCuIIXyoMfJ") },

  // ---------- Claviers & souris ----------
  { id:"kit-clavier-pliable", nom:"Clavier pliable + Souris sans fil", categorie:"peripheriques", specs:"Batterie lithium rechargeable · connectivité 2.4G et Bluetooth 5.3", prix:15000, stock:"in", port:"2.4GHZ/BT", img:driveImg("1X9ApQc6RyB5dnvfsjCU-ti_36gGupMLY") },
  { id:"kit-hp-cs500", nom:"Kit HP CS500 (sans fil)", categorie:"peripheriques", specs:"Clavier + souris sans fil, récepteur USB unique", prix:11000, stock:"in", port:"2.4GHZ", img:driveImg("1W-7x2tTh5svatUYOU0gAz_URPZ0aYPWM") },
  { id:"kit-lenovo-cm102", nom:"Kit Lenovo Lecoo CM102 (filaire)", categorie:"peripheriques", specs:"Clavier + souris filaires USB", prix:7000, stock:"in", port:"USB", img:driveImg("1FuUhJ24eCa2NFVk8BmK3mZys6dGIt20P") },
  { id:"kit-lenovo-kw211", nom:"Kit Lenovo Lecoo KW211 (sans fil)", categorie:"peripheriques", specs:"Clavier + souris sans fil, récepteur USB unique", prix:9500, stock:"in", port:"2.4GHZ", img:driveImg("1Xb2PAMwzYcZMH9_PxphNijtX5U3oIGyh") },
  { id:"kit-philips-c602", nom:"Kit Philips C602 (sans fil)", categorie:"peripheriques", specs:"Clavier + souris sans fil, design fin", prix:9500, stock:"in", port:"2.4GHZ", img:driveImg("1OtMlfVeJuzSCze9wRSnvXajeMbTY6Z4I") },
  { id:"kit-gaming-ksnake-km520", nom:"Kit Gaming K-Snake KM520", categorie:"peripheriques", specs:"Clavier mécanique filaire + souris · rétroéclairage RGB", prix:12000, stock:"in", port:"USB", img:driveImg("1weoknYVt9UN224DkpnQKwnhqfn4unMfk") },
  { id:"kit-gaming-twolf-tf230", nom:"Kit Gaming T-Wolf TF230", categorie:"peripheriques", specs:"Clavier mécanique filaire + souris · rétroéclairage RGB", prix:10000, stock:"in", port:"USB", img:driveImg("1yq9wonkMIt3GCBXPZ0elAyb5aBvrUsdr") },
  { id:"souris-lenovo-ws202", nom:"Souris sans fil Lenovo Lecoo WS202", categorie:"peripheriques", specs:"Récepteur USB · silencieuse", prix:5000, stock:"in", port:"2.4GHZ", img:driveImg("1oPv50Jd4kcu0YkLfkaA2eaKmCCdwuxLC") },
  { id:"souris-gaming-twolf-m1", nom:"Souris Gaming T-Wolf M1", categorie:"peripheriques", specs:"Filaire RGB · 7 boutons programmables · DPI réglable", prix:4500, stock:"in", port:"USB", img:driveImg("1_uOA383X4c1vXYITCSJ_rQBR92hQvf0n") },
  { id:"clavier-hp-gk100f", nom:"Clavier Gaming HP GK100F", categorie:"peripheriques", specs:"Mécanique filaire · rétroéclairage RGB", prix:15000, stock:"in", port:"USB", img:driveImg("1xBHtWIm9bvds9XfiShQtxT-nId09mwq_") },
  { id:"clavier-lenovo-gk302", nom:"Clavier Gaming Lenovo Lecoo GK302", categorie:"peripheriques", specs:"Mécanique filaire · rétroéclairage RGB", prix:15000, stock:"in", port:"USB", img:driveImg("1g1h5uhEA_Z2Qv7Vsmc1f2cYm2R3TksIT") },
  { id:"tapis-souris", nom:"Tapis souris/clavier", categorie:"peripheriques", specs:"Plusieurs formats disponibles : 21x25, 25x30, 30x70, 30x80 cm", prix:1000, stock:"in", port:"ACCESSOIRE", img:driveImg("1GIOmSKynsSTjks_XkFzps5yULpiLydgA") },

  // ---------- Casques gaming ----------
  { id:"casque-zyma-e10", nom:"Casque Gaming ZYMA E10", categorie:"casques", specs:"Surround virtuel 7.1 · micro anti-bruit · USB", prix:7500, stock:"in", port:"USB", img:driveImg("1RE-EjVoKtQzG93Zhoun9YlK-W3ChJJvl") },
  { id:"casque-aula-s602", nom:"Casque Gaming AULA S602", categorie:"casques", specs:"Surround 7.1 · éclairage LED RGB · micro anti-bruit", prix:12000, stock:"in", port:"USB", img:driveImg("1QYBK_KjTGciDKGBQKbaRxnqrHgGtIV8x") },
  { id:"casque-lenovo-e08", nom:"Casque Lenovo Thinkplus E08", categorie:"casques", specs:"Haut-parleurs 50mm · surround 7.1 · éclairage LED RGB", prix:12000, stock:"in", port:"USB", img:driveImg("1TL06EnmwajvRL74srrF7igZHuon9Q8ik") },
  { id:"casque-lenovo-e03", nom:"Casque Lenovo Thinkplus E03", categorie:"casques", specs:"Haut-parleurs 50mm · surround 7.1 · micro anti-bruit", prix:10000, stock:"in", port:"USB", img:driveImg("1HKEVPVJg51Ua1OiFwfK1yEhLMrsxITcF") },
  { id:"casque-hp-dhe80080", nom:"Casque HP Gaming DHE-80080", categorie:"casques", specs:"Surround 7.1 · confort circum-auriculaire · micro anti-bruit", prix:10000, stock:"in", port:"USB", img:driveImg("1tC5DLxj3ni1aVgZOgLllwEJxpZHaP1QL") },

  // ---------- Enceintes & barres de son ----------
  { id:"soundbar-lenovo-ts33b", nom:"Barre de son Lenovo Thinkplus TS33-B", categorie:"audio", specs:"Filaire/sans fil Bluetooth · portée 10 m · éclairage LED RGB", prix:9500, stock:"in", port:"BT", img:driveImg("1xF3U0cYTNBtGL0vEtBkrTHjGuVwM6zFK") },
  { id:"enceinte-lecoo-ds106pro", nom:"Enceinte Lenovo Lecoo DS106 Pro", categorie:"audio", specs:"Portable sans fil · Bluetooth · éclairage LED RGB · rechargeable", prix:6000, stock:"in", port:"BT", img:driveImg("1UeuljqH7RRfaaGhjTsgxAKS40spjqZF3") },
  { id:"enceinte-lecoo-ds102", nom:"Enceinte Lenovo Lecoo DS102", categorie:"audio", specs:"Double connectivité filaire/Bluetooth · portée 10 m", prix:12500, stock:"in", port:"BT", img:driveImg("1XI4k2L1e4Zmy9qbIdp_RgCj5Mpb-PlI3") },
  { id:"barre-son-rgb", nom:"Barre de son lumineuse RGB", categorie:"audio", specs:"Filaire pour PC · éclairage RGB · son surround Dolby Digital", prix:15000, stock:"in", port:"USB", img:driveImg("1rIHyPvT5l4k0RClDF6mJXK8OlJPbw4D9") },
  { id:"enceintes-x2-active", nom:"Enceintes de bureau X2 Active 2.0", categorie:"audio", specs:"Filaire USB · éclairage RGB · contrôle du volume intégré", prix:5500, stock:"in", port:"USB", img:driveImg("1t1UQzwW7CgitvS6w1t2oLEq5AuUyOn_6") },

  // ---------- Stockage, RAM & boîtiers ----------
  { id:"boitier-disque-25", nom:"Boîtier disque dur 2.5\"", categorie:"stockage", specs:"SATA vers USB 3.0 · pour SSD/HDD portable", prix:0, stock:"in", port:"USB 3.0" },
  { id:"boitier-disque-35", nom:"Boîtier disque dur 3.5\"", categorie:"stockage", specs:"SATA vers USB 3.0 · alimentation secteur", prix:0, stock:"in", port:"USB 3.0" },
  { id:"boitier-sata-smart", nom:"Boîtier SATA Smart USB 3.1", categorie:"stockage", specs:"Écran de contrôle intégré : capacité, température, santé du disque", prix:8000, stock:"in", port:"USB 3.1", img:driveImg("10UaBYVLyPPwJKU1B2OTxYNvyuj5oSMWE") },
  { id:"boitier-sata-usb31", nom:"Boîtier disque SATA USB 3.1", categorie:"stockage", specs:"Pour SSD/HDD SATA · interface USB 3.1 6Gbps", prix:4500, stock:"in", port:"USB 3.1", img:driveImg("1FHNp1AzZZTEGyfhonNlOtsPEeLbsr0Mj") },
  { id:"adapt-caddy-ssd", nom:"Adaptateur Caddy SSD/HDD", categorie:"stockage", specs:"Remplace le lecteur CD pour ajouter un second disque SATA", prix:5000, stock:"in", port:"SATA", img:driveImg("18M1DJhfRTdVlUFmcBm5BSPjvAJFdHhe0") },
  { id:"adapt-msata-m2", nom:"Adaptateur mSATA/M.2 NGFF vers SATA", categorie:"stockage", specs:"Compatible mSATA et M.2 SATA (NVMe non pris en charge)", prix:5000, stock:"in", port:"SATA", img:driveImg("1ucRGQiQCbQwYcHen3l9rlgEaDeGFoDXA") },
  { id:"boitier-m2-nvme", nom:"Boîtier USB 3.2 Gen2 pour M.2 NVMe/NGFF", categorie:"stockage", specs:"Adaptateur dual protocole · jusqu'à 1 Go/s", prix:12000, stock:"in", port:"USB 3.2", img:driveImg("1M7D3muhBO1-P2-ALAxuoJtX4MgrYAjNp") },
  { id:"adapt-m2-x1carbon", nom:"Adaptateur M.2 pour Lenovo ThinkPad X1 Carbon", categorie:"stockage", specs:"Support M.2 NGFF pour Gen 1 (2012-2013)", prix:3500, stock:"in", port:"M.2", img:driveImg("1PqaaEmINg76-Pbp8yDFxBLleCLIVil9K") },
  { id:"cle-usb-lexar", nom:"Clé USB Lexar Ultra Rapide", categorie:"stockage", specs:"USB 3.0/3.2 · 32 à 256 Go · versions Type-C disponibles", prix:4000, stock:"in", port:"USB 3.0", img:driveImg("1smNA1xDobXIbWZGEoEq_oKwtPj20Mhnp") },
  { id:"ssd-externe", nom:"Disque SSD externe", categorie:"stockage", specs:"USB 3.2 Gen2x2 · copie ultra-rapide jusqu'à 2 Go/s · 1 To", prix:77500, stock:"low", port:"USB 3.2", img:driveImg("13hIQOi54jjpah8v-J6_XEh6d8_c-z7Lc") },
  { id:"ram-pc-portable", nom:"RAM pour PC portable", categorie:"stockage", specs:"DDR3 4/8 Go · DDR4 8 Go · DDR5 8 Go", prix:8000, stock:"in", port:"SO-DIMM", img:driveImg("1_VSx3wZadkGvyqFx4mOhu976d7sI0wqh") },

  // ---------- Dongles Wi-Fi / Bluetooth ----------
  { id:"dongle-wifi-perf", nom:"Dongle Wi-Fi USB Haute Performance", categorie:"dongles", specs:"Wi-Fi 5 AC1200 · Wi-Fi 5 AC1200+Bluetooth · Wi-Fi 6 AX1800", prix:6000, stock:"in", port:"USB 3.0", img:driveImg("1qQhFlvCB3mQNegRQNl9M9CnTTXJtXQ9-") },
  { id:"carte-pcie-wifi-bt", nom:"Carte PCIe Wi-Fi + Bluetooth", categorie:"dongles", specs:"Pour PC bureautique · Intel 7260AC ou Intel AX200", prix:11000, stock:"in", port:"PCIe", img:driveImg("1BvvrZCGZMDkpKh2nHxVtRDomvU0aDsBC") },
  { id:"dongle-usb-wifi-bt", nom:"Dongle USB Wi-Fi & Bluetooth", categorie:"dongles", specs:"Plusieurs versions : Wi-Fi seul, Bluetooth seul, ou combiné", prix:3000, stock:"in", port:"USB", img:driveImg("1wULCqrScLueo88CPyfB_nt7X2o4wEbzv") },

  // ---------- Adaptateurs audio/vidéo ----------
  { id:"repartiteur-hdmi", nom:"Répartiteur HDMI (Splitter)", categorie:"av", specs:"Duplique un signal HDMI vers plusieurs écrans · 1x2 ou 1x4", prix:6000, stock:"in", port:"HDMI", img:driveImg("1054GVW44WFAOz7Zb_21ypAxv9Qc8Wrqc") },
  { id:"commutateur-hdmi", nom:"Commutateur HDMI (Switch)", categorie:"av", specs:"Connecte plusieurs sources sur un même écran · 3 en 1 ou 5 en 1, 4K", prix:7000, stock:"in", port:"HDMI", img:driveImg("1GLtaBXdl6p4UnY_kJ-foaaqg0feZXxD8") },
  { id:"capture-video-hdmi", nom:"USB 3.0 HDMI Video Capture", categorie:"av", specs:"Carte de capture HDMI vers USB 3.0, entrée micro", prix:12000, stock:"in", port:"USB 3.0", img:driveImg("18a6buYMeFYJtW5ZkaAJffhv3f1Ymq-5A") },
  { id:"recepteur-bt", nom:"Récepteur Audio Bluetooth 5.3", categorie:"av", specs:"Ajoute le Bluetooth aux enceintes/casques filaires · Jack/RCA", prix:7000, stock:"in", port:"BT", img:driveImg("1F67FZjbVF61SvrI3Zm2W4uRauXpTJJb6") },
  { id:"adapt-jack", nom:"Adaptateur Lightning/Type-C vers Jack", categorie:"av", specs:"Compatible Android, iPhone, PC, MacBook", prix:2500, stock:"in", port:"USB-C/Lightning", img:driveImg("1CSH4mIWBZz84ojnOpde5M5JznlVDyYIY") },
  { id:"extracteur-audio-hdmi", nom:"HDMI Audio Extractor", categorie:"av", specs:"Sépare l'audio du signal HDMI · sortie SPDIF/Jack", prix:6500, stock:"in", port:"HDMI", img:driveImg("1L_caJ3TuXCPbnhi_wOCAPYV2UdkYB1Hd") },
  { id:"adapt-hdmi-rca", nom:"Adaptateur HDMI-RCA / RCA-HDMI", categorie:"av", specs:"Up-scaler 1080p · conversion bidirectionnelle", prix:5000, stock:"in", port:"HDMI/RCA", img:driveImg("112_SFff_xZrM6W-SSf_jCkYN8hckRZC9") },
  { id:"adapt-video-multi", nom:"Adaptateurs vidéo (HDMI, VGA, DVI, DP)", categorie:"av", specs:"HDMI↔VGA, Mini DP↔HDMI, DisplayPort↔HDMI, DVI↔HDMI", prix:3000, stock:"in", port:"MULTI", img:driveImg("15bmBAhrs6tjBo5uigFgilsLR4EgPEINU") },
  { id:"hdmi-extender", nom:"HDMI Extender (par câble Cat-6/6A)", categorie:"av", specs:"Transmission HDMI jusqu'à 30 m via câble Ethernet", prix:4000, stock:"in", port:"HDMI/RJ45", img:driveImg("1hJuyLeCv5mxYJPus6DzwdaqOGvwqGAl7") },
  { id:"cable-hdmi-8k", nom:"Câble HDMI 2.1 8K", categorie:"av", specs:"Haute vitesse · 10 m ou 20 m", prix:7500, stock:"in", port:"HDMI", img:driveImg("1Ro4AbyCjuPEW7y6ztr9gwR_1kMp3wuRk") },

  // ---------- Stations d'accueil ----------
  { id:"dock-11en1", nom:"Docking Station 11 en 1", categorie:"dock", specs:"USB-C : HDMI + 4x USB-A + PD 87W + TF/SD + RJ45 + AUX + VGA", prix:16000, stock:"in", port:"USB-C", img:driveImg("1C42UVSOzX3Z1unW7Mrf7WvXL2eUVLdgJ") },
  { id:"dock-8en1", nom:"Station d'accueil USB-C 8 en 1", categorie:"dock", specs:"USB 3.0, USB 2.0, USB-C PD, HDMI 4K, Ethernet RJ45, SD, Micro SD", prix:12000, stock:"in", port:"USB-C", img:driveImg("1azHxonLnhOjAMZto1mUWx4dGYysrqY23") },

  // ---------- Refroidissement PC ----------
  { id:"refroidissement-turbo", nom:"Système de refroidissement Turbo (6 ventilateurs)", categorie:"refroidissement", specs:"10 modes d'éclairage RGB · vitesse réglable · 6 niveaux de puissance", prix:22500, stock:"in", port:"USB", img:driveImg("1A_7Ilsko3nJIbCQccT0viQjICNqyLfbD") },

  // ---------- Maison connectée ----------
  { id:"prise-connectee", nom:"Prise connectée Wi-Fi", categorie:"domotique", specs:"Contrôle via app · compatible assistants vocaux", prix:0, stock:"in", port:"2.4GHZ" },
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
      <div class="p-thumb">${
        p.img
          ? `<img src="${p.img}" alt="${p.nom}" loading="lazy" onerror="this.parentElement.innerHTML='${catIcon(p.categorie)}';">`
          : catIcon(p.categorie)
      }</div>
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
