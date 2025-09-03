// app/api/ping/route.ts
import { NextResponse } from 'next/server'
import fs from 'fs'
import { db } from '@/lib/db'

export async function GET() {
    try {

        // Test di connessione
        const test = db.prepare('SELECT 1 as ok').get()

        // Versione di SQLite
        const sqliteVersion = db.prepare('SELECT sqlite_version() as version').get()

        // Elenco delle tabelle
        const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all()

        // Conta righe per ciascuna tabella
        const tableStats = tables.map((table: any) => {
            const count = db.prepare(`SELECT COUNT(*) AS count FROM ${table.name}`).get()
            return {
                name: table.name,
                rows: count.count,
            }
        })

        // Dimensione del file in byte
        const dbPath: string = process.env.DATABASE_PATH!; // there is a non-null assertion

        const fileSize = fs.statSync(dbPath).size

        return NextResponse.json({
            status: 'success',
            dbResponse: test,
            stats: {
                sqliteVersion: sqliteVersion.version,
                totalTables: tables.length,
                tables: tableStats,
                fileSizeBytes: fileSize,
            },
        })
} catch (err: unknown) {
             let msg = 'Errore sconosciuto';
            if (err instanceof Error) {
              msg = err.message;
            } 
             return NextResponse.json({ status: 'error', message: msg }, { status: 500 })
        }   
}
