"use client";

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

// Define available languages
export type Language = "fr" | "en";

// Define the shape of translations
type TranslationDictionary = {
  [key: string]: string | string[];
};

type Translations = {
  [key in Language]: TranslationDictionary;
};

// Define language context type
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string | string[];
};

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Translation object with both languages
export const translations: Translations = {
  fr: {
    // Navigation
    "nav.features": "Produit",
    "nav.pricing": "Tarifs",
    "nav.contact": "Contact",
    "nav.testimonials": "Avis",
    "nav.faq": "FAQ",
    "btn.login": "Connexion",
    "btn.signup": "S'inscrire",
    "btn.trial": "Commencer maintenant",
    "btn.logout": "Déconnexion",

    // Banner
    "banner.early": "AutoInvoice est nouveau, profitez d'un prix avantageux !",

    // Hero Section
    "hero.title":
      "Plus de couts supplementaire ou d'agence. De meilleurs resulats en automatisant vos ads  ",

    "hero.description":
      "Lancez des campagnes Google, Facebook & Instagram en quelques clics. Auto Ads crée, gère et optimise vos pubs automatiquement. Plus besoin d'agence ou de freelance vous gardez le contrôle, on s'occupe du reste.",
    "hero.cta": "Commencer maintenant",
    "hero.demo": "Voir la démo",

    // Features
    "features.title": "Fonctionnalités",
    "features.subtitle":
      "Tout ce qu'il vous faut pour gérer efficacement vos publicités en ligne",
    // Bulles
    "features.oauth.title": "Créer vos campagnes ",
    "features.oauth.desc":
      "Créer vos campagnes Google, Facebook & Instagram en quelques clics",
    "features.planning.title": "Automatisez",
    "features.planning.desc": "Deployez vos campagnes à moindre frais",
    "features.reports.title": "Suivez",
    "features.reports.desc":
      "Suivez les résultats de vos campagnes en temps réel",

    // Pricing
    "pricing.title": "Tarification simple pour votre publicité en ligne",
    "pricing.subtitle":
      "Une commission transparente sur vos campagnes publicitaires.",
    "pricing.recommended": "Recommandé",
    "pricing.perMonth": "de commission",
    "pricing.choose": "Choisir",
    "pricing.basic.title": "Essential",
    "pricing.basic.price": "5€ + 10%",
    "pricing.basic.period": "du budget",
    "pricing.basic.features": [
      "Création de campagne auto",
      "Résumé quotidien par email",
      "Dashboard de suivi",
      "Gestion de 2 campagnes max",
      "Support par email",
      "Paiement par CB",
    ],
    "pricing.pro.title": "Pro",
    "pricing.pro.price": "15€ + 10%",
    "pricing.pro.period": "du budget",
    "pricing.pro.features": [
      "Campagnes illimitées",
      "Optimisation automatique",
      "Alertes personnalisées",
      "Rapports avancés",
      "Support prioritaire",
      "Paiement via Stripe",
    ],
    "pricing.enterprise.title": "Enterprise",
    "pricing.enterprise.price": "Sur devis",
    "pricing.enterprise.features": [
      "Multi-comptes publicitaires",
      "API privée",
      "Statistiques avancées",
      "Accompagnement personnalisé",
      "Onboarding dédié",
      "Support téléphone & visio",
    ],

    // Footer
    "footer.product": "Produit",
    "footer.company": "Entreprise",
    "footer.legal": "Mentions légales",
    "footer.support": "Support",
    "footer.terms": "Conditions d'utilisation",
    "footer.privacy": "Politique de confidentialité",
    "footer.contact": "Contact",
    "footer.copyright": "Tous droits réservés.",
    "footer.resources": "Ressources",
    "footer.docs": "Documentation",
    "footer.blog": "Blog",
    "footer.legalNotice": "Mentions légales",
    "footer.features": "Fonctionnalités",
    "footer.booking": "Brief publicitaire",
    "footer.reminders": "Suivi de campagnes",
    "footer.statistics": "Statistiques",
    "footer.about": "À propos",
    "footer.pricing": "Tarifs",
    "footer.gdpr": "RGPD",
    "footer.availability": "Lun-Ven, 9h-18h",

    // Language
    language: "English",

    // FAQ
    "faq.title": "Questions fréquentes",
    "faq.subtitle": "Toutes les réponses à vos questions sur AutoAds",
    "faq.q1":
      "Comment fonctionne le système de création automatique de campagnes ?",
    "faq.a1":
      "AutoAds utilise l'API Meta Ads pour créer automatiquement vos campagnes en fonction de votre brief (objectif, budget, audience). Vous n'avez qu'à remplir un formulaire simple et la campagne est créée et financée automatiquement.",
    "faq.q2": "Est-ce que je peux contrôler mon budget publicitaire ?",
    "faq.a2":
      "Oui, vous définissez votre budget lors de la création de votre campagne. Le système vous alerte automatiquement si vos performances chutent ou si le ROI n'est pas optimal.",
    "faq.q3": "Comment fonctionne le suivi des performances ?",
    "faq.a3":
      "Un script automatisé récupère quotidiennement les KPIs de vos campagnes (coût par clic, leads, conversions) et vous envoie un résumé par email chaque matin.",
    "faq.q4": "Dois-je avoir des connaissances en marketing digital ?",
    "faq.a4":
      "Non, notre système est conçu pour les débutants. Il vous guide à travers un formulaire simple et s'occupe de tous les aspects techniques de la création et du suivi de campagne.",
    "faq.q5": "Comment fonctionne la facturation ?",
    "faq.a5":
      "Nous facturons des frais fixes plus 10% du budget dépensé. Par exemple, pour €100 de budget publicitaire, vous payez €5 + 10% (€10) ou €15 en frais de service sur le budget publicitaire.",

    // Popup
    "popup.close": "Fermer",
    "popup.title": "Lancez votre première campagne",
    "popup.subtitle":
      "Saisissez votre email pour commencer à créer votre campagne publicitaire automatisée.",
    "popup.success":
      "Merci ! Vous recevrez un email avec les instructions pour créer votre première campagne.",
    "popup.email.label": "Votre adresse email",
    "popup.email.placeholder": "nom@exemple.com",
    "popup.submitting": "Envoi en cours...",
    "popup.submit": "Créer ma première campagne",
    "popup.disclaimer":
      "Nous ne partagerons jamais votre email. Vous pouvez vous désinscrire à tout moment.",

    // CTA
    "cta.title": "Prêt à automatiser vos publicités ?",
    "cta.subtitle":
      "Rejoignez des centaines de freelances et petites entreprises qui utilisent AutoAds pour gérer leurs campagnes publicitaires sans expertise marketing.",
    "cta.button": "Commencer maintenant",

    // Testimonials
    "testimonials.title": "Nos clients témoignent",
    "testimonials.subtitle":
      "Découvrez pourquoi les professionnels choisissent AutoAds pour la gestion de leurs campagnes publicitaires.",
    "testimonials.quote1":
      "Incroyable gain de temps ! Je peux enfin gérer mes publicités Facebook sans expertise marketing et les résultats sont au rendez-vous.",
    "testimonials.name1": "Nora Bensalem",
    "testimonials.title1": "Coach en développement personnel",
    "testimonials.quote2":
      "Enfin une solution simple pour créer des publicités efficaces. Le rapport quotidien me permet de suivre mes résultats sans effort.",
    "testimonials.name2": "Yanis Mansouri",
    "testimonials.title2": "Consultant indépendant",
    "testimonials.quote3":
      "J'étais sceptique au début, mais AutoAds a vraiment simplifié ma stratégie marketing. Je gagne des clients sans passer des heures sur Facebook Ads Manager.",
    "testimonials.name3": "Claire Dubois",
    "testimonials.title3": "Freelance en marketing",

    // Video
    "video.title": "Découvrez AutoAds en action",
    "video.subtitle":
      "Voyez comment créer et gérer une campagne publicitaire en moins de 60 secondes.",
  },
  en: {
    // Navigation
    "nav.features": "Features",
    "nav.pricing": "Pricing",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.roadmap": "Roadmap",
    "nav.testimonials": "Testimonials",
    "nav.faq": "FAQ",
    "btn.login": "Login",
    "btn.signup": "Sign Up",
    "btn.trial": "Free Trial",
    "btn.logout": "Logout",

    // Banner
    "banner.early": "Early Access - 30% discount on all plans!",

    // Hero Section
    "hero.title": " No more cost or agency, let automation handle your ads",
    "hero.subtitle": "Brief • Creation • Management",
    "hero.description":
      "Launch Google, Facebook & Instagram ads in just a few clicks. Auto Ads builds, manages, and optimizes your campaigns automatically. No agency, no freelancers, just results on autopilot.",
    "hero.cta": "Get Started",
    "hero.demo": "Watch Demo",

    // Features
    "features.title": "Features",
    "features.subtitle": "Everything you need for optimal online advertising",
    // Bulles
    "features.oauth.title": "Create your campaigns",
    "features.oauth.desc":
      "Create your Google, Facebook & Instagram campaigns in just a few clicks",
    "features.planning.title": "Automate",
    "features.planning.desc": "Deploy your campaigns at lower costs",
    "features.reports.title": "Track",
    "features.reports.desc": "Track the results of your campaigns in real-time",

    // Pricing
    "pricing.title": "Simple pricing for your online advertising",
    "pricing.subtitle":
      "A transparent commission on your advertising campaigns.",
    "pricing.recommended": "Recommended",
    "pricing.perMonth": "commission",
    "pricing.choose": "Choose",
    "pricing.basic.title": "Essential",
    "pricing.basic.price": "€5 + 10%",
    "pricing.basic.period": "of budget",
    "pricing.basic.features": [
      "Auto campaign creation",
      "Daily email summary",
      "Tracking dashboard",
      "Manage up to 2 campaigns",
      "Email support",
      "Credit card payment",
    ],
    "pricing.pro.title": "Pro",
    "pricing.pro.price": "€15 + 10%",
    "pricing.pro.period": "of budget",
    "pricing.pro.features": [
      "Unlimited campaigns",
      "Automatic optimization",
      "Custom alerts",
      "Advanced reports",
      "Priority support",
      "Stripe payment",
    ],
    "pricing.enterprise.title": "Enterprise",
    "pricing.enterprise.price": "Custom",
    "pricing.enterprise.features": [
      "Multi-ad accounts",
      "Private API",
      "Advanced analytics",
      "Custom guidance",
      "Dedicated onboarding",
      "Phone & video support",
    ],

    // Footer
    "footer.product": "Product",
    "footer.company": "Company",
    "footer.legal": "Legal",
    "footer.support": "Support",
    "footer.terms": "Terms of Service",
    "footer.privacy": "Privacy Policy",
    "footer.contact": "Contact",
    "footer.copyright": "All rights reserved.",
    "footer.resources": "Resources",
    "footer.docs": "Documentation",
    "footer.blog": "Blog",
    "footer.legalNotice": "Legal Notice",
    "footer.features": "Features",
    "footer.booking": "Ad Brief",
    "footer.reminders": "Campaign Tracking",
    "footer.statistics": "Statistics",
    "footer.about": "About",
    "footer.pricing": "Pricing",
    "footer.gdpr": "GDPR",
    "footer.availability": "Mon-Fri, 9am-6pm",

    // Language
    language: "Français",

    // FAQ
    "faq.title": "Frequently Asked Questions",
    "faq.subtitle": "All answers to your questions about AutoAds",
    "faq.q1": "How does the automatic campaign creation system work?",
    "faq.a1":
      "AutoAds uses the Meta Ads API to automatically create your campaigns based on your brief (objective, budget, audience). You just fill out a simple form and the campaign is created and funded automatically.",
    "faq.q2": "Can I control my advertising budget?",
    "faq.a2":
      "Yes, you define your budget when creating your campaign. The system automatically alerts you if your performance drops or if the ROI is not optimal.",
    "faq.q3": "How does performance tracking work?",
    "faq.a3":
      "An automated script retrieves your campaign KPIs daily (cost per click, leads, conversions) and sends you a summary email every morning.",
    "faq.q4": "Do I need to have digital marketing knowledge?",
    "faq.a4":
      "No, our system is designed for beginners. It guides you through a simple form and takes care of all the technical aspects of campaign creation and tracking.",
    "faq.q5": "How does billing work?",
    "faq.a5":
      "We charge a fixed fee plus 10% of the spent budget. For example, for €100 of advertising budget, you pay €5 + 10% (€10) or €15 in service fees on top of the advertising budget.",

    // Popup
    "popup.close": "Close",
    "popup.title": "Launch Your First Campaign",
    "popup.subtitle":
      "Enter your email to start creating your automated ad campaign.",
    "popup.success":
      "Thank you! You will receive an email with instructions to create your first campaign.",
    "popup.email.label": "Your email address",
    "popup.email.placeholder": "name@example.com",
    "popup.submitting": "Submitting...",
    "popup.submit": "Create my first campaign",
    "popup.disclaimer":
      "We will never share your email. You can unsubscribe at any time.",

    // CTA
    "cta.title": "Ready to Automate Your Ads?",
    "cta.subtitle":
      "Join hundreds of freelancers and small businesses using AutoAds to manage their ad campaigns without marketing expertise.",
    "cta.button": "Get Started Now",

    // Testimonials
    "testimonials.title": "Trusted by Professionals Like You",
    "testimonials.subtitle":
      "Discover why professionals choose AutoAds for their ad campaign management.",
    "testimonials.quote1":
      "Incredible time saver! I can finally manage my Facebook ads without marketing expertise and the results are there.",
    "testimonials.name1": "Nora Bensalem",
    "testimonials.title1": "Personal Development Coach",
    "testimonials.quote2":
      "Finally, a simple solution for creating effective ads. The daily report allows me to track my results with no effort.",
    "testimonials.name2": "Yanis Mansouri",
    "testimonials.title2": "Independent Consultant",
    "testimonials.quote3":
      "I was skeptical at first, but AutoAds has truly simplified my marketing strategy. I gain clients without spending hours on Facebook Ads Manager.",
    "testimonials.name3": "Claire Dubois",
    "testimonials.title3": "Marketing Freelancer",

    // Single Testimonial
    "singleTestimonial.quote":
      "Since using AutoAds, I spend less than 5 minutes a week on campaign management, down from several hours before. My conversion rate has increased by 40% with the same budget!",
    "singleTestimonial.name": "Marie Dubois",
    "singleTestimonial.title": "Digital Consultant",
    "singleTestimonial.imageAlt": "Proof of time saved with AutoAds",

    // Video
    "video.title": "See AutoAds in Action",
    "video.subtitle":
      "See how to create and manage an ad campaign in under 60 seconds.",
  },
};

// Create the provider
export function LanguageProvider({ children }: { children: ReactNode }) {
  // Get initial language from localStorage or default to French
  const [language, setLanguageState] = useState<Language>("fr");

  // Use effect to load language preference from localStorage on client side
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "fr" || savedLanguage === "en")) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // Function to set language and save to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  // Translation function
  const t = (key: string): string | string[] => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
