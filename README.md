# FOSA — Landing page

Site vitrine de FOSA, entreprise de solutions digitales pour PME.
« Digitalisez. Simplifiez. Propulsez votre entreprise. »

## Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4 (configuration CSS-first via `@theme`)
- Inter Variable (auto-hébergée via Fontsource)

## Démarrage

```bash
npm install
npm run dev       # développement (http://localhost:5173)
npm run build     # build de production dans dist/
npm run preview   # sert le build de production
```

## Structure

```
public/assets/    # logo renard, favicon, og-image
src/
  components/     # primitives : Button, Logo, Reveal, SectionHeading, GeometricIcons,
                  # Navbar, DashboardMockup (mockup produit 100 % HTML/CSS)
  sections/       # Hero, Problem, Solutions, Industries, ProductShowcase, Features,
                  # BrandStatement, FinalCta, Footer
  lib/content.ts  # toute la copie marketing centralisée
```

## Identité

- Orange FOSA `#FF5A00` / navy `#0B1424`
- Langage visuel : angles francs, coins coupés, losanges « œil de renard »,
  diagonales et grilles techniques — jamais d'effets templates.
- Accessibilité : contrastes AA vérifiés, `prefers-reduced-motion` respecté,
  HTML sémantique, liens d'évitement.

## À personnaliser avant mise en production

- **Domaine** : remplacer `https://fosa.tech/` (canonical, Open Graph, JSON-LD)
  dans `index.html` par le domaine réel.
- **E-mail de contact** : `contact@fosa.tech` dans `src/lib/content.ts`.
- **WhatsApp** : `WHATSAPP_URL` dans `src/lib/content.ts` utilise un numéro
  fictif (`261340000000`) — remplacer par le numéro réel (format international).
- **Réseaux sociaux** : les liens du footer pointent vers les pages d'accueil
  des plateformes (Facebook, LinkedIn, Instagram) — les remplacer par les
  profils FOSA dès qu'ils existent.
