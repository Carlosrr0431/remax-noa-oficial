import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"



export function ServicioCard({ icon: Icon, title, description, linkText, linkHref }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="flex flex-col h-full">
                <CardHeader>
                    <CardTitle className="flex items-start gap-4">
                        <div className="p-2 rounded-full bg-primary/10">
                            <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <span>{title}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{description}</p>
                </CardContent>
                <CardFooter>
                    <Link
                        href={linkHref}
                        className="text-primary hover:underline font-medium"
                    >
                        {linkText}
                    </Link>
                </CardFooter>
            </Card>
        </motion.div>
    )
}

