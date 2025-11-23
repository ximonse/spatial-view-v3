/**
 * Command Palette Component
 * Triggered by "/" key, provides fuzzy search for all commands
 */

import { useState, useEffect, useRef } from 'react'
import { searchCommands, type Command } from '../lib/commands'
import type { Editor } from 'tldraw'

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  editor: Editor | null
}

export function CommandPalette({ isOpen, onClose, editor }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [filteredCommands, setFilteredCommands] = useState<Command[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  // Filter commands when query changes
  useEffect(() => {
    const results = query ? searchCommands(query) : []
    setFilteredCommands(results)
    setSelectedIndex(0)
  }, [query])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
      setQuery('')
    }
  }, [isOpen])

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((i) => Math.min(i + 1, filteredCommands.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((i) => Math.max(i - 1, 0))
      } else if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
        e.preventDefault()
        executeCommand(filteredCommands[selectedIndex])
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filteredCommands, selectedIndex])

  const executeCommand = async (command: Command) => {
    console.log('Executing command:', command.name, 'Editor:', editor)
    try {
      await command.action(editor)
      console.log('Command executed successfully')
    } catch (error) {
      console.error('Command failed:', error)
    }
    onClose()
  }

  if (!isOpen) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '20vh',
        zIndex: 10000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '8px',
          width: '600px',
          maxHeight: '400px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search commands..."
          style={{
            width: '100%',
            padding: '16px',
            fontSize: '16px',
            border: 'none',
            outline: 'none',
            borderBottom: '1px solid #e0e0e0',
          }}
        />

        {/* Command list */}
        <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
          {filteredCommands.length === 0 && query && (
            <div style={{ padding: '32px', textAlign: 'center', color: '#999' }}>
              No commands found
            </div>
          )}

          {filteredCommands.map((cmd, index) => (
            <div
              key={cmd.id}
              onClick={() => executeCommand(cmd)}
              style={{
                padding: '12px 16px',
                cursor: 'pointer',
                background: index === selectedIndex ? '#f0f0f0' : 'white',
                borderBottom: '1px solid #f5f5f5',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 500, marginBottom: '2px' }}>{cmd.name}</div>
                  <div style={{ fontSize: '13px', color: '#666' }}>{cmd.description}</div>
                </div>
                {cmd.keybinding && (
                  <kbd
                    style={{
                      background: '#f0f0f0',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontFamily: 'monospace',
                    }}
                  >
                    {cmd.keybinding}
                  </kbd>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
