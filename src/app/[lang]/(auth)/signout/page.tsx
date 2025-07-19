'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useTranslations } from '@/components/providers/DictonaryContext';


export default function SignOutPage({ params }: { params: Promise<{ lang: "fr" | "en" }> }) {
  const router = useRouter();
  const {t} = useTranslations();

  useEffect(() => {
    const handleSignOut = async () => {
      try {
        await signOut({ redirect: false });
        // Redirect to homepage with the current language
        const { lang } = await params;
        router.push(`/${lang}`);
      } catch (error) {
        console.error('Error signing out:', error);
        // Fallback redirect even if signout fails
        const { lang } = await params;
        router.push(`/${lang}`);
      }
    };

    handleSignOut();
  }, [router, params]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p>{t('signout.signingOut')}</p>
      </div>
    </div>
  );
}
