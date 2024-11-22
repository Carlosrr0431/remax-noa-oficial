import React from 'react';
import { Check, Clock, Phone, UserCheck, FileCheck, XCircle } from 'lucide-react';

const buyerSteps = [
    {
        status: 'Pendiente',
        label: 'Pendiente de contactar',
        icon: Clock,
        description: 'New referral awaiting initial contact'
    },
    {
        status: 'Contactado',
        label: 'Pendiente de Validación',
        icon: Phone,
        description: 'Initial contact made with buyer'
    },
    {
        status: 'Validado',
        label: 'Proceso Finalizado',
        icon: FileCheck,
        description: 'Requirements confirmed and validated'
    }
];

const sellerSteps = [
    {
        status: 'Pendiente',
        label: 'Pendiente de contactar',
        icon: Clock,
        description: 'New referral awaiting initial contact'
    },
    {
        status: 'Captación',
        label: 'Pendiente de Validación',
        icon: Phone,
        description: 'Initial contact made with buyer'
    },
    {
        status: 'Validado',
        label: 'Proceso Finalizado',
        icon: FileCheck,
        description: 'Requirements confirmed and validated'
    }
];

export const StatusStepper = ({
    type,
    currentStatus,
    onStatusChange
}) => {
    const steps = type === 'buyer' ? buyerSteps : sellerSteps;
    const currentStepIndex = steps.findIndex(step => step.status === currentStatus);

    if (currentStatus === 'rejected') {
        return (
            <div className="bg-red-50 border border-red-100 rounded-lg p-4 flex items-center gap-3">
                <XCircle className="text-red-500" />
                <div>
                    <h4 className="font-medium text-red-800">Referral Rejected</h4>
                    <p className="text-sm text-red-600">This referral has been marked as rejected</p>
                </div>
            </div>
        );
    }

    const handleStepClick = (stepStatus, stepIndex) => {
        // Only allow moving one step at a time
        if (stepIndex <= currentStepIndex + 1) {
            onStatusChange(stepStatus);
        }
    };

    return (
        <div className="py-4">
            <div className="flex items-center">
                {steps.map((step, index) => {
                    const StepIcon = step.icon;
                    const isActive = index <= currentStepIndex;
                    const isCurrentStep = step.status === currentStatus;
                    const isNextStep = index === currentStepIndex + 1;
                    const isPastStep = index < currentStepIndex;

                    return (
                        <React.Fragment key={step.status}>
                            <div className="relative flex flex-col items-center flex-1">
                                <button
                                    onClick={() => handleStepClick(step.status, index)}
                                    disabled={index > currentStepIndex + 1}
                                    className={`group relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${isActive
                                        ? 'bg-blue-600 text-white'
                                        : isNextStep
                                            ? 'bg-gray-200 text-gray-400 hover:bg-blue-100 hover:text-blue-600'
                                            : 'bg-gray-200 text-gray-400'
                                        } ${isCurrentStep
                                            ? 'ring-2 ring-blue-600 ring-offset-2'
                                            : ''
                                        }`}
                                >
                                    {isPastStep ? (
                                        <Check size={16} />
                                    ) : (
                                        <StepIcon size={16} />
                                    )}

                                    {isNextStep && (
                                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                            Click to advance
                                        </div>
                                    )}
                                </button>
                                <div className="mt-2 text-center">
                                    <div className={`text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'
                                        }`}>
                                        {step.label}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1 max-w-[120px]">
                                        {step.description}
                                    </div>
                                </div>
                            </div>
                            {index < steps.length - 1 && (
                                <div
                                    className={`h-0.5 flex-1 transition-colors duration-200 ${index < currentStepIndex ? 'bg-blue-600' : 'bg-gray-200'
                                        }`}
                                />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>

            <div className="mt-4 flex justify-end">
                <button
                    onClick={() => onStatusChange('rejected')}
                    className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1"
                >
                    <XCircle size={16} />
                    Mark as Rejected
                </button>
            </div>
        </div>
    );
};