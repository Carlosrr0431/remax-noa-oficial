import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { useAppContext } from '@/app/(context)/AppWrapper';


export function NoticiasCard(props) {
    const { setSelectedArticle } = useAppContext();

    return (
        <motion.article
            className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer "
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            onClick={() => setSelectedArticle(props)}
        >
            <div className="relative h-56 sm:h-64 overflow-hidden">
                <motion.img
                    src={props.image}
                    alt={props.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded-full shadow-lg">
                        {props.category}
                    </span>
                </div>
            </div>

            <div className="p-6 sm:p-8">
                <div className="flex items-center gap-4 mb-4">
                    <img
                        src={props.author.avatar}
                        alt={props.author.name}
                        className="w-10 h-10 rounded-full"
                    />
                    <div>
                        <p className="font-medium text-gray-900">{props.author.name}</p>
                        <p className="text-sm text-gray-600">{props.author.role}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1.5">
                        <Calendar size={16} />
                        {props.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Clock size={16} />
                        {props.readTime}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {props.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                    {props.description}
                </p>

                <motion.span
                    className="inline-flex items-center gap-1.5 text-blue-600 font-semibold group/button"
                    whileHover={{ x: 5 }}
                >
                    Leer más
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/button:translate-x-1" />
                </motion.span>
            </div>
        </motion.article>
    );
}