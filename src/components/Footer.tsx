"use client";

import Link from "next/link";
import { useTranslations } from "./providers/DictonaryContext";
import Image from "next/image";
import logo from "../../public/autoLogoLoop.png";
import { Calendar, Mail, Phone, MapPin, Clock } from "lucide-react";

const Footer = () => {
  const { t, locale } = useTranslations();
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: t("footer.company") as string,
      links: [
        { label: t("footer.about") as string, href: "/about" },
        { label: t("footer.pricing") as string, href: "#pricing" },
        { label: t("footer.contact") as string, href: "#contact" },
      ],
    },
    {
      title: t("footer.legal") as string,
      links: [
        { label: t("footer.privacy") as string, href: "/privacy-policy" },
        { label: t("footer.terms") as string, href: "/tos" },
        { label: t("footer.gdpr") as string, href: "/gdpr" },
      ],
    },
    {
      title: t("footer.resources") as string,
      links: [
        { label: t("footer.docs") as string, href: "#docs" },
        { label: t("footer.blog") as string, href: "#blog" },
        { label: locale === "fr" ? "Support" : "Support", href: "/support" },
      ],
    },
  ];

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5 text-primary-9000" />,
      text: "contact@autoads.pro",
    },
    {
      icon: <Phone className="h-5 w-5 text-primary-9000" />,
      text: "+33 6 12 34 56 78",
    },
    {
      icon: <MapPin className="h-5 w-5 text-primary-9000" />,
      text: locale === "fr" ? "Paris, France" : "Paris, France",
    },
    {
      icon: <Clock className="h-5 w-5 text-primary-9000" />,
      text: t("footer.availability") as string,
    },
  ];

  return (
    <footer className="bg-primary-900 border-t border-border-image">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Logo and description */}
          <div className="col-span-1 lg:col-span-4">
            <div className="flex items-center">
              <div className="bg-bg-bouton-secondary p-2 rounded-lg">
                <Image
                  src={logo}
                  alt="AutoPlanner Logo"
                  width={40}
                  height={40}
                />
              </div>
              <div className="flex items-center font-bold text-3xl tracking-normal">
                <span className="text-texte-header-black">Auto</span>
                <span className="text-texte-header-green">Ads</span>
              </div>
            </div>
            <p className="mt-4 text-texte-description-black max-w-md text-justify">
              {locale === "fr"
                ? "Automatisez vos campagnes publicitaires Google, Facebook et Instagram. Créez, gérez et optimisez vos publicités sans expertise marketing."
                : "Automate your Google, Facebook and Instagram advertising campaigns. Create, manage and optimize your ads without marketing expertise."}
            </p>
            <div className="mt-6 space-y-3">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center text-texte-description-black"
                >
                  <span className="mr-3 bg-primary-900 p-1.5 rounded-full">
                    {item.icon}
                  </span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="col-span-1 lg:col-span-8 text-center md:py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {footerSections.map((section) => (
                <div key={section.title}>
                  <h3 className="text-sm font-bold text-texte-description-green tracking-wider uppercase mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-base text-texte-description-black hover:text-primary-100 transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border-image flex flex-col md:flex-row items-center justify-between">
          <div className="flex space-x-6 mb-4 md:mb-0">
            {locale === "fr" ? (
              <Link
                href="#"
                className="text-texte-footer hover:text-primary-100 transition"
              >
                Mentions légales
              </Link>
            ) : (
              <Link
                href="#"
                className="text-texte-footer hover:text-primary-100 transition"
              >
                Legal Notice
              </Link>
            )}
            <Link
              href="#"
              className="text-texte-footer hover:text-primary-100 transition"
            >
              {locale === "fr"
                ? "Politique de confidentialité"
                : "Privacy Policy"}
            </Link>
            <Link
              href="#"
              className="text-texte-footer hover:text-primary-100 transition"
            >
              {locale === "fr"
                ? "Conditions d'utilisation"
                : "Terms of Service"}
            </Link>
          </div>
          <div className="flex items-center text-texte-footer">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="pt-6 sm:pt-0">
              © {currentYear} AutoAds -{" "}
              {locale === "fr" ? "Tous droits réservés" : "All rights reserved"}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
