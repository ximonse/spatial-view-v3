import { useState } from 'react'
import { Tldraw, type Editor } from 'tldraw'
import 'tldraw/tldraw.css'
import { NoteCardUtil } from './shapes/NoteCardShape'
import { usePersistence } from './hooks/usePersistence'

// Register custom shapes
const customShapeUtils = [NoteCardUtil]

export default function App() {
  const [editor, setEditor] = useState<Editor | null>(null)

  // Auto-save and restore from IndexedDB
  usePersistence(editor)

  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      <Tldraw
        shapeUtils={customShapeUtils}
        onMount={(editor) => {
          setEditor(editor)
          console.log('Editor mounted with persistence enabled')
        }}
      />
    </div>
  )
}
