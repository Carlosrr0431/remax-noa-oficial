'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Phone, Mail, Plus } from 'lucide-react'
import { AgregarAgenteModal } from '../componentes/AgregarAgenteModal'

export default function Agentes() {
  const [isAddAgentModalOpen, setIsAddAgentModalOpen] = useState(false)
  const [agents, setAgents] = useState([
    { id: 1, name: 'Emily Wilson', title: 'Luxury Property Specialist', sales: 42, revenue: 5200000, photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80', phone: '(123) 456-7890', email: 'emily@example.com' },
    { id: 2, name: 'Michael Johnson', title: 'Commercial Real Estate Agent', sales: 38, revenue: 4800000, photo: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=256&q=80', phone: '(234) 567-8901', email: 'michael@example.com' },
    { id: 3, name: 'Sarah Davis', title: 'Residential Property Expert', sales: 35, revenue: 4500000, photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80', phone: '(345) 678-9012', email: 'sarah@example.com' },
    { id: 4, name: 'Robert Brown', title: 'Investment Property Advisor', sales: 31, revenue: 4100000, photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80', phone: '(456) 789-0123', email: 'robert@example.com' },
  ])

  const addAgent = (newAgent) => {
    setAgents([...agents, { ...newAgent, id: agents.length + 1 }])
    setIsAddAgentModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">Agentes</h1>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-8 w-full" placeholder="Buscar agentes..." />
          </div>
          <Button onClick={() => setIsAddAgentModalOpen(true)} className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Añadir Agente
          </Button>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => (
          <Card key={agent.id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Image src={agent.photo} alt={agent.name} width={64} height={64} className="rounded-full" />
                <div>
                  <CardTitle>{agent.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{agent.title}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm"><strong>Ventas:</strong> {agent.sales}</p>
                <p className="text-sm"><strong>Ingresos:</strong> ${agent.revenue.toLocaleString()}</p>
                <p className="text-sm flex items-center"><Phone className="mr-2 h-4 w-4" /> {agent.phone}</p>
                <p className="text-sm flex items-center"><Mail className="mr-2 h-4 w-4" /> {agent.email}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <AgregarAgenteModal isOpen={isAddAgentModalOpen} onClose={() => setIsAddAgentModalOpen(false)} onAddAgent={addAgent} />
    </div>
  )
}
