import 'server-only'

type Dictionary = {
  home: {
    hello: string
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