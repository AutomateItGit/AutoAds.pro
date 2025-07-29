"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Importer motion et AnimatePresence
import { X, MessageSquare, Dumbbell, Slash } from "lucide-react"; // Importer des icônes génériques de Lucide si besoin
import {
  SiGmail,
  SiWhatsapp,
  SiStripe,
  SiInstagram,
  SiNetflix,
  SiX, // Correction: l'icône pour X (anciennement Twitter)
  SiWise, // Nouveau nom de TransferWise
  SiMcdonalds,
} from "react-icons/si"; // Importer les icônes spécifiques des marques

// --- Types (inchangés) ---
export type NotificationAppType =
  | "gmail"
  | "sms"
  | "instagram"
  | "whatsapp"
  | "stripe"
  | "netflix"
  | "twitter"
  | "mcdonalds"
  | "transferwise"
  | "gym";

export interface Notification {
  id: string;
  appType: NotificationAppType;
  title: string;
  message: string;
  timeAgo?: string;
  customIcon?: string;
  duration?: number;
}

interface NotificationContainerProps {
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  maxNotifications?: number;
}

interface NotificationContextType {
  showNotification: (notification: Omit<Notification, "id">) => void;
  clearNotifications: () => void;
}

const NotificationContext = React.createContext<
  NotificationContextType | undefined
>(undefined);

export const useNotifications = () => {
  const context = React.useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
};

// --- Composant AppIcon (inchangé) ---
const AppIcon: React.FC<{
  appType: NotificationAppType;
  customIcon?: string;
}> = ({ appType, customIcon }) => {
  const getAppIconStyles = () => {
    // Style de base pour l'icône interne (taille ajustée)
    // Utiliser les classes Tailwind pour la taille de react-icons
    const iconClassName = "w-[60%] h-[60%]"; // Ajustez ce % pour la taille du logo dans le carré

    switch (appType) {
      case "gmail":
        return {
          bgColor: "bg-white", // Fond blanc pour Gmail
          content: (
            <div className="flex items-center justify-center w-full h-full">
              <SiGmail className={`${iconClassName} text-[#EA4335]`} />
            </div>
          ),
        };
      case "sms": // Icône style Messages iOS (utilisation de Lucide)
        return {
          bgColor: "bg-green-500",
          content: (
            <div className="flex items-center justify-center w-full h-full text-white">
              <MessageSquare className={iconClassName} fill="white" />
            </div>
          ),
        };
      case "stripe":
        return {
          bgColor: "bg-[#635BFF]", // Bleu Stripe
          content: (
            <div className="flex items-center justify-center w-full h-full text-white">
              <SiStripe className={iconClassName} />
            </div>
          ),
        };
      case "mcdonalds":
        return {
          bgColor: "bg-[#DA291C]", // Rouge McDonalds
          content: (
            <div className="flex items-center justify-center w-full h-full text-[#FFC72C]">
              {" "}
              {/* Jaune McDonalds */}
              <SiMcdonalds className={iconClassName} />
            </div>
          ),
        };
      case "instagram":
        return {
          // Fond dégradé Instagram pour le conteneur
          bgColor:
            "bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045]",
          content: (
            <div className="flex items-center justify-center w-full h-full text-white">
              <SiInstagram className={iconClassName} />
            </div>
          ),
        };
      case "whatsapp":
        return {
          bgColor: "bg-[#25D366]", // Vert WhatsApp
          content: (
            <div className="flex items-center justify-center w-full h-full text-white">
              <SiWhatsapp className={iconClassName} />
            </div>
          ),
        };
      case "netflix":
        return {
          bgColor: "bg-black", // Fond noir
          content: (
            <div className="flex items-center justify-center w-full h-full text-[#E50914]">
              {" "}
              {/* Rouge Netflix */}
              <SiNetflix className={iconClassName} />
            </div>
          ),
        };
      case "twitter": // Logo X
        return {
          bgColor: "bg-black",
          content: (
            <div className="flex items-center justify-center w-full h-full text-white">
              <SiX className={iconClassName} />
            </div>
          ),
        };
      case "transferwise": // Logo Wise
        return {
          bgColor: "bg-white", // Fond blanc pour Wise
          content: (
            <div className="flex items-center justify-center w-full h-full text-[#00B9FF]">
              {" "}
              {/* Bleu Wise */}
              <SiWise className={iconClassName} />
            </div>
          ),
        };
      case "gym": // Utilisation de Lucide pour une icône générique
        return {
          bgColor: "bg-gray-700",
          content: (
            <div className="flex items-center justify-center w-full h-full text-white">
              <Dumbbell className={iconClassName} />
            </div>
          ),
        };
      default: // Icône générique avec Lucide
        return {
          bgColor: "bg-gray-300", // Gris un peu plus foncé
          content: (
            <div className="flex items-center justify-center w-full h-full text-gray-600">
              <Slash className={iconClassName} /> {/* Icône par défaut */}
            </div>
          ),
        };
    }
  };
  const { bgColor, content } = getAppIconStyles();
  return (
    <div
      // Icône un peu plus petite comme sur iOS -> w-7 h-7
      // Coins arrondis style iOS -> rounded-lg
      className={`w-7 h-7 rounded-lg overflow-hidden ${bgColor} flex items-center justify-center flex-shrink-0`}
    >
      {content}
    </div>
  );
};

// --- Composant NotificationItem ---
// On utilise React.memo pour optimiser les re-rendus inutiles
const NotificationItem = React.memo<{
  notification: Notification;
  onClose: () => void;
  // index n'est plus nécessaire pour le z-index ici, géré par l'ordre
}>(({ notification, onClose }) => {
  // Gère la disparition automatique
  useEffect(() => {
    if (notification.duration) {
      const timer = setTimeout(() => {
        onClose();
      }, notification.duration);
      return () => clearTimeout(timer);
    }
  }, [notification.duration, notification.id, onClose]);

  return (
    // Pas besoin de ref pour l'animation ici, framer-motion s'en charge
    <div
      // Style inspiré d'iOS
      className="flex items-start p-2.5 mb-2 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md rounded-xl shadow-lg w-full max-w-xs border border-gray-200/30 dark:border-zinc-700/30 relative overflow-hidden group" // Ajout de relative, overflow-hidden et group
    >
      {/* Icône */}
      <div className="mr-2.5 mt-0.5">
        {" "}
        {/* Ajustement margin top */}
        <AppIcon
          appType={notification.appType}
          customIcon={notification.customIcon}
        />
      </div>

      {/* Contenu texte */}
      <div className="flex-1 min-w-0 pt-0.5">
        {" "}
        {/* Ajustement padding top */}
        <div className="flex justify-between items-center mb-0.5">
          {/* Titre */}
          <div className="font-semibold text-sm text-gray-800 dark:text-gray-100 truncate">
            {notification.title}
          </div>
          {/* Heure */}
          <div className="text-xs text-gray-500 dark:text-gray-400 ml-2 flex-shrink-0">
            {notification.timeAgo || "maintenant"}
          </div>
        </div>
        {/* Message */}
        <div className="text-sm text-gray-600 dark:text-gray-300 break-words line-clamp-2">
          {" "}
          {/* Limite à 2 lignes */}
          {notification.message}
        </div>
      </div>

      {/* Bouton Fermer (X) - Style iOS */}
      <button
        onClick={onClose}
        aria-label="Fermer la notification"
        // Style amélioré : apparaît au survol de la notif
        className="absolute top-1 right-1 w-5 h-5 rounded-full bg-gray-300/60 dark:bg-zinc-600/60 text-gray-600 dark:text-gray-300 hover:bg-gray-400/80 dark:hover:bg-zinc-500/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-500 dark:focus:ring-zinc-400"
      >
        <X size={12} />
      </button>
    </div>
  );
});
NotificationItem.displayName = "NotificationItem"; // Pour le debug React DevTools

// --- Fournisseur de notifications ---
export const NotificationProvider: React.FC<
  { children: React.ReactNode } & NotificationContainerProps
> = ({ children, position = "top-right", maxNotifications = 5 }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Fonction pour générer un ID unique
  const generateId = () =>
    `notification-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

  // Afficher une nouvelle notification
  // Utilisation de useCallback pour potentiellement stabiliser la référence
  const showNotification = useCallback(
    (notification: Omit<Notification, "id">) => {
      const newNotification = { ...notification, id: generateId() };
      setNotifications((prev) => {
        // Ajoute la nouvelle au début
        const updatedNotifications = [newNotification, ...prev];
        // Limite au nombre max
        return updatedNotifications.slice(0, maxNotifications);
      });
    },
    [maxNotifications]
  ); // Dépend de maxNotifications

  // Fermer une notification spécifique
  // Utilisation de useCallback
  const closeNotification = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  }, []);

  // Effacer toutes les notifications
  // Utilisation de useCallback
  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Déterminer la classe de position
  const getPositionClass = () => {
    switch (position) {
      case "top-left":
        return "top-4 left-4"; // Ajout de padding
      case "bottom-right":
        return "bottom-4 right-4";
      case "bottom-left":
        return "bottom-4 left-4";
      default:
        return "top-4 right-4"; // Ajout de padding par défaut
    }
  };

  return (
    <NotificationContext.Provider
      value={{ showNotification, clearNotifications }}
    >
      {children}
      {/* Conteneur pour les notifications */}
      <div
        className={`fixed z-50 ${getPositionClass()} w-full max-w-xs`} // Largeur max pour les notifs
        style={{ pointerEvents: "none" }} // Empêche le conteneur de bloquer les clics en dessous
      >
        {/* Utilisation d'AnimatePresence pour gérer les animations d'entrée/sortie */}
        <AnimatePresence initial={false}>
          {notifications.map((notification) => (
            // Chaque notification est enveloppée dans motion.div
            <motion.div
              key={notification.id}
              layout // <-- C'est LA clé pour l'animation de défilement !
              initial={{ opacity: 0, y: -20, scale: 0.9 }} // Animation d'entrée
              animate={{ opacity: 1, y: 0, scale: 1 }} // État normal
              exit={{
                opacity: 0,
                x: 50,
                scale: 0.8,
                transition: { duration: 0.2 },
              }} // Animation de sortie (peut être ajustée)
              transition={{ type: "spring", stiffness: 200, damping: 25 }} // Type d'animation (springy)
              style={{ pointerEvents: "auto" }} // Réactive les clics pour la notification elle-même
            >
              <NotificationItem
                notification={notification}
                onClose={() => closeNotification(notification.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};

// --- Composant NotificationExamples (inchangé, utile pour tester) ---
const NotificationExamples: React.FC = () => {
  const { showNotification } = useNotifications();

  const showExampleNotification = (type: NotificationAppType) => {
    const examples = {
      gmail: {
        appType: "gmail",
        title: "Pierre Quiroule",
        message: "Add VAT to invoice now!",
        timeAgo: "1m",
        duration: 8000,
      },
      mcdonalds: {
        appType: "mcdonalds",
        title: "Your order just arrived!",
        message: "It's your 13th BigMama order this month! 🍔🍟🥤",
        timeAgo: "now",
        duration: 8000,
      },
      transferwise: {
        appType: "transferwise",
        title: "❌ Balance: -$1,200.00",
        message: "Another subscription you forgot to cancel",
        timeAgo: "4h",
        duration: 8000,
      },
      netflix: {
        appType: "netflix",
        title: "Daily Average: 5h 36min",
        message: "Your startup won't grow by binge watching all day",
        timeAgo: "2d",
        duration: 8000,
      },
      gym: {
        appType: "gym",
        title: "Gym Chad",
        message: "6 months ago you said tomorrow. Still in couch?",
        timeAgo: "30d",
        duration: 8000,
      },
      twitter: {
        appType: "twitter",
        title: "0 likes on your last post",
        message: "Consider a career shift",
        timeAgo: "now",
        duration: 8000,
      },
      sms: {
        appType: "sms",
        title: "Rappel RDV",
        message: "Votre coiffeur demain à 10h.",
        timeAgo: "5m",
        duration: 8000,
      },
      instagram: {
        appType: "instagram",
        title: "Nouveau Follower",
        message: "Elon Musk vous suit maintenant.",
        timeAgo: "1s",
        duration: 8000,
      },
      whatsapp: {
        appType: "whatsapp",
        title: "Maman ❤️",
        message: "Tu as pensé à acheter du pain ?",
        timeAgo: "10m",
        duration: 8000,
      },
      stripe: {
        appType: "stripe",
        title: "Paiement réussi",
        message: "Facture #2024-08B payée (250€)",
        timeAgo: "2h",
        duration: 8000,
      },
    };
    if (examples[type]) {
      showNotification(examples[type] as Omit<Notification, "id">);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 flex flex-col space-y-2 z-50">
      <button
        onClick={() => showExampleNotification("gmail")}
        className="bg-red-500 text-white px-3 py-1 rounded text-sm"
      >
        Gmail
      </button>
      <button
        onClick={() => showExampleNotification("whatsapp")}
        className="bg-green-500 text-white px-3 py-1 rounded text-sm"
      >
        WhatsApp
      </button>
      <button
        onClick={() => showExampleNotification("instagram")}
        className="bg-purple-500 text-white px-3 py-1 rounded text-sm"
      >
        Instagram
      </button>
      <button
        onClick={() => showExampleNotification("sms")}
        className="bg-blue-400 text-white px-3 py-1 rounded text-sm"
      >
        SMS
      </button>
      {/* Ajoutez d'autres boutons si nécessaire */}
    </div>
  );
};

// Exporter NotificationExamples si vous voulez l'utiliser ailleurs
// export { NotificationExamples };

// L'export default peut rester sur NotificationProvider ou un autre composant principal si nécessaire
// export default NotificationProvider;
