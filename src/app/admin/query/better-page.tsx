'use client'

import React, { useEffect, useState, Suspense, useRef, useCallback, useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
 
import { X } from "lucide-react"
import { PaginationControls, usePagination } from './pagination-controls'
import {ToolBar, useToolbar} from './toolbar'
import { FileRecord, Filter, QueryResult } from '@/app/api/query/types'
import { useAlert } from './alert'
import { DemoDialog } from './dialog'
import { useModalAlert } from './modal'
import { formatBytes, formatTimestamp } from './format'

// Memoizza il componente header
const FileHashHeader = React.memo<{
    selectedQuery: string
}>(({ selectedQuery }) => {
    return (
        <TableHeader>
            <TableRow>
                {selectedQuery === 'query1' ? (
                    <>
                        <TableHead>Nome File</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>SHA1</TableHead>
                        <TableHead>Conteggio</TableHead>
                    </>
                ) : selectedQuery === 'query0' || selectedQuery === 'query2' || selectedQuery === 'query4' ? (
                    <>
                        <TableHead>ID</TableHead>
                        <TableHead>Nome Cartella</TableHead>
                        <TableHead>Nome File</TableHead>
                        <TableHead>Tipo</TableHead>                        
                        <TableHead>SHA1</TableHead>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Dimensione</TableHead>
                        <TableHead>Info Updated</TableHead>
                    </>
                ) : selectedQuery === 'query3' ? (
                    <>
                        <TableHead>Nome Cartella</TableHead>
                        <TableHead>Conteggio</TableHead>
                    </>
                ) : (
                    <></>
                )}
            </TableRow>
        </TableHeader>
    )
})
FileHashHeader.displayName = 'FileHashHeader'

// Memoizza il componente della tabella fake
const FakeFileHashTable = React.memo<{
    selectedQuery: string
    pageSize: number
}>(({ selectedQuery, pageSize }) => {
    // Memoizza l'array per evitare ricreazioni
    const skeletonRows = useMemo(() => Array.from({ length: pageSize }), [pageSize])
    
    return (
        <TableBody>
            {skeletonRows.map((_, idx) => (
                <TableRow key={idx}>
                    {selectedQuery === 'query1' ? (
                        <>
                            {Array.from({ length: 4 }).map((_, i) => (
                                <TableCell key={i}>
                                    <Skeleton className="h-4 w-32" />
                                </TableCell>
                            ))}
                        </>
                    ) : selectedQuery === 'query0' || selectedQuery === 'query2' || selectedQuery === 'query4' ? (
                        <>
                            {Array.from({ length: 9 }).map((_, i) => (
                                <TableCell key={i}>
                                    <Skeleton className="h-4 w-24" />
                                </TableCell>
                            ))}
                        </>
                    ) : selectedQuery === 'query3' ? (
                        <>
                            {Array.from({ length: 2}).map((_, i) => (
                                <TableCell key={i}>
                                    <Skeleton className="h-4 w-32" />
                                </TableCell>
                            ))}
                        </>
                    ) : selectedQuery === 'query9' ? (
                        <>
                            {Array.from({ length: 3 }).map((_, i) => (
                                <TableCell key={i}>
                                    <Skeleton className="h-4 w-32" />
                                </TableCell>
                            ))}
                        </>                            
                    ) : (
                        <></>
                    )}
                </TableRow>
            ))}
        </TableBody>
    )
})
FakeFileHashTable.displayName = 'FakeFileHashTable'

// Memoizza il componente della tabella reale
const RealFileHashTable = React.memo<{
    selectedQuery: string
    data: any[]
    onFilterClick: (field: string, value: string) => void
}>(({ selectedQuery, data, onFilterClick }) => {
    return (
        <TableBody>
            {data.map((row, idx) => (
                <TableRow key={row.id || idx}>
                    {selectedQuery === 'query1' ? (
                        <>
                            <TableCell>
                                <button
                                    className="text-blue-600 underline hover:text-blue-800"
                                    onClick={() => onFilterClick(Filter.FileName, row.fileName)}
                                >
                                    {row.fileName}
                                </button>
                            </TableCell>
                            <TableCell>{row.mimeType}</TableCell>
                            <TableCell>
                                <button
                                    className="text-blue-600 underline hover:text-blue-800"
                                    onClick={() => onFilterClick(Filter.Sha1, row.sha1Hash)}
                                >
                                    {row.sha1Hash}
                                </button>
                            </TableCell>
                            <TableCell>{row.count}</TableCell>
                        </>
                    ) : selectedQuery === 'query0' || selectedQuery === 'query2' || selectedQuery === 'query4' ? (
                        <>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>
                                <button
                                    className="text-blue-600 underline hover:text-blue-800"
                                    onClick={() => onFilterClick(Filter.FolderName, row.folderName)}
                                >
                                    {row.folderName}
                                </button>
                            </TableCell>
                            <TableCell>
                                <button
                                    className="text-blue-600 underline hover:text-blue-800"
                                    onClick={() => onFilterClick(Filter.FileName, row.fileName)}
                                >
                                    {row.fileName}
                                </button>
                            </TableCell>
                            <TableCell>{row.mimeType}</TableCell>
                            <TableCell>
                                <button
                                    className="text-blue-600 underline hover:text-blue-800"
                                    onClick={() => onFilterClick(Filter.Sha1, row.sha1Hash)}
                                >
                                    {row.sha1Hash}
                                </button>
                            </TableCell>
                            <TableCell>{formatTimestamp(row.fileTimestamp)}</TableCell>
                            <TableCell>{formatBytes(row.fileSize)}</TableCell>
                            <TableCell>{formatTimestamp(row.infoUpdated)}</TableCell>
                        </>
                    ) : selectedQuery === 'query3' ? (
                        <>
                            <TableCell>
                                <button
                                    className="text-blue-600 underline hover:text-blue-800"
                                    onClick={() => onFilterClick(Filter.FolderName, row.folderName)}
                                >
                                    {row.folderName}
                                </button>
                            </TableCell>
                            <TableCell>
                                <button
                                    className="text-blue-600 underline hover:text-blue-800"
                                    onClick={() => onFilterClick(Filter.Sha1, row.sha1Hash)}
                                >
                                    {row.sha1Hash}
                                </button>
                            </TableCell>
                            <TableCell>{row.count}</TableCell>
                        </>
                    ) : selectedQuery === 'query9' ? (
                        <>
                            <TableCell>
                                <button
                                    className="text-blue-600 underline hover:text-blue-800"
                                    onClick={() => onFilterClick(Filter.FileName, row.fileName)}
                                >
                                    {row.fileName}
                                </button>
                            </TableCell>
                            <TableCell>{row.count}</TableCell>
                        </>
                    ) : (
                        <></>
                    )}
                </TableRow>
            ))}
        </TableBody>
    )
})
RealFileHashTable.displayName = 'RealFileHashTable'

// Memoizza il componente della tabella principale
const FileHashTable = React.memo<{
    isLoading: boolean
    selectedQuery: string
    pageSize: number
    data: QueryResult<any>
    onFilterClick: (field: string, value: string) => void
}>(({ isLoading, selectedQuery, pageSize, data, onFilterClick }) => {
    return (
        <Table>
            <FileHashHeader selectedQuery={selectedQuery} />
            {isLoading ? (
                <FakeFileHashTable selectedQuery={selectedQuery} pageSize={pageSize} />
            ) : (
                <RealFileHashTable selectedQuery={selectedQuery} data={data.data} onFilterClick={onFilterClick} />
            )}
        </Table>
    )
})
FileHashTable.displayName = 'FileHashTable'

// Sposta emptyResult fuori dal componente per evitare ricreazioni
const emptyResult: QueryResult<any[]> = {
    status: '',
    data: [],
    pagination: {
        total: 0,
        page: 0,
        limit: 0,
        totalPages: 0,
    },
}

export default function FileHashGrid() {
    const { showAlert, ModalAlert } = useModalAlert()
    const [data, setData] = useState<QueryResult<any>>(emptyResult)
    const { layout, setLayout } = usePagination()
    const { filter, setFilter } = useToolbar()
    const [isLoading, setIsLoading] = useState(false)

    // Memoizza la funzione fetchData
    const fetchData = useCallback(async (url: string) => {
        console.log("FileHashGrid.fetchData()...")
        try {
            setIsLoading(true)
            const res = await fetch(url)
            const newData = await res.json()
            setData(newData)
        } catch (error) {
            console.error("Errore nel fetch:", error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    // Memoizza l'URL per evitare ricreazioni inutili
    const apiUrl = useMemo(() => {
        const page = layout.page
        const pageSize = layout.pageSize
        const selectedQuery = filter.query
        const selectedFilename = filter.filename
        const selectedFolder = filter.folder
        const selectedSha1 = filter.sha1

        let url = `/api/query?query=${selectedQuery}&page=${page}&pageSize=${pageSize}`
        
        if (selectedQuery === 'query4') {
            if (selectedFolder) {
                url += `&folderPattern=${encodeURIComponent(selectedFolder)}`
            }
            if (selectedFilename) {
                url += `&filePattern=${encodeURIComponent(selectedFilename)}`
            }
            if (selectedSha1) {
                url += `&hashPattern=${encodeURIComponent(selectedSha1)}`
            }
        }
        
        return url
    }, [layout.page, layout.pageSize, filter.query, filter.filename, filter.folder, filter.sha1])

    useEffect(() => {
        console.log("FileHashGrid.useEffect()...")
        console.log("..." + JSON.stringify(layout))
        console.log("..." + JSON.stringify(filter))
        
        fetchData(apiUrl)
    }, [apiUrl, fetchData])

    // Memoizza la funzione handleFilterClick
    const handleFilterClick = useCallback((field: string, value: string) => {
        let refresh = false
        
        switch (field) { // Cambiato da 'value' a 'field'
            case Filter.FileName:
                setFilter(prev => ({
                    ...prev,
                    folder: '',
                    filename: value,
                    sha1: '',
                }))
                refresh = true
                break
            case Filter.FolderName:
                setFilter(prev => ({
                    ...prev,
                    folder: value,
                    filename: '',
                    sha1: '',
                }))
                refresh = true
                break
            case Filter.Sha1:
                setFilter(prev => ({
                    ...prev,
                    folder: '',
                    filename: '',
                    sha1: value,
                }))
                refresh = true
                break
        }
        
        if (refresh) {
            setFilter(prev => ({
                ...prev,
                query: 'query4'
            }))
            setLayout(prev => ({
                ...prev,
                page: 1
            }))
        }
        
        showAlert("Attenzione2!", "Messaggio2 mostrato al click")
    }, [setFilter, setLayout, showAlert])

    // Memoizza i valori calcolati
    const paginationInfo = useMemo(() => {
        const page = layout.page
        const pageSize = layout.pageSize
        const totalRecords = data.pagination.total
        const recordsFrom = ((page - 1) * pageSize) + 1
        const recordsTo = Math.min(totalRecords, page * pageSize)
        
        return { page, pageSize, totalRecords, recordsFrom, recordsTo }
    }, [layout.page, layout.pageSize, data.pagination.total])

    const renderCount = useRef(0)
    renderCount.current += 1
    console.log("FileHashGrid.render()..." + renderCount.current)

    return (
        <div className="p-4 space-y-4">
            <ToolBar 
                filter={filter}
                setFilter={setFilter}
            />

            <Card>
                <CardContent className="p-4">
                    <FileHashTable
                        isLoading={isLoading}
                        selectedQuery={filter.query}
                        pageSize={layout.pageSize}
                        data={data}
                        onFilterClick={handleFilterClick}
                    />

                    <div>
                        <div>
                            Pagina {paginationInfo.page} Risultati da {paginationInfo.recordsFrom} a {paginationInfo.recordsTo} di {paginationInfo.totalRecords}
                        </div>

                        <PaginationControls
                            layout={layout}
                            setLayout={setLayout}
                            totalRecords={data.pagination.total}
                        />
                    </div>
                </CardContent>
            </Card>

            {!isLoading && <ModalAlert />}
        </div>
    )
}