'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, Upload } from 'lucide-react'
import PhoneInput from './PhoneInput'

export default function PersonalInfoForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        cvFile: null,
    })
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [isDragging, setIsDragging] = useState(false)

    const handleChange = (e) => {
        const { name, value, files } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }))
        setErrors(prev => ({ ...prev, [name]: '' }))
    }

    const handlePhoneChange = (value) => {
        setFormData(prev => ({ ...prev, phone: value }))
        setErrors(prev => ({ ...prev, phone: '' }))
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)
        const file = e.dataTransfer.files[0]
        if (file) {
            setFormData(prev => ({ ...prev, cvFile: file }))
            setErrors(prev => ({ ...prev, cvFile: '' }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newErrors = {}
        Object.keys(formData).forEach(key => {
            if (!formData[key]) {
                newErrors[key] = 'Este campo es obligatorio'
            }
        })
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }
        setIsLoading(true)

        const mensaje = await onSubmit(formData)

        if (mensaje.message == "File uploaded successfully!") {
            setIsLoading(false)
        }

    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-xl sm:text-2xl font-bold text-center text-gray-800">Información Personal</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">Nombre Completo</Label>
                        <Input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className={`mt-1 ${errors.fullName ? 'border-red-500' : ''}`}
                        />
                        {errors.fullName && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.fullName}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.email}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Número de Teléfono</Label>
                        <PhoneInput
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            error={errors.phone}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cvFile" className="text-sm font-medium text-gray-700">CV</Label>
                        <div
                            className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md ${isDragging ? 'border-blue-500 bg-blue-50' : ''}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <div className="space-y-1 text-center">
                                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="flex text-sm text-gray-600">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                    >
                                        <span>Sube un archivo</span>
                                        <input id="file-upload" name="cvFile" type="file" className="sr-only" onChange={handleChange} accept=".pdf" />
                                    </label>
                                    <p className="pl-1 text-gray-600">o arrastra y suelta</p>
                                </div>
                                <p className="text-xs text-gray-500">
                                    PDF, DOC, DOCX hasta 10MB
                                </p>
                            </div>
                        </div>
                        {formData.cvFile && <p className="text-sm text-gray-600 mt-2">Archivo seleccionado: {formData.cvFile.name}</p>}
                        {errors.cvFile && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.cvFile}</p>}
                    </div>
                </form>
            </CardContent>
            <CardFooter>
                <Button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors py-2 sm:py-3 text-sm sm:text-base font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <motion.div
                            className="flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Enviando...
                        </motion.div>
                    ) : 'Enviar Información'}
                </Button>
            </CardFooter>
        </Card>
    )
}

















// 'use client'

// import { useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
// import { AlertCircle, XCircle } from 'lucide-react'
// import { supabaseClient } from '@/supabase/client'

// export default function PersonalInfoForm({ onSubmit }) {
//     const [formData, setFormData] = useState({
//         fullName: '',
//         email: '',
//         phone: '',
//         cv: null,
//     })
//     const [errors, setErrors] = useState({})
//     const [flag, setFlag] = useState(false)

//     const handleChange = (e) => {
//         const { name, value, files } = e.target

//         setFormData(prev => ({
//             ...prev,
//             [name]: files ? files[0] : value
//         }))
//         setErrors(prev => ({ ...prev, [name]: '' }))
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         const newErrors = {}
//         Object.keys(formData).forEach(key => {
//             if (!formData[key]) {
//                 newErrors[key] = 'Este campo es obligatorio'
//             }
//         })
//         if (Object.keys(newErrors).length > 0) {
//             setErrors(newErrors)
//             return
//         }

//         onSubmit(formData)
//     }

//     return (
//         <>
//             <Card className={`w-full max-w-2xl mx-auto ${flag ? 'hidden' : 'visible'}`}>
//                 <CardHeader>
//                     <CardTitle className="text-2xl font-bold text-center text-primary">Información Personal</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <form className="space-y-6">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div className="space-y-2">
//                                 <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">Nombre Completo</Label>
//                                 <Input
//                                     type="text"
//                                     id="fullName"
//                                     name="fullName"
//                                     value={formData.fullName}
//                                     onChange={handleChange}
//                                     className={`mt-1 ${errors.fullName ? 'border-red-500' : ''}`}
//                                 />
//                                 {errors.fullName && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.fullName}</p>}
//                             </div>
//                             <div className="space-y-2">
//                                 <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
//                                 <Input
//                                     type="email"
//                                     id="email"
//                                     name="email"
//                                     value={formData.email}
//                                     onChange={handleChange}
//                                     className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
//                                 />
//                                 {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.email}</p>}
//                             </div>
//                             <div className="space-y-2">
//                                 <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Número de Teléfono</Label>
//                                 <Input
//                                     type="tel"
//                                     id="phone"
//                                     name="phone"
//                                     value={formData.phone}
//                                     onChange={handleChange}
//                                     className={`mt-1 ${errors.phone ? 'border-red-500' : ''}`}
//                                 />
//                                 {errors.phone && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.phone}</p>}
//                             </div>
//                             <div className="space-y-2">
//                                 <Label htmlFor="cv" className="text-sm font-medium text-gray-700">CV</Label>
//                                 <Input
//                                     type="file"
//                                     id="cv"
//                                     name="cv"
//                                     onChange={handleChange}
//                                     accept=".pdf,.doc,.docx"
//                                     className={`mt-1 ${errors.cv ? 'border-red-500' : ''}`}
//                                 />
//                                 {errors.cv && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.cv}</p>}
//                             </div>
//                         </div>
//                     </form>
//                 </CardContent>
//                 <CardFooter>
//                     <Button type='button' onClick={handleSubmit} className="w-full bg-blue-800 hover:bg-primary-dark transition-colors">Continuar</Button>
//                 </CardFooter>
//             </Card>

//             <Card className={`w-full max-w-2xl mx-auto ${flag ? 'visible' : 'hidden'} overflow-hidden`}>
//                 <div className="relative h-48 md:h-64">
//                     <img
//                         src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1200&auto=format"
//                         alt="Survey clipboard and pen"
//                         className="w-full h-full object-cover"
//                     />
//                     <div className="absolute inset-0 bg-black/30" />
//                 </div>
//                 <CardContent className="p-6 text-center">
//                     <div className="mb-4 flex justify-center">
//                         <XCircle className="h-12 w-12 text-red-500 animate-in zoom-in duration-300" />
//                     </div>
//                     <h2 className="text-2xl font-bold text-gray-900 mb-3">
//                         Acceso Denegado
//                     </h2>
//                     <p className="text-gray-600 mb-4">
//                         Ya has completado esta encuesta anteriormente. Agradecemos tu interés en participar.
//                     </p>
//                     <div className="text-sm text-gray-500 border-t pt-4 mt-4">
//                         Cada usuario solo puede completar la encuesta una vez para mantener la integridad de los resultados.
//                     </div>
//                 </CardContent>
//             </Card>

//         </>
//     )
// }