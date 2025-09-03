import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
    try {
        const { fileName } = await req.json()

        if (!fileName || typeof fileName !== 'string') {
            return NextResponse.json({ status: 'error', message: 'Invalid fileName' }, { status: 400 })
        }

        const rows = db.prepare('SELECT * FROM FileHash WHERE fileName = ?').all(fileName)

        return NextResponse.json({ status: 'success', results: rows })
    } catch (error: any) {
        return NextResponse.json({ status: 'error', message: error.message }, { status: 500 })
    }
}
