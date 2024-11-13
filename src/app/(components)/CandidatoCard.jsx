import React from 'react';
import { Mail, Phone, Briefcase, CheckCircle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { supabaseClient } from '@/supabase/client';



export function CandidatoCard({ candidate, onDragStart }) {


    const marcarComoDescargado = async (id) => {


        const result2 = await supabaseClient
            .from("formularioCV")
            .update({
                descargado: true
            })
            .eq("id", id);

        console.log(result2);

    }

    return (
        <div
            draggable
            onDragStart={(e) => onDragStart(e, candidate.id)}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-move hover:shadow-md transition-shadow"
        >
            <h3 className="font-semibold text-sm text-gray-800 mb-2 text-wrap max-w-[20px]">{candidate.email}</h3>

            <div className="space-y-2 text-sm text-gray-600">
                {/* <div className="flex items-center gap-2">
                    <Mail size={16} />
                    <span>{candidate.email}</span>
                </div> */}

                {/* <div className="flex items-center gap-2">
                    <Phone size={16} />
                    <span>{candidate.phone}</span>
                </div> */}

                <div className="flex items-center gap-2">
                    <Briefcase size={16} />
                    <span>{candidate.puesto}</span>
                </div>


            </div>

            <div className="mt-3 text-xs text-gray-500 flex justify-around items-center">
                <div className='text-[16px] text-gray-800 font-[400px]'>  {candidate.created_at.substr(0, 10).split('-').reverse().join('/')}</div>

                <Link href={candidate.cv} download='cv.pdf' target='_blank' className="">
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex space-x-4 gap-x-4 text-black p-2"
                        onClick={() => {
                            marcarComoDescargado(candidate.id)
                        }}

                        aria-label={`Descargar CV de ${candidate.nombre}`}
                    >
                        {candidate.descargado ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                            <Download className="h-4 w-4" />
                        )}

                        {candidate.descargado ? (
                            "Mostrar CV"
                        ) : (
                            "Mostrar CV"
                        )}

                    </Button>
                </Link>
            </div>
        </div>
    );
}