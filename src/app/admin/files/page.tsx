'use client'

import { useEffect, useState } from 'react'

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

type ApiResponse = {
    status: string
    data: FileHash[]
    pagination: {
        total: number
        page: number
        limit: number
        totalPages: number
    }
}

export default function FileListPage() {
    const [files, setFiles] = useState<FileHash[]>([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const limit = 10

    useEffect(() => {
        fetch(`/api/fetch/files?page=${page}&limit=${limit}`)
            .then((res) => res.json())
            .then((res: ApiResponse) => {
                setFiles(res.data)
                setTotalPages(res.pagination.totalPages)
            })
    }, [page])

    return (
        <div className="p-6 max-w-6xl mx-auto font-mono">
            <h1 className="text-2xl font-bold mb-4">FileHash Records</h1>

            <table className="w-full border-collapse border border-gray-300 mb-6 text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2">File</th>
                        <th className="border p-2">SHA1</th>
                        <th className="border p-2">MD5</th>
                        <th className="border p-2">MIME</th>
                        <th className="border p-2">Size (bytes)</th>
                        <th className="border p-2">Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {files.map((file) => (
                        <tr key={file.id}>
                            <td className="border p-2">{file.filePath}</td>
                            <td className="border p-2 truncate max-w-[160px]">{file.sha1Hash}</td>
                            <td className="border p-2 truncate max-w-[140px]">{file.md5Hash}</td>
                            <td className="border p-2">{file.mimeType}</td>
                            <td className="border p-2 text-right">{file.fileSize}</td>
                            <td className="border p-2">{file.fileTimestamp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Paginazione */}
            <div className="flex gap-2 justify-center">
                <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className="px-4 py-1 border rounded disabled:opacity-50"
                >
                    ← Prev
                </button>
                <span className="px-4 py-1">
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}
                    className="px-4 py-1 border rounded disabled:opacity-50"
                >
                    Next →
                </button>
            </div>
        </div>
    )
}
