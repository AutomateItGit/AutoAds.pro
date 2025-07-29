"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import Image from "next/image";
import { Menu, X, Calendar, LogOut, LogIn } from "lucide-react";
import logo from "../../public/auto_ads.svg";

import EmailPopup from "./EmailPopup";
import { useSession, signOut } from "next-auth/react";
import { useLanguage } from "./LanguageContext";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const { data: session, status } = useSession();
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const controls = useAnimation();
  const { t, language, setLanguage } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  //  Common props for ScrollLink to avoid repetition
  const scrollLinkProps = {
    smooth: true,
    duration: 500,
    spy: true, // Optional: highlights the link when scrolling to the section
    offset: -100, // Adjust this value based on your sticky header height + banner
    className: "hover:text-primary-100 transition-colors cursor-pointer", // Added cursor-pointer
  };

  // Mobile specific props
  const mobileScrollLinkProps = {
    ...scrollLinkProps,
    className:
      "block py-2 hover:text-primary-100 transition-colors cursor-pointer", // Mobile specific classes
    onClick: () => setIsMobileMenuOpen(false), // Close menu on click
  };

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      // Adjust offset based on sticky state if needed, more complex logic
      // For simplicity, using a fixed offset that accounts for the tallest state (banner + header)
      const newIsSticky = latest > 50;
      if (newIsSticky !== isSticky) {
        setIsSticky(newIsSticky);
        controls.start({ y: 0 }); // Keep controls logic if needed for other animations
      }
    });

    return () => unsubscribe();
    // Removed controls from dependency array if not strictly needed for offset calculation
  }, [scrollY, isSticky, controls]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [status]);

  const toggleLanguage = () => {
    const newLang = language === "fr" ? "en" : "fr";
    setLanguage(newLang);
    // Remplace le segment de langue dans l'URL
    const pathParts = pathname.split("/");
    if (pathParts[1] === "fr" || pathParts[1] === "en") {
      pathParts[1] = newLang;
      const newPath = pathParts.join("/") || "/";
      router.push(newPath);
    } else {
      // fallback : ajoute le segment langue devant
      router.push(`/${newLang}${pathname}`);
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-100 ${
        isSticky ? "bg-white shadow-md" : "bg-transparent"
      }`}
      initial={{ opacity: 1, y: 0 }}
      animate={controls}
    >
      {/* Top banner */}
      <div className="w-full pl-4 lg:pl-0 bg-primary-100 text-white py-2 text-center text-sm flex items-center justify-center space-x-2">
        <Calendar size={16} className="text-yellow-300" />
        <span>{t("banner.early")}</span>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div
            onClick={() => {
              if (window.location.pathname === "/") {
                // If already on homepage, scroll to top
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                // If on another page, navigate to homepage
                window.location.href = "/";
              }
            }}
            className="flex items-center space-x-2 flex-shrink-0 cursor-pointer h-20" // hauteur fixe du header
            title="AutoAds Home"
          >
            <Image
              src={logo}
              alt="AutoAds Logo"
              width={200}
              height={200}
              style={{ maxHeight: 80, width: "auto", height: "auto" }}
            />
          </div>
          {/* Navigation Links - Centered */}
          <nav className="hidden lg:block absolute left-1/2 transform -translate-x-1/2">
            <ul className="flex space-x-6">
              <li>
                <ScrollLink to="features" {...scrollLinkProps}>
                  {t("nav.features")}
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="pricing" {...scrollLinkProps}>
                  {t("nav.pricing")}
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="testimonials" {...scrollLinkProps}>
                  {t("nav.testimonials")}
                </ScrollLink>
              </li>
            </ul>
          </nav>
          {/* Right side container for Buttons & Mobile Menu Toggle */}
          <div className="flex items-center space-x-2">
            <div className="hidden lg:block">
              <Button
                variant="ghost"
                className="hover:text-bg-bouton-hover"
                onClick={toggleLanguage}
              >
                {t("language")}
              </Button>
            </div>

            <div className="hidden lg:block">
              <Link href={`/${language}/signup`}>
                <Button className="bg-bg-bouton-classic hover:bg-bg-bouton-hover text-white">
                  {t("btn.trial")}
                </Button>
              </Link>
            </div>

            {/* Auth Buttons / User Info */}
            <div className="hidden lg:flex items-center space-x-2 flex-shrink-0">
              {status === "authenticated" ? (
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
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => signOut()}
                    title="Sign Out"
                    className="hover:text-bg-bouton-classic"
                  >
                    <LogOut size={20} />
                  </Button>
                </div>
              ) : status === "loading" ? (
                <div className="w-8 h-8"></div> // Placeholder for loading state
              ) : (
                <Link href={`/${language}/signin`}>
                  <Button
                    variant="outline"
                    className="text-texte-description-green border-bg-bouton-classic hover:bg-primary-900"
                  >
                    <LogIn size={16} className="mr-2" />
                    {t("btn.login")}
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-texte-header-mobileBlack hover:text-bg-bouton-classic"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>{" "}
          {/* End of Right side container */}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg">
          <nav className="container mx-auto px-4 py-4">
            <ul className="space-y-4">
              <li>
                <ScrollLink to="features" {...mobileScrollLinkProps}>
                  {t("nav.features")}
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="pricing" {...mobileScrollLinkProps}>
                  {t("nav.pricing")}
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="testimonials" {...mobileScrollLinkProps}>
                  {t("nav.testimonials")}
                </ScrollLink>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:text-primary-100 p-0"
                  onClick={toggleLanguage}
                >
                  {t("language")}
                </Button>
              </li>
              {status === "authenticated" ? (
                <li>
                  <Button
                    className="w-full mt-4 bg-gray-600 hover:bg-gray-700 text-white"
                    onClick={() => signOut()}
                  >
                    <LogOut size={16} className="mr-2" />
                    {t("btn.logout")}
                  </Button>
                </li>
              ) : status === "loading" ? (
                <li>{/* Optional: Loading state */}</li>
              ) : (
                <li>
                  <Link href="/signin">
                    <Button className="w-full mt-4 bg-bg-bouton-classic hover:bg-bg-bouton-hover text-white">
                      <LogIn size={16} className="mr-2" />
                      {t("btn.login")}
                    </Button>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      )}

      <EmailPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </motion.header>
  );
}
