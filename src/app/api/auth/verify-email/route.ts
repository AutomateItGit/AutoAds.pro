import connectDB from "@/lib/mongo";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    await connectDB();

    try {
        const { searchParams } = new URL(req.url);
        const token = searchParams.get('token');

        if (!token) {
            return NextResponse.json(
                { success: false, error: "Verification token is required" },
                { status: 400 }
            );
        }

        // Find user with the verification token
        const user = await User.findOne({
            emailVerificationToken: token,
            emailVerificationExpires: { $gt: new Date() } // Token should not be expired
        });

        if (!user) {
            return NextResponse.json(
                { 
                    success: false, 
                    error: "Invalid or expired verification token" 
                },
                { status: 400 }
            );
        }

        // Update user to mark email as verified and remove verification token
        await User.findByIdAndUpdate(user._id, {
            emailVerified: true,
            emailVerificationToken: undefined,
            emailVerificationExpires: undefined
        });

        console.log(`Email verified successfully for user: ${user.email}`);

        return NextResponse.json(
            {
                success: true,
                message: "Email verified successfully! You can now sign in to your account."
            },
            { status: 200 }
        );

    } catch (err) {
        console.error("Error verifying email:", err);
        
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        return NextResponse.json(
            { success: false, error: errorMessage },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    await connectDB();

    try {
        const body = await req.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json(
                { success: false, error: "Email is required" },
                { status: 400 }
            );
        }

        // Find user by email
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return NextResponse.json(
                { success: false, error: "User not found" },
                { status: 404 }
            );
        }

        if (user.emailVerified) {
            return NextResponse.json(
                { success: false, error: "Email is already verified" },
                { status: 400 }
            );
        }

        // Generate new verification token
        const { generateVerificationToken, generateVerificationExpiry, sendVerificationEmail } = await import("@/lib/notifications/emailVerification");
        
        const verificationToken = generateVerificationToken();
        const verificationExpiry = generateVerificationExpiry();

        // Update user with new verification token
        await User.findByIdAndUpdate(user._id, {
            emailVerificationToken: verificationToken,
            emailVerificationExpires: verificationExpiry
        });

        // Send verification email
        try {
            await sendVerificationEmail(user.email, user.name, verificationToken);
            console.log("Verification email resent successfully");
        } catch (emailError) {
            console.error("Failed to resend verification email:", emailError);
            return NextResponse.json(
                { success: false, error: "Failed to send verification email" },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Verification email sent successfully! Please check your email."
            },
            { status: 200 }
        );

    } catch (err) {
        console.error("Error resending verification email:", err);
        
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        return NextResponse.json(
            { success: false, error: errorMessage },
            { status: 500 }
        );
    }
} 