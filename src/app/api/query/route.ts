import { NextRequest, NextResponse } from 'next/server'
import Database from 'better-sqlite3'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get('query')
    const page = parseInt(searchParams.get('page') || '0')
    // const pageSize = parseInt(searchParams.get('pageSize') || '10');
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10)

    const offset = page * pageSize
    const folderName = searchParams.get('folderName') || ''
 
    let stmt
    switch (query) {
        
        case 'query1':
            stmt = db.prepare(`
        SELECT fileName, sha1Hash, COUNT(*) as count
        FROM FileHash
        GROUP BY fileName, sha1Hash
        HAVING COUNT(*) > 1
        ORDER BY fileName
        LIMIT ? OFFSET ?`)
            return NextResponse.json(stmt.all(pageSize, offset))

        case 'query2':
            stmt = db.prepare(`
        SELECT *
        FROM FileHash
        WHERE sha1Hash IN (
          SELECT sha1Hash FROM FileHash GROUP BY sha1Hash HAVING COUNT(*) > 1
        )
        ORDER BY fileName, sha1Hash
        LIMIT ? OFFSET ?`)
            return NextResponse.json(stmt.all(pageSize, offset))

        case 'query3':
            stmt = db.prepare(`
       SELECT folderName, sha1Hash, COUNT(*) as count 
        FROM FileHash
        WHERE sha1Hash IN (
            SELECT sha1Hash FROM FileHash GROUP BY sha1Hash HAVING COUNT(sha1Hash) > 1
        )
        GROUP BY folderName
        HAVING COUNT(*) > 1 
        ORDER BY count DESC
        LIMIT ? OFFSET ?`)
            return NextResponse.json(stmt.all(pageSize, offset))

        case 'query4':
            stmt = db.prepare(`
        SELECT * FROM FileHash
        WHERE sha1Hash IN (
          SELECT sha1Hash FROM FileHash
          WHERE sha1Hash IN (
            SELECT sha1Hash FROM FileHash GROUP BY sha1Hash HAVING COUNT(*) > 1
          ) AND folderName = ?
        )
        ORDER BY sha1Hash
        LIMIT ? OFFSET ?`)
            return NextResponse.json(stmt.all(folderName, pageSize, offset))

        case 'query9':
            stmt = db.prepare(`
        SELECT FileHash.*, COUNT(*) as count  
        FROM FileHash
        GROUP BY fileName, folderName HAVING COUNT(*) > 1         
        ORDER BY fileName
        LIMIT ? OFFSET ?`)
            return NextResponse.json(stmt.all(pageSize, offset))

        default:
            return NextResponse.json({ error: 'Query non valida' }, { status: 400 })
    }
}
