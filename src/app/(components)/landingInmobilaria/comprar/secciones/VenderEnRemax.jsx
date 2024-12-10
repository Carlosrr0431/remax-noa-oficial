import React from 'react';
import { Home, Key, Search, CheckCircle, Percent, Shield, Clock, Award, ArrowRight, DollarSign, FileCheck } from 'lucide-react';

const benefits = [
  {
    title: 'Financiamiento Preferencial',
    description: 'Acceso a las mejores tasas y condiciones con nuestros bancos asociados.',
    icon: Percent,
  },
  {
    title: 'Garantía Legal',
    description: 'Equipo legal especializado para una transacción segura y transparente.',
    icon: Shield,
  },
  {
    title: 'Proceso Ágil',
    description: 'Optimizamos los tiempos para que puedas mudarte lo antes posible.',
    icon: Clock,
  },
  {
    title: 'Servicio Premium',
    description: 'Atención personalizada y exclusiva durante todo el proceso.',
    icon: Award,
  },
];

const timeline = [
  {
    icon: Search,
    title: 'Búsqueda Personalizada',
    description: 'Analizamos tus necesidades y preferencias para encontrar las mejores opciones.',
    details: [
      'Evaluación de tus requerimientos',
      'Búsqueda en nuestra base exclusiva',
      'Selección de propiedades que coincidan con tus criterios'
    ]
  },
  {
    icon: Home,
    title: 'Visitas Guiadas',
    description: 'Te acompañamos a conocer cada propiedad con asesoramiento experto.',
    details: [
      'Coordinación de visitas',
      'Tour virtual disponible',
      'Evaluación detallada de cada propiedad'
    ]
  },
  {
    icon: DollarSign,
    title: 'Negociación',
    description: 'Negociamos el mejor precio y condiciones para tu inversión.',
    details: [
      'Análisis de mercado',
      'Estrategia de negociación',
      'Acuerdo de términos'
    ]
  },
  {
    icon: FileCheck,
    title: 'Documentación',
    description: 'Gestionamos todos los trámites y documentos necesarios.',
    details: [
      'Revisión legal',
      'Preparación de contratos',
      'Gestión de escrituras'
    ]
  },
  {
    icon: Key,
    title: 'Entrega de Llaves',
    description: '¡Felicitaciones! Ya puedes disfrutar de tu nueva propiedad.',
    details: [
      'Inspección final',
      'Firma de documentos',
      'Entrega de llaves'
    ]
  }
];

const VenderEnRemax = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Comprar en Remax NOA
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Te acompañamos en cada paso del proceso para que encuentres
            la propiedad de tus sueños con total seguridad y confianza.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 text-red-600 rounded-full mb-4">
                <benefit.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 md:p-12 shadow-lg">
          <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Tu Camino Hacia el Hogar Ideal
          </h3>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-red-200" />

            {timeline.map((step, index) => (
              <div key={step.title} className="relative mb-12 last:mb-0">
                <div className={`md:grid md:grid-cols-2 gap-8 items-center ${index % 2 === 0 ? 'md:text-right' : 'md:flex-row-reverse'
                  }`}>
                  {/* Content */}
                  <div className={`mb-8 md:mb-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12 md:order-2'}`}>
                    <div className="flex items-center md:justify-end mb-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-red-600 text-white rounded-full mr-4 md:mr-0 md:ml-4">
                        <step.icon className="h-6 w-6" />
                      </div>
                      <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 mt-12 w-full md:w-auto">
                        <span className="bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                          Paso {index + 1}
                        </span>
                      </div>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h4>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-center text-gray-700">
                          <ArrowRight className="h-4 w-4 text-red-600 mr-2" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
                    <div className="w-6 h-6 bg-red-600 rounded-full border-4 border-white shadow" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <button className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-200">
            Comenzar mi búsqueda
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VenderEnRemax;