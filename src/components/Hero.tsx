"use client";

import React, { useState, useEffect, forwardRef, useRef } from "react";
import { useTranslations } from "./providers/DictonaryContext";
import { motion } from "framer-motion";
import EmailPopup from "./EmailPopup";
import {
  useNotifications,
  NotificationAppType,
} from "@/components/NotificationSystem";
import { Link as ScrollLink } from "react-scroll";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { cn } from "@/lib/utils";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

const Icons = {
  instagram: () => <Instagram className="size-8" width="38" height="38" />,
  linkedin: () => <Linkedin className="size-8" width="38" height="38" />,
  facebook: () => <Facebook className="size-8" width="38" height="38" />,
  twitter: () => <Twitter className="size-8" width="38" height="38" />,
  youtube: () => <Youtube className="size-8" width="38" height="38" />,
  pinterest: () => (
    <svg
      width="38"
      height="38"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
  ),
};

const Hero = () => {
  const { t, locale } = useTranslations();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { showNotification, clearNotifications } = useNotifications();
  const [isHydrated, setIsHydrated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Move refs to component level
  const containerRef = useRef<HTMLDivElement>(null);
  const refLinkedin = useRef<HTMLDivElement>(null);
  const refInstagram = useRef<HTMLDivElement>(null);
  const refLogo = useRef<HTMLDivElement>(null);
  const refFacebook = useRef<HTMLDivElement>(null);
  const refTwitter = useRef<HTMLDivElement>(null);
  const refYoutube = useRef<HTMLDivElement>(null);
  const refPinterest = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if notifications have already been shown in this session
    const notificationsShown = localStorage.getItem("notificationsShown");

    // If notifications have already been shown, don't show them again
    if (notificationsShown === "true") {
      return;
    }

    // Notification data based on the current locale
    const notificationsToShow =
      locale === "fr"
        ? [
            {
              appType: "whatsapp" as NotificationAppType,
              title: "Rappel RDV",
              message: "Votre rendez-vous salon demain à 10h.",
              timeAgo: "5m",
              duration: 6000,
            },
            {
              appType: "gmail" as NotificationAppType,
              title: "Confirmation",
              message: "RDV confirmé pour le 15/07 à 14h30",
              timeAgo: "1m",
              duration: 6000,
            },
            {
              appType: "sms" as NotificationAppType,
              title: "AutoPlanner",
              message: "Répondez OUI pour valider votre RDV",
              timeAgo: "1h",
              duration: 6000,
            },
            {
              appType: "calendar" as NotificationAppType,
              title: "Nouveau créneau",
              message: "RDV reprogrammé le 18/07 à 15h",
              timeAgo: "30s",
              duration: 6000,
            },
          ]
        : [
            {
              appType: "whatsapp" as NotificationAppType,
              title: "Appointment Reminder",
              message: "Your salon appointment tomorrow at 10am.",
              timeAgo: "5m",
              duration: 6000,
            },
            {
              appType: "gmail" as NotificationAppType,
              title: "Confirmation",
              message: "Appointment confirmed for 07/15 at 2:30pm",
              timeAgo: "1m",
              duration: 6000,
            },
            {
              appType: "sms" as NotificationAppType,
              title: "AutoPlanner",
              message: "Reply YES to confirm your appointment",
              timeAgo: "1h",
              duration: 6000,
            },
            {
              appType: "calendar" as NotificationAppType,
              title: "New time slot",
              message: "Appointment rescheduled for 07/18 at 3pm",
              timeAgo: "30s",
              duration: 6000,
            },
          ];

    // Create timeouts to display notifications sequentially
    const timeouts = notificationsToShow.map((notification, i) =>
      setTimeout(
        () => {
          showNotification(notification);
          // After the last notification, mark as shown
          if (i === notificationsToShow.length - 1) {
            localStorage.setItem("notificationsShown", "true");
          }
        },
        2000 * (i + 1)
      )
    );

    // Cleanup function that runs when the Hero component is unmounted
    return () => {
      timeouts.forEach(clearTimeout);
      clearNotifications();
    };
  }, [showNotification, clearNotifications, locale]);

  useEffect(() => {
    // Mark component as hydrated
    setIsHydrated(true);

    // Check if device is mobile or not (threshold is 768px - standard Tailwind md breakpoint)
    const checkIfMobile = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      return isMobileView;
    };

    // Initial check
    const isMobileView = checkIfMobile();

    const applyMobileWidthFixes = () => {
      // Only apply fixes for mobile devices
      if (!checkIfMobile()) return;

      // Fix for the main Hero container
      if (heroRef.current) {
        const viewportWidth = window.innerWidth;
        heroRef.current.style.width = `${viewportWidth}px`;
        heroRef.current.style.maxWidth = `${viewportWidth}px`;
        heroRef.current.style.overflow = "hidden";
      }

      // Fix for the content container
      if (contentRef.current) {
        contentRef.current.style.width = "100%";
        contentRef.current.style.boxSizing = "border-box";
      }

      // Force body/html to not overflow horizontally
      document.body.style.overflowX = "hidden";
      document.documentElement.style.overflowX = "hidden";
    };

    // Reset styles function for desktop view
    const resetDesktopStyles = () => {
      if (heroRef.current) {
        heroRef.current.style.width = "";
        heroRef.current.style.maxWidth = "";
      }

      if (contentRef.current) {
        contentRef.current.style.width = "";
      }
    };

    // Apply appropriate styles based on viewport
    const handleResize = () => {
      const isMobileNow = checkIfMobile();
      if (isMobileNow) {
        applyMobileWidthFixes();
      } else {
        resetDesktopStyles();
      }
    };

    // Apply fixes if mobile
    if (isMobileView) {
      applyMobileWidthFixes();

      // Apply fixes after small delays to catch post-hydration layout shifts
      const timer1 = setTimeout(applyMobileWidthFixes, 100);
      const timer2 = setTimeout(applyMobileWidthFixes, 500);

      // Cleanup timers
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        window.removeEventListener("resize", handleResize);
      };
    }

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isMobile && (
        <style jsx global>{`
          html,
          body {
            max-width: 100vw;
            overflow-x: hidden;
          }
        `}</style>
      )}

      <div className="relative bg-gradient-to-b from-bg-classic to-primary-900 w-full overflow-hidden pt-36 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="home">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left column - Text content */}
            <div className="lg:col-span-6 space-y-8 mx-auto lg:mx-0 w-full max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <h1 className="text-4xl sm:text-5xl lg:text-5xl text-center font-bold text-texte-header-black leading-tight">
                  <span className="block">{t("hero.title")}</span>
                </h1>

                <p className="text-lg sm:text-xl text-texte-description-black text-center">
                  {t("hero.description")}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col items-center sm:flex-row sm:justify-center gap-4 w-full"
              >
                <button
                  onClick={() => setIsPopupOpen(true)}
                  className="w-full sm:w-auto px-8 py-4 bg-bg-bouton-classic hover:bg-bg-bouton-hover rounded-md text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
                >
                  {t("hero.cta")}
                </button>

                <ScrollLink
                  to="demo"
                  smooth={true}
                  duration={500}
                  className="w-full sm:w-auto px-8 py-4 bg-bg-bouton-secondary hover:bg-bg-bouton-secondaryHover rounded-md text-texte-description-green font-medium transition-all duration-200 text-center hover:shadow-md transform hover:-translate-y-1 cursor-pointer"
                >
                  {t("hero.demo")}
                </ScrollLink>
              </motion.div>
            </div>
            {!isMobile && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="lg:col-span-6 flex justify-center relative z-10 w-full"
              >
                <div
                  className="relative flex h-[450px] items-center justify-center overflow-visible mx-auto"
                  ref={containerRef}
                >
                  <div
                    className="flex items-center justify-center w-full relative"
                    style={{ minHeight: "350px" }}
                  >
                    {/* Left side vertical stack */}
                    <div className="flex flex-col items-center gap-12 mr-16 md:mr-20 relative z-10">
                      <Circle ref={refLinkedin} className="size-32">
                        <Icons.linkedin />
                      </Circle>
                      <Circle ref={refInstagram} className="size-32">
                        <Icons.instagram />
                      </Circle>
                      <Circle ref={refYoutube} className="size-32">
                        <Icons.youtube />
                      </Circle>
                    </div>
                    {/* Logo center */}
                    <div className="relative z-20">
                      <Circle
                        ref={refLogo}
                        className="size-40 bg-white flex items-center justify-center p-1"
                      >
                        <svg
                          width="52"
                          height="52"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.5213 2.62368C11.3147 1.75255 12.6853 1.75255 13.4787 2.62368L14.4989 3.74391C14.8998 4.18418 15.4761 4.42288 16.071 4.39508L17.5845 4.32435C18.7614 4.26934 19.7307 5.23857 19.6757 6.41554L19.6049 7.92905C19.5771 8.52388 19.8158 9.10016 20.2561 9.50111L21.3763 10.5213C22.2475 11.3147 22.2475 12.6853 21.3763 13.4787L20.2561 14.4989C19.8158 14.8998 19.5771 15.4761 19.6049 16.071L19.6757 17.5845C19.7307 18.7614 18.7614 19.7307 17.5845 19.6757L16.071 19.6049C15.4761 19.5771 14.8998 19.8158 14.4989 20.2561L13.4787 21.3763C12.6853 22.2475 11.3147 22.2475 10.5213 21.3763L9.50111 20.2561C9.10016 19.8158 8.52388 19.5771 7.92905 19.6049L6.41553 19.6757C5.23857 19.7307 4.26934 18.7614 4.32435 17.5845L4.39508 16.071C4.42288 15.4761 4.18418 14.8998 3.74391 14.4989L2.62368 13.4787C1.75255 12.6853 1.75255 11.3147 2.62368 10.5213L3.74391 9.50111C4.18418 9.10016 4.42288 8.52388 4.39508 7.92905L4.32435 6.41553C4.26934 5.23857 5.23857 4.26934 6.41554 4.32435L7.92905 4.39508C8.52388 4.42288 9.10016 4.18418 9.50111 3.74391L10.5213 2.62368Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M9 12L11 14L15 10"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Circle>
                    </div>
                    {/* Right side vertical stack */}
                    <div className="flex flex-col items-center gap-12 ml-16 md:ml-20 relative z-10">
                      <Circle ref={refFacebook} className="size-32">
                        <Icons.facebook />
                      </Circle>
                      <Circle ref={refTwitter} className="size-32">
                        <Icons.twitter />
                      </Circle>
                      <Circle ref={refPinterest} className="size-32">
                        <Icons.pinterest />
                      </Circle>
                    </div>
                  </div>
                  {/* Animated Beams */}
                  <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={refLinkedin}
                    toRef={refLogo}
                  />
                  <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={refInstagram}
                    toRef={refLogo}
                  />
                  <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={refYoutube}
                    toRef={refLogo}
                  />
                  <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={refFacebook}
                    toRef={refLogo}
                  />
                  <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={refTwitter}
                    toRef={refLogo}
                  />
                  <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={refPinterest}
                    toRef={refLogo}
                  />
                </div>
              </motion.div>
            )}
            {/* Right column - Animated Beam Demo */}
          </div>
        </div>

        {/* Background gradient decoration */}
        <div className="absolute top-0 -right-10 w-72 h-72 bg-bg-top-from rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-bg-top-to rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

        <EmailPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
        />
      </div>
    </>
  );
};

export default Hero;
