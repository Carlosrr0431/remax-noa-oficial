import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Share2, ArrowLeft } from 'lucide-react';
import { useAppContext } from '@/app/(context)/AppWrapper';

export function NoticiaArticuloDetalle() {
    const { selectedArticle, setSelectedArticle } = useAppContext();


    if (!selectedArticle) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50 overflow-y-auto"
                onClick={() => setSelectedArticle(null)}
            >
                <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', damping: 30 }}
                    className="min-h-screen bg-white mt-8 rounded-t-[2rem] overflow-hidden"
                    onClick={e => e.stopPropagation()}
                >
                    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="flex items-center justify-between mb-8">
                            <button
                                onClick={() => setSelectedArticle(null)}
                                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <ArrowLeft size={20} />
                                <span className="font-medium">Volver</span>
                            </button>
                            <button
                                onClick={() => setSelectedArticle(null)}
                                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors lg:hidden"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="mb-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <span className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full mb-4">
                                    {selectedArticle.category}
                                </span>
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                    {selectedArticle.title}
                                </h1>
                            </motion.div>

                            <motion.div
                                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={selectedArticle.author.avatar}
                                        alt={selectedArticle.author.name}
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-900">{selectedArticle.author.name}</p>
                                        <p className="text-sm text-gray-600">{selectedArticle.author.role}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <span className="flex items-center gap-2">
                                        <Calendar size={16} />
                                        {selectedArticle.date}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <Clock size={16} />
                                        {selectedArticle.readTime}
                                    </span>
                                </div>
                            </motion.div>
                        </div>

                        <motion.div
                            className="relative h-[300px] sm:h-[400px] lg:h-[500px] mb-8 rounded-2xl overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <img
                                src={selectedArticle.image}
                                alt={selectedArticle.title}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </motion.div>

                        <motion.div
                            className="prose prose-lg max-w-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                {selectedArticle.description}
                            </p>
                            <div
                                className="text-gray-800 leading-relaxed prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600"
                                dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                            />
                        </motion.div>

                        <motion.div
                            className="mt-12 pt-8 border-t"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                                    <Share2 size={20} />
                                    Compartir artículo
                                </button>
                                <div className="flex gap-4">
                                    {['LinkedIn', 'Twitter', 'Facebook'].map(network => (
                                        <button
                                            key={network}
                                            className="px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
                                        >
                                            {network}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence >
    );
}