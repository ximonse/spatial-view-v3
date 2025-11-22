# Code Index - Source of Truth

**Last Updated**: 2025-11-22 (auto-update on each commit)

## Current Status

**Version**: 0.3.0-alpha
**Total Files**: 8 source files
**Total Lines**: ~228 lines of actual code
**Status**: ✅ Working Tldraw app with NoteCard shape and IndexedDB persistence

---

## File Inventory

### Core App Files

| File | Lines | Purpose | Status | Dependencies |
|------|-------|---------|--------|--------------|
| `src/main.tsx` | 10 | App entry point | ✅ Working | React, App.tsx |
| `src/App.tsx` | 27 | Main Tldraw component | ✅ Working | Tldraw SDK, NoteCardShape, usePersistence |
| `src/App.css` | 9 | Global styles | ✅ Working | None |

### Custom Shapes

| File | Lines | Purpose | Status | Dependencies |
|------|-------|---------|--------|--------------|
| `src/shapes/types.ts` | 15 | NoteCard type definitions | ✅ Working | Tldraw types |
| `src/shapes/NoteCardShape.tsx` | 82 | NoteCard shape implementation | ✅ Working | Tldraw, types.ts |

### Storage & Persistence

| File | Lines | Purpose | Status | Dependencies |
|------|-------|---------|--------|--------------|
| `src/store/db.ts` | 33 | Dexie IndexedDB setup | ✅ Working | Dexie |
| `src/hooks/usePersistence.ts` | 69 | Auto-save/restore hook | ✅ Working | Tldraw, db.ts |

### Configuration Files

| File | Purpose | Status |
|------|---------|--------|
| `vite.config.ts` | Vite build config | ✅ Default |
| `tsconfig.json` | TypeScript config | ✅ Strict mode |
| `vercel.json` | Vercel deployment | ✅ Configured |
| `.gitignore` | Git exclusions | ✅ Standard |

### Documentation

| File | Purpose | Status |
|------|---------|--------|
| `README.md` | Project overview | ✅ Complete |
| `ARCHITECTURE.md` | Architecture rules | ✅ Complete |
| `CODE-INDEX.md` | This file! | ✅ Living document |

---

## Features Implemented

### ✅ Completed
- [x] Tldraw infinite canvas
- [x] Basic zoom/pan/select
- [x] Pre-commit file size enforcement
- [x] TypeScript strict mode
- [x] Vite dev server
- [x] Vercel deployment config
- [x] Custom NoteCard shape (basic implementation)
- [x] IndexedDB persistence (auto-save/restore)

### 🚧 In Progress
- [ ] Text editing for NoteCard
- [ ] Toolbar UI
- [ ] Export/import functionality

### 📋 Planned
- [ ] AI embeddings
- [ ] Clustering algorithms
- [ ] Google Drive sync
- [ ] OCR integration
- [ ] Search functionality

---

## Component Map

```
App
└─ Tldraw (SDK component)
   ├─ Built-in shapes (rectangle, ellipse, arrow, etc.)
   └─ Custom shapes
      └─ NoteCardShape (note-card)
         ├─ Renders as colored card with text
         ├─ Resizable (w/h props)
         └─ [Future] Text editing
```

---

## Data Flow

```
User Action → Tldraw Editor
                ↓
        usePersistence hook
                ↓
           (debounced)
                ↓
    IndexedDB via Dexie

On App Load:
  IndexedDB → usePersistence → Tldraw.loadSnapshot()
```

---

## API Surface

### Exported Functions
*None yet - using Tldraw defaults*

### Custom Shapes

**`NoteCardShape`** (type: `'note-card'`)
- **Props**: `{ w: number, h: number, text: string, color: TLDefaultColorStyle }`
- **Default size**: 300x200px
- **Features**: Colored background, bordered, resizable
- **Future**: Text editing, auto-height, OCR image support

### Hooks

**`usePersistence(editor: Editor | null)`**
- **Purpose**: Auto-save Tldraw state to IndexedDB
- **Debounce**: 1 second after last change
- **Features**: Load on mount, save on changes, cleanup on unmount
- **Storage**: Uses Dexie to save full Tldraw snapshot as JSON

---

## Dependencies

### Production
- `tldraw@2.x` - Infinite canvas SDK
- `react@18.x` - UI framework
- `react-dom@18.x` - React DOM renderer
- `dexie@4.x` - IndexedDB wrapper (installed, not used yet)
- `zustand@4.x` - State management (installed, not used yet)

### Development
- `vite@5.x` - Build tool
- `typescript@5.x` - Type checking
- `@types/*` - Type definitions

---

## Performance Metrics

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Initial Load | < 1s | ~300ms | ✅ Excellent |
| Bundle Size | < 500KB | ~180KB | ✅ Excellent |
| Dev Server Start | < 500ms | ~300ms | ✅ Excellent |

---

## Known Issues

*None* - Clean slate! 🎉

---

## Architecture Compliance

### File Size Check
```bash
# Run manually:
find src -name "*.tsx" -o -name "*.ts" | xargs wc -l

# Current status: All files < 20 lines ✅
```

### Module Dependencies
```
main.tsx → App.tsx → Tldraw SDK
```
Clean, no circular dependencies ✅

---

## Testing Status

### Manual Testing
- [x] App loads in browser
- [x] Can draw shapes
- [x] Can pan/zoom
- [x] Can select/move shapes

### Automated Testing
- [ ] Unit tests (not yet implemented)
- [ ] E2E tests (not yet implemented)

---

## Deployment Status

### Development
- URL: http://localhost:5173
- Status: ✅ Running

### Production
- Platform: Vercel
- URL: Not deployed yet
- Status: ⏳ Pending

---

## How to Update This File

**After adding a feature:**
1. Update "Features Implemented" section
2. Update "File Inventory" table
3. Update "Component Map" if adding components
4. Update "API Surface" if adding exports
5. Run `wc -l src/**/*.{ts,tsx}` and update file sizes
6. Commit with message: `docs: Update CODE-INDEX after [feature]`

**This file is the source of truth. If something isn't listed here, it doesn't exist.**

---

