import React from 'react';
import { HomeIcon, DollarSign, ClipboardCheck, Handshake } from 'lucide-react';

const steps = [
  {
    title: 'Evaluación Gratuita',
    description: 'Realizamos una tasación profesional de tu propiedad sin costo.',
    icon: HomeIcon,
  },
  {
    title: 'Estrategia de Precio',
    description: 'Definimos el mejor precio basado en el mercado actual.',
    icon: DollarSign,
  },
  {
    title: 'Marketing Digital',
    description: 'Promocionamos tu propiedad en todas nuestras plataformas.',
    icon: ClipboardCheck,
  },
  {
    title: 'Cierre Exitoso',
    description: 'Te acompañamos en todo el proceso hasta la venta final.',
    icon: Handshake,
  },
];

const VenderEnRemax = () => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Vende tu propiedad con nosotros
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Proceso simple y transparente para vender tu propiedad al mejor precio
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-red-100 text-red-600 rounded-full mb-4">
                  <step.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  {index + 1}. {step.title}
                </h3>
                <p className="mt-2 text-base text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700">
            Comenzar ahora
          </button>
        </div>
      </div>
    </div>
  );
};

export default VenderEnRemax;