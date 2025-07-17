"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, Calendar, LogOut, LogIn } from "lucide-react";
import logoAgenda from "@/../public/auto_planner.svg";
import { useSession, signOut } from "next-auth/react";
import { useTranslations } from "../providers/DictonaryContext";



interface ClientHeaderProps {
  isMobile: boolean;
}

export default function ClientHeader({ isMobile }: ClientHeaderProps) {
  const { data: session, status } = useSession();
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const router = useRouter();
  const pathname = usePathname();

  const {t, locale} = useTranslations();

  // Translation function using the dictionary

  useEffect(() => {
    const handleScroll = () => {
      const newIsSticky = window.scrollY > 50;
      if (newIsSticky !== isSticky) {
        setIsSticky(newIsSticky);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSticky]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [status]);

  const handleLogoClick = () => {
    if (pathname === '/') {
      // If on homepage, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Navigate to homepage using Next.js router
      router.push('/');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-100 ${
        isSticky ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      {/* Top banner */}
      <div className="w-full bg-primary-100 text-white py-2 text-center text-sm flex items-center justify-center space-x-2 px-4">
        <Calendar size={16} className="text-yellow-300" aria-hidden="true" />
        <span>{t('header.banner.early')}</span>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="flex items-center space-x-2 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
            aria-label={pathname === '/' ? 'Scroll to top' : 'Go to homepage'}
          >
            <Image
              src={logoAgenda}
              alt="AutoPlanner logo"
              width={100}
              height={100}
              className="object-contain"
              priority
            />
          </button>
          
          {/* Navigation Links - Centered */}
          <nav className="hidden lg:block absolute left-1/2 transform -translate-x-1/2">
            <ul className="flex space-x-6" role="menubar">
              <li role="none">
                <a href="#features" className="hover:text-primary-100 transition-colors cursor-pointer" role="menuitem">
                  {t('header.nav.features')}
                </a>
              </li>
              <li role="none">
                <a href="#pricing" className="hover:text-primary-100 transition-colors cursor-pointer" role="menuitem">
                  {t('header.nav.pricing')}
                </a>
              </li>
              <li role="none">
                <a href="#testimonials" className="hover:text-primary-100 transition-colors cursor-pointer" role="menuitem">
                  {t('header.nav.testimonials')}
                </a>
              </li>
            </ul>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            {/* Language toggle - Desktop */}
            <div className="hidden lg:block">
              <select 
                value={locale} 
                onChange={(e) => {
                  const newLang = e.target.value as "fr" | "en";
                  router.push(`/${newLang}`);
                }}
                className="px-3 py-1 border rounded"
              >
                <option value="en">EN</option>
                <option value="fr">FR</option>
              </select>
            </div>

            {/* Trial button - Desktop */}
            <div className="hidden lg:block">
              <Link href="signup">
                <button className="bg-bg-bouton-classic hover:bg-bg-bouton-hover text-white px-4 py-2 rounded">
                  {t('header.btn.trial')}
                </button>
              </Link>
            </div>

            {/* Auth section - Desktop */}
            <div className="hidden lg:flex items-center space-x-2 flex-shrink-0">
              {status === "authenticated" && session ? (
                <div className="flex items-center space-x-2">
                  {session.user?.image && (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "User avatar"}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  )}
                  <button
                    onClick={handleSignOut}
                    title="Sign Out"
                    className="hover:text-bg-bouton-classic p-2"
                    aria-label="Sign out"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : status === "loading" ? (
                <div className="w-8 h-8 animate-pulse bg-gray-200 rounded-full" />
              ) : (
                <Link href="/signin">
                  <button className="text-texte-description-green border-bg-bouton-classic hover:bg-primary-900 px-4 py-2 rounded border">
                    <LogIn size={16} className="mr-2 inline" />
                    {t('header.btn.login')}
                  </button>
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden text-texte-header-mobileBlack hover:text-bg-bouton-classic p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg" id="mobile-menu">
          <nav className="container mx-auto px-4 py-4">
            <ul className="space-y-4" role="menu">
              <li role="none">
                <a href="#features" className="block py-2 hover:text-primary-100 transition-colors cursor-pointer" role="menuitem" onClick={() => setIsMobileMenuOpen(false)}>
                  {t('header.nav.features')}
                </a>
              </li>
              <li role="none">
                <a href="#pricing" className="block py-2 hover:text-primary-100 transition-colors cursor-pointer" role="menuitem" onClick={() => setIsMobileMenuOpen(false)}>
                  {t('header.nav.pricing')}
                </a>
              </li>
              <li role="none">
                <a href="#testimonials" className="block py-2 hover:text-primary-100 transition-colors cursor-pointer" role="menuitem" onClick={() => setIsMobileMenuOpen(false)}>
                  {t('header.nav.testimonials')}
                </a>
              </li>
              <li role="none">
                <select 
                  value={locale} 
                  onChange={(e) => {
                    const newLang = e.target.value as "fr" | "en";
                    router.push(`/${newLang}`);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                </select>
              </li>
              <li role="none">
                <button
                  className="w-full bg-bg-bouton-classic hover:bg-bg-bouton-hover text-white px-4 py-2 rounded"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                  }}
                  role="menuitem"
                >
                  {t('header.btn.trial')}
                </button>
              </li>
              {status === "authenticated" ? (
                <li role="none">
                  <button
                    className="w-full mt-4 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
                    onClick={handleSignOut}
                    role="menuitem"
                  >
                    <LogOut size={16} className="mr-2 inline" />
                    {t('header.btn.logout')}
                  </button>
                </li>
              ) : status === "loading" ? (
                <li className="w-full h-10 bg-gray-200 animate-pulse rounded" />
              ) : (
                <li role="none">
                  <Link href="/signin">
                    <button 
                      className="w-full mt-4 bg-bg-bouton-classic hover:bg-bg-bouton-hover text-white px-4 py-2 rounded"
                      role="menuitem"
                    >
                      <LogIn size={16} className="mr-2 inline" />
                      {t('header.btn.login')}
                    </button>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      )}

    </header>
  );
} 