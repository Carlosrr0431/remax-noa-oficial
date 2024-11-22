'use client'

import { useState } from 'react'
import { CalendarIcon, CheckCircle2, Clock, HomeIcon, MailIcon, PhoneCall, UserCheck2 } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'

export default function TarjetaReferido() {
    const [currentStep, setCurrentStep] = useState(0)
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)
    const [stepToConfirm, setStepToConfirm] = useState(0)
    const [isRejected, setIsRejected] = useState(false)

    const steps = [
        {
            title: 'Pendiente de contactar',
            subtitle: 'New referral awaiting initial contact',
            icon: Clock,
        },
        {
            title: 'Pendiente de Validación',
            subtitle: 'Initial contact made with buyer',
            icon: UserCheck2,
        },
        {
            title: 'Proceso Finalizado',
            subtitle: 'Requirements confirmed and validated',
            icon: CheckCircle2,
        },
    ]

    const handleStepClick = (index) => {
        if (index > currentStep && !isRejected) {
            setStepToConfirm(index)
            setShowConfirmDialog(true)
        }
    }

    const confirmStep = () => {
        setCurrentStep(stepToConfirm)
        setShowConfirmDialog(false)
    }

    return (
        <Card className="w-full max-w-3xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold">Jane Smith</h2>
                        <div className="flex items-center gap-2 text-sm opacity-90">
                            <CalendarIcon className="h-4 w-4" />
                            <span>9/3/2024</span>
                        </div>
                    </div>
                    <Badge className="mt-2 sm:mt-0 bg-white/20 text-white hover:bg-white/30">
                        Seller
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="p-6 space-y-8">
                <div className="relative">
                    <div className="absolute left-0 top-5 h-1 w-full rounded-full bg-gray-200">
                        <div
                            className="h-full rounded-full bg-blue-500 transition-all duration-300 ease-in-out"
                            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                        />
                    </div>
                    <div className="relative flex justify-between">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className={`flex flex-col items-center ${index <= currentStep ? 'text-blue-600' : 'text-gray-400'
                                    }`}
                                onClick={() => handleStepClick(index)}
                            >
                                <div
                                    className={`mb-2 flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white
                    ${index <= currentStep ? 'border-blue-500 text-blue-500' : 'border-gray-300 text-gray-300'}
                    ${index <= currentStep ? 'cursor-pointer hover:bg-blue-50' : ''}`}
                                >
                                    <step.icon className="h-6 w-6" />
                                </div>
                                <div className="text-center mt-2">
                                    <div className="text-sm font-medium">{step.title}</div>
                                    <div className="text-xs text-gray-500 mt-1 hidden sm:block">{step.subtitle}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid gap-4 text-sm bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                        <MailIcon className="h-5 w-5 text-blue-500" />
                        <span className="truncate">jane@example.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <PhoneCall className="h-5 w-5 text-blue-500" />
                        <span>+1987654321</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <HomeIcon className="h-5 w-5 text-blue-500" />
                        <span className="truncate">123 Luxury Ave, Downtown</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="font-medium text-lg text-blue-600">$500,000.00</span>
                        <Badge variant="secondary">Apartment</Badge>
                    </div>
                </div>

            </CardContent>
            <CardFooter className="bg-gray-50 flex justify-end p-4">
                {!isRejected && (
                    <Button variant="destructive" onClick={() => setIsRejected(true)}>
                        Marcar Como Rechazado
                    </Button>
                )}
            </CardFooter>

            <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirmar operación</DialogTitle>
                        <DialogDescription>
                            Estas seguro que quieres mover del paso al  {steps[stepToConfirm]?.title}?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={confirmStep}>Confirm</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    )
}