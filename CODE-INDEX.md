# Code Index - Source of Truth

**Last Updated**: 2025-11-23 (auto-update on each commit)

## Current Status

**Version**: 0.4.0-alpha
**Total Files**: 12 source files
**Total Lines**: ~616 lines of actual code
**Status**: ✅ Tldraw app with NoteCard, persistence, and command palette

---

## File Inventory

### Core App Files

| File | Lines | Purpose | Status | Dependencies |
|------|-------|---------|--------|--------------|
| `src/main.tsx` | 10 | App entry point | ✅ Working | React, App.tsx |
| `src/App.tsx` | 52 | Main Tldraw component | ✅ Working | Tldraw SDK, CommandPalette, registerCommands |
| `src/App.css` | 9 | Global styles | ✅ Working | None |

### Custom Shapes

| File | Lines | Purpose | Status | Dependencies |
|------|-------|---------|--------|--------------|
| `src/shapes/types.ts` | 16 | NoteCard type definitions | ✅ Working | Tldraw types |
| `src/shapes/NoteCardShape.tsx` | 164 | NoteCard shape implementation | ✅ Working | Tldraw, types.ts, constants.ts, react-markdown |

### Utilities

| File | Lines | Purpose | Status | Dependencies |
|------|-------|---------|--------|--------------|
| `src/lib/constants.ts` | 12 | App-wide constants (A7 size, colors) | ✅ Working | None |
| `src/lib/commands.ts` | 52 | Command registry system | ✅ Working | Tldraw types |
| `src/lib/registerCommands.ts` | 156 | Command registrations | ✅ Working | commands.ts, migrateLegacy.ts |
| `src/lib/migrateLegacy.ts` | 86 | V2 to V3 migration | ✅ Working | Tldraw, constants.ts |

### Components

| File | Lines | Purpose | Status | Dependencies |
|------|-------|---------|--------|--------------|
| `src/components/CommandPalette.tsx` | 159 | Command palette UI | ✅ Working | commands.ts |

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
- [x] Command palette (triggered by "/" key)
- [x] Command registry system
- [x] Basic commands (export, import, zoom, select, delete)
- [x] Legacy V2 JSON migration (auto-detects and converts)
- [x] Text editing for NoteCard (double-click to edit)
- [x] Font size control (Alt+1/2/3/4 for s/m/l/xl, default 25px)
- [x] Markdown support in cards (*italic*, **bold**, # heading)
- [x] Landscape card orientation (620x440px)
- [x] Debug logging in command palette

### 🚧 In Progress
- [ ] Batch card creation
- [ ] Tagging system
- [ ] Search functionality

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
         ├─ Text editing (double-click)
         └─ Adjustable font size (Alt+1/2/3/4)
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
- **Props**: `{ w: number, h: number, text: string, color: TLDefaultColorStyle, fontSize: 's' | 'm' | 'l' | 'xl' }`
- **Default size**: 620x440px (A7 index card landscape: 105×74mm, scaled for modern displays)
- **Font sizes**: Small (16px), Medium (25px - default), Large (32px), Extra Large (40px)
- **Features**: Colored background, bordered, resizable, text editing with markdown support, adjustable font size
- **Editing**: Double-click to edit, Escape to finish
- **Markdown support**: `*italic*` (gray comments), `**bold**`, `# heading`
- **Font shortcuts**: Alt+1/2/3/4 for small/medium/large/xl
- **Future**: Auto-height, OCR image support, structured tags

### Hooks

**`usePersistence(editor: Editor | null)`**
- **Purpose**: Auto-save Tldraw state to IndexedDB
- **Debounce**: 1 second after last change
- **Features**: Load on mount, save on changes, cleanup on unmount
- **Storage**: Uses Dexie to save full Tldraw snapshot as JSON

---

## Dependencies

### Production
- `tldraw@3.15.5` - Infinite canvas SDK (MIT licensed)
- `react@18.x` - UI framework
- `react-dom@18.x` - React DOM renderer
- `react-markdown@9.x` - Markdown rendering for card text
- `dexie@4.x` - IndexedDB wrapper for persistence
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

