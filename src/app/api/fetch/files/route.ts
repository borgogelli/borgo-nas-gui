import { NextRequest, NextResponse } from 'next/server'
import Database from 'better-sqlite3'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url)
        const page = parseInt(url.searchParams.get('page') || '1', 10)
        const limit = parseInt(url.searchParams.get('limit') || '10', 10)
        const offset = (page - 1) * limit

        const total = db.prepare('SELECT COUNT(*) as count FROM FileHash').get().count
        const rows = db.prepare('SELECT * FROM FileHash LIMIT ? OFFSET ?').all(limit, offset)

        return NextResponse.json({
            status: 'success',
            data: rows,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        })
    } catch (error: any) {
        return NextResponse.json({ status: 'error', message: error.message }, { status: 500 })
    }
}
