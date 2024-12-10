import React, { useState } from 'react';
import Header from './components/Header';
import MainMenu from './components/MainMenu';
import WhyRemaxSection from './components/sections/WhyRemaxSection';
import BuyRemaxSection from './components/sections/BuyRemaxSection';

function App() {
  const [activeSection, setActiveSection] = useState('why');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-16"> {/* Add padding to account for fixed header */}
        <MainMenu
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        <main>
          {activeSection === 'why' && <WhyRemaxSection />}
          {activeSection === 'buy' && <BuyRemaxSection />}
        </main>
      </div>
    </div>
  );
}

export default App;


// "use client"

// import React, { useState } from 'react';
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { Phone, Menu, X } from 'lucide-react';
// import PorqueRemax from './secciones/PorqueRemax';
// import VenderEnRemax from './secciones/VenderEnRemax';


// const Navegacion = () => {
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//     const [activeTab, setActiveTab] = useState("why");

//     const handleTabChange = (value) => {
//         setActiveTab(value);
//         setIsMobileMenuOpen(false); // Close mobile menu when tab changes
//     };

//     return (
//         <>
//             <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
//                 <header className="fixed top-0 w-full bg-white z-50 shadow-sm">
//                     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                         <div className="flex justify-between items-center h-16 gap-x-4">
//                             <div className="flex-shrink-0">
//                                 <span className="text-red-600 text-2xl font-bold">REMAX NOA</span>
//                             </div>

//                             {/* Mobile menu button */}
//                             <div className="md:hidden">
//                                 <button
//                                     onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                                     className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-gray-100"
//                                 >
//                                     {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//                                 </button>
//                             </div>

//                             {/* Desktop navigation */}
//                             <div className="hidden md:block flex-1">
//                                 <TabsList className="flex justify-center">
//                                     <TabsTrigger value="why">¿Por qué Remax NOA?</TabsTrigger>
//                                     <TabsTrigger value="sell">Comprar en Remax NOA</TabsTrigger>
//                                 </TabsList>
//                             </div>

//                             <div className="hidden md:block">
//                                 <button className="inline-flex items-center px-4 py-2 border border-red-600 text-sm font-medium rounded-md text-red-600 hover:bg-red-600 hover:text-white transition-colors duration-200">
//                                     <Phone className="h-4 w-4 mr-2" />
//                                     Contactar un agente
//                                 </button>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Mobile menu */}
//                     <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden border-t border-gray-200`}>
//                         <TabsList className="flex flex-col space-y-2 p-4">
//                             <TabsTrigger value="why" className="w-full justify-start">
//                                 ¿Por qué Remax NOA?
//                             </TabsTrigger>
//                             <TabsTrigger value="sell" className="w-full justify-start">
//                                 Vender en Remax NOA
//                             </TabsTrigger>

//                         </TabsList>
//                         <div className="p-4 border-t border-gray-200">
//                             <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-red-600 text-sm font-medium rounded-md text-red-600 hover:bg-red-600 hover:text-white transition-colors duration-200">
//                                 <Phone className="h-4 w-4 mr-2" />
//                                 Contactar un agente
//                             </button>
//                         </div>
//                     </div>
//                 </header>

//                 {/* Tab contents */}
//                 <div className="pt-16">
//                     <TabsContent value="why" className="m-0">
//                         <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//                             <div className="md:w-1/2 md:pr-8">
//                                 <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Por qué elegir Remax NOA?</h2>
//                                 <p className="text-lg text-gray-600 mb-6">
//                                     Somos la inmobiliaria líder en el mercado con más de 20 años de experiencia. Nuestro equipo de profesionales está comprometido con brindar el mejor servicio y resultados excepcionales.
//                                 </p>
//                                 <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700">
//                                     Conocer más
//                                 </button>
//                             </div>
//                             <div className="md:w-1/2 mt-8 md:mt-0">
//                                 <img
//                                     src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
//                                     alt="Luxury Real Estate"
//                                     className="rounded-lg shadow-lg w-full h-[400px] object-cover"
//                                 />
//                             </div>
//                         </div>
//                         <PorqueRemax />
//                     </TabsContent>

//                     <TabsContent value="sell" className="m-0">
//                         <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//                             <div className="md:w-1/2 md:pr-8">
//                                 <h2 className="text-3xl font-bold text-gray-900 mb-4">Vende tu propiedad con nosotros</h2>
//                                 <p className="text-lg text-gray-600 mb-6">
//                                     Maximiza el valor de tu propiedad con nuestro equipo de expertos. Ofrecemos un servicio integral y personalizado para que logres la mejor venta posible.
//                                 </p>
//                                 <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700">
//                                     Comenzar ahora
//                                 </button>
//                             </div>
//                             <div className="md:w-1/2 mt-8 md:mt-0">
//                                 <img
//                                     src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
//                                     alt="Selling Property"
//                                     className="rounded-lg shadow-lg w-full h-[400px] object-cover"
//                                 />
//                             </div>
//                         </div>
//                         <VenderEnRemax />
//                     </TabsContent>


//                 </div>
//             </Tabs>
//         </>
//     );
// };

// export default Navegacion;