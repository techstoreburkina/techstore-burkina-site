# TechStore Burkina — Site web

Site vitrine + catalogue, en HTML/CSS/JS pur (aucune installation nécessaire).

## Structure
```
index.html        → page d'accueil (vitrine)
catalogue.html     → catalogue complet avec filtres et recherche
assets/style.css   → tout le design
assets/script.js   → catalogue produits + logique de filtre/recherche
```

## Modifier les produits
Tout le catalogue est dans `assets/script.js`, tableau `PRODUCTS` en haut du fichier.
Pour ajouter un produit, copie une ligne et adapte : `nom`, `categorie` (doit correspondre
à une des clés de `CATEGORIES`), `specs`, `prix` (0 = "Sur devis"), `stock` (`in`, `low`, `out`).

## Publier sur GitHub Pages (gratuit)

1. Va sur https://github.com/new et crée un dépôt, par exemple `techstore-burkina-site`
   (public, pour que GitHub Pages fonctionne gratuitement).

2. Sur ton ordinateur, ouvre un terminal dans le dossier `techstore-site` puis lance :
   ```bash
   git init
   git add .
   git commit -m "Premier commit : site TechStore Burkina"
   git branch -M main
   git remote add origin https://github.com/TON-PSEUDO/techstore-burkina-site.git
   git push -u origin main
   ```
   (remplace `TON-PSEUDO` par ton nom d'utilisateur GitHub)

3. Sur GitHub, va dans **Settings → Pages** de ce dépôt.
   Dans "Build and deployment", choisis **Deploy from a branch**,
   branche `main`, dossier `/ (root)`, puis **Save**.

4. Après 1 à 2 minutes, ton site sera en ligne à l'adresse :
   `https://TON-PSEUDO.github.io/techstore-burkina-site/`

## Nom de domaine personnalisé (optionnel)
Si tu achètes un domaine plus tard (ex. techstoreburkina.com), tu pourras le brancher
dans **Settings → Pages → Custom domain** sans changer le code.

## Prochaines étapes suggérées
- Remplacer les icônes des produits par de vraies photos (ajouter un champ `image` dans
  `assets/script.js` et une balise `<img>` dans `p-thumb` du fichier `script.js`).
- Ajouter les prix réels quand tu es prêt à les afficher publiquement.
- Lier chaque post "Coin de l'ingé" publié sur Facebook à un futur blog du site, si tu veux
  centraliser le contenu.
