"use client"

import React, { useState } from 'react';
import { AgentCard } from './AgentCard';
import { AgentModal } from './AgentModal';
import { agents } from '../data/agents';

export const RankingSection = () => {


    const [modal, setModal] = useState({
        isOpen: false,
        agentId: null
    });

    const selectedAgent = modal.agentId ? agents.find(a => a.id === modal.agentId) : null;

    return (
        <>
            <section className="py-8 sm:py-16 px-4 sm:px-6 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div

                        className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
                    >
                        {agents.map((agent, index) => (
                            <AgentCard
                                key={agent.id}
                                agent={agent}
                                index={index}
                                onClick={() => setModal({ isOpen: true, agentId: agent.id })}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <AgentModal
                agent={selectedAgent}
                isOpen={modal.isOpen}
                onClose={() => setModal({ isOpen: false, agentId: null })}
            />
        </>
    );
};