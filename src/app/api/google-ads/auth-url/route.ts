import { NextResponse } from "next/server";
import { env } from "@/lib/env";

export async function GET() {
  try {
    console.log("Checking environment variables:");
    console.log("NEXT_PUBLIC_APP_URL:", env.NEXT_PUBLIC_APP_URL);
    console.log("GOOGLE_CLIENT_ID exists:", !!env.GOOGLE_CLIENT_ID);

    if (!env.GOOGLE_CLIENT_ID) {
      throw new Error("GOOGLE_CLIENT_ID is required");
    }

    const REDIRECT_URI = encodeURIComponent(
      `${env.NEXT_PUBLIC_APP_URL}/api/google-ads/callback`
    );
    const SCOPE = encodeURIComponent("https://www.googleapis.com/auth/adwords");

    console.log("Client ID:", env.GOOGLE_CLIENT_ID);
    console.log("Redirect URI:", REDIRECT_URI);

    const oauthUrl =
      "https://accounts.google.com/o/oauth2/v2/auth" +
      `?client_id=${encodeURIComponent(env.GOOGLE_CLIENT_ID)}` +
      `&redirect_uri=${REDIRECT_URI}` +
      "&response_type=code" +
      `&scope=${SCOPE}` +
      "&access_type=offline" +
      "&prompt=consent";

    console.log(
      "Generated OAuth URL (without client_id):",
      oauthUrl.replace(env.GOOGLE_CLIENT_ID, "HIDDEN_CLIENT_ID")
    );

    return NextResponse.json({ url: oauthUrl });
  } catch (error) {
    console.error("Error in auth-url route:", error);
    return NextResponse.json(
      {
        error: "Failed to generate authentication URL",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
