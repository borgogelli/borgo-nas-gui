import { NextRequest, NextResponse } from 'next/server'
import Database from 'better-sqlite3'
import { db } from '@/lib/db'
import {
    CountRow,
    FileRecordQ0,
    FileRecordQ01,
    FileRecordQ02,
    FileRecordQ03,
    FileRecordQ04,
    FileRecordQ09,
    QueryResult,
} from './types'

const q0 = ( limit: number, offset: number, orderby: string): QueryResult<FileRecordQ0> => {

    const page = Math.floor(offset / limit) + 1;

    const sql0Tot = `
    SELECT COUNT(*) as total FROM ( 
        SELECT FileHash.* 
        FROM FileHash);
        `

    const { total } = db.prepare(sql0Tot).get() as CountRow

    const sql0 = `
        SELECT FileHash.* 
        FROM FileHash
        ORDER BY ?
        LIMIT ? OFFSET ?
        `

    if (!orderby) {
        orderby = 'fileName'
    }
    const rows: FileRecordQ0[] = db.prepare(sql0).all([orderby, limit, offset]) as FileRecordQ0[]
    return {
        status: 'success',
        data: rows,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    }
}

const q1 = (limit: number, offset: number, orderby: string): QueryResult<FileRecordQ01> => {

    const page = Math.floor(offset / limit) + 1;

    const sql1Tot = `
    SELECT COUNT(*) as total FROM ( 
        SELECT fileName, mimeType, sha1Hash, COUNT(*) as count
        FROM FileHash
        GROUP BY fileName, mimeType, sha1Hash
        HAVING COUNT(*) > 1);
        `

    const { total } = db.prepare(sql1Tot).get() as CountRow

    const sql1 = `
        SELECT fileName, mimeType, sha1Hash, COUNT(*) as count
        FROM FileHash
        GROUP BY fileName, mimeType, sha1Hash
        HAVING COUNT(*) > 1
        ORDER BY ?
        LIMIT ? OFFSET ?`

    if (!orderby) {
        orderby = 'fileName'
    }
    const rows: FileRecordQ01[] = db.prepare(sql1).all(orderby, limit, offset) as FileRecordQ01[]

    return {
        status: 'success',
        data: rows,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    }
}

const q2 = ( limit: number, offset: number, orderby: string): QueryResult<FileRecordQ02> => {

    const page = Math.floor(offset / limit) + 1;

    const sql2Tot = `
           SELECT COUNT(*) as total FROM (  
        SELECT FileHash.*
        FROM FileHash
        WHERE sha1Hash IN (
          SELECT sha1Hash FROM FileHash 
          GROUP BY sha1Hash HAVING COUNT(*) > 1
        )
);
`

    const { total } = db.prepare(sql2Tot).get() as CountRow

    const sql2 = `
        SELECT FileHash.*
        FROM FileHash
        WHERE sha1Hash IN (
          SELECT sha1Hash FROM FileHash 
          GROUP BY sha1Hash HAVING COUNT(*) > 1
        )
        ORDER BY ?
        LIMIT ? OFFSET ?
`

    if (!orderby) {
        orderby = 'fileName, sha1Hash'
    }
    const rows : FileRecordQ02[] = db.prepare(sql2).all([orderby, limit, offset]) as FileRecordQ02[];

    return {
        status: 'success',
        data: rows,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    }
}

const q3 = (limit: number, offset: number, orderby: string): QueryResult<FileRecordQ03> => {

    const page = Math.floor(offset / limit) + 1;

    const sql3Tot = `
       SELECT COUNT(*) as total FROM (
        SELECT folderName,  COUNT(*) as count 
          FROM FileHash
          WHERE sha1Hash IN (
              SELECT sha1Hash FROM FileHash 
              GROUP BY sha1Hash HAVING COUNT(sha1Hash) > 1
          )
          GROUP BY folderName 
          HAVING COUNT(*) > 1 
      )`

    const { total } = db.prepare(sql3Tot).get() as CountRow

    const sql3 = `
       SELECT folderName, COUNT(*) as count 
        FROM FileHash
        WHERE sha1Hash IN (
            SELECT sha1Hash FROM FileHash GROUP BY sha1Hash HAVING COUNT(sha1Hash) > 1
        )
        GROUP BY folderName 
        HAVING COUNT(*) > 1 
        ORDER BY ?
        LIMIT ? OFFSET ?`

    if (!orderby) {
        orderby = 'count DESC, folderName'
    }
    const rows: FileRecordQ03[] = db.prepare(sql3).all([orderby, limit, offset]) as FileRecordQ03[]

    return {
        status: 'success',
        data: rows,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    }
}

const q4 = (folderPattern: string, filePattern: string, hashPattern: string, limit: number, offset: number, orderby: string): QueryResult<FileRecordQ04> => {

    const page = Math.floor(offset / limit) + 1;

    const sql4Tot = `
       SELECT COUNT(*) as total FROM (
    SELECT FileHash.*
        FROM FileHash
        WHERE 
            folderName LIKE ?
            AND fileName LIKE ?
            AND sha1Hash LIKE ?
            AND sha1Hash IN (
                SELECT sha1Hash
                FROM FileHash
                GROUP BY sha1Hash
                HAVING COUNT(*) > 1 
            )
      )`


          const values0 = [`%${folderPattern}%`, `%${filePattern}%`, `%${hashPattern}%`]


    const { total } = db.prepare(sql4Tot).get(values0) as CountRow
 
    const sql4 = `
    SELECT FileHash.*
        FROM FileHash
        WHERE 
            folderName LIKE ?
            AND fileName LIKE ?
            AND sha1Hash LIKE ?
            AND sha1Hash IN (
                SELECT sha1Hash
                FROM FileHash
                GROUP BY sha1Hash
                HAVING COUNT(*) > 1
            )
             ORDER BY ?
                LIMIT ? OFFSET ?  
      `

    if (!orderby) {
        orderby = 'sha1Hash'
    }

     const values = [`%${folderPattern}%`, `%${filePattern}%`, `%${hashPattern}%`, orderby, limit, offset]


    const rows: FileRecordQ04[] = db.prepare(sql4).all(values) as FileRecordQ04[]

    return {
        status: 'success',
        data: rows,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    }
}

const q9 = ( limit: number, offset: number, orderby: string): QueryResult<FileRecordQ09> => {

    const page = Math.floor(offset / limit) + 1;

    const sql9tot = `
       SELECT COUNT(*) as total FROM (
          SELECT fileName,   COUNT(*) as count 
          FROM FileHash 
          GROUP BY fileName 
          HAVING COUNT(*) > 1 
      )`

    const sql9 = `
      SELECT fileName,  COUNT(*) as count 
      FROM FileHash 
      GROUP BY fileName 
      HAVING COUNT(*) > 1 
      ORDER BY ? 
      LIMIT ? OFFSET ?
      `

    const { total } = db.prepare(sql9tot).get() as CountRow

    if (!orderby) {
        orderby = 'fileName'
    }
    const rows : FileRecordQ09[]  = db.prepare(sql9).all([orderby, limit, offset]) as FileRecordQ09[]

    return {
        status: 'success',
        data: rows,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    }
}


export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const query = searchParams.get('query')
        
        const page = parseInt(searchParams.get('page') || '0')

        // const pageSize = parseInt(searchParams.get('pageSize') || '10');
        const limit = parseInt(searchParams.get('pageSize') || '10', 10)        
        const offset = (page - 1) * limit
        // Quindi: 
        // const page = Math.floor(offset / limit) + 1;

        const orderBy = ''


        const folderPattern = searchParams.get('folderPattern') || ''
        const filePattern = searchParams.get('filePattern') || ''
        const hashPattern = searchParams.get('hashPattern') || ''
   

        switch (query) {
            case 'query0':
                let result0: QueryResult<FileRecordQ0> = q0(limit, offset, orderBy)
                return NextResponse.json(result0)
                break
            case 'query1':
                let result1: QueryResult<FileRecordQ01> = q1(limit, offset, orderBy)
                return NextResponse.json(result1)
                break
            case 'query2':
                let result2: QueryResult<FileRecordQ02> = q2(limit, offset, orderBy)
                return NextResponse.json(result2)
                break
            case 'query3':
                let result3: QueryResult<FileRecordQ03> = q3(limit, offset, orderBy)
                return NextResponse.json(result3)
                break
            case 'query4':
                let result4: QueryResult<FileRecordQ04> = q4(folderPattern, filePattern, hashPattern, limit, offset, orderBy)
                return NextResponse.json(result4)
                break
            case 'query9':
                let result9: QueryResult<FileRecordQ09> = q9(limit, offset, orderBy)
                return NextResponse.json(result9)                
                break
            default:
                return NextResponse.json({ error: 'Query non valida' }, { status: 400 })
                break
        }
    } catch (err: any) {
        console.error('Errore durante la query:', err)

        return NextResponse.json(
            {
                error: err.message || 'Errore sconosciuto',
                stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
            },
            { status: 500 }
        )
    }
}
