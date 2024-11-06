import React from 'react';
import { Trophy, Users, Gift, Building2, ArrowRight, Mail, Star, TrendingUp, UserCircle2 } from 'lucide-react';
import Navbar from '@/app/(components)/remaxPartners/Navbar';
import Hero from '@/app/(components)/remaxPartners/Hero';
import Features from '@/app/(components)/remaxPartners/Features';
import Rankings from '@/app/(components)/remaxPartners/Rankings';
import Newsletter from '@/app/(components)/remaxPartners/Newsletter';
import Footer from '@/app/(components)/remaxPartners/Footer';

const ComunidadRemax = () => {
    return (
        <div className="relative w-full overflow-x-hidden overflow-y-scroll h-full">
            <Navbar />
            <main className="relative">
                <Hero />
                <Features />
                <Rankings />
                <Newsletter />
            </main>
            <Footer />
        </div>
    )
}

export default ComunidadRemax