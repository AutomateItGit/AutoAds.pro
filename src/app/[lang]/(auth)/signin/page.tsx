import React from "react";
import SignInForm from "./SignInForm";

export default async function SignIn({
  params,
  searchParams,
}: {
  params: Promise<{ lang: "fr" | "en" }>;
  searchParams?: Promise<{ error?: string; message?: string }>;
}) {
  return (
    <div>
      <SignInForm params={params} searchParams={searchParams} />
    </div>
  );
}