'use client'

import { useState } from 'react'

type FileHash = {
    id: number
    filePath: string
    folderName: string
    fileName: string
    sha1Hash: string
    md5Hash: string
    mimeType: string
    fileTimestamp: string
    fileSize: number
    InfoUpdated: string
}

interface MyData {
  id: number
  name: string
  // ...altre proprietà
}

export default function SearchPage() {
    const [fileName, setFileName] = useState('')
    const [results, setResults] = useState<FileHash[] | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setResults(null)

        try {
            const res: Response = await fetch('/api/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fileName }),
            })

           // const data: MyData[] = await res.json()
            const data = await res.json()
            if (data.status === 'success') {
                setResults(data.results)
            } else {
                setError(data.message || 'Errore nella ricerca')
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                  setError('Errore sconosciuto') 
            }
        }
    }

    return (
        <div className="p-6 max-w-4xl mx-auto font-mono">
            <h1 className="text-2xl font-bold mb-4">Cerca File per Nome</h1>

            <form onSubmit={handleSearch} className="mb-6 flex gap-2">
                <input
                    type="text"
                    placeholder="Nome file esatto (es: foto.jpg)"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    className="border p-2 flex-grow rounded"
                    required
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Cerca
                </button>
            </form>

            {error && <div className="text-red-600 mb-4">Errore: {error}</div>}

            {results && (
                <>
                    <h2 className="text-xl font-semibold mb-2">Risultati:</h2>
                    {results.length === 0 ? (
                        <p>Nessun file trovato con quel nome.</p>
                    ) : (
                        <table className="w-full text-sm border border-collapse">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border p-2">File</th>
                                    <th className="border p-2">SHA1</th>
                                    <th className="border p-2">Size</th>
                                    <th className="border p-2">Timestamp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((file) => (
                                    <tr key={file.id}>
                                        <td className="border p-2">{file.filePath}</td>
                                        <td className="border p-2">{file.sha1Hash}</td>
                                        <td className="border p-2 text-right">{file.fileSize}</td>
                                        <td className="border p-2">{file.fileTimestamp}</td>
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
