"use client";
import React, {useState} from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGoogle
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { IUser } from "@/types/user"; 
import { signIn } from "next-auth/react";
import { useTranslations } from "@/component/providers/DictonaryContext";

interface FormData {
    name : string;
    email: string;
    phoneNumber: string;
    password: string;
}

const initialFormData : FormData = {
    name : "",
    email : "",
    phoneNumber: "",
    password : "",
}

type ApiResponse<T> = {
    success: boolean;
    data?: T;
    error?: string;
  };

export default function SignUpForm(){
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();
  const { t } = useTranslations();
  

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    setLoading(true);
    setError('');

    try{
        const response = await fetch('/api/owner', {
            method : "POST",
            headers: {
                 'Content-Type' : 'application/json',
            },
            body :JSON.stringify(formData)
        });

        const result : ApiResponse<IUser> = await response.json();

        if (result.success && result.data){
            router.push("/");
        }
        else{
            setError(result.error || "Failed to create User");
          } 
    }catch(err){
        console.log(err);
        console.error("Error happened while handling the process.", err);
        setError("Something went wrong, please try again. If the error persist wait a while then try again.");
  
      }
      finally{
        setLoading(false);
      }
}
const handleFormChange = (e : React.ChangeEvent<HTMLInputElement>) => {
  const {name, value} = e.target;
  setFormData( prev => ({
    ...prev,
    [name] : value
  })
  );
};

return (
  <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black mt-24 mb-24">
    <div className="mb-4">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        {t('signup.title')}
      </h2>
      <p className=" mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        {t('signup.subtitle')}
      </p>
      </div>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
              <LabelInputContainer className="mb-4">
            <Label htmlFor="name">{t('signup.name')}</Label>
            <Input id="name" name="name" placeholder={t('signup.namePlaceholder')} type="text" value={formData.name} onChange={handleFormChange} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
            <Label htmlFor="email">{t('signup.email')}</Label>
            <Input id="email" name="email" placeholder={t('signup.emailPlaceholder')} type="text" value={formData.email} onChange={handleFormChange} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
            <Label htmlFor="phoneNumber">{t('signup.phoneNumber')}</Label>
            <Input id="phoneNumber" name="phoneNumber" placeholder={t('signup.phonePlaceholder')} type="text" value={formData.phoneNumber} onChange={handleFormChange} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
            <Label htmlFor="password">{t('signup.password')}</Label>
            <Input id="password" name="password" placeholder={t('signup.passwordPlaceholder')} type="password" value={formData.password} onChange={handleFormChange} />
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
          disabled={loading}
        >
          {loading ? t('signup.signingUp') : t('signup.signUpButton')}
          <BottomGradient />
        </button>
        </form>
        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
      
        <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
            disabled={loading}
            onClick={() => signIn("google")}
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              {t('signup.googleButton')}
            </span>
            <BottomGradient />
          </button>
      
  </div>
)
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