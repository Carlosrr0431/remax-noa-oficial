import Link from "next/link"
import { Home, Users, MessageSquare, FileText } from 'lucide-react'

export function BottomNav() {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t lg:hidden z-20">
            <div className="flex justify-around items-center h-16">
                <Link
                    href="/"
                    className="flex flex-col items-center justify-center text-xs text-gray-600 hover:text-primary"
                >
                    <Home className="h-5 w-5 mb-1" />
                    <span>Inicio</span>
                </Link>
                <Link
                    href="/conocenos"
                    className="flex flex-col items-center justify-center text-xs text-gray-600 hover:text-primary"
                >
                    <Users className="h-5 w-5 mb-1" />
                    <span>Conócenos</span>
                </Link>
                <Link
                    href="/testimonios"
                    className="flex flex-col items-center justify-center text-xs text-gray-600 hover:text-primary"
                >
                    <MessageSquare className="h-5 w-5 mb-1" />
                    <span>Testimonios</span>
                </Link>
                <Link
                    href="/enviar-cv"
                    className="flex flex-col items-center justify-center text-xs text-gray-600 hover:text-primary"
                >
                    <FileText className="h-5 w-5 mb-1" />
                    <span>Enviar CV</span>
                </Link>
            </div>
        </div>
    )
}