import { Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'
import { NoteCardUtil } from './shapes/NoteCardShape'

// Register custom shapes
const customShapeUtils = [NoteCardUtil]

export default function App() {
  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      <Tldraw
        shapeUtils={customShapeUtils}
        onMount={() => {
          console.log('Editor mounted with custom NoteCard shape')
        }}
      />
    </div>
  )
}
