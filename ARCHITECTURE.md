# Spatial View V3 - Architecture

## Core Principles

1. **NO FILE OVER 200 LINES** - Hard limit. Split before adding features.
2. **Single Responsibility** - One file = one clear purpose
3. **Tldraw SDK First** - Use Tldraw's architecture, don't fight it
4. **Type Safety** - TypeScript strict mode, no `any`
5. **Performance by Design** - Optimize from day one

## Directory Structure

```
src/
├── app/
│   └── App.tsx                    # Main app component (<100 lines)
├── shapes/
│   ├── NoteCardShape.tsx          # Custom note card shape (<200 lines)
│   └── types.ts                   # Shape type definitions
├── store/
│   ├── db.ts                      # Dexie IndexedDB setup (<100 lines)
│   └── sync.ts                    # Sync logic (<200 lines)
├── hooks/
│   ├── useNoteCards.ts            # Note card operations (<150 lines)
│   └── useAI.ts                   # AI integration (<200 lines)
├── components/
│   ├── Toolbar.tsx                # Top toolbar (<150 lines)
│   └── StatsDisplay.tsx           # Statistics overlay (<100 lines)
└── lib/
    ├── ai/
    │   ├── embeddings.ts          # Vector embeddings (<150 lines)
    │   └── clustering.ts          # UMAP/clustering (<200 lines)
    └── utils/
        ├── colors.ts              # Color utilities (<50 lines)
        └── layout.ts              # Layout algorithms (<150 lines)
```

## Rules

### File Size Enforcement
- Pre-commit hook checks all files
- Max 200 lines (including comments)
- Exception: Only Tldraw SDK files (node_modules)

### Module Dependencies
```
app/ → shapes/, hooks/, components/
shapes/ → store/types
hooks/ → store/, lib/
components/ → hooks/
lib/ → (no internal dependencies)
```

### State Management
- **Tldraw State**: Canvas state (shapes, selection, camera)
- **IndexedDB**: Persistent storage via Dexie
- **Zustand** (if needed): App-level state (theme, settings)

## What We Learned from V2 Mistakes

❌ **V2 Problem**: 9,292 lines in one file (core.js)
✅ **V3 Solution**: Strict 200-line limit with pre-commit enforcement

❌ **V2 Problem**: Fake modules (thin wrappers)
✅ **V3 Solution**: Real modules, each with actual implementation

❌ **V2 Problem**: No performance optimizations
✅ **V3 Solution**: Tldraw gives us virtualization, culling, quadtrees for free

❌ **V2 Problem**: Documentation lies about architecture
✅ **V3 Solution**: Architecture document = source of truth

## Development Workflow

1. **Before adding a feature**: Check file size with `wc -l`
2. **If file > 150 lines**: Consider splitting BEFORE adding code
3. **If file > 200 lines**: MUST split before committing
4. **PR Review**: Architecture compliance is first check

## Performance Targets

- **< 1s** initial load on fast connection
- **60 FPS** pan/zoom with 1000+ cards
- **< 100ms** search with 10,000 cards
- **< 500ms** AI clustering of 500 cards

## Tech Stack Justification

**Tldraw SDK**: Built for infinite canvas, handles 10k+ shapes
**Dexie**: Clean IndexedDB wrapper, better than raw API
**TypeScript**: Catch errors at compile time, not runtime
**Vite**: Fast builds, HMR, optimized production bundles

---

**Last Updated**: 2025-11-22
**Status**: Initial architecture - ready for implementation
