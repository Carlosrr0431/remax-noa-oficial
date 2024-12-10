'use client'

import { Dialog, DialogContent } from "@/components/ui/dialog"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Button } from "@/components/ui/button"



export function PropertyModal({
    isOpen,
    onClose,
    images,
    currentImageIndex,
    onNavigate,
}) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[90vw] h-[90vh] p-0">
                <div className="relative h-full flex flex-col">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2 z-10 text-black"
                        onClick={onClose}
                    >   
                        <X className="h-4 w-4" />
                    </Button>

                    <div className="relative flex-1">
                        <Image
                            src={images[currentImageIndex]}

                            fill
                            className="object-contain w-full h-full"
                        />

                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute left-2 top-1/2 -translate-y-1/2"
                            onClick={() => onNavigate(currentImageIndex - 1)}
                            disabled={currentImageIndex === 0}
                        >
                            <ChevronLeft className="h-8 w-8 text-black" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2"
                            onClick={() => onNavigate(currentImageIndex + 1)}
                            disabled={currentImageIndex === images.length - 1}
                        >
                            <ChevronRight className="h-8 w-8" />
                        </Button>
                    </div>

                    <div className="p-4 bg-white">
                        <div className="grid grid-cols-6 gap-2 max-w-4xl mx-auto">
                            {images.map((image, index) => (
                                <button
                                    key={image.id}
                                    onClick={() => onNavigate(index)}
                                    className={`relative aspect-square overflow-hidden rounded-md ${index === currentImageIndex ? 'ring-2 ring-primary' : ''
                                        }`}
                                >
                                    <Image
                                        src={image}
                                        alt={image}
                                        fill
                                        className="object-cover w-full h-full"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}