"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import { useTranslations } from './providers/DictonaryContext';

export default function AutomationShowcase() {
  const { t, locale } = useTranslations();

  const manualTasks =
    locale === "fr"
      ? [
          {
            task: "Trouver une agence marketing ou un freelance",
            time: "Plusieurs jours / semaines",
          },
          {
            task: "Payer un freelance ou une agence",
            time: "+ 100-500 € / mois",
          },
          {
            task: "Définir les audiences manuellement",
            time: "+ 15 min / campagne",
          },
          {
            task: "Gérer le budget et les paiements pub",
            time: "+ 10 min / jour",
          },
          { task: "Suivre les résultats via Meta Ads", time: "+ 1h / semaine" },
          {
            task: "Ajuster les campagnes selon les KPIs",
            time: "Souvent oublié ou trop tard",
          },
        ]
      : [
          {
            task: "Find a marketing agency or freelancer",
            time: "Several days / weeks",
          },
          { task: "Pay a freelancer or agency", time: "+ €100-500 / month" },
          {
            task: "Manually define target audiences",
            time: "+ 15 min / campaign",
          },
          {
            task: "Handle ad budgets & payments manually",
            time: "+ 10 min / day",
          },
          { task: "Track results via Meta Ads", time: "+ 1h / week" },
          {
            task: "Adjust campaigns based on KPIs",
            time: "Often forgotten or too late",
          },
        ];

  const automatedFeatures =
    locale === "fr"
      ? [
          {
            task: "Création automatique de campagnes Google, Facebook & Instagram en quelques clics",
          },
          { task: "Ciblage intelligent selon vos objectifs" },
          { task: "Pilotage automatique du budget pub" },
          { task: "Suivi quotidien des performances" },
          { task: "Ayez la main sur les changements n'importe quand" },
          { task: "Optimisations automatisées selon les résultats" },
          { task: "Aucune agence ni freelance nécessaire" },
        ]
      : [
          {
            task: "Automatically create Google, Facebook & Instagram campaigns in a few clicks",
          },
          { task: "Smart targeting based on your goals" },
          { task: "Automatic ad budget management" },
          { task: "Daily performance tracking" },
          { task: "Make changes anytime, instantly" },
          { task: "Automated optimizations based on results" },
          { task: "No agency or freelancer needed" },
        ];

  return (
    <section id="features" className="py-20 bg-bg-classic">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 font-grotesk">
            {t("features.title")}
          </h2>
          <p className="text-xl text-texte-description-black max-w-3xl mx-auto">
            {t("features.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
          {/* Manual Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-red-50 p-8 rounded-lg shadow-md border border-red-200 flex flex-col"
          >
            <h3 className="text-2xl font-semibold mb-6 text-red-700 text-center">
              {locale === "fr" ? "❌ Méthode Manuelle" : "❌ Manual Method"}
            </h3>
            <ul className="space-y-4 flex-grow">
              {manualTasks.map((item, index) => (
                <li key={index} className="flex items-start mb-4">
                  <XCircle
                    className="text-red-500 mr-3 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <span className="font-medium">{item.task}</span>
                    <span className="text-sm text-red-600 block mt-1">
                      {item.time}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-center text-red-700 font-bold text-xl mt-8">
              {locale === "fr"
                ? "= Argent, temps perdu sans avoir la main sur les résultats 🤯"
                : "= Money, time wasted without having control over the results 🤯"}
            </p>
          </motion.div>

          {/* Automated Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-primary-900 p-8 rounded-lg shadow-md border border-emerald-200 flex flex-col"
          >
            <h3 className="text-2xl font-semibold mb-6 text-bg-bouton-hover text-center">
              {locale === "fr"
                ? "✅ Avec AutoPlanner"
                : "✅ With AutoPlanner"}
            </h3>
            <ul className="space-y-4 flex-grow">
              {automatedFeatures.map((feature, index) => (
                <li key={index} className="flex items-start mb-4">
                  <CheckCircle2
                    className="text-primary-9000 mr-3 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <span className="leading-tight">{feature.task}</span>
                    <span className="text-sm text-primary-100 block mt-1">
                      &nbsp;
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-center text-bg-bouton-hover font-bold text-xl mt-8">
              {locale === "fr"
                ? "= Meilleurs résultats sur les ads a moindre frais ✨"
                : "= Better results on ads with less fees ✨"}
            </p>
          </motion.div>
        </div>

        {/* Composant pour les fonctionnalités */}

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center"
          >
            <div className="bg-bg-automationShowcaseBuble w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-texte-header-green"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {t("features.oauth.title")}
            </h3>
            <p className="text-texte-description-black">
              {t("features.oauth.desc")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center"
          >
            <div className="bg-bg-automationShowcaseBuble w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-texte-header-green"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {t("features.planning.title")}
            </h3>
            <p className="text-texte-description-black">
              {t("features.planning.desc")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center"
          >
            <div className="bg-bg-automationShowcaseBuble w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-texte-header-green"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {t("features.reports.title")}
            </h3>
            <p className="text-texte-description-black">
              {t("features.reports.desc")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
