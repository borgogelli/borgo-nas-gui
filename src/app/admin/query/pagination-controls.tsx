"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

const emptyLayout : LayoutType =   {
    page: 1,
    pageSize: 10
   }
 

export function usePagination( ) {
   const [layout, setLayout] = useState(emptyLayout)
  return { layout, setLayout }
}

type LayoutType = {
  page: number, 
  pageSize:number
}

type PaginationControlsProps = {
  // page: number
  // setPage: React.Dispatch<React.SetStateAction<number>>
  // pageSize: number
  // setPageSize: React.Dispatch<React.SetStateAction<number>>
  layout: LayoutType,
  setLayout : React.Dispatch<React.SetStateAction<LayoutType>>
  totalRecords: number
}

export function PaginationControls({
  layout,
  setLayout,
  totalRecords,
}: PaginationControlsProps) {


    const totalPages = Math.max(1, Math.ceil(totalRecords / layout.pageSize)) // pageSize is limit


const handleNextPage = () => {
  setLayout((prevLayout) => ({
    ...prevLayout, // copia gli altri campi
    page: Math.min(totalPages, prevLayout.page + 1), // aggiorna solo page
  }))
}

const handlePrevPage = () => {
  setLayout((prevLayout) => ({
    ...prevLayout, // copia gli altri campi
    page: Math.max(1, prevLayout.page - 1), // aggiorna solo page
  }))
}


  return (
    <div className="flex justify-end items-center mt-4 gap-4">
      {/* Combo page size */}
      <div className="flex items-center gap-2">
        <span className="text-sm">Record per pagina:</span>
        <Select 
          value={String(layout.pageSize)}
          onValueChange={(val) => {
            setLayout({page:1, pageSize: Number(val)})
          }}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 20, 50].map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
 
      {/* Navigazione */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={handlePrevPage}
          disabled={layout.page === 1}
        >
          Pagina precedente
        </Button>
        <Button
          variant="outline"
          onClick={handleNextPage}
          disabled={layout.page >= totalPages}
        >
          Pagina successiva
        </Button>
      </div>

      {/* Info pagina */}
      <span className="text-sm whitespace-nowrap">
        Pagina {layout.page} di {totalPages}
      </span>
    </div>
  )
}
