/**
 * Register all app commands
 * Called once at app startup
 */

import { registerCommand } from './commands'
import { isLegacyFormat, migrateLegacyCards } from './migrateLegacy'

export function registerAllCommands() {
  // Card commands
  registerCommand({
    id: 'new-card',
    name: 'New Card',
    description: 'Create a new note card',
    keybinding: 'N',
    category: 'cards',
    action: (editor) => {
      if (!editor) return

      // Get viewport center
      const viewportCenter = editor.getViewportPageCenter()

      // Create new card at viewport center
      editor.createShape({
        type: 'note-card',
        x: viewportCenter.x - 310, // Half of card width (620/2)
        y: viewportCenter.y - 220, // Half of card height (440/2)
      })
    },
  })

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
            const data = JSON.parse(text)

            const keys = Object.keys(data)
            console.log('Imported data structure:', {
              hasCards: 'cards' in data,
              hasStore: 'store' in data,
              hasSchema: 'schema' in data,
              keys: keys,
              firstKey: keys[0],
              secondKey: keys[1],
            })

            // Check if legacy Spatial View V2 format (Konva)
            if (isLegacyFormat(data)) {
              console.log('Detected legacy Spatial View V2 format, migrating...')
              try {
                migrateLegacyCards(editor, data)
                console.log('Legacy cards migrated successfully')
              } catch (migrationError) {
                console.error('Migration failed:', migrationError)
                alert(`Failed to migrate legacy file: ${migrationError}`)
                resolve()
                return
              }
            } else if ('document' in data) {
              // Old Tldraw format (v1.x) - not supported
              console.error('Old Tldraw v1.x format detected - not supported')
              alert('This file is from an older version of Tldraw and cannot be imported. Please export it as Spatial View V2 format first.')
              resolve()
              return
            } else {
              // Modern Tldraw format (v2.x/v3.x)
              console.log('Attempting to load modern Tldraw snapshot...')
              try {
                editor.loadSnapshot(data)
                console.log('Canvas imported successfully')
              } catch (snapshotError) {
                console.error('Snapshot load failed:', snapshotError)
                alert(`Failed to load snapshot: ${snapshotError}`)
                resolve()
                return
              }
            }
            resolve()
          } catch (error) {
            console.error('Failed to import canvas:', error)
            alert(`Failed to import file: ${error instanceof Error ? error.message : 'Unknown error'}`)
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

  // Font size commands
  const fontSizes: Array<{ size: 's' | 'm' | 'l' | 'xl'; name: string; key: string }> = [
    { size: 's', name: 'Small', key: '1' },
    { size: 'm', name: 'Medium', key: '2' },
    { size: 'l', name: 'Large', key: '3' },
    { size: 'xl', name: 'Extra Large', key: '4' },
  ]

  fontSizes.forEach(({ size, name, key }) => {
    registerCommand({
      id: `font-size-${size}`,
      name: `Font Size: ${name}`,
      description: `Set font size to ${name.toLowerCase()}`,
      keybinding: `Alt+${key}`,
      category: 'edit',
      action: (editor) => {
        if (!editor) return
        const selectedIds = editor.getSelectedShapeIds()
        const updates = selectedIds
          .map((id) => {
            const shape = editor.getShape(id)
            if (shape?.type === 'note-card') {
              return { id, type: 'note-card' as const, props: { fontSize: size } }
            }
            return null
          })
          .filter((u): u is NonNullable<typeof u> => u !== null)

        if (updates.length > 0) {
          editor.updateShapes(updates)
        }
      },
    })
  })
}
