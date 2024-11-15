'use client'

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Send } from "lucide-react"
import Pusher from "pusher-js"
import { postData } from "@/app/action"

export default function ChatComponent() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [popover, setPopover] = useState(true);
    const [emojis, setEmojis] = useState([]);
    const [name, setName] = useState("");
    // const { userName } = useAppContext();
    const [nameModificado, setNameModificado] = useState("Anonimo");
    const inputChat = useRef();
    const divRef = useRef()
    // const { disabled } = useAppContext()
    const formRef = useRef()

    useEffect(() => {

        let pusher = new Pusher("3f6bbe996346c336b473", {
            cluster: "sa1"
        })

        let channel = pusher.subscribe('chat');

        channel.bind('hello', function (data) {

            const newMessage = {
                message: data.message,
                nombre: data.nombre,
            };

            setMessages((prev) => [...prev, newMessage])

            setTimeout(() => {
                actualizarScroll()
            }, 100);

        });

        return () => {
            pusher.unsubscribe('chat')
        }

    }, []);

    const actualizarScroll = () => {
        divRef.current.scrollTop = divRef.current.scrollHeight

    }


    const handlePopover = () => {
        setPopover((ant) => !ant);
    };
    const enterClick2 = (e) => {
        e.preventDefault();

        if (e.keyCode == "13") {
            const newMessage = {
                body: message,
                from: nameModificado,
            };

            setTimeout(() => {
                actualizarScroll()
            }, 100);
        }


    };


    // const sendMessage = (e) => {
    //     e.preventDefault()
    //     if (newMessage.trim()) {
    //         const newMsg = {
    //             id: messages.length + 1,
    //             sender: "Me",
    //             content: newMessage,
    //             time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    //         }
    //         setMessages([...messages, newMsg])
    //         setNewMessage("")

    //         // Simulate received message
    //         setTimeout(() => {
    //             const replyMsg = {
    //                 id: messages.length + 2,
    //                 sender: "Juan",
    //                 content: "Gracias por tu mensaje. Lo revisaré y te responderé pronto.",
    //                 time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    //             }
    //             setMessages(prev => [...prev, replyMsg])
    //         }, 1000)
    //     }
    // }

    return (
        <Card className="w-full h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-bold">Chat</CardTitle>
                <MessageCircle className="w-6 h-6 text-blue-500" />
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[calc(100vh-260px)] pr-4 mb-4" ref={divRef}>
                    {messages.map((message, index) => (
                        <li


                            key={index}
                            className={`p-1 mb-2 table text-[17px] rounded-md items-start w-full font-extralight text-start ${message.nombre === "Carlos RR" ? "bg-gray-400 ml-auto" : ""
                                }`}

                        >
                            <b className=" text-black/70">{message.nombre}</b><b className=" text-white font-normal rounded-lg  px-2 ">{message.message}</b>
                        </li>
                    ))}
                </ScrollArea>
                <form action={async (formData) => {
                    await postData(formData);
                    formRef.current?.reset();
                }}
                    ref={formRef} className="flex gap-2">
                    <Input
                        type="text"
                        name="message"
                        ref={inputChat}
                        placeholder="Escribe un mensaje..."
                        onKeyUp={enterClick2}
                        className="flex-1"
                        autoFocus
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