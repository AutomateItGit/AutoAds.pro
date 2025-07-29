import getConfig from "next/config";

// Récupérer la configuration runtime de Next.js
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig() || {
  serverRuntimeConfig: {},
  publicRuntimeConfig: {},
};

// Fonction pour obtenir une variable d'environnement avec une valeur par défaut
const getEnvVar = (name: string, defaultValue?: string): string => {
  const value =
    process.env[name] ||
    serverRuntimeConfig[name] ||
    publicRuntimeConfig[name] ||
    defaultValue;
  if (!value) {
    console.warn(`Warning: Environment variable ${name} is not defined`);
  }
  return value || "";
};

export const env = {
  GOOGLE_CLIENT_ID: getEnvVar("GOOGLE_CLIENT_ID"),
  GOOGLE_CLIENT_SECRET: getEnvVar("GOOGLE_CLIENT_SECRET"),
  NEXT_PUBLIC_APP_URL: getEnvVar(
    "NEXT_PUBLIC_APP_URL",
    "http://localhost:3000"
  ),
} as const;

// Validation des variables critiques
if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET) {
  console.error("Critical environment variables are missing:");
  if (!env.GOOGLE_CLIENT_ID) console.error("- GOOGLE_CLIENT_ID is not defined");
  if (!env.GOOGLE_CLIENT_SECRET)
    console.error("- GOOGLE_CLIENT_SECRET is not defined");

  if (process.env.NODE_ENV === "production") {
    throw new Error("Missing critical environment variables");
  }
}
