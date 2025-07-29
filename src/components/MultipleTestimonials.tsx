"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useTranslations } from './providers/DictonaryContext';

// Using logo as placeholder as per current user setup
import user1 from "../../public/auto_ads.svg";
import user2 from "../../public/auto_ads.svg";
import user3 from "../../public/auto_ads.svg";

export default function MultipleTestimonials() {
  const { t } = useTranslations();

  const testimonials = [
    {
      quote: t('testimonials.quote1'),
      name: t('testimonials.name1'),
      title: t('testimonials.title1'),
      image: user1,
      rating: 4,
    },
    {
      quote: t('testimonials.quote2'),
      name: t('testimonials.name2'),
      title: t('testimonials.title2'),
      image: user2,
      rating: 5,
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-primary-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-xl text-texte-description-black max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
            >
              <Image
                src={testimonial.image}
                alt={`Photo of ${testimonial.name}`}
                width={80}
                height={80}
                className="rounded-full mb-4"
              />
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={`${
                      i < testimonial.rating
                        ? "text-bg-stars fill-bg-stars"
                        : "text-texte-description-black"
                    }`}
                    aria-hidden="true"
                  />
                ))}
                <span className="sr-only">
                  {testimonial.rating} out of 5 stars
                </span>
              </div>
              <p className="italic text-texte-header-black mb-4 flex-grow font-serif">
                &quot;{testimonial.quote}&quot;
              </p>
              <div>
                <p className="font-semibold text-lg">{testimonial.name}</p>
                <p className="text-texte-description-black">{testimonial.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
