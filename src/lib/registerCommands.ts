/**
 * Register all app commands
 * Called once at app startup
 */

import { registerCommand } from './commands'

export function registerAllCommands() {
  // File commands
  registerCommand({
    id: 'export-json',
    name: 'Export to JSON',
    description: 'Export canvas to JSON file',
    keybinding: 'S',
    category: 'file',
    action: async (editor) => {
      if (!editor) return
      const snapshot = editor.getSnapshot()
      const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `spatial-view-${Date.now()}.json`
      a.click()
      URL.revokeObjectURL(url)
    },
  })

  registerCommand({
    id: 'import-json',
    name: 'Import from JSON',
    description: 'Import canvas from JSON file',
    keybinding: 'L',
    category: 'file',
    action: async (editor) => {
      if (!editor) return

      return new Promise<void>((resolve) => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = '.json'
        input.onchange = async (e) => {
          try {
            const file = (e.target as HTMLInputElement).files?.[0]
            if (!file) {
              resolve()
              return
            }
            const text = await file.text()
            const snapshot = JSON.parse(text)
            editor.loadSnapshot(snapshot)
            console.log('Canvas imported successfully')
            resolve()
          } catch (error) {
            console.error('Failed to import canvas:', error)
            alert('Failed to import file. Make sure it is a valid Spatial View JSON file.')
            resolve()
          }
        }
        input.click()
      })
    },
  })

  // View commands
  registerCommand({
    id: 'zoom-to-fit',
    name: 'Zoom to Fit',
    description: 'Zoom to fit all shapes',
    keybinding: 'Shift+1',
    category: 'view',
    action: (editor) => {
      editor?.zoomToFit()
    },
  })

  registerCommand({
    id: 'zoom-to-selection',
    name: 'Zoom to Selection',
    description: 'Zoom to selected shapes',
    keybinding: 'Shift+2',
    category: 'view',
    action: (editor) => {
      editor?.zoomToSelection()
    },
  })

  // Edit commands
  registerCommand({
    id: 'select-all',
    name: 'Select All',
    description: 'Select all shapes',
    keybinding: 'Ctrl+A',
    category: 'edit',
    action: (editor) => {
      editor?.selectAll()
    },
  })

  registerCommand({
    id: 'delete-selected',
    name: 'Delete Selected',
    description: 'Delete selected shapes',
    keybinding: 'Delete',
    category: 'edit',
    action: (editor) => {
      editor?.deleteShapes(editor.getSelectedShapeIds())
    },
  })
}
