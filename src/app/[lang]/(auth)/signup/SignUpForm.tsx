"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGoogle } from "@tabler/icons-react";
import { useRouter, useParams } from "next/navigation";
import { IUser } from "@/types/user";
import { signIn } from "next-auth/react";
import { useTranslations } from "@/components/providers/DictonaryContext";

interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
};

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export default function SignUpForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const params = useParams();
  const lang = params?.lang as string;
  const { t } = useTranslations();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result: ApiResponse<IUser> = await response.json();

      if (result.success && result.data) {
        // Connecter l'utilisateur après l'inscription
        const signInResult = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (signInResult?.error) {
          console.error(
            "Error signing in after registration:",
            signInResult.error
          );
          setError(
            "Account created but couldn't sign in automatically. Please try signing in manually."
          );
          router.push(`/${lang}/signin`);
          return;
        }

        // Rediriger vers la page de paiement après une inscription et connexion réussies
        router.push(`/${lang}/payment`);
      } else {
        setError(result.error || "Failed to create User");
      }
    } catch (err) {
      console.error("Error during signup:", err);
      setError("Something went wrong during signup. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="shadow-lg mx-auto w-full max-w-xl rounded-none bg-white p-8 md:rounded-2xl md:p-12 dark:bg-black mt-32 mb-24">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-texte-header-black mb-4">
          {t("signup.title")}
        </h2>
        <p className="text-lg text-texte-description-black">
          {t("signup.subtitle")}
        </p>
      </div>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-6">
          <Label htmlFor="name" className="text-lg mb-2">
            {t("signup.name")}
          </Label>
          <Input
            id="name"
            name="name"
            placeholder={t("signup.namePlaceholder")}
            type="text"
            value={formData.name}
            onChange={handleFormChange}
            className="h-12 text-lg"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-6">
          <Label htmlFor="email" className="text-lg mb-2">
            {t("signup.email")}
          </Label>
          <Input
            id="email"
            name="email"
            placeholder={t("signup.emailPlaceholder")}
            type="text"
            value={formData.email}
            onChange={handleFormChange}
            className="h-12 text-lg"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-6">
          <Label htmlFor="phoneNumber" className="text-lg mb-2">
            {t("signup.phoneNumber")}
          </Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            placeholder={t("signup.phonePlaceholder")}
            type="text"
            value={formData.phoneNumber}
            onChange={handleFormChange}
            className="h-12 text-lg"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-6">
          <Label htmlFor="password" className="text-lg mb-2">
            {t("signup.password")}
          </Label>
          <Input
            id="password"
            name="password"
            placeholder={t("signup.passwordPlaceholder")}
            type="password"
            value={formData.password}
            onChange={handleFormChange}
            className="h-12 text-lg"
          />
        </LabelInputContainer>

        <button
          className="group/btn relative block h-12 w-full rounded-md bg-bg-bouton-classic hover:bg-bg-bouton-hover font-medium text-white text-lg transition-colors duration-200"
          type="submit"
          disabled={loading}
        >
          {loading ? t("signup.signingUp") : t("signup.signUpButton")}
        </button>
      </form>
      <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

      <button
        className="group/btn relative flex h-12 w-full items-center justify-center space-x-3 rounded-md bg-bg-bouton-secondary hover:bg-bg-bouton-secondary-hover px-4 font-medium text-texte-description-black transition-colors duration-200"
        disabled={loading}
        onClick={() => signIn("google")}
      >
        <IconBrandGoogle className="h-6 w-6" />
        <span className="text-lg">{t("signup.googleButton")}</span>
      </button>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          {t("signup.alreadyHaveAccount")}{" "}
          <a
            href={`/${lang}/signin`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            {t("signup.signInLink")}
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
