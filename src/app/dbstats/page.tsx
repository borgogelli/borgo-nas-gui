'use client'

import { useEffect, useState } from 'react'

type TableStat = {
    name: string
    rows: number
}

type StatsResponse = {
    status: string
    dbResponse: { ok: number }
    stats: {
        sqliteVersion: string
        totalTables: number
        tables: TableStat[]
        fileSizeBytes: number
    }
}

export default function DbStatsPage() {
    const [data, setData] = useState<StatsResponse | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetch('/api/ping')
            .then((res) => res.json())
            .then(setData)
            .catch((err) => setError(err.message))
    }, [])

    if (error) {
        return <div className="p-4 text-red-500">Errore: {error}</div>
    }

    if (!data) {
        return <div className="p-4">Caricamento...</div>
    }

    const { stats } = data

    return (
        <div className="p-6 max-w-3xl mx-auto font-mono">
            <h1 className="text-2xl font-bold mb-4">Statistiche Database SQLite</h1>

            <div className="mb-4">
                <p>
                    <strong>Versione SQLite:</strong> {stats.sqliteVersion}
                </p>
                <p>
                    <strong>Tabelle totali:</strong> {stats.totalTables}
                </p>
                <p>
                    <strong>Dimensione file:</strong> {formatBytes(stats.fileSizeBytes)}
                </p>
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-2">Tabelle:</h2>
            <table className="w-full table-auto border border-gray-300">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="p-2 border">Nome</th>
                        <th className="p-2 border">Righe</th>
                    </tr>
                </thead>
                <tbody>
                    {stats.tables.map((table) => (
                        <tr key={table.name} className="border-t">
                            <td className="p-2 border">{table.name}</td>
                            <td className="p-2 border">{table.rows}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`
    const kb = bytes / 1024
    if (kb < 1024) return `${kb.toFixed(2)} KB`
    const mb = kb / 1024
    return `${mb.toFixed(2)} MB`
}
