"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function DemoDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Apri messaggio</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Conferma</DialogTitle>
          <DialogDescription>
            Sei sicuro di voler procedere?
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}