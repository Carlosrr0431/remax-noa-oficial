import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon } from 'lucide-react'
import { useAppContext } from "@/app/(context)/AppWrapper";
import { motion } from 'framer-motion';
0

export default function NoticiaCard2({
    title,
    description,
    content,
    image,
    date,
    category,
    author
}) {

    const { setSelectedArticle } = useAppContext();
    return (
        <Card className="flex flex-col md:flex-row overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={() => setSelectedArticle({
            title,
            description,
            content,
            image,
            date,
            category,
            author
        })}>
            <div className="w-full md:w-[60%] h-64 md:h-auto">
                <motion.img src={image} alt={title} className="object-cover w-full h-full  transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="w-full md:w-3/5 flex flex-col">
                <CardHeader>
                    <div className="flex justify-between items-center mb-2 pb-4">
                        <Badge variant="secondary">{category}</Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                            <CalendarIcon className="mr-1 h-3 w-3" />
                            {date}
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{title}</CardTitle>
                    <CardDescription className="mt-10 text-xl text-gray-600 mb-4 ">{description}</CardDescription>
                </CardHeader>

                <CardFooter className="mt-auto">
                    {author && (
                        <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                                <AvatarImage src={author.avatar} alt={author.name} />
                                <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm font-medium">{author.name}</p>
                                {author.role && <p className="text-xs text-muted-foreground">{author.role}</p>}
                            </div>
                        </div>
                    )}
                </CardFooter>
            </div>
        </Card>
    )
}