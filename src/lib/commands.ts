/**
 * Command Registry System
 * Central registry for all app commands with keyboard shortcuts
 */

import type { Editor } from 'tldraw'

export interface Command {
  id: string
  name: string
  description: string
  keybinding?: string
  category: 'file' | 'edit' | 'view' | 'cards' | 'arrange' | 'ai'
  action: (editor: Editor | null) => void | Promise<void>
}

// Command registry - will be populated by features
export const commands = new Map<string, Command>()

/**
 * Register a command
 */
export function registerCommand(command: Command) {
  commands.set(command.id, command)
}

/**
 * Get all commands
 */
export function getAllCommands(): Command[] {
  return Array.from(commands.values())
}

/**
 * Get command by ID
 */
export function getCommand(id: string): Command | undefined {
  return commands.get(id)
}

/**
 * Find commands by search query
 */
export function searchCommands(query: string): Command[] {
  const lowerQuery = query.toLowerCase()
  return getAllCommands().filter(
    (cmd) =>
      cmd.name.toLowerCase().includes(lowerQuery) ||
      cmd.description.toLowerCase().includes(lowerQuery) ||
      cmd.id.toLowerCase().includes(lowerQuery)
  )
}
