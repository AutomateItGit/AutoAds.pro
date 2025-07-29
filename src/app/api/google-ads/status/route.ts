import { NextResponse } from "next/server";
import { auth } from "@/auth/auth";
import connectDB from "@/lib/mongo";
import { User } from "@/models/user";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ isConnected: false });
    }

    await connectDB();
    const user = await User.findById(session.user.id).select("googleAds");

    const isConnected = !!user?.googleAds?.accessToken;

    return NextResponse.json({ isConnected });
  } catch (error) {
    console.error("Error checking Google Ads status:", error);
    return NextResponse.json(
      { error: "Failed to check connection status" },
      { status: 500 }
    );
  }
}
