'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function AgregarNoticiaModal({ isOpen, onClose, onAddNews }) {

  const [newNews, setNewNews] = useState({
    title: '',
    content: '',
    author: '',
    image: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddNews(newNews)
    setNewNews({ title: '', content: '', author: '', image: '' })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewNews(prev => ({ ...prev, [name]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Añadir Nueva Noticia</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Título</Label>
            <Input id="title" name="title" value={newNews.title} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="content">Contenido</Label>
            <Textarea id="content" name="content" value={newNews.content} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="author">Autor</Label>
            <Input id="author" name="author" value={newNews.author} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="image">URL de la imagen</Label>
            <Input id="image" name="image" value={newNews.image} onChange={handleChange} placeholder="https://ejemplo.com/imagen.jpg" required />
          </div>
          <Button type="submit">Añadir Noticia</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}