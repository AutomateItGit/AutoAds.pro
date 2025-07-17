import React from "react";
import SignInForm from "./SignInForm";

export default function SignIn({
  params,
  searchParams,
}: {
  params: Promise<{ lang: "fr" | "en" }>;
  searchParams?: { error?: string; message?: string };
}) {
  return (
    <div>
      <SignInForm params={params} searchParams={searchParams} />
    </div>
  );
}