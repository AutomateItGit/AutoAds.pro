"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import EmailPopup from "./EmailPopup";
import { useState, useEffect } from "react";
import { useTranslations } from './providers/DictonaryContext';

export default function FinalCta() {
  const { t } = useTranslations();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <section
      id="cta-final"
      className="py-20 bg-gradient-to-r bg-primary-100 text-white"
    >
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-6 font-serif">
            {t('cta.title')}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <Button className="bg-bg-classic text-texte-header-green hover:bg-gray-100 text-lg px-10 py-4 font-semibold" onClick={() => setIsPopupOpen(true)}>
            {t('cta.button')} <ChevronRight className="ml-2" />
          </Button>
        </motion.div>
      </div>
      <EmailPopup 
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </section>
  );
}
