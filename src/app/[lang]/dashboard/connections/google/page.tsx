"use client";

import { useTranslations } from "@/components/providers/DictonaryContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function GoogleAdsConnection() {
  const { t, locale } = useTranslations();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Vérifier les paramètres d'erreur dans l'URL
    const errorParam = searchParams.get("error");
    if (errorParam) {
      setError(
        t(`googleAds.errors.${errorParam}`) || t("googleAds.errors.unknown")
      );
    }

    // Vérifier si l'utilisateur est déjà connecté à Google Ads
    const checkConnection = async () => {
      try {
        const response = await fetch("/api/google-ads/status");
        if (!response.ok) throw new Error("Failed to check connection status");
        const data = await response.json();
        setIsConnected(data.isConnected);
      } catch (error) {
        console.error("Error checking Google Ads connection:", error);
        setError(t("googleAds.errors.connectionCheck"));
      } finally {
        setIsLoading(false);
      }
    };

    checkConnection();
  }, [searchParams, t]);

  const handleGoogleAdsConnect = async () => {
    try {
      setError(null);
      const response = await fetch("/api/google-ads/auth-url");
      if (!response.ok) throw new Error("Failed to get auth URL");
      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No auth URL received");
      }
    } catch (error) {
      console.error("Error initiating Google Ads connection:", error);
      setError(t("googleAds.errors.initConnection"));
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>{t("googleAds.connectionTitle")}</CardTitle>
          <CardDescription>
            {t("googleAds.connectionDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md">
              {error}
            </div>
          )}
          {isConnected ? (
            <div className="text-center">
              <p className="text-green-600 mb-4">{t("googleAds.connected")}</p>
              <Button
                variant="outline"
                onClick={() =>
                  router.push(`/${locale}/dashboard/ads/campaigns`)
                }
              >
                {t("googleAds.viewCampaigns")}
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <Button
                onClick={handleGoogleAdsConnect}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                {t("googleAds.connect")}
              </Button>
              <p className="mt-4 text-sm text-gray-500">
                {t("googleAds.connectDescription")}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
