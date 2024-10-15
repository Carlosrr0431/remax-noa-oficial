"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, Calendar, Mail } from "lucide-react"

const users = [
    { name: "Juan Pérez", email: "juan.perez@empresa.com", active: true, department: "Ventas", joinDate: "2022-03-15", avatar: "/placeholder.svg?height=40&width=40" },
    { name: "María García", email: "maria.garcia@empresa.com", active: true, department: "Marketing", joinDate: "2021-11-01", avatar: "/placeholder.svg?height=40&width=40" },
    { name: "Carlos Rodríguez", email: "carlos.rodriguez@empresa.com", active: false, department: "IT", joinDate: "2020-07-22", avatar: "/placeholder.svg?height=40&width=40" },
    { name: "Ana Martínez", email: "ana.martinez@empresa.com", active: true, department: "Recursos Humanos", joinDate: "2023-01-10", avatar: "/placeholder.svg?height=40&width=40" },
    { name: "Luis Sánchez", email: "luis.sanchez@empresa.com", active: true, department: "Finanzas", joinDate: "2022-09-05", avatar: "/placeholder.svg?height=40&width=40" },
]

export const UsuariosRRHH = () => {
    const [searchTerm, setSearchTerm] = useState("")

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.department.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="container mx-auto  px-4">
            <h1 className="text-3xl font-bold mb-8 text-center">Listado de Usuarios</h1>
            <Input
                type="search"
                
                placeholder="Buscar usuarios..."
                className="mb-6 text-black border-white/50 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredUsers.map((user) => (
                    <Card key={user.email} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                        <CardContent className="p-6">
                            <div className="flex items-center space-x-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h2 className="text-xl font-semibold">{user.name}</h2>
                                    <Badge variant={user.active ? "success" : "destructive"} className="mt-1 p-1">
                                        {user.active ? "Activo" : "Inactivo"}
                                    </Badge>
                                </div>
                            </div>
                            <div className="mt-4 space-y-2">
                                <div className="flex items-center text-sm text-gray-500">
                                    <Mail className="mr-2 h-4 w-4" />
                                    {user.email}
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                    <Building2 className="mr-2 h-4 w-4" />
                                    {user.department}
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    {new Date(user.joinDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}