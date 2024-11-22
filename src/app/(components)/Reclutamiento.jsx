import React, { useState } from 'react';
import { Search, UserPlus } from 'lucide-react';
import { Embudo } from './Embudo';
import { AgregarCandidato } from './AgregarCandidato';
import { useAutoScroll } from '../hooks/useAutoScroll';
import { useEffect } from 'react';
import { supabaseClient } from '@/supabase/client';
import { actualizarEstado } from '../action';
import { useDragScroll } from '../hooks/useDragScroll';

// Initial demo data
const initialCandidates = [
    {
        id: '1',
        name: 'Ana García',
        email: 'ana.garcia@email.com',
        phone: '+34 123 456 789',
        position: 'Frontend Developer',
        stage: 'CV Recibido',
        createdAt: new Date().toISOString(),
    },
    {
        id: '2',
        name: 'Carlos Rodríguez',
        email: 'carlos.rodriguez@email.com',
        phone: '+34 987 654 321',
        position: 'UX Designer',
        stage: 'Primer Entrevista',
        createdAt: new Date().toISOString(),
    },
];
const STAGES = [
    "CV Recibido",
    "Primer Entrevista",
    "Segunda Entrevista",
    "Examen Psicotecnico",
    "Reclutado"
];

function App() {
    const [candidates, setCandidates] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStage, setSelectedStage] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const scrollContainerRef = useAutoScroll({ speed: 200, threshold: 400 });
    const { attachListeners } = useDragScroll();

    const filteredCandidates = candidates?.filter(candidate => {
        const matchesSearch =
            candidate.puesto.toLowerCase().includes(searchTerm.toLowerCase()) ||
            candidate.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStage = selectedStage === 'all' || candidate.estado === selectedStage;
        return matchesSearch && matchesStage;
    });

    const handleDragStart = (e, candidateId) => {
        e.dataTransfer.setData('candidateId', candidateId);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = async (e, newStage) => {
        e.preventDefault();
        const candidateId = e.dataTransfer.getData('candidateId');

        console.log("CandidatID: " + candidateId + "Nuevo Estado: " + newStage);

        setCandidates(prev => prev.map(candidate =>
            candidate.id === candidateId
                ? { ...candidate, stage: newStage }
                : candidate
        ));
        const candidato = candidates.find((elem) => elem.id == candidateId)

        await actualizarEstado(candidato.id, newStage)
    };

    const handleAddCandidate = (newCandidate) => {
        const candidate = {
            ...newCandidate,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString(),
        };
        setCandidates(prev => [...prev, candidate]);
    };

    useEffect(() => {
        const getSupabaseOficial = async () => {
            let data = await supabaseClient
                .from("formularioCV")
                .select("*").order('id', { ascending: true })

            setCandidates(data.data)
        }

        getSupabaseOficial()

        const channelUsuarios = supabaseClient
            .channel('formularioCV')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'formularioCV' }, (payload) => {

                if (payload.eventType == "INSERT") {


                    return (setCandidates((antContenido) => [payload.new, ...antContenido]))


                } else if (payload.eventType == 'UPDATE') {


                    return (setCandidates((antContenido) => antContenido.map((elem) => {
                        if (elem.id == payload.new.id) {
                            elem = payload.new
                        }

                        return elem;
                    })))



                } else if (payload.eventType == 'DELETE') {

                    return (setCandidates(antContenido => antContenido.filter((elem) => elem.id !== payload.old.id)))

                }
            })
            .subscribe()


        return () => {

            supabaseClient.removeChannel(supabaseClient.channel(channelUsuarios))
        }


    }, [])

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        container.style.cursor = 'grab';
        return attachListeners(container);
    }, [attachListeners, scrollContainerRef]);

    return (
        <div className="min-h-screen bg-gray-100 w-full min-w-[1200px] -ml-14 relative mx-auto">
            <div className=" p-6">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors absolute left-[70%]"
                >
                    <UserPlus size={20} />
                    <span>Nuevo Candidato</span>
                </button>
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Pipeline de Reclutamiento</h1>

                    <div className="flex flex-wrap gap-4 items-center justify-between">
                        <div className="flex gap-4 flex-1">
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" size={20} />
                                <input
                                    type="text"
                                    placeholder="Buscar candidatos..."
                                    className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <select
                                className="px-4 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                                value={selectedStage}
                                onChange={(e) => setSelectedStage(e.target.value)}
                            >
                                <option value="all">Todas las etapas</option>
                                {STAGES.map(stage => (
                                    <option key={stage} value={stage}>{stage}</option>
                                ))}
                            </select>
                        </div>


                    </div>
                </div>

                <div className="flex gap-6 pb-6  overflow-x-scroll px-4 w-full" ref={scrollContainerRef} style={{ WebkitOverflowScrolling: 'touch' }}>
                    {STAGES.map(stage => (
                        <Embudo
                            key={stage}
                            stage={stage}
                            candidates={filteredCandidates?.filter(c => c.estado === stage && c.oficina === "salta")}
                            onDragStart={handleDragStart}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                        />
                    ))}
                </div>
            </div>

            <AgregarCandidato
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddCandidate}
            />
        </div>
    );
}

export default App;