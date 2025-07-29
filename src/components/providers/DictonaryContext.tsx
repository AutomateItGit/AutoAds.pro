// src/contexts/DictionaryContext.tsx
'use client';

import { createContext, useContext, ReactNode } from 'react';

type Dictionary = {
  home: {
    hello: string;
  };
  header: {
    banner: {
      early: string;
    };
    nav: {
      features: string;
      pricing: string;
      testimonials: string;
      contact?: string;
      about?: string;
      roadmap?: string;
      faq?: string;
    };
    btn: {
      trial: string;
      login: string;
      logout: string;
      signup?: string;
    };
  };
  hero: {
    title: string;
    subtitle?: string;
    description: string;
    cta: string;
    demo: string;
  };
  features: {
    title: string;
    subtitle: string;
    oauth: {
      title: string;
      desc: string;
    };
    planning: {
      title: string;
      desc: string;
    };
    reports: {
      title: string;
      desc: string;
    };
  };
  pricing: {
    title: string;
    subtitle: string;
    recommended?: string;
    perMonth?: string;
    choose?: string;
    basic: {
      title: string;
      price: string;
      period: string;
      features: string[];
    };
    pro: {
      title: string;
      price: string;
      period: string;
      features: string[];
    };
    enterprise: {
      title: string;
      price: string;
      features: string[];
    };
  };
  footer: {
    product: string;
    company: string;
    legal: string;
    support: string;
    terms: string;
    privacy: string;
    contact: string;
    copyright: string;
    resources?: string;
    docs?: string;
    blog?: string;
    legalNotice?: string;
    features?: string;
    booking?: string;
    reminders?: string;
    statistics?: string;
    about?: string;
    pricing?: string;
    gdpr?: string;
    availability?: string;
  };
  language: string;
  faq: {
    title: string;
    subtitle: string;
    q1: string;
    a1: string;
    q2: string;
    a2: string;
    q3: string;
    a3: string;
    q4: string;
    a4: string;
    q5: string;
    a5: string;
  };
  popup: {
    close: string;
    title: string;
    subtitle: string;
    success: string;
    email: {
      label: string;
      placeholder: string;
    };
    submitting: string;
    submit: string;
    disclaimer: string;
  };
  cta: {
    title: string;
    subtitle: string;
    button: string;
  };
  testimonials: {
    title: string;
    subtitle: string;
    quote1: string;
    name1: string;
    title1: string;
    quote2: string;
    name2: string;
    title2: string;
    quote3: string;
    name3: string;
    title3: string;
    singleTestimonial?: {
      quote: string;
      name: string;
      title: string;
      imageAlt: string;
    };
  };
  video: {
    title: string;
    subtitle: string;
  };
  checkout: {
    cancel: {
      title: string;
      description: string;
      backToHome: string;
    };
    success: {
      title: string;
      description: string;
      subscriptionTitle: string;
      plan: string;
      status: string;
      active: string;
      startUsing: string;
    };
  };
  verification: {
    email: {
      loading: string;
      verifying: string;
      waitMessage: string;
      successTitle: string;
      failedTitle: string;
      redirecting: string;
      goToSignIn: string;
      resendEmail: string;
      resending: string;
      enterEmail: string;
    };
  };
  signin: {
    title: string;
    subtitle: string;
    email: string;
    password: string;
    emailPlaceholder: string;
    passwordPlaceholder: string;
    forgotPassword: string;
    signInButton: string;
  };
  signup: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    passwordPlaceholder: string;
    signUpButton: string;
    signingUp: string;
    googleButton: string;
  };
  common: {
    loading: string;
    error: string;
    success: string;
    cancel: string;
    confirm: string;
  };
  signout: {
    signingOut: string;
  };
};

type DictionaryContextType = {
  dictionary: Dictionary;
  locale: 'en' | 'fr';
};

const DictionaryContext = createContext<DictionaryContextType | undefined>(undefined);

export function DictionaryProvider({ 
  children, 
  dictionary, 
  locale 
}: { 
  children: ReactNode; 
  dictionary: Dictionary; 
  locale: 'en' | 'fr';
}) {
  return (
    <DictionaryContext.Provider value={{ dictionary, locale }}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useDictionary() {
  const context = useContext(DictionaryContext);
  if (context === undefined) {
    throw new Error('useDictionary must be used within a DictionaryProvider');
  }
  return context;
}

// Hook personnalisé pour faciliter l'utilisation
export function useTranslations() {
  const { dictionary, locale } = useDictionary();
  
  const t = (key: string, params?: Record<string, string>) => {
    const keys = key.split('.');
    let value: any = dictionary;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    if (value === undefined || value === null) {
      console.warn(`Translation key "${key}" not found for locale "${locale}"`);
      return key;
    }
    
    // Si c'est un tableau, le retourner directement
    if (Array.isArray(value)) {
      return value;
    }
    
    // Si ce n'est pas une string, convertir en string ou retourner la clé
    if (typeof value !== 'string') {
      console.warn(`Translation key "${key}" is not a string for locale "${locale}"`);
      return key;
    }
    
    // Simple interpolation pour les paramètres
    if (params) {
      return Object.entries(params).reduce((str, [key, val]) => {
        return str.replace(new RegExp(`{{${key}}}`, 'g'), val);
      }, value);
    }
    
    return value;
  };
  
  return { t, locale };
}