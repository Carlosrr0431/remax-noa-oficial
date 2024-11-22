'use client'

import { useState } from 'react'
import { CalendarIcon, CheckCircle2, Clock, HomeIcon, MailIcon, PhoneCall, Search, UserCheck2 } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

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

export default function ListaReferidos() {
    const [referrals, setReferrals] = useState([
        {
            id: '1',
            name: 'Jane Smith',
            email: 'jane@example.com',
            phone: '+1987654321',
            address: '123 Luxury Ave, Downtown',
            price: 500000,
            propertyType: 'Comprador',
            description: 'Selling a luxury apartment. Flexible with showing times. Property has been recently renovated.',
            date: '2024-03-09',
            currentStep: 0,
        },
        {
            id: '2',
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+1123456789',
            address: '456 Family St, Suburbs',
            price: 350000,
            propertyType: 'Vendedor',
            description: 'Looking to sell a family home. Great neighborhood with good schools.',
            date: '2024-03-10',
            currentStep: 1,
        },
        {
            id: '3',
            name: 'Alice Johnson',
            email: 'alice@example.com',
            phone: '+1567891234',
            address: '789 Condo Ln, City Center',
            price: 275000,
            propertyType: 'Comprador',
            description: 'Selling a modern condo in the heart of the city. Perfect for young professionals.',
            date: '2024-03-11',
            currentStep: 2,
        },
    ])

    const [filter, setFilter] = useState('all')
    const [search, setSearch] = useState('')
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)
    const [referralToUpdate, setReferralToUpdate] = useState(null)

    const filteredReferrals = referrals.filter((referral) => {
        const matchesFilter = filter === 'all' || steps[referral.currentStep].title.toLowerCase().includes(filter.toLowerCase())
        const matchesSearch =
            referral.name.toLowerCase().includes(search.toLowerCase()) ||
            referral.email.toLowerCase().includes(search.toLowerCase())
        return matchesFilter && matchesSearch
    })

    const handleStepClick = (referralId, stepIndex) => {
        const referral = referrals.find((r) => r.id === referralId)
        if (referral && stepIndex > referral.currentStep) {
            setReferralToUpdate({ id: referralId, step: stepIndex })
            setShowConfirmDialog(true)
        }
    }

    const confirmStepUpdate = () => {
        if (referralToUpdate) {
            setReferrals((prevReferrals) =>
                prevReferrals.map((referral) =>
                    referral.id === referralToUpdate.id ? { ...referral, currentStep: referralToUpdate.step } : referral
                )
            )
            setShowConfirmDialog(false)
            setReferralToUpdate(null)
        }
    }

    return (
        <div className="container mx-auto p-4 space-y-6">
            <h1 className="text-3xl font-bold">Referral Management</h1>
            <div className="flex flex-col sm:flex-row gap-4">
                <Input
                    placeholder="Buscar por nombre o email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-grow text-black"
                />
                <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-full sm:w-[180px] text-black">
                        <SelectValue placeholder="Filtrar por estado" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        {steps.map((step, index) => (
                            <SelectItem key={index} value={step.title.toLowerCase()} >
                                {step.title}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredReferrals.map((referral) => (
                    <Card key={referral.id} className="flex flex-col">
                        <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex flex-col">
                                    <h2 className="text-2xl font-bold">{referral.name}</h2>
                                    <div className="flex items-center gap-2 text-sm opacity-90">
                                        <CalendarIcon className="h-4 w-4" />
                                        <span>{new Date(referral.date).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <Badge className="mt-2 sm:mt-0 bg-white/20 text-white hover:bg-white/30">
                                    {referral.propertyType}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow p-6 space-y-6">
                            <div className="grid gap-4 text-sm">
                                <div className="flex items-center gap-3">
                                    <MailIcon className="h-5 w-5 text-blue-500" />
                                    <span className="truncate">{referral.email}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <PhoneCall className="h-5 w-5 text-blue-500" />
                                    <span>{referral.phone}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <HomeIcon className="h-5 w-5 text-blue-500" />
                                    <span className="truncate">{referral.address}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="font-medium text-lg text-blue-600">${referral.price.toLocaleString()}</span>
                                </div>
                            </div>
                            {/* <p className="text-gray-600 italic line-clamp-2">{referral.description}</p> */}
                            <div className="relative">
                                <div className="absolute left-0 top-5 h-1 w-full rounded-full bg-gray-200">
                                    <div
                                        className="h-full rounded-full bg-blue-500 transition-all duration-300 ease-in-out"
                                        style={{ width: `${(referral.currentStep / (steps.length - 1)) * 100}%` }}
                                    />
                                </div>
                                <div className="relative flex justify-between">
                                    {steps.map((step, index) => (
                                        <div
                                            key={index}
                                            className={`flex flex-col items-center ${index <= referral.currentStep ? 'text-blue-600' : 'text-gray-400'
                                                }`}
                                            onClick={() => handleStepClick(referral.id, index)}
                                        >
                                            <div
                                                className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white
                          ${index <= referral.currentStep ? 'border-blue-500 text-blue-500' : 'border-gray-300 text-gray-300'}
                          ${index <= referral.currentStep ? 'cursor-pointer hover:bg-blue-50' : ''}`}
                                            >
                                                <step.icon className="h-5 w-5" />
                                            </div>
                                            <div className="text-center mt-2">
                                                <div className="text-xs font-medium">{step.title}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                        {/* <CardFooter className="bg-gray-50 p-4">
                            <Button className="w-full">View Details</Button>
                        </CardFooter> */}
                    </Card>
                ))}
            </div>

            <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirmar cambio de estado</DialogTitle>
                        <DialogDescription>
                            Estas seguro de que quieres pasar al estado de {referralToUpdate && steps[referralToUpdate.step].title}?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={confirmStepUpdate}>Confirm</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}