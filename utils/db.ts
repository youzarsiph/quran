/**
 * Database Read operations
 */

import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('quran.db')

const Database = {
  chapters: {
    all: async (callback: (res: any) => void) => {
      await db.transactionAsync(async (tx) => {
        const result = await tx.executeSqlAsync('select * from chapters', [])

        callback(result.rows)
      }, true)
    },
    get: async (id: number, callback: (res: any) => void) => {
      await db.transactionAsync(async (tx) => {
        const result = await tx.executeSqlAsync(
          'select * from chapters where id = ?',
          [id],
        )

        callback(result.rows)
      }, true)
    },
    search: async (query: string, callback: (res: any) => void) => {
      await db.transactionAsync(async (tx) => {
        const result = await tx.executeSqlAsync(
          'select * from chapters where name like ?',
          [`%${query}%`],
        )

        callback(result.rows)
      }, true)
    },
  },
  verses: {
    all: async (callback: (res: any) => void) => {
      await db.transactionAsync(async (tx) => {
        const result = await tx.executeSqlAsync('select * from verses', [])

        callback(result.rows)
      }, true)
    },
    get: async (id: number, callback: (res: any) => void) => {
      await db.transactionAsync(async (tx) => {
        const result = await tx.executeSqlAsync(
          'select * from verses where id = ?',
          [id],
        )

        callback(result.rows)
      }, true)
    },
    search: async (query: string, callback: (res: any) => void) => {
      await db.transactionAsync(async (tx) => {
        const result = await tx.executeSqlAsync(
          'select * from verses where text like ?',
          [`%${query}%`],
        )

        callback(result.rows)
      }, true)
    },
  },
}

export default Database
