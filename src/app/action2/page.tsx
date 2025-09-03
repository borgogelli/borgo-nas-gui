// pages/index.tsx
'use client'
import { useEffect, useState } from 'react'

type FileHash = {
    id: number
    filePath: string
    fileName: string
    sha1Hash: string
    fileSize: number
}

export default function Home() {
    const [files, setFiles] = useState<FileHash[]>([])

    useEffect(() => {
        fetch('/api/duplicates')
            .then((res) => res.json())
            .then((json) => setFiles(json.data))
    }, [])

    return (
        <div style={{ padding: '2rem' }}>
            <h1>File Duplicati (per SHA1)</h1>
            {files.length === 0 ? (
                <p>Nessun duplicato trovato.</p>
            ) : (
                <table border={1} cellPadding={6}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>FilePath</th>
                            <th>FileName</th>
                            <th>SHA1 Hash</th>
                            <th>Size (bytes)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {files.map((file) => (
                            <tr key={file.id}>
                                <td>{file.id}</td>
                                <td>{file.filePath}</td>
                                <td>{file.fileName}</td>
                                <td>{file.sha1Hash}</td>
                                <td>{file.fileSize}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}
