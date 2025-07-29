"use client";

import { useTranslations } from './providers/DictonaryContext';
import { motion } from "framer-motion";

// Notez que nous n'importons pas framer-motion car il n'est pas disponible dans cet environnement
// Si vous utilisez réellement framer-motion dans votre projet, gardez l'import

export default function DemoVideo() {
  const { t } = useTranslations();
  
  // Remplacez ceci par l'ID réel de votre vidéo YouTube
  // Par exemple, pour https://www.youtube.com/watch?v=dQw4w9WgXcQ, l'ID est "dQw4w9WgXcQ"
  const youtubeVideoId = "dQw4w9WgXcQ"; // Utilisez votre véritable ID de vidéo YouTube ici
  
  // Paramètres pour l'autoplay et autres options:
  // autoplay=1 : lance la vidéo automatiquement
  // mute=1 : nécessaire pour l'autoplay sur la plupart des navigateurs
  // loop=1&playlist={id} : fait boucler la vidéo
  // controls=0 : cache les contrôles (remplacer par 1 pour les afficher)
  const embedUrl = `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&loop=1&playlist=${youtubeVideoId}&controls=1&modestbranding=1&rel=0`;

  return (
    <section id="demo" className="py-20 bg-bg-videoShowcase text-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">{t('video.title')}</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t('video.subtitle')}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-black rounded-lg overflow-hidden shadow-xl aspect-video"
        >
          <iframe
            className="w-full h-full"
            src={embedUrl}
            title={t('video.title') as string}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
}