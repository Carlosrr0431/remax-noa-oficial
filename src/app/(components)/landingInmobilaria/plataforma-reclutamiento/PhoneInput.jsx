'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Input } from '@/components/ui/input'


const PhoneInput = ({ value, onChange, error }) => {
    const [focusedIndex, setFocusedIndex] = useState(null);
    const inputRefs = useRef([]);

    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, 10);
    }, []);

    const handleChange = (index, digit) => {
        if (/^[0-9]?$/.test(digit)) {
            const newValue = value.split('');
            newValue[index] = digit;
            onChange(newValue.join(''));
            if (digit && index < 9) {
                setFocusedIndex(index + 1);
            } else if (!digit && index > 0) {
                setFocusedIndex(index - 1);
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !value[index] && index > 0) {
            setFocusedIndex(index - 1);
        } else if (e.key === 'ArrowLeft' && index > 0) {
            setFocusedIndex(index - 1);
        } else if (e.key === 'ArrowRight' && index < 9) {
            setFocusedIndex(index + 1);
        }
    };

    useEffect(() => {
        if (focusedIndex !== null && inputRefs.current[focusedIndex]) {
            inputRefs.current[focusedIndex]?.focus();
        }
    }, [focusedIndex]);

    return (
        <div className="w-full">
            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                <div className="flex space-x-1">
                    {[...Array(4)].map((_, index) => (
                        <Input
                            key={`area-${index}`}
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={1}
                            value={value[index] || ''}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            ref={(el) => (inputRefs.current[index] = el)}
                            className="w-8 h-10 text-center text-base font-semibold border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md bg-white p-0"
                            style={{ caretColor: 'transparent' }}
                            aria-label={`Dígito ${index + 1} del código de área`}
                        />
                    ))}
                </div>
                <div className="flex space-x-1">
                    {[...Array(6)].map((_, index) => (
                        <Input
                            key={`phone-${index}`}
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={1}
                            value={value[index + 4] || ''}
                            onChange={(e) => handleChange(index + 4, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index + 4, e)}
                            ref={(el) => (inputRefs.current[index + 4] = el)}
                            className="w-8 h-10 text-center text-base font-semibold border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md bg-white p-0"
                            style={{ caretColor: 'transparent' }}
                            aria-label={`Dígito ${index + 1} del número de teléfono`}
                        />
                    ))}
                </div>
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

export default PhoneInput;