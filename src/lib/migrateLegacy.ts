/**
 * Migrate legacy Spatial View V2 JSON to Tldraw format
 */

import type { Editor, TLShapeId } from 'tldraw'
import { A7_CARD } from './constants'

// Legacy V2 card format
interface LegacyCard {
  text: string
  comments?: string
  tags?: string[]
  cardColor?: string
  position: { x: number; y: number }
  locked?: boolean
  id?: number
  image?: { base64: string }
}

interface LegacyExport {
  type: 'full'
  version: string
  exportedAt: number
  cards: LegacyCard[]
}

// Map legacy colors to Tldraw colors
const COLOR_MAP: Record<string, string> = {
  'card-color-1': 'light-blue',
  'card-color-2': 'light-green',
  'card-color-3': 'yellow',
  'card-color-4': 'orange',
  'card-color-5': 'light-red',
  'card-color-6': 'light-violet',
  'card-color-7': 'grey',
  'card-color-8': 'blue',
}

/**
 * Check if JSON is legacy format
 */
export function isLegacyFormat(data: unknown): data is LegacyExport {
  return (
    typeof data === 'object' &&
    data !== null &&
    'cards' in data &&
    Array.isArray((data as LegacyExport).cards)
  )
}

/**
 * Migrate legacy cards to Tldraw NoteCards
 */
export function migrateLegacyCards(editor: Editor, legacyData: LegacyExport) {
  const shapes = legacyData.cards.map((card, index) => {
    const shapeId = `shape:${Date.now()}_${index}` as TLShapeId
    const color = COLOR_MAP[card.cardColor || 'card-color-1'] || 'light-blue'

    // Combine text, comments, and tags
    let fullText = card.text || ''
    if (card.comments) {
      fullText += `\n\n[Kommentar]\n${card.comments}`
    }
    if (card.tags && card.tags.length > 0) {
      fullText += `\n\n[Taggar]\n${card.tags.join(', ')}`
    }

    return {
      id: shapeId,
      type: 'note-card',
      x: card.position.x,
      y: card.position.y,
      props: {
        w: A7_CARD.width,
        h: A7_CARD.height,
        text: fullText,
        color,
      },
    }
  })

  // Create all shapes
  editor.createShapes(shapes)

  console.log(`Migrated ${shapes.length} cards from legacy format`)
}
