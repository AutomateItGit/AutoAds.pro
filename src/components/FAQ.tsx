"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTranslations } from './providers/DictonaryContext';

// Define types for FaqItem props
interface FaqItemProps {
  question: string | string[];
  answer: string | string[];
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const formattedQuestion = Array.isArray(question) ? question.join(' ') : question;
  const formattedAnswer = Array.isArray(answer) ? answer.join(' ') : answer;

  return (
    <motion.div
      initial={false}
      animate={{ backgroundColor: isOpen ? "#F0FDF4" : "#FFFFFF" }}
      transition={{ duration: 0.3 }}
      className="border-b border-gray-200"
    >
      <button
        className="flex justify-between items-center w-full py-5 px-6 text-left text-lg font-medium focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{formattedQuestion}</span>
        {isOpen ? (
          <ChevronUp className="text-primary-100" size={24} />
        ) : (
          <ChevronDown className="text-gray-500" size={24} />
        )}
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
          marginTop: isOpen ? "0px" : "-10px",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ overflow: "hidden" }}
        className="px-6"
      >
        {isOpen && <p className="pb-5 text-texte-description-black">{formattedAnswer}</p>}
      </motion.div>
    </motion.div>
  );
};

export default function FAQ() {
  const { t } = useTranslations();

  // FAQ Data from language context
  const faqData = [
    {
      question: t('faq.q1'),
      answer: t('faq.a1'),
    },
    {
      question: t('faq.q2'),
      answer: t('faq.a2'),
    },
    {
      question: t('faq.q3'),
      answer: t('faq.a3'),
    },
    {
      question: t('faq.q4'),
      answer: t('faq.a4'),
    },
    {
      question: t('faq.q5'),
      answer: t('faq.a5'),
    },
  ];

  return (
    <section id="faq" className="py-20 bg-bg-classic">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            {t('faq.title')}
          </h2>
          <p className="text-xl text-texte-description-black max-w-2xl mx-auto">
            {t('faq.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto bg-bg-classic rounded-lg shadow-md overflow-hidden"
        >
          {faqData.map((item, index) => (
            <FaqItem
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
