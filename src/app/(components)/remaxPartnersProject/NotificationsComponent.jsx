import { Bell } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

export default function NotificationsComponent() {
    const notifications = [
        {
            id: 1,
            title: "Nuevo referido registrado",
            content: "Tu referido Juan Pérez ha sido registrado exitosamente.",
            time: "Hace 2 horas",
            isNew: true,
        },
        {
            id: 2,
            title: "Puntos acreditados",
            content: "Has recibido 100 puntos por tu último referido exitoso.",
            time: "Hace 5 horas",
            isNew: true,
        },
        {
            id: 3,
            title: "Recordatorio",
            content: "Tienes una reunión programada para mañana a las 10:00 AM.",
            time: "Hace 1 día",
            isNew: false,
        },
    ]

    return (
        <Card className="w-full h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-bold">Notificaciones</CardTitle>
                <Bell className="w-6 h-6 text-blue-500" />
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[calc(100vh-200px)] pr-4">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className="mb-4 p-4 rounded-lg bg-card border transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold">{notification.title}</h3>
                                        {notification.isNew && (
                                            <Badge variant="default" className="ml-2">
                                                Nuevo
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {notification.content}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        {notification.time}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </ScrollArea>
            </CardContent>
        </Card>
    )
}