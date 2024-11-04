import React from 'react';
import { CandidatoCard } from './CandidatoCard';



export function Embudo({ stage, candidates, onDragStart, onDragOver, onDrop }) {
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

            <div className="space-y-3">
                {candidates?.map((candidate) => (
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