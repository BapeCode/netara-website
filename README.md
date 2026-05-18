# Netara — Site vitrine

Site vitrine pour **Netara**, entreprise de nettoyage (toiture, façade, BTP) et d'électricité basée à Meyzieu (69).

## Stack

| Côté | Techno |
|------|--------|
| Serveur | [Express](https://expressjs.com) 4.x |
| Style | [Tailwind CSS](https://tailwindcss.com) 4.x |
| Front | HTML / JS Vanilla |
| Icônes | [Lucide](https://lucide.dev) (CDN) |
| Email | [Nodemailer](https://nodemailer.com) (SMTP) |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Accueil — hero, solutions, engagements, services, zones |
| `/electricity` | Service électricité — urgences, prestations, engagements |
| `/contact` | Formulaire de devis avec toast de confirmation |
| `/confidentiality` | Politique de confidentialité & mentions légales |
| `POST /api/contact` | API Express d'envoi d'email |

## Démarrage

```bash
npm install
npm run build:css   # Compiler le CSS Tailwind (à faire une fois)
npm run dev         # http://localhost:3000
```

En développement, lancer le watcher CSS dans un second terminal :

```bash
npm run watch:css
```

## Variables d'environnement

Copier `.env.example` en `.env` et remplir les valeurs :

```env
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
MAIL_FROM=
MAIL_TO=
PORT=3000
```

## Scripts

```bash
npm run dev         # Serveur Express
npm run build:css   # Build CSS Tailwind (prod, minifié)
npm run watch:css   # Watch CSS Tailwind (dev)
```

## Structure

```
├── server.js              # Point d'entrée Express
├── api/
│   └── contact.js         # Route POST /api/contact
├── src/styles/
│   └── global.css         # Source CSS Tailwind
└── public/
    ├── index.html
    ├── electricity.html
    ├── contact.html
    ├── confidentiality.html
    ├── js/
    │   ├── main.js        # Scroll reveal + dark mode
    │   └── contact.js     # Formulaire + toast
    ├── css/
    │   └── style.css      # CSS compilé (généré)
    └── assets/            # Images
```
