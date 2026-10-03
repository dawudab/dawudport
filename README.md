# Dawud Abdullah Portfolio

An interactive desktop-inspired portfolio built with React, TypeScript, Vite, and Three.js.

## Run locally

```sh
npm ci
npm run dev
```

Create a production build with `npm run build`.

## Contact function

The contact form uses the Firebase Cloud Function in `functions/`. Configure `GMAIL_EMAIL` and `GMAIL_PASSWORD` as runtime environment variables for the function; keep credentials out of source control. Deploy it with `firebase deploy --only functions`.

## Hosting

The Firebase Hosting configuration serves the Vite build from `dist/`. Deploy with `firebase deploy --only hosting`.