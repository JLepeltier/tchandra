Tchandra Massage - website
===============================

## Newsletters

Placez le fichier HTML et ses images sous `newsletters/`. Ajoutez ces deux
lignes au tout début du HTML exporté pour que Jekyll applique la directive
`noindex` du dossier dans son en-tête `<head>`.

```yaml
---
---
```

Chaque newsletter conserve son adresse publique, et le dossier entier est
exclu du sitemap. Un fichier HTML brut sans ces deux lignes est copié tel quel
par GitHub Pages.
