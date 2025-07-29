"use client";

import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Crown, Star, Zap } from "lucide-react";
import { useTranslations } from "@/components/providers/DictonaryContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function SubscriptionPlan() {
  const { t, locale } = useTranslations();
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/${locale}/signin`);
    }
  }, [status, router, locale]);

  // Si le statut est en cours de chargement ou que l'utilisateur n'est pas authentifié, afficher un loader
  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const handleSubscription = async (plan: string) => {
    try {
      let priceId = "";
      switch (plan) {
        case "free":
          priceId = process.env.NEXT_PUBLIC_FREE_PLAN_KEY || "";
          break;
        case "basic":
          priceId = process.env.NEXT_PUBLIC_BASIC_PLAN_KEY || "";
          break;
        case "pro":
          priceId = process.env.NEXT_PUBLIC_PREMIUM_PLAN_KEY || "";
          break;
        case "enterprise":
          priceId = process.env.NEXT_PUBLIC_ENTREPRISE_PLAN_KEY || "";
          break;
        default:
          priceId = "";
          break;
      }

      if (priceId === "") {
        console.error("No price ID found for plan:", plan);
        alert("Plan configuration error. Please contact support.");
        return;
      }

      console.log(
        "Creating checkout session for plan:",
        plan,
        "with priceId:",
        priceId
      );

      const response = await fetch("/api/checkout-stipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId: priceId, lang: locale }),
      });

      const session = await response.json();

      console.log("Checkout response:", session);

      if (!response.ok) {
        console.error("Checkout API error:", session);
        alert(`Error: ${session.error || "Failed to create checkout session"}`);
        return;
      }

      if (!session.url) {
        console.error("No URL in successful response:", session);
        alert("Failed to create checkout session - no redirect URL provided");
        return;
      }

      console.log("Redirecting to checkout:", session.url);
      window.location.href = session.url;
    } catch (error) {
      console.error("Error in handleSubscription:", error);
      alert("Network error. Please check your connection and try again.");
    }
  };

  const plans = [
    {
      name: "Gratuit",
      price: "0€",
      period: "/mois",
      description: "Parfait pour débuter",
      icon: <Zap className="w-6 h-6" />,
      planKey: "free",
      popular: false,
      features: [
        "Jusqu'à 50 rendez-vous/mois",
        "1 utilisateur",
        "Calendrier de base",
        "Support par email",
      ],
    },
    {
      name: "Basique",
      price: "19€",
      period: "/mois",
      description: "Pour les petites entreprises",
      icon: <Star className="w-6 h-6" />,
      planKey: "basic",
      popular: true,
      features: [
        "Rendez-vous illimités",
        "Jusqu'à 3 utilisateurs",
        "Calendrier avancé",
        "Notifications SMS",
        "Rapports de base",
        "Support prioritaire",
      ],
    },
    {
      name: "Pro",
      price: "49€",
      period: "/mois",
      description: "Pour les entreprises en croissance",
      icon: <Crown className="w-6 h-6" />,
      planKey: "pro",
      popular: false,
      features: [
        "Tout du plan Basique",
        "Utilisateurs illimités",
        "Intégrations avancées",
        "Automatisations",
        "Rapports détaillés",
        "API complète",
        "Support téléphonique",
      ],
    },
    {
      name: "Enterprise",
      price: "1000€",
      period: "/mois",
      description: "Pour les grandes organisations",
      icon: <Crown className="w-6 h-6" />,
      planKey: "enterprise",
      popular: false,
      features: [
        "Tout du plan Pro",
        "Solutions personnalisées",
        "Gestionnaire de compte dédié",
        "Formation sur site",
        "SLA garanti",
        "Sécurité renforcée",
        "Support 24/7",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t("payment.choose_plan")}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("payment.choose_plan_description")}
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.planKey}
              className={`relative h-full flex flex-col ${
                plan.popular
                  ? "border-2 border-blue-500 shadow-lg scale-105"
                  : "border border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    {t("payment.recommended")}
                  </span>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-3">
                  <div
                    className={`p-3 rounded-full ${
                      plan.popular
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {plan.icon}
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 ml-1">{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="pt-6">
                <Button
                  onClick={() => handleSubscription(plan.planKey)}
                  className={`w-full ${
                    plan.popular
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : plan.planKey === "free"
                        ? "bg-gray-100 hover:bg-gray-200 text-gray-900"
                        : "bg-gray-900 hover:bg-gray-800 text-white"
                  }`}
                  size="lg"
                >
                  {plan.planKey === "free"
                    ? t("payment.start_free")
                    : t("payment.choose_this_plan")}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Bottom section */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            {t("payment.all_plans_include_refund_guarantee")}
          </p>
          <p className="text-sm text-gray-500">
            {t("payment.contact_support")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionPlan;
