/**
 * IndexedDB setup using Dexie
 * Stores Tldraw canvas state for persistence
 */

import Dexie, { type EntityTable } from 'dexie'

// Define the shape of our stored data
interface CanvasSnapshot {
  id: string // Always 'current' for single-user app
  snapshot: string // JSON stringified Tldraw snapshot
  updatedAt: Date
}

// Define database schema
class SpatialViewDB extends Dexie {
  canvasSnapshots!: EntityTable<CanvasSnapshot, 'id'>

  constructor() {
    super('SpatialViewDB')

    // Schema version 1
    this.version(1).stores({
      canvasSnapshots: 'id, updatedAt',
    })
  }
}

// Create and export database instance
export const db = new SpatialViewDB()

// Export types
export type { CanvasSnapshot }
