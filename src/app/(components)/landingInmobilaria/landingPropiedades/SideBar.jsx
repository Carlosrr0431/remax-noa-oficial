"use client"
import { Menu, X } from 'lucide-react';
import { CategoriaFiltro } from './CategoriaFiltro';
import { FiltroPrecio } from './FiltroPrecio';
import React, { useEffect, useState } from 'react';
import { SidebarHeader } from './sidebar/SidebarHeader';
import { MobileToggle } from './sidebar/MobileToggle';



export function Sidebar({
    categories,
    selectedCategory,
    onSelectCategory,
    minPrice,
    maxPrice,
    onMinPriceChange,
    onMaxPriceChange,
    isSidebarOpen,
    setIsSidebarOpen
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 1024);
        if (window.innerWidth >= 1024) {
          setIsOpen(true);
        }
      };
  
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);
  
    return (
      <>
        {/* Mobile Toggle Button */}
        <MobileToggle onClick={() => setIsOpen(true)} />
  
        {/* Overlay for mobile */}
        {isMobile && isOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
  
        {/* Sidebar */}
        <aside
          className={`fixed lg:fixed top-0 left-0 z-50 h-screen bg-white border-r shadow-lg lg:shadow-none transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          } w-[280px]`}
        >
          <div className="flex flex-col h-full">
            <SidebarHeader onToggle={() => setIsOpen(false)} />
            
            <div className="flex-1 overflow-y-auto py-6 space-y-8 px-4">
              <CategoriaFiltro
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={(category) => {
                  onSelectCategory(category);
                  if (isMobile) setIsOpen(false);
                }}
              />
              
              <FiltroPrecio
                minPrice={minPrice}
                maxPrice={maxPrice}
                onMinPriceChange={onMinPriceChange}
                onMaxPriceChange={onMaxPriceChange}
              />
            </div>
  
            <div className="p-4 border-t bg-gray-50">
              <p className="text-sm text-gray-500 text-center">
                © 2024 Real Estate. All rights reserved.
              </p>
            </div>
          </div>
        </aside>
      </>
    );
  }