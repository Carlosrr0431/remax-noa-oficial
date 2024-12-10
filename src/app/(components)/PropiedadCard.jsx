import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Bed, Bath, Square, Car, TreesIcon as Tree } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function PropiedadCard({ property
}) {
    return (
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="relative h-64">
                <Image
                    src={property.image}
                    alt={property.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-all duration-300 hover:scale-105"
                />
                <div className="absolute top-2 right-2">
                    <Badge className="bg-primary text-primary-foreground">{property.price}</Badge>
                </div>


            </div>
            <CardContent className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{property.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{property.description}</p>
                <div className="grid grid-cols-2 gap-2">
                    <Badge variant="outline" className="flex items-center justify-center py-1">
                        <Bed className="w-4 h-4 mr-1" />
                        {property.bedrooms} Dormitorios
                    </Badge>
                    <Badge variant="outline" className="flex items-center justify-center py-1">
                        <Bath className="w-4 h-4 mr-1" />
                        {property.bathrooms} Baños
                    </Badge>
                    <Badge variant="outline" className="flex items-center justify-center py-1">
                        <Square className="w-4 h-4 mr-1" />
                        {property.area}
                    </Badge>
                    <Badge variant="outline" className="flex items-center justify-center py-1">
                        <Car className="w-4 h-4 mr-1" />
                        {property.parking} Parking
                    </Badge>
                </div>

            </CardContent>
            {/* <CardFooter className="p-4 bg-gray-50">
                <Link href={`/property/${property.id}`} className="w-full">
                    <Button className="w-full bg-primary hover:bg-primary/90">Ver detalles</Button>
                </Link>
            </CardFooter> */}
        </Card>
    )
}
