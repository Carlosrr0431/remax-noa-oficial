'use client'

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatePresence, motion } from "framer-motion"
import { Calculator, DollarSign, Home, Key, LineChart, Wallet } from 'lucide-react'
import { ServicioCard } from "./ServicioCard"

const features = {
    buying: [
        {
            icon: DollarSign,
            title: "Find out how much you can afford",
            description: "We'll help you estimate your budget range. Save to your buyer profile to help in your search.",
            linkText: "Try our affordability calculator",
            linkHref: "#affordability-calculator"
        },
        {
            icon: Calculator,
            title: "Understand your monthly costs",
            description: "Get an in-depth look at what your monthly and closing costs will look like based on your financial situation and goals.",
            linkText: "Try our mortgage calculator",
            linkHref: "#mortgage-calculator"
        },
        {
            icon: Wallet,
            title: "Get help with your down payment",
            description: "You may be able to buy a home with just 3.5% down. Saving for that can be challenging—down payment assistance programs can help.",
            linkText: "Find down payment help",
            linkHref: "#down-payment-help"
        }
    ],
    renting: [
        {
            icon: Home,
            title: "Find the perfect rental",
            description: "Browse through our extensive list of rental properties to find your ideal home.",
            linkText: "Start your rental search",
            linkHref: "#rental-search"
        },
        {
            icon: Key,
            title: "Learn about rental agreements",
            description: "Understand the ins and outs of rental agreements to protect your rights as a tenant.",
            linkText: "Read our rental guide",
            linkHref: "#rental-guide"
        },
        {
            icon: Calculator,
            title: "Calculate your rental budget",
            description: "Use our tool to determine how much rent you can comfortably afford based on your income.",
            linkText: "Use rent calculator",
            linkHref: "#rent-calculator"
        }
    ],
    selling: [
        {
            icon: LineChart,
            title: "Estimate your home's value",
            description: "Get an instant estimate of your home's value based on recent sales in your neighborhood.",
            linkText: "Get your home estimate",
            linkHref: "#home-estimate"
        },
        {
            icon: Home,
            title: "Prepare your home for sale",
            description: "Learn about the best ways to stage and prepare your home to attract potential buyers.",
            linkText: "Read selling tips",
            linkHref: "#selling-tips"
        },
        {
            icon: DollarSign,
            title: "Understand selling costs",
            description: "Get a clear picture of all the costs associated with selling your home, including agent fees and closing costs.",
            linkText: "View selling costs",
            linkHref: "#selling-costs"
        }
    ]
}

export default function ListaServicios() {
    const [activeTab, setActiveTab] = useState("buying")

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-12">
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)} className="w-full mb-12">
                <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
                    <TabsTrigger
                        value="buying"
                        className="data-[state=active]:bg-background data-[state=active]:text-foreground"
                    >
                        Comprar
                    </TabsTrigger>
                    <TabsTrigger
                        value="renting"
                        className="data-[state=active]:bg-background data-[state=active]:text-foreground"
                    >
                        Alquilar
                    </TabsTrigger>
                    <TabsTrigger
                        value="selling"
                        className="data-[state=active]:bg-background data-[state=active]:text-foreground"
                    >
                        Vender
                    </TabsTrigger>
                </TabsList>
            </Tabs>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {features[activeTab].map((feature, index) => (
                        <ServicioCard key={index} {...feature} />
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
