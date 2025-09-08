 
"use client"

import { useState, ReactNode } from "react"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Terminal } from "lucide-react"

export function useAlert() {
  const [alert, setAlert] = useState<ReactNode | null>(null)

  const showAlert = (title: string, description?: string, duration = 3000) => {
    setAlert(
      <Alert className="mt-4">
        <Terminal className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        {description && <AlertDescription>{description}</AlertDescription>}
      </Alert>
    )

    if (duration > 0) {
      setTimeout(() => setAlert(null), duration)
    }
  }

  const AlertComponent = () => alert

  return { showAlert, AlertComponent }
}