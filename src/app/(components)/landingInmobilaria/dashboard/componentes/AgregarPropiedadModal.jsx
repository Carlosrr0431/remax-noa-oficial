'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AgregarPropiedadModal({ isOpen, onClose, onAddProperty }) {
    const [newProperty, setNewProperty] = useState({
        price: '',
        currency: 'USD',
        location: {
            city: '',
            area: '',
            address: '',
        },
        features: {
            area: '',
            bedrooms: '',
            bathrooms: '',
            parking: '',
        },
        description: '',
        images: ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80'],
        category: '',
        highlighted: false,
        agentId: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        onAddProperty(newProperty)
        setNewProperty({
            price: '',
            currency: 'USD',
            location: { city: '', area: '', address: '' },
            features: { area: '', bedrooms: '', bathrooms: '', parking: '' },
            description: '',
            images: ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80'],
            category: '',
            highlighted: false,
            agentId: '',
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setNewProperty(prev => {
            if (name.includes('.')) {
                const [parent, child] = name.split('.')
                return { ...prev, [parent]: { ...prev[parent], [child]: value } }
            }
            return { ...prev, [name]: value }
        })
    }

    const handleSwitchChange = (checked) => {
        setNewProperty(prev => ({ ...prev, highlighted: checked }))
    }

    const handleSelectChange = (value, name) => {
        setNewProperty(prev => ({ ...prev, [name]: value }))
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Añadir Nueva Propiedad</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 max-h-[500px] overflow-y-auto">
                    <div className='flex justify-between gap-x-2'>
                        <div className='w-full'>
                            <Label htmlFor="price">Precio</Label>
                            <Input id="price" name="price" type="number" value={newProperty.price} onChange={handleChange} required />
                        </div>
                        <div className="w-full">
                            <Label htmlFor="location.city">Ciudad</Label>
                            <Input id="location.city" name="location.city" value={newProperty.location.city} onChange={handleChange} required />
                        </div>
                    </div>
                    {/* <div>
            <Label htmlFor="currency">Moneda</Label>
            <Select name="currency" onValueChange={(value) => handleSelectChange(value, 'currency')} value={newProperty.currency}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una moneda" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="GBP">GBP</SelectItem>
              </SelectContent>
            </Select>
          </div> */}

                    <div className='flex justify-between gap-x-2'>
                        <div className="w-full">
                            <Label htmlFor="location.area">Área</Label>
                            <Input id="location.area" name="location.area" value={newProperty.location.area} onChange={handleChange} required />
                        </div>
                        <div className="w-full">
                            <Label htmlFor="location.address">Dirección</Label>
                            <Input id="location.address" name="location.address" value={newProperty.location.address} onChange={handleChange} required />
                        </div>
                    </div>


                    <div className='flex justify-between gap-x-2'>
                        <div className="w-full">
                            <Label htmlFor="features.area">Área (m²)</Label>
                            <Input id="features.area" name="features.area" type="number" value={newProperty.features.area} onChange={handleChange} required />
                        </div>
                        <div className="w-full">
                            <Label htmlFor="features.bedrooms">Dormitorios</Label>
                            <Input id="features.bedrooms" name="features.bedrooms" type="number" value={newProperty.features.bedrooms} onChange={handleChange} required />
                        </div>
                    </div>


                    <div className='flex justify-between gap-x-2'>
                        <div className="w-full">
                            <Label htmlFor="features.bathrooms">Baños</Label>
                            <Input id="features.bathrooms" name="features.bathrooms" type="number" value={newProperty.features.bathrooms} onChange={handleChange} required />
                        </div>
                        <div className="w-full">
                            <Label htmlFor="features.parking">Estacionamientos</Label>
                            <Input id="features.parking" name="features.parking" type="number" value={newProperty.features.parking} onChange={handleChange} required />
                        </div>
                    </div>



                    <div>
                        <Label htmlFor="description">Descripción</Label>
                        <Textarea id="description" name="description" value={newProperty.description} onChange={handleChange} required />
                    </div>
                    <div>
                        <Label htmlFor="category">Categoría</Label>
                        <Select name="category" onValueChange={(value) => handleSelectChange(value, 'category')} value={newProperty.category}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona una categoría" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Casas">Casas</SelectItem>
                                <SelectItem value="Apartamentos">Apartamentos</SelectItem>
                                <SelectItem value="Oficinas">Oficinas</SelectItem>
                                <SelectItem value="Terrenos">Terrenos</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch id="highlighted" checked={newProperty.highlighted} onCheckedChange={handleSwitchChange} />
                        <Label htmlFor="highlighted">Destacada</Label>
                    </div>
                    <div>
                        <Label htmlFor="agentId">Agente Asignado</Label>
                        <Select name="agentId" onValueChange={(value) => handleSelectChange(value, 'agentId')} value={newProperty.agentId}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona un agente" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">Emily Wilson</SelectItem>
                                <SelectItem value="2">Michael Johnson</SelectItem>
                                <SelectItem value="3">Sarah Davis</SelectItem>
                                <SelectItem value="4">Robert Brown</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button type="submit">Añadir Propiedad</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

