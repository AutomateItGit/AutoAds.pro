import { auth, signIn } from "@/auth/auth";
import { redirect } from "next/navigation";
import SignInWithGoogle from "./SignInWithGoogle";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/lib/dictonnaries";

interface SignInFormProps {
  searchParams?: Promise<{
    error?: string;
    message?: string;
  }>;
  params: Promise<{ lang: "fr" | "en" }>;
}

export default async function SignInForm({
  searchParams,
  params,
}: SignInFormProps) {
  const session = await auth();
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  // Si l'utilisateur est déjà connecté, on le redirige vers la page d'accueil
  if (session) {
    redirect("/" + lang + "/dashboard");
  }

  const resolvedSearchParams = await searchParams;
  const error = resolvedSearchParams?.error;
  const message = resolvedSearchParams?.message;

  // Server Action pour gérer la connexion par identifiants
  async function handleCredentialsLogin(formData: FormData) {
    "use server";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    let url = "/" + lang + "/signin";
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false, // Prevent automatic redirect
      });
      if (result?.error) {
        url = `/${lang}/signin?error=${encodeURIComponent(result.error)}`;
      } else {
        url = "/" + lang + "/dashboard";
      }
      console.log("signin result:", result);

      // If sign in was successful, redirect to callback URL or default
    } catch (error) {
      // Handle error
      const errorMessage =
        error instanceof Error ? error.message : "Authentication failed";
      url = `/${lang}/signin?error=${encodeURIComponent(errorMessage)}`;
    } finally {
      //Garder le finally sinon erreurs
      redirect(url);
    }
  }

  return (
    <div className="shadow-lg mx-auto w-full max-w-xl rounded-none bg-white p-8 md:rounded-2xl md:p-12 dark:bg-black mt-32 mb-24">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-texte-header-black mb-4">
          {dictionary.signin.title}
        </h2>
        <p className="text-lg text-texte-description-black">
          {dictionary.signin.subtitle}
        </p>
      </div>

      {/* Formulaire de connexion par email/mot de passe */}
      <form className="mb-4" action={handleCredentialsLogin}>
        <LabelInputContainer className="mb-6">
          <Label htmlFor="email" className="text-lg mb-2">
            {dictionary.signin.email}
          </Label>
          <Input
            id="email"
            name="email"
            placeholder={dictionary.signin.emailPlaceholder}
            type="text"
            required
            className="h-12 text-lg"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-6">
          <Label htmlFor="password" className="text-lg mb-2">
            {dictionary.signin.password}
          </Label>
          <Input
            id="password"
            name="password"
            placeholder={dictionary.signin.passwordPlaceholder}
            type="password"
            required
            className="h-12 text-lg"
          />
        </LabelInputContainer>

        {/* Forgot Password Link */}
        <div className="mb-4 text-right">
          <a
            href="/forgot-password"
            className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
          >
            {dictionary.signin.forgotPassword}
          </a>
        </div>

        <button
          className="group/btn relative block h-12 w-full rounded-md bg-bg-bouton-classic hover:bg-bg-bouton-hover font-medium text-white text-lg transition-colors duration-200"
          type="submit"
        >
          {dictionary.signin.signInButton}
        </button>
        {/* Error message display */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {decodeURIComponent(error)}
          </div>
        )}

        {/* Success message display */}
        {message && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
            {decodeURIComponent(message)}
          </div>
        )}
      </form>
      {/* Connexion avec Google */}
      <SignInWithGoogle />

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          {dictionary.signin.noAccount}{" "}
          <a
            href={`/${lang}/signup`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            {dictionary.signin.signUpLink}
          </a>
        </p>
      </div>
    </div>
  );
}

// Removed BottomGradient as we're using a simpler design

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
