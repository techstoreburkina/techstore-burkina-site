/*
  Code à intégrer dans assets/script.js pour synchroniser le site avec Supabase.
  Remplacez toute la constante PRODUCTS par ce code.
*/

// Configuration Supabase (Utilisez vos propres clés ici)
const SUPABASE_URL = "VOTRE_URL_SUPABASE";
const SUPABASE_KEY = "VOTRE_ANON_KEY_SUPABASE";
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let PRODUCTS = [];

// Fonction pour récupérer les produits depuis Supabase
async function fetchProductsFromSupabase() {
    try {
        const { data, error } = await supabase
            .from('catalogue')
            .select('*')
            .order('categorie', { ascending: true })
            .order('nom', { ascending: true });

        if (error) throw error;

        // Transformation des données Supabase vers le format du site
        PRODUCTS = data.map(item => ({
            id: item.id.toString(),
            nom: item.nom,
            categorie: item.categorie.toLowerCase().replace(/\s+/g, '-'), // Match simple avec les clés CATEGORIES
            specs: item.commentaire || "",
            prix: item.prixVente,
            stock: item.quantite > 5 ? 'in' : (item.quantite > 0 ? 'low' : 'out'),
            port: item.site_tag || "",
            img: item.url_visuel ? driveImg(item.url_visuel) : null
        }));

        // Re-rendre la grille une fois les données chargées
        renderProductGrid(PRODUCTS);
    } catch (err) {
        console.error("Erreur lors de la récupération des produits:", err);
    }
}

// Modifier initCatalogue pour charger les données
function initCatalogue() {
    // ... Garder la logique de recherche existante ...

    // Charger les produits au démarrage
    fetchProductsFromSupabase();
}

/*
  IMPORTANT:
  Dans catalogue.html, assurez-vous d'ajouter cette ligne AVANT script.js :
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
*/
