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
    };
    btn: {
      trial: string;
      login: string;
      logout: string;
    };
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
    
    if (typeof value !== 'string') {
      console.warn(`Translation key "${key}" not found for locale "${locale}"`);
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