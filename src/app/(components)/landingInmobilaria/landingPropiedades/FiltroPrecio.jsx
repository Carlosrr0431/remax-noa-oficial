import React from 'react';
import { DollarSign } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function FiltroPrecio({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}) {

  const router = useRouter()

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-blue-50 rounded-lg">
          <DollarSign className="w-5 h-5 text-blue-600" />
        </div>
        <h3 className="font-semibold text-gray-900">Precio</h3>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-600 font-medium">Mínimo</label>

          <input
            type="number"
            value={minPrice}
            onChange={(e) => {
              router.push(`/nuevaLanding/propiedades`)
              onMinPriceChange(Number(e.target.value))
            }}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
            placeholder="USD 0"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-600 font-medium">Máximo</label>
          <input
            type="number"
            value={maxPrice}

            onChange={(e) => {
              router.push(`/nuevaLanding/propiedades`)
              onMaxPriceChange(Number(e.target.value))
            }}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
            placeholder="USD 2,000,000"
          />
        </div>
      </div>
    </div>
  );
}