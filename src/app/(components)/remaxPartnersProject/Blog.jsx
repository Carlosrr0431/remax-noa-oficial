import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function Blog() {
    const blogPosts = [
        {
            id: 1,
            title: 'Tendencias del mercado inmobiliario 2024',
            excerpt: 'Descubre las principales tendencias que están definiendo el mercado inmobiliario este año...',
            author: 'María González',
            date: new Date('2024-02-15'),
            image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
            category: 'Tendencias',
        },
        {
            id: 2,
            title: 'Cómo maximizar tus referidos inmobiliarios',
            excerpt: 'Estrategias probadas para aumentar tu red de contactos y mejorar tus resultados...',
            author: 'Carlos Ruiz',
            date: new Date('2024-02-10'),
            image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
            category: 'Estrategias',
        },
        {
            id: 3,
            title: 'Nuevas tecnologías en el sector inmobiliario',
            excerpt: 'El impacto de la tecnología en la forma de vender y promocionar propiedades...',
            author: 'Ana Martínez',
            date: new Date('2024-02-05'),
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
            category: 'Tecnología',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
                <article
                    key={post.id}
                    className="group bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                    <div className="relative h-48 overflow-hidden">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute top-4 left-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {post.category}
                            </span>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                            <span className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {format(post.date, "d 'de' MMMM, yyyy", { locale: es })}
                            </span>
                            <span className="flex items-center">
                                <User className="h-4 w-4 mr-1" />
                                {post.author}
                            </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                            {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                        <button className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors">
                            Leer más
                            <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>
                </article>
            ))}
        </div>
    );
}