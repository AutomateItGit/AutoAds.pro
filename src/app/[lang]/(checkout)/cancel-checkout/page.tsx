import Link from 'next/link'
import React from 'react'
import { getDictionary } from '@/lib/dictonnaries';

export default async function CancelCheckout({params} : {params : Promise<{lang : "fr" | "en"}>}) {
  const {lang} = await params;
  const dictionary = await getDictionary(lang);

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className='text-2xl font-bold'>Annulation de la commande</h1>
        <p className='text-sm text-gray-500'>Vous avez annulé la commande</p>
        <Link href='/' className='mt-4'>Retour à la page d&apos;accueil</Link>
    </div>
  )
}