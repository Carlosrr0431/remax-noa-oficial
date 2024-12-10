'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Eye } from 'lucide-react'
import { AgregarNoticiaModal } from '../componentes/AgregarNoticiaModal'

export default function Noticias() {
    const [isAddNewsModalOpen, setIsAddNewsModalOpen] = useState(false)
    const [news, setNews] = useState([
        { id: 1, title: 'El mercado inmobiliario se recupera tras la pandemia', content: 'Según los últimos informes, el mercado inmobiliario está mostrando signos de recuperación...', date: '2023-05-15', author: 'Juan Pérez', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80', clicks: 0 },
        { id: 2, title: 'Nuevas tendencias en diseño de interiores para 2023', content: 'Los expertos en diseño de interiores revelan las tendencias que dominarán este año...', date: '2023-05-10', author: 'María González', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80', clicks: 0 },
        { id: 3, title: 'Cómo la tecnología está cambiando el sector inmobiliario', content: 'La inteligencia artificial y la realidad virtual están transformando la forma en que compramos y vendemos propiedades...', date: '2023-05-05', author: 'Carlos Rodríguez', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80', clicks: 0 },
    ])

    const addNews = (newNewsItem) => {
        setNews([...news, { ...newNewsItem, id: news.length + 1, date: new Date().toISOString().split('T')[0], clicks: 0 }])
        setIsAddNewsModalOpen(false)
    }

    const incrementClicks = (id) => {
        setNews(news.map(item =>
            item.id === id ? { ...item, clicks: item.clicks + 1 } : item
        ))
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <h1 className="text-3xl font-bold">Noticias Inmobiliarias</h1>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                    <div className="relative w-full sm:w-auto">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input className="pl-8 w-full" placeholder="Buscar noticias..." />
                    </div>
                    <Button onClick={() => setIsAddNewsModalOpen(true)} className="w-full sm:w-auto">
                        <Plus className="mr-2 h-4 w-4" /> Añadir Noticia
                    </Button>
                </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {news.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                        <div className="relative h-48">
                            <Image
                                src={item.image}
                                alt={item.title}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <CardHeader>
                            <CardTitle>{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-2">{item.content}</p>
                            <div className="text-sm text-muted-foreground">
                                <p>Fecha: {item.date}</p>
                                <p>Autor: {item.author}</p>
                                <div className="flex items-center mt-2">
                                    <Eye className="h-4 w-4 mr-1" />
                                    <span>{item.clicks} clics</span>
                                </div>
                            </div>
                            <Button variant="outline" className="mt-4" onClick={() => incrementClicks(item.id)}>
                                Leer más
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <AgregarNoticiaModal isOpen={isAddNewsModalOpen} onClose={() => setIsAddNewsModalOpen(false)} onAddNews={addNews} />
        </div>
    )
}
