import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TestimonialsSection = () => {
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    const testimonials = [
        {
            name: "Marco Rossi",
            role: "Gérant, Bella Pizza",
            content: "Depuis que nous utilisons AlloRestau, nous ne ratons plus aucun appel pendant le service. C'est comme avoir une réceptionniste dédiée 24/7.",
            rating: 5,
            image: "🍕"
        },
        {
            name: "Sarah Benali",
            role: "Propriétaire, Le Tacos",
            content: "L'IA est bluffante. Elle comprend les accents, les bruits de fond, et prend les commandes parfaitement. Nos clients adorent !",
            rating: 5,
            image: "🌮"
        },
        {
            name: "Jean Dupont",
            role: "Chef, La Table d'Or",
            content: "L'intégration avec notre caisse a été immédiate. Un gain de temps énorme pour toute l'équipe en salle.",
            rating: 5,
            image: "👨‍🍳"
        }
    ];

    return (
        <section ref={ref} className="relative py-32 px-6" style={{ backgroundColor: '#fdefd5' }}>
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl font-bold mb-4" style={{ color: 'hsl(var(--theme-bg))', transition: 'color 0.9s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                        ILS NOUS FONT CONFIANCE
                    </h2>
                    <p className="text-xl" style={{ color: 'hsl(var(--theme-bg))', opacity: 0.8, transition: 'color 0.9s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                        Découvrez ce que les restaurateurs disent de nous
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                            animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                            whileHover={{ y: -6, scale: 1.02 }}
                            className="rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-150 relative"
                            style={{
                                backgroundColor: 'hsl(var(--theme-bg))',
                                fontFamily: 'Outfit, sans-serif',
                                transition: 'background-color 0.9s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                            role="article"
                            aria-label={`Témoignage de ${testimonial.name}`}
                        >
                            <div className="absolute -top-6 left-8 w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-md" style={{ backgroundColor: '#fdefd5' }}>
                                {testimonial.image}
                            </div>

                            <div className="flex gap-1 mb-4 mt-4 text-yellow-400">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <span key={i}>★</span>
                                ))}
                            </div>

                            <p className="mb-6 italic leading-relaxed" style={{ color: '#fdefd5' }}>
                                "{testimonial.content}"
                            </p>

                            <div>
                                <h4 className="font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#fdefd5' }}>{testimonial.name}</h4>
                                <p className="text-sm" style={{ color: 'rgba(253, 239, 213, 0.6)' }}>{testimonial.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
