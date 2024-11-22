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
    const [shouldAutoScroll, setShouldAutoScroll] = useState(false)
    const scrollAreaRef = useRef(null)

    const scrollToBottom = () => {
        if (scrollAreaRef.current && shouldAutoScroll) {

            setTimeout(() => {

                const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
                if (scrollContainer) {
                    scrollContainer.scrollTop = scrollContainer.scrollHeight;
                }
            }, 500);

        }
    }

    // useEffect(() => {
    //     if (shouldAutoScroll) {
    //         scrollToBottom()
    //     }
    // }, [messages, shouldAutoScroll])

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


            // scrollToBottom()
            setMessages((prev) => [...prev, newMessage])
            inputChat.current.value = ""


        });

        return () => {
            pusher.unsubscribe('chat')
        }

    }, []);

    const handlePopover = () => {
        setPopover((ant) => !ant);
    };
    const enterClick2 = (e) => {
        e.preventDefault();


        console.log("keycode: " + e.keyCode);

        setShouldAutoScroll(true)

        if (e.keyCode == "13") {
            const newMessage = {
                body: message,
                from: nameModificado,
            };



            scrollToBottom()
        }


    };

    // const enterClick1 = (e) => {
    //     e.preventDefault();

    // setShouldAutoScroll(true)
    // scrollToBottom()

    // };

    return (

        <Card className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-white dark:bg-gray-800 rounded-t-lg">
                <CardTitle className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">Chat Comunitario</CardTitle>
                <MessageCircle className="w-6 h-6 text-indigo-500" />
            </CardHeader>
            <CardContent className="p-6">
                <ScrollArea className="h-[calc(100vh-260px)] pr-4 mb-4" ref={scrollAreaRef}>
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex mb-4 ${message.nombre === "CARLOS RR" ? "justify-end" : "justify-start"
                                }`}
                        >
                            <div
                                className={`flex gap-3 max-w-[80%] ${message.nombre === "CALORS RR" ? "flex-row-reverse" : ""
                                    }`}
                            >
                                <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                                    <AvatarImage src={'https://i.pravatar.cc/150?img=6'} />
                                    <AvatarFallback>{message.nombre}</AvatarFallback>
                                </Avatar>
                                <div
                                    className={`rounded-2xl p-4  shadow-md ${message.nombre === "CARLOS RR"
                                        ? "bg-indigo-500 text-black"
                                        : "bg-white dark:bg-gray-800 text-black dark:text-gray-200"
                                        }`}
                                >
                                    <p className="font-semibold text-sm mb-1 text-black">{message.nombre}</p>
                                    <p className="text-sm text-black">{message.message}</p>
                                    <span className="text-xs opacity-70 mt-2 block">
                                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div />
                </ScrollArea>
                <form action={async (formData) => {
                    await postData(formData);
                    formRef.current?.reset();
                }} className="flex gap-2 mt-4">
                    <Input
                        type="text"
                        name="message"

                        placeholder="Escribe un mensaje..."
                        onKeyUp={enterClick2}
                        ref={inputChat}

                        autoFocus
                        className="flex-1 bg-white dark:bg-gray-800 border-indigo-300 dark:border-indigo-700 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <Button type="submit" onClick={() => {
                        setTimeout(() => {
                            setShouldAutoScroll(true)
                            scrollToBottom()

                        }, 500)
                    }} className="bg-indigo-500 hover:bg-indigo-600 text-white">
                        <Send className="w-4 h-4 mr-2" />
                        Enviar
                    </Button>
                </form>
            </CardContent>
        </Card>

        // <Card className="w-full h-full">
        //     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        //         <CardTitle className="text-2xl font-bold">Chat</CardTitle>
        //         <MessageCircle className="w-6 h-6 text-blue-500" />
        //     </CardHeader>
        //     <CardContent>
        //         <ScrollArea className="h-[calc(100vh-260px)] pr-4 mb-4" ref={divRef}>
        //             {messages.map((message, index) => (
        //                 <li


        //                     key={index}
        //                     className={`p-1 mb-2 table text-[17px] rounded-md items-start w-full font-extralight text-start ${message.nombre === "Carlos RR" ? "bg-gray-400 ml-auto" : ""
        //                         }`}

        //                 >
        //                     <b className=" text-black/70">{message.nombre}</b><b className=" text-white font-normal rounded-lg  px-2 ">{message.message}</b>
        //                 </li>
        //             ))}
        //         </ScrollArea>
        // <form action={async (formData) => {
        //     await postData(formData);
        //     formRef.current?.reset();
        // }}
        //             ref={formRef} className="flex gap-2">
        //             <Input
        // type="text"
        // name="message"
        // ref={inputChat}
        // placeholder="Escribe un mensaje..."
        // onKeyUp={enterClick2}
        // className="flex-1"
        // autoFocus
        //             />
        //             <Button type="submit" size="icon">
        //                 <Send className="w-4 h-4" />
        //                 <span className="sr-only">Enviar mensaje</span>
        //             </Button>
        //         </form>
        //     </CardContent>
        // </Card>
    )
}