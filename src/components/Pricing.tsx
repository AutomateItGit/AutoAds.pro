"use client";

import { useTranslations } from "./providers/DictonaryContext";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const PricingTier = ({
  title,
  price,
  period,
  features,
  index,
  isPopular = false,
}: {
  title: string;
  price: string;
  period: string;
  features: string[];
  index: number;
  isPopular?: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative p-8 bg-white border rounded-2xl shadow-sm flex flex-col ${
        isPopular ? "border-bg-bouton-classic scale-105" : "border-gray-200"
      }`}
    >
      {isPopular && (
        <span className="bg-bg-bouton-classic text-center text-white text-sm font-semibold px-4 py-1 rounded-full mb-4 inline-block">
          Most Popular
        </span>
      )}

      <div className="mb-8">
        <h3 className="text-lg font-semibold leading-5">{title}</h3>
        <p className="mt-4 flex items-baseline text-texte-header-black">
          <span className="text-4xl font-bold tracking-tight">{price}</span>
          {period && (
            <span className="ml-1 text-sm font-semibold">{period}</span>
          )}
        </p>
      </div>

      <ul role="list" className="mb-8 space-y-4 flex-1">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center">
            <Check className="h-5 w-5 text-primary-9000 mr-2" />
            <span className="text-sm text-texte-description-black">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <a
        href="#"
        className={`block w-full py-3 px-6 text-center rounded-lg text-sm font-semibold ${
          isPopular
            ? "bg-bg-bouton-classic text-white hover:bg-bg-bouton-hover"
            : "bg-primary-900 text-texte-description-green hover:bg-bg-bouton-secondary"
        }`}
      >
        Get started
      </a>
    </motion.div>
  );
};

const Pricing = () => {
  const { t } = useTranslations();

  const tiers = [
    {
      title: t("pricing.basic.title") as string,
      price: t("pricing.basic.price") as string,
      period: t("pricing.basic.period") as string,
      features: Array.isArray(t("pricing.basic.features"))
        ? (t("pricing.basic.features") as string[])
        : [],
      isPopular: false,
    },
    {
      title: t("pricing.pro.title") as string,
      price: t("pricing.pro.price") as string,
      period: t("pricing.pro.period") as string,
      features: Array.isArray(t("pricing.pro.features"))
        ? (t("pricing.pro.features") as string[])
        : [],
      isPopular: true,
    },
    {
      title: t("pricing.enterprise.title") as string,
      price: t("pricing.enterprise.price") as string,
      period: "",
      features: Array.isArray(t("pricing.enterprise.features"))
        ? (t("pricing.enterprise.features") as string[])
        : [],
      isPopular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-extrabold text-texte-header-black sm:text-4xl"
          >
            {t("pricing.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 max-w-2xl mx-auto text-xl text-texte-description-black"
          >
            {t("pricing.subtitle")}
          </motion.p>
        </div>

        <div className="mt-16 grid gap-4 lg:gap-8 md:grid-cols-3">
          {tiers.map((tier, index) => (
            <PricingTier
              key={index}
              title={tier.title}
              price={tier.price}
              period={tier.period}
              features={tier.features}
              isPopular={tier.isPopular}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
