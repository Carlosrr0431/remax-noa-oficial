import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bed, Bath, Square, Car, Eye } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function PropiedadCard({ property, onViewClick }) {
    return (
        <Card className="overflow-hidden">
            <CardContent className="p-0">
                <div className="relative h-48">
                    <Image
                        src={property.images[0]}
                        alt={property.location.address}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg"
                    />
                    {property.highlighted && (
                        <Badge className="absolute top-2 right-2">Destacada</Badge>
                    )}
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{property.location.address}, {property.location.city}</h3>
                    <p className="text-2xl font-bold mb-2">{property.currency} {property.price.toLocaleString()}</p>
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                        <span className="flex items-center"><Bed className="mr-1 h-4 w-4" /> {property.features.bedrooms}</span>
                        <span className="flex items-center"><Bath className="mr-1 h-4 w-4" /> {property.features.bathrooms}</span>
                        <span className="flex items-center"><Square className="mr-1 h-4 w-4" /> {property.features.area} m²</span>
                        <span className="flex items-center"><Car className="mr-1 h-4 w-4" /> {property.features.parking}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{property.description}</p>
                    <div className="mt-2 text-sm text-muted-foreground">
                        <p>Categoría: {property.category}</p>
                        <div className="flex items-center mt-1">
                            <Eye className="h-4 w-4 mr-1" />
                            <span>{property.totalViews} vistas</span>
                        </div>
                    </div>

                </div>
            </CardContent>
        </Card>
    )
}

