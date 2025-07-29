import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth/auth";
import axios from "axios";
import connectDB from "@/lib/mongo";
import { User } from "@/models/user";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      console.error("Google OAuth error:", error);
      return NextResponse.redirect(
        new URL("/dashboard/connections/google?error=auth_failed", req.url)
      );
    }

    if (!code) {
      return NextResponse.redirect(
        new URL("/dashboard/connections/google?error=no_code", req.url)
      );
    }

    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    // Échange du code contre les tokens
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri:
          process.env.NEXT_PUBLIC_APP_URL + "/api/google-ads/callback",
        grant_type: "authorization_code",
      },
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const { access_token, refresh_token, expires_in } = tokenResponse.data;

    // Stockage des tokens dans la base de données
    await connectDB();
    await User.findByIdAndUpdate(session.user.id, {
      googleAds: {
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresIn: expires_in,
        connectedAt: new Date(),
      },
    });

    // Redirection vers la page de succès
    return NextResponse.redirect(
      new URL("/dashboard/connections/google?success=true", req.url)
    );
  } catch (error) {
    console.error("Error in Google Ads callback:", error);
    return NextResponse.redirect(
      new URL("/dashboard/connections/google?error=server_error", req.url)
    );
  }
}
