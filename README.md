# Spatial View V3

Digital Zettelkasten med infinite canvas - byggt med Tldraw SDK.

## Arkitektur

Se [ARCHITECTURE.md](./ARCHITECTURE.md) för fullständig arkitektonisk beskrivning.

**Kärnprinciper:**
- Ingen fil över 200 rader
- Tldraw SDK för prestanda
- TypeScript strict mode
- Performance-first design

## Utveckling

```bash
npm install
npm run dev
```

## Deployment

Projektet är konfigurerat för Vercel:

```bash
npm run build
vercel deploy
```

## Tech Stack

- **Tldraw SDK** - Infinite canvas med optimerad rendering
- **Dexie** - IndexedDB wrapper för lokal lagring
- **Vite** - Build tool och dev server
- **TypeScript** - Type safety

---

**Status**: 🚧 Under utveckling  
**Version**: 3.0.0-alpha  
**Skapad**: 2025-11-22
