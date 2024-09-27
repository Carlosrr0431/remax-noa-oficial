import Image from "next/image"

export default function About() {
    return (
        <div className="flex flex-col">
            <section className="relative h-[60vh] w-full bg-gradient-to-r from-[#6366f1] to-[#9333ea] overflow-hidden">
                <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-20" />
                <div className="relative z-10 container mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-primary-foreground">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Conocenos...</h1>
                    <p className="mt-3 max-w-4xl text-lg sm:mt-5 sm:text-xl">
                        Pasaron muchos años y nos dimos cuenta que nuestro patrón común era cuidar a la gente, que la gente se mueva y se mueva sanamente. Mejorar la calidad de vida de las personas, si es un deportista elevar su rendimiento evitando lesiones, al sujeto Fitness ayudarlo a que alcance su mejor versión, y si venían con alguna lesión ayudarlos en el proceso de curado. A lo largo de los años hemos ido perfeccionando la metodología y hacemos lo que nos gusta, ayudar y cuidar a la gente. Proceso + metodología + trabajo en equipo = BIGGEST GYM.
                    </p>
                </div>
            </section>
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-card p-6 text-center shadow-lg transition-all duration-300 hover:scale-105">
                            <RocketIcon className="h-12 w-12 text-primary" />
                            <h3 className="text-xl font-semibold text-gray-600">Acondicionamiento físico</h3>
                            <p className="text-muted-foreground text-gray-600">
                                Tu mejor versión según tu objetivo pero alcanzarlo sanamente con ejecuciones adecuadas y progresiones ideales. Alcanza tu objetivo con nuestra metodología.
                            </p>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-card p-6 text-center shadow-lg transition-all duration-300 hover:scale-105">
                            <UsersIcon className="h-12 w-12 text-primary" />
                            <h3 className="text-xl font-semibold text-gray-600"> Entrenamiento Online</h3>
                            <p className="text-muted-foreground text-gray-600">
                                Puedes entrenar con nosotros y nuestra metodología donde sea que estés, con seguimiento y asesoramiento permanente como continuo.
                            </p>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-card p-6 text-center shadow-lg transition-all duration-300 hover:scale-105">
                            <BoltIcon className="h-12 w-12 text-primary" />
                            <h3 className="text-xl font-semibold text-gray-600">Lesiones</h3>
                            <p className="text-muted-foreground text-gray-600">
                                Con kinesiologo y profes especializados podrás recuperarte de tu lesión de la manera más eficiente y sana para no volver a lesionarte. Recuperación funcional a través del movimiento.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-20 bg-muted mb-[100px]">
                <div className="container mx-auto px-4">
                    <h2 className="mb-10 text-center text-3xl font-bold tracking-tight sm:text-4xl text-gray-600">Nuestro Equipo</h2>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="flex flex-col items-center gap-4 rounded-lg bg-card p-6 text-center shadow-lg transition-all duration-300 hover:scale-105">
                            {/* <Avatar>
                                <AvatarImage src="/placeholder-user.jpg" />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar> */}
                            <Image width={400} height={400} src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg"
                                alt="John Michael" class="relative inline-block   rounded-full object-cover object-center h-[65%] w-[65%]" />
                            <h3 className="text-xl font-semibold text-gray-600">John Doe</h3>
                            <p className="text-muted-foreground text-gray-600">Co-Founder & CEO</p>
                        </div>
                        <div className="flex flex-col items-center gap-4 rounded-lg bg-card p-6 text-center shadow-lg transition-all duration-300 hover:scale-105">
                            <Image width={400} height={400} src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg"
                                alt="John Michael" class="relative inline-block   rounded-full object-cover object-center h-[65%] w-[65%]" />
                            <h3 className="text-xl font-semibold text-gray-600">Jane Appleseed</h3>
                            <p className="text-muted-foreground text-gray-600">Co-Founder & CTO</p>
                        </div>
                        <div className="flex flex-col items-center gap-4 rounded-lg bg-card p-6 text-center shadow-lg transition-all duration-300 hover:scale-105">
                            <Image width={400} height={400} src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-6.jpg"
                                alt="John Michael" class="relative inline-block   rounded-full object-cover object-center h-[65%] w-[65%]" />
                            <h3 className="text-xl font-semibold text-gray-600">Sarah Musk</h3>
                            <p className="text-muted-foreground text-gray-600">Lead Designer</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

function BoltIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <circle cx="12" cy="12" r="4" />
        </svg>
    )
}


function RocketIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
    )
}


function UsersIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    )
}