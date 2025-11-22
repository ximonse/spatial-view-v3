/**
 * NoteCard Custom Shape for Tldraw
 * A card with text content, similar to sticky notes
 */

import {
  BaseBoxShapeUtil,
  HTMLContainer,
  resizeBox,
  getDefaultColorTheme,
  type TLResizeInfo,
} from 'tldraw'
import type { NoteCardShape } from './types'

export class NoteCardUtil extends BaseBoxShapeUtil<NoteCardShape> {
  static override type = 'note-card' as const

  // Default properties for new cards
  getDefaultProps(): NoteCardShape['props'] {
    return {
      w: 300,
      h: 200,
      text: '',
      color: 'light-blue',
    }
  }

  // Aspect ratio behavior
  canResize = () => true
  isAspectRatioLocked = () => false

  // Component that renders the card
  component(shape: NoteCardShape) {
    const theme = getDefaultColorTheme({
      isDarkMode: false,
    })
    const color = theme[shape.props.color]

    return (
      <HTMLContainer
        style={{
          width: shape.props.w,
          height: shape.props.h,
          background: color.semi,
          border: `2px solid ${color.solid}`,
          borderRadius: '8px',
          padding: '12px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-start',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          fontSize: '14px',
          lineHeight: '1.5',
          color: '#1a1a1a',
          userSelect: 'none',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            overflow: 'auto',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {shape.props.text || 'Klicka för att redigera...'}
        </div>
      </HTMLContainer>
    )
  }

  // Indicator shown when shape is selected
  indicator(shape: NoteCardShape) {
    return <rect width={shape.props.w} height={shape.props.h} />
  }

  // Handle resizing
  override onResize = (shape: NoteCardShape, info: TLResizeInfo<NoteCardShape>) => {
    return resizeBox(shape, info)
  }
}
