/**
 * Hook for persisting Tldraw state to IndexedDB
 */

import { useEffect } from 'react'
import { Editor } from 'tldraw'
import { db } from '../store/db'

const STORAGE_KEY = 'current'
const SAVE_DEBOUNCE_MS = 1000 // Save 1 second after last change

/**
 * Auto-save and restore Tldraw editor state
 */
export function usePersistence(editor: Editor | null) {
  useEffect(() => {
    if (!editor) return

    // Load saved state on mount
    const loadState = async () => {
      try {
        const saved = await db.canvasSnapshots.get(STORAGE_KEY)
        if (saved?.snapshot) {
          const snapshot = JSON.parse(saved.snapshot)
          editor.loadSnapshot(snapshot)
          console.log('Loaded canvas from IndexedDB')
        }
      } catch (error) {
        console.error('Failed to load canvas state:', error)
      }
    }

    loadState()

    // Save state on changes (debounced)
    let saveTimeout: ReturnType<typeof setTimeout>

    const saveState = async () => {
      try {
        const snapshot = editor.getSnapshot()
        await db.canvasSnapshots.put({
          id: STORAGE_KEY,
          snapshot: JSON.stringify(snapshot),
          updatedAt: new Date(),
        })
        console.log('Saved canvas to IndexedDB')
      } catch (error) {
        console.error('Failed to save canvas state:', error)
      }
    }

    const debouncedSave = () => {
      clearTimeout(saveTimeout)
      saveTimeout = setTimeout(saveState, SAVE_DEBOUNCE_MS)
    }

    // Listen to store changes
    const unsubscribe = editor.store.listen(debouncedSave, {
      scope: 'document',
      source: 'user',
    })

    // Cleanup
    return () => {
      clearTimeout(saveTimeout)
      unsubscribe()
    }
  }, [editor])
}
