// pages/dbtest.tsx
'use client'
import { useEffect, useState } from 'react'

export default function DBTestPage() {
    const [result, setResult] = useState<{ status: string; message?: string } | null>(null)

    useEffect(() => {
        fetch('/api/ping')
            .then((res) => res.json())
            .then((json) => setResult(json))
            .catch((err) => setResult({ status: 'error', message: err.message }))
    }, [])

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Test Connessione SQLite</h1>
            {result === null ? (
                <p>Verifica in corso...</p>
            ) : result.status === 'success' ? (
                <p style={{ color: 'green' }}>✅ Connessione riuscita!</p>
            ) : (
                <p style={{ color: 'red' }}>❌ Errore: {result.message}</p>
            )}
        </div>
    )
}
