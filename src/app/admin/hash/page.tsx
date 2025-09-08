'use client'

import { useState } from 'react'

type FileHash = {
    id: number
    filePath: string
    folderName: string
    fileName: string
    sha1Hash: string
    fileSize: number
    fileTimestamp: string
}

export default function HashSearchPage() {
    const [result, setResult] = useState<FileHash[] | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const file = (e.currentTarget.elements.namedItem('file') as HTMLInputElement)?.files?.[0]

        if (!file) return

        setLoading(true)
        setError(null)
        setResult(null)

        try {
            const hash = await computeSHA1(file)

            const res = await fetch('/api/hash-lookup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sha1: hash }),
            })

            const data = await res.json()
            console.log("Results : " + JSON.stringify(data))
            if (data.status === 'success') {
                setResult(data.results)
            } else {
                setError(data.message || 'Errore durante la ricerca')
            }
        } catch (err: unknown) {
            console.log("Error : " + JSON.stringify(err))
            if (err instanceof Error) {
            setError(err.message)
            }else{
             setError('Errore sconosciuto')   
            }
        } finally {
            setLoading(false)
        }
    }

    async function computeSHA1(file: File): Promise<string> {
        const arrayBuffer = await file.arrayBuffer()
        const hashBuffer = await crypto.subtle.digest('SHA-1', arrayBuffer)
        return Array.from(new Uint8Array(hashBuffer))
            .map((b) => b.toString(16).padStart(2, '0'))
            .join('')
    }

    return (
        <div className="p-6 max-w-3xl mx-auto font-mono">
            <h1 className="text-2xl font-bold mb-4">Cerca File per SHA-1</h1>

            <form onSubmit={handleUpload} className="flex flex-col gap-4 mb-6">
                <input type="file" name="file" required className="border p-2" />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
                    {loading ? 'Caricamento...' : 'Carica & Cerca'}
                </button>
            </form>

            {error && <div className="text-red-600 mb-4">Errore: {error}</div>}

            {result && (
                <>
                    <h2 className="text-xl font-semibold mb-2">Risultati:</h2>
                    {result.length === 0 ? (
                        <p>Nessun file trovato con questo hash.</p>
                    ) : (
                        <table className="w-full text-sm border border-collapse">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border p-2">Percorso</th>
                                    <th className="border p-2">SHA1</th>
                                    <th className="border p-2">Dimensione</th>
                                    <th className="border p-2">Data</th>
                                </tr>
                            </thead>
                            <tbody>
                                {result.map((f) => (
                                    <tr key={f.id}>
                                        <td className="border p-2">{f.filePath}</td>
                                        <td className="border p-2">{f.sha1Hash}</td>
                                        <td className="border p-2 text-right">{f.fileSize}</td>
                                        <td className="border p-2">{f.fileTimestamp}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </>
            )}
        </div>
    )
}
