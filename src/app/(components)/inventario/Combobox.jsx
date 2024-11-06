'use client'

import * as React from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from "@/components/ui/input"
import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'

export const ComboBox = ({ options, value, onChange, onCreateNew }) => {
    const [inputValue, setInputValue] = useState(value)
    const [filteredOptions, setFilteredOptions] = useState(options)
    const [isOpen, setIsOpen] = useState(false)
    const inputRef = useRef(null)

    useEffect(() => {
        setInputValue(value)
    }, [value])

    const handleInputChange = (e) => {
        const newValue = e.target.value
        setInputValue(newValue)
        setIsOpen(true)

        const filtered = options.filter(option =>
            option.label.toLowerCase().includes(newValue.toLowerCase())
        )
        setFilteredOptions(filtered)

        onChange(newValue)
    }

    const handleOptionClick = (option) => {
        setInputValue(option.label)
        onChange(option.value)
        setIsOpen(false)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue && !filteredOptions.length) {
            onCreateNew(inputValue)
            setIsOpen(false)
        }
    }

    const handleBlur = () => {
        // Delay closing to allow for option selection
        setTimeout(() => setIsOpen(false), 200)
    }

    return (
        <div className="relative">
            <Input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsOpen(true)}
                onBlur={handleBlur}
                placeholder="Buscar o agregar item..."
            />
            {isOpen && (
                <ul className="absolute z-10 w-full mt-1 max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg">
                    {filteredOptions.map((option) => (
                        <li
                            key={option.value}
                            className={cn(
                                "px-3 py-2 cursor-pointer hover:bg-gray-100 ",
                                value === option.value && " text-gray-500"
                            )}
                            onClick={() => handleOptionClick(option)}
                        >
                            <div className="flex items-center  text-gray-500">
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === option.value ? "opacity-100  text-black" : "opacity-0"
                                    )}
                                />
                                {option.label}
                            </div>
                        </li>
                    ))}
                    {!filteredOptions.length && (
                        <li className="px-3 py-2 text-gray-500">
                            No se encontraron resultados. Presione Enter para agregar.
                        </li>
                    )}
                </ul>
            )}
        </div>
    )
}