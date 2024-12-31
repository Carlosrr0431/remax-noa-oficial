"use client"

import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
// import { candidates } from './mockData'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Search } from 'lucide-react'
import { supabaseClient } from '@/supabase/client'

export default function RecruitmentPipeline() {
    const [searchTerm, setSearchTerm] = useState('')
    const [candidates, setCandidates] = useState([])

    useEffect(() => {

        const obtenerReclutados = async () => {
            const { data, error } = await supabaseClient
                .from("cuposDisponibles")
                .select("*");

            let reclutados = [];

            data.map((elem, index) => {
                if (elem.reclutados != null) {
                    const applicationDate = elem.created_at
                        .substr(0, 10)
                        .split("-")
                        .reverse()
                        .join("/");



                    elem.reclutados.map((elem) => {

                        let stage = "";

                        console.log("segundaEntrevista: " + elem.segundaEntrevista);
                        console.log("diaSegundaEntrevista: " + elem.diaSegundaEntrevista);


                        if (elem.diaTerceraEntrevista != undefined && elem.pasoTerceraEntrevista == "paso") {
                            stage = "Reclutados"
                        } else if (elem.diaTerceraEntrevista != undefined && elem.pasoSegundaEntrevista == 'paso') {
                            stage = "Segunda Entrevista"
                        } else if (elem.diaSegundaEntrevista != undefined && elem.pasoSegundaEntrevista == undefined) {
                            stage = "Primera Entrevista Individual"
                        }

                        console.log("STAGE: " + stage);

                        return reclutados.push({
                            ...elem,
                            applicationDate,
                            stage: stage
                        });
                    });
                }
            });


            console.log("RECLUTADOS: " + JSON.stringify(reclutados));

            setCandidates(reclutados)
        }


        obtenerReclutados()




    }, [])


    const filteredCandidates = useMemo(() => {
        return candidates.filter(candidate =>
            candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            candidate.position.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [searchTerm])

    const stages = [
        'Primera Entrevista Individual',
        'Segunda Entrevista',
        'Reclutados'
    ]

    return (
        <div className="container mx-auto p-6 bg-gradient-to-b from-gray-50 to-white min-h-screen">

            <div className="relative mb-8">
                {/* <Search className="relative text-gray-400" /> */}
                <Input
                    type="text"
                    placeholder="Buscar por nombre o posición..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full max-w-md mx-auto"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stages.map((stage) => (
                    <Card key={stage} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600">
                            <CardTitle className="text-center text-lg font-semibold text-white">{stage}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                            {candidates
                                .filter((candidate) => candidate.stage === stage)
                                .map((candidate) => (
                                    <Card key={candidate.id} className="mb-4 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                                        <CardContent className="p-4">
                                            <div className="flex items-center space-x-4">
                                                <Avatar className="h-16 w-16 border-2 border-blue-200">
                                                    <AvatarImage src={candidate.avatar} alt={candidate.nombre} />
                                                    <AvatarFallback className="bg-blue-100 text-blue-600">{candidate.nombre.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-lg text-gray-800">{candidate.nombre}</h3>

                                                    <p className="text-xs text-gray-500">{candidate.email}</p>
                                                </div>
                                            </div>
                                            <div className="mt-4 space-y-2">

                                                {/* <p className="text-sm text-gray-700">
                                                    <span className="font-semibold">Entrevista:</span> {applicationDate}
                                                </p> */}
                                            </div>

                                        </CardContent>
                                    </Card>
                                ))}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

