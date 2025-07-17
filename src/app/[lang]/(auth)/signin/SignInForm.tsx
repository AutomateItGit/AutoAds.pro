import { auth, signIn } from "@/auth/auth";
import { redirect } from "next/navigation";
import SignInWithGoogle from "./SignInWithGoogle";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/lib/dictonnaries";


interface SignInFormProps {
  searchParams?: {
      error?: string;
      message?: string;
  };
  params: Promise<{ lang: "fr" | "en" }>;
}

export default async function SignInForm({searchParams, params} : SignInFormProps) {
    const session = await auth();
    const { lang } = await params;
    const dictionary = await getDictionary(lang);

    // Si l'utilisateur est déjà connecté, on le redirige vers la page d'accueil
    if (session) {
        redirect("/dashboard");
    }


    const error = searchParams?.error;
    const message = searchParams?.message;

    // Server Action pour gérer la connexion par identifiants
    async function handleCredentialsLogin(formData: FormData) {
        "use server";
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        let url = '/';
        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false // Prevent automatic redirect
            });
            if (result?.error) {
                url = `/signin?error=${encodeURIComponent(result.error)}`;
            }
            else {
                url = '/dashboard';
            }
            console.log('signin result:', result);
            
            // If sign in was successful, redirect to callback URL or default
            
            
        } catch (error) {
            // Handle error
            const errorMessage = error instanceof Error ? error.message : "Authentication failed";
            url = `/signin?error=${encodeURIComponent(errorMessage)}`;
        }
        finally {
            //Garder le finally sinon erreurs
            redirect(url);
        }
    }

    return (
    
        <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black mt-24 mb-24">
            
            <div className="mb-4">
                <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">{dictionary.signin.title}</h2>
                <p  className=" mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">{dictionary.signin.subtitle}</p>
            </div>
            

           
            
            {/* Formulaire de connexion par email/mot de passe */}
            <form className="mb-4" action={handleCredentialsLogin}>

                
                
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">{dictionary.signin.email}</Label>
                    <Input id="email" name="email" placeholder={dictionary.signin.emailPlaceholder} type="text" required />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="password">{dictionary.signin.password}</Label>
                    <Input id="password" name="password" placeholder={dictionary.signin.passwordPlaceholder} type="password" required/>
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
                    className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                    type="submit"
                    
                    >
                    {dictionary.signin.signInButton}
                            <BottomGradient />
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
        </div>
    );
}

const BottomGradient = () => {
    return (
      <>
        <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
        <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
      </>
    );
  };

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