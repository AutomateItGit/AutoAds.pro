import Link from 'next/link'
import React from 'react'
import { getDictionary } from '@/lib/dictonnaries';

export default async function CancelCheckout({params} : {params : Promise<{lang : "fr" | "en"}>}) {
  const {lang} = await params;
  const dictionary = await getDictionary(lang);

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-2xl font-bold'>{dictionary.checkout.cancel.title}</h1>
      <p className='text-sm text-gray-500'>{dictionary.checkout.cancel.description}</p>
      <Link href={`/${lang}`} className='mt-4'>{dictionary.checkout.cancel.backToHome}</Link>
    </div>
  )
}