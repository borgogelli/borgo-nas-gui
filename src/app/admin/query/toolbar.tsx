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
 import { Search, FunnelX, Funnel, RefreshCcw, Filter as FilterIcon } from "lucide-react"
import { X } from "lucide-react"
import { PaginationControls, usePagination } from './pagination-controls'
import { FilterType, QueryOption } from '@/app/api/query/types'
import {   Filter    } from '@/app/api/query/types'


const QUERY_OPTIONS : ReadonlyArray<QueryOption> = [
    {
        label: 'All',
        id: 'query0',
    },  
    {
        label: 'Duplicati per nome e SHA1',
        id: 'query1',
    },
    {
        label: 'Duplicati per SHA1',
        id: 'query2',
    },
    {
        label: 'Cartelle con file duplicati',
        id: 'query3',
    },
    
    {
        label: 'Quante copie esistono per ogni file',
        id: 'query9',
    },    
]


 
const emptyFilter : FilterType =   {
  folder: "",
  filename: "",
  sha1: "",
  query: "query0",
}

export function useToolbar( ) {
 const [filter, setFilter] = useState(emptyFilter)
  return {  filter, setFilter}
}
 


type ToolBarProps = {
 
  filter: FilterType
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>
}

export function ToolBar({
 
  filter ,
  setFilter
  
}: ToolBarProps) {


const [selectedQuery, setSelectedQuery] = useState<string>(filter.query) 
const [selectedField, setSelectedField] = useState<string>('')
const [inputValue, setInputValue] = useState("")

  useEffect(() => {
 
        console.log("ToolBar.useEffect()...");

          switch (selectedField) {
          case Filter.FileName:
  setFilter({
     folder: '',
    filename: inputValue,
    sha1:  '',
    query: selectedQuery
  })     
            
            break;
          case Filter.FolderName:
  
    setFilter( {
    folder: inputValue,      
    filename:  '',   
     sha1:  '',
     query: selectedQuery
  })                
               
            break;
          case Filter.Sha1: 

    setFilter({
          folder:  '' ,      
       filename:  '' ,
    sha1: inputValue,
    query: selectedQuery
  })           
  
            break;
          default:
               setFilter({
    folder: '',                
    filename: '',
    sha1:  '',
    query: selectedQuery
  })  
                }
 
    }, [selectedQuery, inputValue, selectedField ])

const handleClear = () => setInputValue("")
    
let prevSelectedValue = useRef(''); // variabile mutabile che persiste tra render ma non causa render// Se il componente viene montato più volte, tutte le istanze condividono la stessa variabile globale (potenziale fonte di bug).
  
    const handleQueryClic = (event : React.PointerEvent<HTMLDivElement>, option: QueryOption) => {
        // e.preventDefault(); // previeni la chiusura automatica se vuoi
        console.log('handleQueryClic()...' + option.id)
         
 
        console.log('prevSelectedValue : ' + prevSelectedValue.current);
        let currentSelectedValue: string = option.id;
        if(prevSelectedValue.current === currentSelectedValue){
            // DO IT
            console.log("**********");
        }
        prevSelectedValue.current = currentSelectedValue;
    }     

return(
    <Card>
                <CardContent className="p-4 flex items-center gap-4">
 
    <div className="flex items-center gap-2  ">
       <Label id="labelForSelect" className="whitespace-nowrap">
        Seleziona
      </Label>
                    <Select aria-labelledby="labelForSelect" onValueChange={setSelectedQuery} defaultValue={selectedQuery}>
                        <SelectTrigger >
                            <SelectValue placeholder="Seleziona una query" />
                        </SelectTrigger>
                        <SelectContent>
                            {QUERY_OPTIONS.map((option) => (
                                <SelectItem key={option.id} value={option.id} onPointerDown={(e) => handleQueryClic(e, option)}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

        <Button
          variant="secondary"
          size="icon"
          onClick={(e) => {
            e.stopPropagation() // impedisce che apra/chiuda il select
            console.log("Click su ricerca!")
          }}
        >
          <RefreshCcw className="w-4 h-4" />
        </Button>
                
</div>

        {/* Campo di testo con label e pulsante clear */}
        <div className="flex items-center gap-2 w-[300px]">
          <Label htmlFor="customInput" className="whitespace-nowrap">
            Filter
          </Label>
          <Input
            id="customInput"
            type="text"
            placeholder="Inserisci un valore"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            // onBlur={handleBlur}
            className="flex-1"
          />
          {inputValue && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClear}
              aria-label="Clear input"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>


  <div className="flex items-center gap-2 ">
       <Label id="labelForSelect2" className="whitespace-nowrap">
        on
      </Label>
                    <Select aria-labelledby="labelForSelect2"  onValueChange={setSelectedField} >
                        <SelectTrigger className=" justify-between items-center"> 
                            <SelectValue placeholder="Seleziona una query" />        
                        </SelectTrigger>
                        <SelectContent>
                       
                                <SelectItem value={Filter.FolderName}  >
                                    Folder name
                                </SelectItem>
                                <SelectItem value={Filter.FileName} >
                                    File name
                                </SelectItem>
                                <SelectItem value={Filter.Sha1}  >
                                    Hash
                                </SelectItem>

                        </SelectContent>
                    </Select>
        {/* Pulsante di ricerca a lato */}
        <Button
          variant="secondary"
          size="icon"
          onClick={(e) => {
            e.stopPropagation() // impedisce che apra/chiuda il select
            console.log("Click su ricerca!")
          }}
        >
          <FilterIcon className="w-4 h-4" />
        </Button>                    
</div>


                </CardContent>

            </Card>
)
}