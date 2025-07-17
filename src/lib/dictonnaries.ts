import 'server-only'

type Dictionary = {
  home: {
    hello: string
  }
  header: {
    banner: {
      early: string
    }
    nav: {
      features: string
      pricing: string
      testimonials: string
    }
    btn: {
      trial: string
      login: string
      logout: string
    }
  }
  checkout: {
    cancel: {
      title: string;
      description: string;
      backToHome: string;
    }
    success: {
      title: string;
      description: string;
      subscriptionTitle: string;
      plan: string;
      status: string;
      active: string;
      startUsing: string;
    }
  }
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
    }
  }
  signin: {
    title: string;
    subtitle: string;
    email: string;
    password: string;
    emailPlaceholder: string;
    passwordPlaceholder: string;
    forgotPassword: string;
    signInButton: string;
  }
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
  }
  common: {
    loading: string;
    error: string;
    success: string;
    cancel: string;
    confirm: string;
  }
  signout: {
    signingOut: string;
  }
}

 
const dictionaries = {
  en: () => import('../dictionaries/en.json').then((module) => module.default as Dictionary),
  fr: () => import('../dictionaries/fr.json').then((module) => module.default as Dictionary),
}
 
export const getDictionary = async (locale: 'en' | 'fr'): Promise<Dictionary> => {
    console.log('getDictionary called with locale:', locale, 'type:', typeof locale);
    
    const dictLoader = dictionaries[locale];
    if (!dictLoader) {
        console.error('Available dictionaries:', Object.keys(dictionaries));
        console.error('Received locale:', locale);
        throw new Error(`No dictionary specified for locale: ${locale}. Available locales: ${Object.keys(dictionaries).join(', ')}`);
    }
    return dictLoader();
}