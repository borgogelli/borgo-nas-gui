// pages/api/duplicates.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import Database from 'better-sqlite3'
import path from 'path'

// Percorso assoluto al tuo DB
const dbPath = path.resolve(process.cwd(), 'db', 'filehash.db')
const db = new Database(dbPath)

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const query = `
      SELECT * FROM FileHash
      WHERE (filePath, sha1Hash) IN (
        SELECT filePath, sha1Hash
        FROM FileHash
        GROUP BY filePath, sha1Hash
        HAVING COUNT(*) > 1
      )
      ORDER BY sha1Hash
    `

        const duplicates = db.prepare(query).all()
        res.status(200).json({ data: duplicates })
    } catch (err) {
        res.status(500).json({ error: 'Errore durante la query al database.' })
    }
}
