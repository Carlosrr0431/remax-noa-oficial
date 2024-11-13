import React, { useState } from 'react';
import { CandidatoCard } from './CandidatoCard';
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import { useEffect } from 'react';


export function Embudo({ stage, candidates, onDragStart, onDragOver, onDrop }) {

    const [cvStatus, setCvStatus] = useState(null)
    const [candidatosFiltro, setCandidatosFiltro] = useState(candidates)

    const handleSelect = (select) => {

        if (select == 'visto') {

            setCvStatus('visto')
            const filtro = candidates.filter((elem) => elem.descargado == true)

            setCandidatosFiltro(filtro)

        } else if (select == 'no-visto') {
            const filtro = candidates.filter((elem) => elem.descargado == false)

            setCvStatus('no-visto')
            setCandidatosFiltro(filtro)
        }
    }

    useEffect(() => {
        setCandidatosFiltro(candidates)
    }, [])


    return (
        <div
            className="flex-1 min-w-[300px] bg-gray-50 rounded-lg p-4"
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, stage)}
        >
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-700">{stage}</h2>
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
                    {candidates?.length}
                </span>


            </div>

            {
                stage == "CV Recibido" && <div className="p-1 rounded-xl  max-w-[400px] mx-auto mb-4">

                    <div className="flex justify-center space-x-4">
                        <Button
                            variant={cvStatus === 'visto' ? 'default' : 'outline'}
                            className={`w-32 h-8 text-[16px] font-semibold transition-all duration-300 ${cvStatus === 'visto'
                                ? 'bg-green-500 hover:bg-green-600 text-white'
                                : 'bg-white text-gray-800 hover:bg-gray-100'
                                }`}
                            onClick={() => handleSelect('visto')}
                        >
                            <Check className={`mr-2 h-5 w-5 ${cvStatus === 'visto' ? 'text-white' : 'text-green-500'}`} />
                            Visto
                        </Button>
                        <Button
                            variant={cvStatus === 'no-visto' ? 'default' : 'outline'}
                            className={`w-32 h-8 text-[16px] font-semibold transition-all duration-300 ${cvStatus === 'no-visto'
                                ? 'bg-red-500 hover:bg-red-600 text-white'
                                : 'bg-white text-gray-800 hover:bg-gray-100'
                                }`}
                            onClick={() => handleSelect('no-visto')}
                        >
                            <X className={`mr-2 h-5 w-5 ${cvStatus === 'no-visto' ? 'text-white' : 'text-red-500'}`} />
                            No Visto
                        </Button>
                    </div>
                </div>
            }

            <div className="space-y-3">
                {cvStatus != null ? candidatosFiltro?.map((candidate) => (
                <CandidatoCard
                    key={candidate.id}
                    candidate={candidate}
                    onDragStart={onDragStart}
                />
                )) : candidates?.map((candidate) => (
                    <CandidatoCard
                        key={candidate.id}
                        candidate={candidate}
                        onDragStart={onDragStart}
                    />
                    ))}
            </div>
        </div>
    );
}