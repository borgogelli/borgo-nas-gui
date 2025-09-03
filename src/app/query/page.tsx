'use client'

import { useEffect, useState, Suspense, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
// import LoadingTable from "./loading";
import { Skeleton } from '@/components/ui/skeleton'

const QUERY_OPTIONS = [
    {
        label: 'Duplicati per nome e SHA1',
        id: 'query1',
    },
    {
        label: 'Tutti i file con SHA1 duplicati',
        id: 'query2',
    },
    {
        label: 'Cartelle con file duplicati',
        id: 'query3',
    },
    {
        label: 'Verifica records duplicati dalla procedura di importazione',
        id: 'query9',
    },    
]

const FileHashHeader: React.FC<{
    selectedQuery: string
}> = ({ selectedQuery }) => {
    return (
        <TableHeader>
            <TableRow>
                {selectedQuery === 'query1' ? (
                    <>
                        <TableHead>Nome File</TableHead>
                        <TableHead>SHA1</TableHead>
                        <TableHead>Conteggio</TableHead>
                    </>
                ) : selectedQuery === 'query2' || selectedQuery === 'query4' ? (
                    <>
                        <TableHead>ID</TableHead>
                        {/* <TableHead>Percorso</TableHead> */}
                        <TableHead>Nome Cartella</TableHead>
                        <TableHead>Nome File</TableHead>
                        <TableHead>SHA1</TableHead>
                        {/* <TableHead>MD5</TableHead> */}
                        <TableHead>MIME</TableHead>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Dimensione</TableHead>
                        <TableHead>Info Updated</TableHead>
                    </>
                ) : selectedQuery === 'query3' ? (
                    <>
                        <TableHead>Nome Cartella</TableHead>
                        <TableHead>SHA1</TableHead>
                        <TableHead>Conteggio</TableHead>
                    </>
                ) : (
                    <></>
                )}
            </TableRow>
        </TableHeader>
    )
}

const FakeFileHashTable: React.FC<{
    selectedQuery: string
}> = ({ selectedQuery }) => {
    return (
        <TableBody>
            {Array.from({ length: 10 }).map(
                (
                    _,
                    idx // show #10 records
                ) => (
                    <TableRow key={idx}>
                        {selectedQuery === 'query1' ? (
                            <>
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <TableCell key={i}>
                                        <Skeleton className="h-4 w-32" />
                                    </TableCell>
                                ))}
                            </>
                        ) : selectedQuery === 'query2' || selectedQuery === 'query4' ? (
                            <>
                                {Array.from({ length: 9 }).map((_, i) => (
                                    <TableCell key={i}>
                                        <Skeleton className="h-4 w-24" />
                                    </TableCell>
                                ))}
                            </>
                        ) : selectedQuery === 'query3' ? (
                            <>
                                {Array.from({ length: 9 }).map((_, i) => (
                                    <TableCell key={i}>
                                        <Skeleton className="h-4 w-32" />
                                    </TableCell>
                                ))}
                            </>
                        ) : (
                            <></>
                        )}
                    </TableRow>
                )
            )}
        </TableBody>
    )
}

const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);

  const pad = (n: number) => n.toString().padStart(2, '0');

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1); // i mesi partono da 0
  const year = date.getFullYear();

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

const formatBytes = (bytes: number): string => {
  if (bytes < 1024) return bytes + " B";
  const kb = 1024;
  const mb = kb * 1024;
  const gb = mb * 1024;

  if (bytes < mb) return (bytes / kb).toFixed(2) + " KB";
  if (bytes < gb) return (bytes / mb).toFixed(2) + " MB";
  return (bytes / gb).toFixed(2) + " GB";
}

const RealFileHashTable: React.FC<{
    selectedQuery: string
    data: any[]
    onFolderClick: (folder: string) => void
}> = ({ selectedQuery, data, onFolderClick }) => {
    return (
        <TableBody>
            {data.map((row, idx) => (
                <TableRow key={idx}>
                    {selectedQuery === 'query1' ? (
                        <>
                            <TableCell>{row.fileName}</TableCell>
                            <TableCell>{row.sha1Hash}</TableCell>
                            <TableCell>{row.count}</TableCell>
                        </>
                    ) : selectedQuery === 'query2' || selectedQuery === 'query4' || selectedQuery === 'query9' ? (
                        <>
                            <TableCell>{row.id}</TableCell>
                            {/* <TableCell>{row.filePath}</TableCell> */}
                            <TableCell>{row.folderName}</TableCell>
                            <TableCell>{row.fileName}</TableCell>
                            <TableCell>{row.sha1Hash}</TableCell>
                            {/* <TableCell>{row.md5Hash}</TableCell> */}
                            <TableCell>{row.mimeType}</TableCell>
                            <TableCell>{formatTimestamp(row.fileTimestamp)}</TableCell>
                            <TableCell>{formatBytes(row.fileSize)}</TableCell>
                            <TableCell>{formatTimestamp(row.infoUpdated)}</TableCell>
                        </>
                    ) : selectedQuery === 'query3' ? (
                        <>
                            <TableCell>{row.folderName}</TableCell>
                            <TableCell>{row.sha1Hash}</TableCell>
                            <TableCell>{row.count}</TableCell>
                            <TableCell>
                                {' '}
                                <button
                                    className="text-blue-600 underline hover:text-blue-800"
                                    onClick={() => onFolderClick(row.folderName)}
                                >
                                    {row.folderName}
                                </button>
                            </TableCell>
                        </>
                    ) : (
                        <></>
                    )}
                </TableRow>
            ))}
        </TableBody>
    )
}

/**
 *
 *  React.FC (o React.FunctionComponent) è un tipo TypeScript fornito da React per tipizzare i componenti funzionali.
 *
 *  Cos’è React.FC<Props>?
 *  È un generic type che definisce un componente React funzionale con props di tipo Props.
 *
 *  Ti aiuta a tipare correttamente le props che il componente riceve.
 *
 * @returns
 */
//WORKING EXAMPLE :  function FileHashTable({ selectedQuery, data, onFolderClick }: { selectedQuery: string; data: any[]; onFolderClick: (folder: string) => void }) {
const FileHashTable: React.FC<{
    isLoading: boolean
    selectedQuery: string
    data: any[]
    onFolderClick: (folder: string) => void
}> = ({ isLoading, selectedQuery, data, onFolderClick }) => {
    return (
        <Table>
            <FileHashHeader selectedQuery={selectedQuery} />
            {isLoading ? (
                <FakeFileHashTable selectedQuery={selectedQuery} />
            ) : (
                <RealFileHashTable selectedQuery={selectedQuery} data={data} onFolderClick={onFolderClick} />
            )}
        </Table>
    )
}

    


// let prevSelectedValue = 0; // Se il componente viene montato più volte, tutte le istanze condividono la stessa variabile globale (potenziale fonte di bug). Soluzione non consigliata.

export default function FileHashGrid() {
    const [selectedQuery, setSelectedQuery] = useState('query1')
    const [data, setData] = useState<any[]>([])
    const [page, setPage] = useState(0)
    const [pageSize] = useState(10)
    const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

        let prevSelectedValue = useRef(0); // variabile mutabile che persiste tra render ma non causa render// Se il componente viene montato più volte, tutte le istanze condividono la stessa variabile globale (potenziale fonte di bug).

    useEffect(() => {
        setIsLoading(true)
        let url = `/api/query?query=${selectedQuery}&page=${page}&pageSize=${pageSize}`
        if (selectedQuery === 'query4' && selectedFolder) {
            url += `&folderName=${encodeURIComponent(selectedFolder)}`
        }

        fetch(url)
            .then((res) => res.json())
            .then((res) => {
                setData(res)
                setIsLoading(false)
            })
    }, [selectedQuery, page, selectedFolder])

    const handleSelect = (value: string) => {
        console.log('handleSelect...');
        setSelectedQuery(value)
        setPage(0)
    }
 
    const handleClic = (event : React.PointerEvent<HTMLDivElement>, option: array) => {
        // e.preventDefault(); // previeni la chiusura automatica se vuoi
        console.log('handleClic...' + option.id)
         
 
        console.log('prevSelectedValue : ' + prevSelectedValue.current);
        let currentSelectedValue = option.id;
        if(prevSelectedValue.current === currentSelectedValue){
            // DO IT
            console.log("**********");
        }
        prevSelectedValue.current = currentSelectedValue;
    }    

    const handleFolderClick = (folder: string) => {
        setSelectedFolder(folder)
        setPage(0)
        setSelectedQuery('query4')
    }

    return (
        <div className="p-4 space-y-4">
            <Card>
                <CardContent className="p-4 flex items-center justify-between">
                    <Select onValueChange={handleSelect} defaultValue={selectedQuery}>
                        <SelectTrigger className="w-[300px]">
                            <SelectValue placeholder="Seleziona una query" />
                        </SelectTrigger>
                        <SelectContent>
                            {QUERY_OPTIONS.map((option) => (
                                <SelectItem key={option.id} value={option.id} onPointerDown={(e) => handleClic(e, option)}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-4">
                    {/* <Suspense fallback={<LoadingTable />}> */}

                    <FileHashTable
                        isLoading={isLoading && 
                            (selectedQuery == 'query4' || selectedQuery === 'query3')
                            }
                        selectedQuery={selectedQuery}
                        data={data}
                        onFolderClick={handleFolderClick}
                    />

                    {/* </Suspense> */}
                    <div className="flex justify-end mt-4 gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setPage((p) => Math.max(0, p - 1))}
                            disabled={page === 0}
                        >
                            Pagina precedente
                        </Button>
                        <Button variant="outline" onClick={() => setPage((p) => p + 1)}>
                            Pagina successiva
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
