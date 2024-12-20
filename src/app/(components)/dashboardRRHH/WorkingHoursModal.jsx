import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export default function WorkingHoursModal({ workingHours, onSave, onClose }) {
    const [selectedSlots, setSelectedSlots] = useState(workingHours.availableSlots)
    const [newSlot, setNewSlot] = useState({ hour: 0, minute: 0 })

    const handleAddSlot = () => {
        const newSlotValue = { ...newSlot, minute: Math.floor(newSlot.minute / 30) * 30 }
        if (!selectedSlots.some(slot => slot.hour === newSlotValue.hour && slot.minute === newSlotValue.minute)) {
            setSelectedSlots(prev => [...prev, newSlotValue].sort((a, b) =>
                a.hour * 60 + a.minute - (b.hour * 60 + b.minute)
            ))
        }
        setNewSlot({ hour: 0, minute: 0 })
    }

    const handleRemoveSlot = (slotToRemove) => {
        setSelectedSlots(prev => prev.filter(slot =>
            slot.hour !== slotToRemove.hour || slot.minute !== slotToRemove.minute
        ))
    }

    const handleSave = () => {
        onSave({ availableSlots: selectedSlots })
    }

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">
                        Configurar Horas de Trabajo
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="flex space-x-2">
                        <div>
                            <Label htmlFor="hour">Hora</Label>
                            <Input
                                id="hour"
                                type="number"
                                min="0"
                                max="23"
                                value={newSlot.hour}
                                onChange={(e) => setNewSlot(prev => ({ ...prev, hour: parseInt(e.target.value) }))}
                            />
                        </div>
                        <div>
                            <Label htmlFor="minute">Minuto</Label>
                            <Input
                                id="minute"
                                type="number"
                                min="0"
                                max="59"
                                step="30"
                                value={newSlot.minute}
                                onChange={(e) => setNewSlot(prev => ({ ...prev, minute: parseInt(e.target.value) }))}
                            />
                        </div>
                        <Button onClick={handleAddSlot} className="mt-6">Agregar</Button>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                        {selectedSlots.map((slot, index) => (
                            <div key={index} className="flex justify-between items-center py-2">
                                <span>{`${slot.hour.toString().padStart(2, '0')}:${slot.minute.toString().padStart(2, '0')}`}</span>
                                <Button variant="destructive" onClick={() => handleRemoveSlot(slot)}>Eliminar</Button>
                            </div>
                        ))}
                    </div>
                    <Button onClick={handleSave} className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                        Guardar
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

