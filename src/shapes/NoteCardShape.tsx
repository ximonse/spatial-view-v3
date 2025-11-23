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
import Markdown from 'react-markdown'
import type { NoteCardShape } from './types'
import { A7_CARD, DEFAULT_CARD_COLOR } from '../lib/constants'

export class NoteCardUtil extends BaseBoxShapeUtil<NoteCardShape> {
  static override type = 'note-card' as const

  // Default properties for new cards
  // A7 index card size: 74×105mm scaled for modern displays
  getDefaultProps(): NoteCardShape['props'] {
    return {
      w: A7_CARD.width,
      h: A7_CARD.height,
      text: '',
      color: DEFAULT_CARD_COLOR,
      fontSize: 'm',
    }
  }

  // Disable resizing - cards auto-grow with content
  canResize = () => false
  isAspectRatioLocked = () => false

  // Enable text editing
  canEdit = () => true

  // Map fontSize to pixel size
  private getFontSize(fontSize: 's' | 'm' | 'l' | 'xl'): string {
    const sizes = {
      s: '16px',
      m: '25px',
      l: '32px',
      xl: '40px',
    }
    return sizes[fontSize]
  }

  // Component that renders the card
  component(shape: NoteCardShape) {
    const theme = getDefaultColorTheme({
      isDarkMode: false,
    })
    const color = theme[shape.props.color]
    const isEditing = this.editor.getEditingShapeId() === shape.id
    const fontSize = this.getFontSize(shape.props.fontSize)

    return (
      <HTMLContainer
        style={{
          width: shape.props.w,
          minHeight: shape.props.h,
          background: color.semi,
          border: `2px solid ${color.solid}`,
          borderRadius: '8px',
          padding: '12px',
          overflow: 'visible',
          display: 'flex',
          alignItems: 'flex-start',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          fontSize,
          lineHeight: '1.5',
          color: '#1a1a1a',
          pointerEvents: 'all',
        }}
      >
        {isEditing ? (
          <textarea
            value={shape.props.text}
            onChange={(e) => {
              this.editor.updateShape({
                id: shape.id,
                type: 'note-card',
                props: { text: e.target.value },
              })
            }}
            onKeyDown={(e) => {
              // Exit edit mode on Escape
              if (e.key === 'Escape') {
                this.editor.setEditingShape(null)
              }
              // Prevent propagation to Tldraw
              e.stopPropagation()
            }}
            autoFocus
            style={{
              width: '100%',
              height: '100%',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              lineHeight: 'inherit',
              color: 'inherit',
              resize: 'none',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
            placeholder="Skriv här..."
          />
        ) : (
          <div
            style={{
              width: '100%',
              cursor: 'text',
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
            }}
            onDoubleClick={() => this.editor.setEditingShape(shape.id)}
          >
            {shape.props.text ? (
              <Markdown
                components={{
                  p: ({ children }) => <p style={{ margin: '0 0 0.5em 0' }}>{children}</p>,
                  em: ({ children }) => <em style={{ color: '#666' }}>{children}</em>,
                  strong: ({ children }) => <strong>{children}</strong>,
                  h1: ({ children }) => <h1 style={{ fontSize: '1.4em', fontWeight: 'bold', margin: '0.3em 0 0.2em 0' }}>{children}</h1>,
                  h2: ({ children }) => <h2 style={{ fontSize: '1.2em', fontWeight: 'bold', margin: '0.3em 0 0.2em 0' }}>{children}</h2>,
                  h3: ({ children }) => <h3 style={{ fontSize: '1.1em', fontWeight: 'bold', margin: '0.3em 0 0.2em 0' }}>{children}</h3>,
                }}
              >
                {shape.props.text}
              </Markdown>
            ) : (
              <span style={{ color: '#999' }}>Dubbelklicka för att redigera...</span>
            )}
          </div>
        )}
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

  // Handle double-click to edit
  override onDoubleClick = () => {
    // Handled by component double-click
  }

  // Handle text changes during editing
  override onEditEnd = () => {
    // Text is automatically saved via updateShape
  }
}
