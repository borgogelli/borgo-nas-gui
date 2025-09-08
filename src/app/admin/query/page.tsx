'use client'

import { useEffect, useState, Suspense, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
// import LoadingTable from "./loading";
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
 
import { X } from "lucide-react"
import { PaginationControls, usePagination } from './pagination-controls'
import {ToolBar, useToolbar} from './toolbar'
import { FileRecord, Filter, FilterType, LayoutType, QueryResult } from '@/app/api/query/types'
import { useAlert } from './alert'
import { DemoDialog } from './dialog'
import { useModalAlert } from './modal'
import { formatBytes, formatTimestamp } from './format'
 
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



 
const FileHashHeader: React.FC<{
    selectedQuery: string
}> = ({ selectedQuery }) => {

    const renderCount = useRef(0);
    renderCount.current += 1;
    console.log("FileHashHeader.render()..." + renderCount.current);


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
                        {/* <TableHead>Percorso</TableHead> */}
                        <TableHead>Nome Cartella</TableHead>
                        <TableHead>Nome File</TableHead>
                        <TableHead>Tipo</TableHead>                        
                        <TableHead>SHA1</TableHead>
                        {/* <TableHead>MD5</TableHead> */}
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
}
 

const FakeFileHashTable: React.FC<{
    selectedQuery: string
    pageSize: number
}> = ({ selectedQuery, pageSize }) => {

    const renderCount = useRef(0);
    renderCount.current += 1;
    console.log("FakeFileHashTable.render()..." + renderCount.current);


    return (
        <TableBody>
            {Array.from({ length: pageSize }).map(
                (
                    _,
                    idx // show #pageSize records
                ) => (
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
                        ) : selectedQuery === 'query3'  ? (
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
                )
            )}
        </TableBody>
    )
}


const RealFileHashTable: React.FC<{
    selectedQuery: string
    data: any[]
    onFilterClick: (field: string, value: string) => void
}> = ({ selectedQuery, data, onFilterClick }) => {

// if(!data){
//     return <p></p>
// }
 
    const renderCount = useRef(0);
    renderCount.current += 1;
    console.log("RealFileHashTable.render()..." + renderCount.current);

    return (
        <TableBody>
            {data.map((row, idx) => (
                <TableRow key={idx}>
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
                            {/* <TableCell>{row.filePath}</TableCell> */}
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
                            {/* <TableCell>{row.md5Hash}</TableCell> */}
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
    pageSize: number 
    data: QueryResult<any>
    onFilterClick: (field: string, value: string) => void
}> = ({ isLoading, selectedQuery, pageSize, data, onFilterClick }) => {

    const renderCount = useRef(0);
    renderCount.current += 1;
    console.log("FileHashTable.render()..." + renderCount.current);

    return (
        <Table>
            <FileHashHeader selectedQuery={selectedQuery} />
            {isLoading ? (
                <FakeFileHashTable selectedQuery={selectedQuery} pageSize={pageSize} />
            ) : (
                <RealFileHashTable selectedQuery={selectedQuery} data={data.data} onFilterClick={onFilterClick}   />
            )}
        </Table>
    )
}
 
////////////////////////////////////////////////////

export default function FileHashGrid() {

const { showAlert, ModalAlert } = useModalAlert()
 
  const [data, setData] = useState<QueryResult<any>>(emptyResult)    
 //const [data, setData] = useState<QueryResult<Partial<FileRecord>>>(emptyResult);
 
    const { layout, setLayout } = usePagination()
 
    const { filter, setFilter} = useToolbar()
 
    const [isLoading, setIsLoading] = useState(false)

    // const [selectedFolder, setSelectedFolder] = useState<string>()
    // const [selectedFilename, setSelectedFilename] = useState<string>('')
    // const [selectedSha1, setSelectedSha1] = useState<string>('')

const fetchData = async (url:string) => {
        console.log("FileHashGrid.fetchData()...");
  try {
    setIsLoading(true)
    const res = await fetch(url)
    const data = await res.json()
    setData(data)
  } catch (error) {
    console.error("Errore nel fetch:", error)
  } finally {
    setIsLoading(false)
  }
}

    useEffect(() => {

        console.log("FileHashGrid.useEffect()...");
  console.log("..." + JSON.stringify(layout));
  console.log("..." + JSON.stringify(filter));

        const page = layout.page;
        const pageSize = layout.pageSize;
        const selectedQuery = filter.query;
        const selectedFilename = filter.filename;
        const selectedFolder = filter.folder;
        const selectedSha1 = filter.sha1;

        let url = `/api/query?query=${selectedQuery}&page=${page}&pageSize=${pageSize}`
 
        if (selectedQuery === 'query4'){
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

        fetchData(url)

    //}, [layout, filter ])
     }, [layout.page, layout.pageSize, filter.query, filter.filename, filter.folder, filter.sha1])


   
    const handleFilterClick = (field: string, value: string) => {
 let refresh = false;
                switch (field) {
          case Filter.FileName:
  setFilter(prev => ({
    ...prev,
    folder: '',    
    filename: value,
    sha1:  '',
  }))             
            refresh = true;
            break;
          case Filter.FolderName:
  
    setFilter(prev => ({
    ...prev,
    folder: value,    
    filename:  '',   
     sha1:  '',
  }))               
               refresh = true;
            break;
          case Filter.Sha1: 

    setFilter(prev => ({
    ...prev,
   folder:  '' ,
       filename:  '' ,
    sha1: value,
  }))               
  refresh = true; 
            break;
          default:
                }
 if(refresh){
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
 
    }
     
    const page = layout.page;
    const pageSize = layout.pageSize;
const selectedQuery = filter.query;
  const totalRecords = data.pagination.total;
const recordsFrom = ((page-1) * pageSize) + 1
const recordsTo =  Math.min(totalRecords, (page) * pageSize);
 
    const renderCount = useRef(0);
    renderCount.current += 1;
    console.log("FileHashGrid.render()..." + renderCount.current);


    return (
        <div className="p-4 space-y-4">
            
            <ToolBar 
 
            filter={filter}
            setFilter={setFilter}
            />

            <Card>
                <CardContent className="p-4">
                    {/* <Suspense fallback={<LoadingTable />}> */}

                    <FileHashTable
                        isLoading={isLoading}
                        selectedQuery={selectedQuery}
                        pageSize={pageSize}
                        data={data}
                        onFilterClick={handleFilterClick}
                    />

                    {/* </Suspense> */}

    <div>
 
    <div>
       Pagina {page} Risultati da {recordsFrom} a {recordsTo} di {totalRecords} 
    </div>

      <PaginationControls
        layout={layout}
        setLayout={setLayout}
        totalRecords={data.pagination.total}
      />
    </div>


                </CardContent>
            </Card>

{!isLoading &&  <ModalAlert  /> }

        </div>
    )
}
 