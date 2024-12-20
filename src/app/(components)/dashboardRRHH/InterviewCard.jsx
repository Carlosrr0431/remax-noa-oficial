import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle, Calendar } from 'lucide-react'

export default function InterviewCard({ interview, onComplete, onReschedule }) {
    const [isRescheduling, setIsRescheduling] = useState(false)
    const [newDate, setNewDate] = useState(interview.start)

    const handleComplete = (passed) => {
        onComplete(interview, passed)
    }

    const handleReschedule = () => {
        if (isRescheduling) {
            onReschedule(interview, newDate)
            setIsRescheduling(false)
        } else {
            setIsRescheduling(true)
        }
    }

    return (
        <Card className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <CardHeader className={`text-white p-4 ${interview.status === 'aprobado' ? 'bg-green-500' :
                interview.status === 'rechazado' ? 'bg-red-500' :
                    'bg-blue-500'
                }`}>
                <CardTitle className="text-lg font-semibold">{interview.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
                <p className="text-sm"><strong>Email:</strong> {interview.email}</p>
                <p className="text-sm mt-2"><strong>Teléfono:</strong> {interview.phone}</p>
                <p className="text-sm mt-2">
                    <strong>CV:</strong>{' '}
                    <a href={interview.cv} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        Ver CV
                    </a>
                </p>
                {interview.status === 'pendiente' && (
                    <div className="mt-4 flex justify-between">
                        <Button onClick={() => handleComplete(true)} className="bg-green-500 hover:bg-green-600">
                            <CheckCircle className="mr-2 h-4 w-4" /> Aprobar
                        </Button>
                        <Button onClick={() => handleComplete(false)} className="bg-red-500 hover:bg-red-600">
                            <XCircle className="mr-2 h-4 w-4" /> Rechazar
                        </Button>
                    </div>
                )}
                <div className="mt-4">
                    <Button onClick={handleReschedule} className="w-full bg-yellow-500 hover:bg-yellow-600">
                        <Calendar className="mr-2 h-4 w-4" />
                        {isRescheduling ? 'Confirmar' : 'Reprogramar'}
                    </Button>
                </div>
                {isRescheduling && (
                    <input
                        type="datetime-local"
                        value={newDate.toISOString().slice(0, 16)}
                        onChange={(e) => setNewDate(new Date(e.target.value))}
                        className="mt-2 w-full p-2 border rounded"
                    />
                )}
            </CardContent>
        </Card>
    )
}

