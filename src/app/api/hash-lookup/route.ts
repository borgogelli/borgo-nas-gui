import { NextRequest, NextResponse } from 'next/server'
import Database from 'better-sqlite3'
import path from 'path'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
    console.log("Processing a POST request...");
    try {
        const { sha1 } = await req.json()
        console.log("Hash: " + sha1);
        if (!sha1 || typeof sha1 !== 'string' || sha1.length !== 40) {
            return NextResponse.json({ status: 'error', message: 'SHA-1 non valido' }, { status: 400 })
        }

        const stmt = db.prepare('SELECT * FROM FileHash WHERE sha1Hash = ?')
        const rows = stmt.all(sha1)

        return NextResponse.json({ status: 'success', results: rows })
    } catch (error: any) {
        return NextResponse.json({ status: 'error', message: error.message }, { status: 500 })
    }
} 
