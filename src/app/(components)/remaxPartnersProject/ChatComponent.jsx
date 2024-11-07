'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Send } from "lucide-react"

export default function ChatComponent() {
    const [messages, setMessages] = useState([
        { id: 1, sender: "Juan", content: "¡Hola! ¿Cómo estás?", time: "10:30" },
        { id: 2, sender: "Me", content: "¡Muy bien! ¿Y tú?", time: "10:31" },
        { id: 3, sender: "Juan", content: "Excelente, gracias por preguntar. ¿En qué puedo ayudarte hoy?", time: "10:32" },
    ])
    const [newMessage, setNewMessage] = useState("")

    const sendMessage = (e) => {
        e.preventDefault()
        if (newMessage.trim()) {
            const newMsg = {
                id: messages.length + 1,
                sender: "Me",
                content: newMessage,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            }
            setMessages([...messages, newMsg])
            setNewMessage("")

            // Simulate received message
            setTimeout(() => {
                const replyMsg = {
                    id: messages.length + 2,
                    sender: "Juan",
                    content: "Gracias por tu mensaje. Lo revisaré y te responderé pronto.",
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                }
                setMessages(prev => [...prev, replyMsg])
            }, 1000)
        }
    }

    return (
        <Card className="w-full h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-bold">Chat</CardTitle>
                <MessageCircle className="w-6 h-6 text-blue-500" />
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[calc(100vh-260px)] pr-4 mb-4">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex mb-4 ${message.sender === "Me" ? "justify-end" : "justify-start"
                                }`}
                        >
                            <div
                                className={`flex gap-2 max-w-[80%] ${message.sender === "Me" ? "flex-row-reverse" : ""
                                    }`}
                            >
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src={`/placeholder.svg?text=${message.sender}`} />
                                    <AvatarFallback>{message.sender[0]}</AvatarFallback>
                                </Avatar>
                                <div
                                    className={`rounded-lg p-3 ${message.sender === "Me"
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted"
                                        }`}
                                >
                                    <p className="text-sm">{message.content}</p>
                                    <span className="text-xs opacity-70 mt-1 block">
                                        {message.time}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </ScrollArea>
                <form onSubmit={sendMessage} className="flex gap-2">
                    <Input
                        placeholder="Escribe un mensaje..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1"
                    />
                    <Button type="submit" size="icon">
                        <Send className="w-4 h-4" />
                        <span className="sr-only">Enviar mensaje</span>
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}