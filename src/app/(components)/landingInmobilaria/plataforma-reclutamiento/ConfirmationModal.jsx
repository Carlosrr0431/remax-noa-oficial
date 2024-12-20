import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'


export default function ConfirmationModal({ onClose }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-xl transform transition-all">
                <CardHeader className="bg-green-500 p-6 text-white text-center">
                    <CheckCircle2 className="w-16 h-16 mx-auto mb-4" />
                    <CardTitle className="text-2xl font-bold">¡Enviado con Éxito!</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <p className="text-gray-700 text-center">
                        Tu información ha sido enviada correctamente. Te contactaremos pronto con más detalles sobre tu entrevista.
                    </p>
                </CardContent>
                <CardFooter className="bg-gray-50 px-6 py-4">
                    <Button onClick={onClose} className="w-full bg-green-500 hover:bg-green-600 text-white">
                        Cerrar
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}