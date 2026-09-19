# AL IHSAN TRAVEL — Site Vitrine Multi-pages

## Client
- **Nom** : Al Ihsan Travel
- **Activité** : Agence de voyage spécialisée Hajj, Omra et tourisme
- **Villes** : Ouagadougou (Tampouy, cité Azimo) et Bobo-Dioulasso
- **Téléphones** : +226 70 13 89 89 / 77 31 33 22 (Ouaga), 74 74 74 47 / 78 81 29 73 (Bobo)
- **Email** : contact@alihsantravelbf.com
- **WhatsApp** : +226 70 13 89 89
- **Domaine** : alihsantravelbf.com
- **GitHub** : https://github.com/2002Dipama/alihsan-travel

## Stack technique
- Site statique HTML/CSS/JS multi-pages (pas de framework)
- Un seul fichier CSS : `css/styles.css` → minifié en `css/styles.min.css?v=3`
- Un seul fichier JS : `js/main.js` (vanilla, IIFE, fonctionne sur toutes les pages)
- Polices Google Fonts : Montserrat (display), Open Sans (body), JetBrains Mono (mono)
- Icônes : sprite SVG inline (Lucide icons) dans chaque page
- Formulaire devis : envoi WhatsApp via `https://wa.me/22670138989?text=...`

## Structure
```
index.html               # Accueil (hero slideshow, packages, services aperçu, stats)
hadj-oumrah.html          # Hajj & Omra (packages, includes, visa, étapes)
billetterie.html           # Billetterie (intro, avantages, étapes)
tourisme-colonies.html     # Tourisme & Colonies (intro, features, galerie + lightbox)
services-plus.html         # Services Plus (transfert, traduction, médecine prophétique)
pourquoi-nous.html         # Pourquoi Nous (4 atouts, stats, engagements)
contact.html               # Contact (agences, Google Maps, formulaire devis WhatsApp)
css/styles.css             # Design system + tous les styles
css/styles.min.css         # CSS minifié (production)
js/main.js                 # Interactions (menu, lightbox, scroll, formulaire, compteurs)
assets/images/             # Photos pèlerins, hero, colonies
assets/brand/              # Logo (logo.jpeg)
robots.txt                 # Directives robots
sitemap.xml                # Sitemap Google (7 URLs)
```

## Composants partagés (présents dans chaque page HTML)
- Topbar (contact + réseaux sociaux)
- Header sticky (logo + nav 7 liens + CTA)
- Mobile nav (plein écran, fond navy, logo, liens, bouton tel + WhatsApp)
- Footer (3 colonnes de liens + copyright)
- WhatsApp FAB (bouton flottant)
- Scroll-to-top (bouton avec cercle de progression)
- Sprite SVG inline (icônes Lucide)

## Design system
- Préfixe CSS variables : `--ai-`
- Couleurs principales : navy-dark #0C2245, navy #12305E, green #1B8A46, gold #F0A500, cream #FAF7F1
- Container max-width : 1240px
- Breakpoints responsive : 768px (tablette), 480px (petit mobile)
- Approche mobile-first avec `max-width` media queries
- `padding-block` pour l'espacement vertical (ne pas écraser le gutter du container)

## Navigation active
L'état actif de la nav est défini en HTML (class `active` sur le lien de la page courante), pas en JS.

## Commandes utiles
```bash
# Serveur local
npx serve -l 3000

# Minifier le CSS pour la production
npx clean-css-cli -o css/styles.min.css css/styles.css
# Puis bumper ?v=N dans TOUTES les pages HTML
```

## À faire avant mise en production
- [ ] Remplacer hero-bg.jpeg par une photo Kaaba/Mecque de qualité
- [ ] Ajouter les vrais liens Instagram et YouTube dans le topbar
