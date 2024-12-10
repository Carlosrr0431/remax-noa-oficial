'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AgregarAgenteModal({ isOpen, onClose, onAddAgent }) {
    const [newAgent, setNewAgent] = useState({
        name: '',
        title: '',
        phone: '',
        email: '',
        photo: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=256&q=80',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        onAddAgent({ ...newAgent, sales: 0, revenue: 0 })
        setNewAgent({ name: '', title: '', phone: '', email: '', photo: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=256&q=80' })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setNewAgent(prev => ({ ...prev, [name]: value }))
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Añadir Nuevo Agente</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Nombre</Label>
                        <Input id="name" name="name" value={newAgent.name} onChange={handleChange} required />
                    </div>
                    <div>
                        <Label htmlFor="title">Título</Label>
                        <Input id="title" name="title" value={newAgent.title} onChange={handleChange} required />
                    </div>
                    <div>
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input id="phone" name="phone" value={newAgent.phone} onChange={handleChange} required />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" value={newAgent.email} onChange={handleChange} required />
                    </div>
                    <Button type="submit">Añadir Agente</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

