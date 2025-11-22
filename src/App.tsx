import { useState, useEffect } from 'react'
import { Tldraw, type Editor } from 'tldraw'
import 'tldraw/tldraw.css'
import { NoteCardUtil } from './shapes/NoteCardShape'
import { usePersistence } from './hooks/usePersistence'
import { CommandPalette } from './components/CommandPalette'
import { registerAllCommands } from './lib/registerCommands'

// Register custom shapes
const customShapeUtils = [NoteCardUtil]

// Register commands once
registerAllCommands()

export default function App() {
  const [editor, setEditor] = useState<Editor | null>(null)
  const [isPaletteOpen, setIsPaletteOpen] = useState(false)

  // Auto-save and restore from IndexedDB
  usePersistence(editor)

  // Global keyboard shortcut for command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // "/" to open command palette
      if (e.key === '/' && !isPaletteOpen) {
        e.preventDefault()
        setIsPaletteOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isPaletteOpen])

  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      <Tldraw
        shapeUtils={customShapeUtils}
        onMount={(editor) => {
          setEditor(editor)
          console.log('Editor mounted with persistence and command palette')
        }}
      />
      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        editor={editor}
      />
    </div>
  )
}
