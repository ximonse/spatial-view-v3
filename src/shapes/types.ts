/**
 * Type definitions for NoteCard shape
 */

import type { TLBaseShape, TLDefaultColorStyle } from 'tldraw'

export type NoteCardShape = TLBaseShape<
  'note-card',
  {
    w: number
    h: number
    text: string
    color: TLDefaultColorStyle
    fontSize: 's' | 'm' | 'l' | 'xl'
  }
>
