import ContactList from '@/app/(components)/remaxAlianzas/ContactList'
import React from 'react'

const AlianzasNegociosPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    Directorio de contactos habilitados
                </h1>
                <ContactList />
            </div>
        </div>
    )
}

export default AlianzasNegociosPage
