# AL IHSAN TRAVEL — Site Vitrine

## Client
- **Nom** : Al Ihsan Travel
- **Activité** : Agence de voyage spécialisée Hajj, Omra et tourisme
- **Villes** : Ouagadougou (Tampouy, cité Azimo) et Bobo-Dioulasso
- **Téléphones** : +226 70 13 89 89 / 77 31 33 22 (Ouaga), 74 74 74 47 / 78 81 29 73 (Bobo)
- **Email** : alihsantravel24@gmail.com
- **WhatsApp** : +226 70 13 89 89

## Stack technique
- Site statique HTML/CSS/JS (pas de framework)
- Un seul fichier CSS : `css/styles.css`
- Un seul fichier JS : `js/main.js` (vanilla, IIFE)
- Polices Google Fonts : Montserrat (display), Open Sans (body), JetBrains Mono (mono)
- Icônes : sprite SVG inline (Lucide icons)
- Formulaire contact : Web3Forms (clé à remplacer dans index.html)

## Structure
```
index.html          # Page unique (single-page)
css/styles.css      # Design system + styles
js/main.js          # Interactions (menu, lightbox, scroll, formulaire)
assets/images/      # Photos pèlerins (p1-p12.jpeg), hero (hero-bg.jpeg)
assets/brand/       # Logo (logo.jpeg)
robots.txt          # Directives robots
sitemap.xml         # Sitemap Google
```

## Design system
- Préfixe CSS variables : `--ai-`
- Couleurs principales : navy-dark #0C2245, navy #12305E, green #1B8A46, gold #F0A500, cream #FAF7F1
- Container max-width : 1240px
- Breakpoints responsive : 768px (tablette), 480px (petit mobile)
- Approche mobile-first avec `max-width` media queries

## Sections de la page (dans l'ordre)
1. Topbar (contact + réseaux sociaux)
2. Header sticky (logo + nav + CTA)
3. Hero (fond photo + gradient overlay)
4. Barre de recherche (type voyage, ville, période)
5. Stats (12 ans, 2 agences, 100%, 24h/24)
6. Packages — Nos formules (3 cartes : Omra Spécial, Hajj, Visa 1 an)
7. Includes — Tout est compris (6 items)
8. Visa Omra 1 an (section dédiée)
9. Nos autres services (6 cartes : billetterie, tourisme, transfert d'argent, traduction, médecine prophétique, colonies spirituelles)
10. Pourquoi nous (4 raisons — expertise religieuse, accompagnement, confort, tarifs)
11. Étapes d'inscription (4 étapes)
12. Galerie pèlerins (10 photos + lightbox)
13. CTA banner
14. Contact (2 agences + formulaire devis)
15. Footer (3 colonnes + copyright)

## Commandes utiles
```bash
# Serveur local
npx serve -l 3000

# Minifier le CSS pour la production
npx clean-css-cli -o css/styles.min.css css/styles.css
```

## À faire avant mise en production
- [ ] Remplacer `VOTRE_CLE_WEB3FORMS` par la vraie clé Web3Forms dans index.html
- [ ] Remplacer `https://alihsantravel.com` par le vrai domaine dans sitemap.xml, robots.txt et les meta og
- [ ] Ajouter les vrais liens Facebook, Instagram, YouTube (actuellement `#`)
- [ ] Remplacer hero-bg.jpeg par une photo Kaaba/Mecque de qualité
- [ ] Minifier CSS et mettre à jour le lien dans index.html (`styles.min.css?v=1`)
- [ ] Configurer Google Search Console et soumettre le sitemap
