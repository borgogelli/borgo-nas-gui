"use client"

import { useState, ReactNode } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"

export function useModalAlert() {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState<string | undefined>("")

  const showAlert = (alertTitle: string, alertDescription?: string) => {
    setTitle(alertTitle)
    setDescription(alertDescription)
    setOpen(true)
  }

  const ModalAlert = () => (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )

  return { showAlert, ModalAlert }
}
