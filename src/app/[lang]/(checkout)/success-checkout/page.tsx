import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { getDictionary } from '@/lib/dictonnaries';

export default async function SuccessfulPayment({params} : {params : Promise<{lang : "fr" | "en"}>}) {
  const {lang} = await params;
  const dictionary = await getDictionary(lang);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4 pt-24">
        <div className="max-w-2xl w-full text-center py-16 space-y-8">
          <div className="flex justify-center">
            <CheckCircle2 className="h-24 w-24 text-green-500" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900">
            {dictionary.checkout.success.title}
          </h1>
          
          <p className="text-xl text-gray-600">
            {dictionary.checkout.success.description}
          </p>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {dictionary.checkout.success.subscriptionTitle}
            </h2>
            <div className="space-y-2 text-left">
              <p className="flex justify-between text-gray-600">
                <span>{dictionary.checkout.success.plan}</span>
                <span className="font-medium text-gray-900">Premium</span>
              </p>
              <p className="flex justify-between text-gray-600">
                <span>{dictionary.checkout.success.status}</span>
                <span className="font-medium text-green-600">{dictionary.checkout.success.active}</span>
              </p>
            </div>
          </div>
          
          <div className="pt-8">
            <button
              onClick={() => {window.location.href = `/${lang}`}}
              className="bg-bg-bouton-classic hover:bg-bg-bouton-hover text-white px-8 py-6 text-xl"
            >
              {dictionary.checkout.success.startUsing}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
