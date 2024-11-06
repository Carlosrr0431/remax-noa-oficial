import React from 'react';
import { Mail, Send } from 'lucide-react';

export default function Newsletter() {
  return (
    <section id="newsletter" className="section-padding">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="relative">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 mix-blend-multiply" />
            </div>
            <div className="relative px-6 py-16 sm:px-12 sm:py-20">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  Mantente informado
                </h2>
                <p className="mt-6 text-xl text-blue-100">
                  Recibe las últimas noticias y actualizaciones del sector inmobiliario directamente en tu correo.
                </p>
                <form className="mt-12 sm:mx-auto sm:max-w-lg sm:flex">
                  <div className="min-w-0 flex-1">
                    <label htmlFor="email" className="sr-only">
                      Correo electrónico
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="block w-full rounded-l-full border-0 px-6 py-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                      placeholder="Ingresa tu correo"
                    />
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <button
                      type="submit"
                      className="block w-full rounded-r-full border border-transparent bg-blue-500 px-6 py-4 text-base font-medium text-white shadow hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 sm:px-10"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}