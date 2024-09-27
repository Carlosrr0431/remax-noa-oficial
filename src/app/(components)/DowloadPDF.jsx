'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileDown, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"


export const DowloadPdf = ({
    url
}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleDownload = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch(url)

            if (!response.ok) {
                throw new Error('No se pudo descargar el archivo')
            }

            const contentType = response.headers.get('content-type')
            if (contentType !== 'application/pdf') {
                throw new Error('El archivo no es un PDF válido')
            }

            const blob = await response.blob()
            const downloadUrl = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = downloadUrl
            link.download = fileName
            document.body.appendChild(link)
            link.click()
            link.remove()
            window.URL.revokeObjectURL(downloadUrl)
        } catch (error) {
            console.error('Error al descargar el archivo:', error)
            setError('Hubo un error al descargar el archivo. Por favor, inténtalo de nuevo.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-4">
            <Button
                onClick={handleDownload}
                disabled={isLoading}
                className="flex items-center space-x-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
                <FileDown className="w-4 h-4" />
                <span>{isLoading ? 'Descargando...' : 'Descargar PDF'}</span>
            </Button>
            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
        </div>
    )
}