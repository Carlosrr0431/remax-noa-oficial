import { motion } from 'framer-motion';
import { FeaturedArticle } from './FeaturedArticle';
import { NoticiasCard } from './NoticiasCard';
import { PropiedadDetalles } from '../landingPropiedades/PropiedadDetalles';
import { NoticiaArticuloDetalle } from './NoticiaArticuloDetalle';
import NoticiaCard2 from './NoticiaCard2';

const newsData = {
  featured: {
    id: "1",
    title: "El mercado inmobiliario en 2024: Un análisis completo de las tendencias actuales",
    description: "Un estudio detallado sobre cómo la tecnología y las nuevas preferencias de los compradores están transformando el sector inmobiliario. Descubre las oportunidades emergentes y los desafíos que enfrenta el mercado.",
    content: `<h4>El mercado inmobiliario está experimentando una transformación sin precedentes en 2024. La confluencia de nuevas tecnologías, cambios en las preferencias de los compradores y la evolución de los espacios de trabajo está redefiniendo el panorama del sector.</h4>
    <h1>La revolución tecnológica</h1>
    <h4>La inteligencia artificial y la realidad virtual están transformando la forma en que compramos y vendemos propiedades. Los recorridos virtuales en 3D se han convertido en una herramienta estándar, permitiendo a los compradores explorar propiedades desde cualquier lugar del mundo.</h4>
    <h1>Sostenibilidad y eficiencia energética</h1>
    <h4>La demanda de viviendas sostenibles continúa creciendo. Los compradores están cada vez más interesados en propiedades con certificaciones ambientales, sistemas de energía solar y soluciones de ahorro de agua.</h4>
    <h1>El impacto del trabajo remoto</h1>
    <h4>El auge del trabajo remoto ha cambiado drásticamente las preferencias de ubicación. Las áreas suburbanas y rurales están experimentando un renovado interés, mientras que los compradores buscan espacios más grandes que puedan acomodar oficinas en casa.</h4>`,
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80",
    date: "15 Mar 2024",
    readTime: "7 min lectura",
    category: "Análisis de Mercado",
    author: {
      name: "Ana Martínez",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      role: "Analista Senior de Mercado"
    }
  },
  articles: [
    {
      id: "2",
      title: "Nuevas normativas energéticas para edificios residenciales",
      description: "Las últimas regulaciones sobre eficiencia energética están cambiando el panorama de la construcción residencial. Te explicamos todo lo que necesitas saber.",
      content: `<h4>Las nuevas normativas energéticas están revolucionando el sector de la construcción residencial. Los desarrolladores y propietarios deben adaptarse a estándares más estrictos que priorizan la sostenibilidad y la eficiencia.</h4>
      <h1>Principales cambios normativos</h1>
      <h4>Las regulaciones actuales exigen un mínimo de eficiencia energética en nuevas construcciones, incluyendo el uso de materiales sostenibles y sistemas de energía renovable.</h4>
      <h1>Impacto en el mercado</h1>
      <h4>Estas normativas están influyendo en los precios y la demanda de propiedades, con un creciente interés en viviendas que cumplen o superan los nuevos estándares energéticos.</h4>`,
      image: "https://images.unsplash.com/photo-1460472178825-e5240623afd5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      date: "14 Mar 2024",
      readTime: "5 min lectura",
      category: "Regulación",
      author: {
        name: "Carlos Ruiz",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        role: "Especialista en Regulación"
      }
    },
    {
      id: "3",
      title: "Las zonas más prometedoras para invertir en 2024",
      description: "Un análisis detallado de las áreas urbanas con mayor potencial de crecimiento y rentabilidad para inversiones inmobiliarias este año.",
      content: `<h4>La identificación de zonas prometedoras para inversión inmobiliaria requiere un análisis exhaustivo de múltiples factores económicos y sociales.</h4>
      <h1>Criterios de selección</h1>
      <h4>Entre los factores más relevantes se encuentran el desarrollo de infraestructuras, la proximidad a centros de empleo y la calidad de vida del área.</h4>
      <h1>Zonas destacadas</h1>
      <h4>Las áreas metropolitanas en expansión y las ciudades intermedias con fuerte crecimiento económico presentan las mejores oportunidades de inversión en 2024.</h4>`,
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      date: "13 Mar 2024",
      readTime: "6 min lectura",
      category: "Inversiones",
      author: {
        name: "Laura Sánchez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        role: "Asesora de Inversiones"
      }
    }
  ]
};

export function SeccionNoticias() {
  return (
    <section className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Noticias Inmobiliarias
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Las últimas novedades y análisis del mercado inmobiliario
          </p>
        </motion.div>

        <FeaturedArticle {...newsData.featured} />

        <div className='mb-4'>
          <NoticiaCard2  {...newsData.featured} />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

          {newsData.articles.map((article) => (
            <NoticiasCard key={article.id} {...article} />
          ))}


        </div>

        <NoticiaArticuloDetalle />
      </div>
    </section>
  );
}