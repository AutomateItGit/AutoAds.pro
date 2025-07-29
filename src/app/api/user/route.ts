import connectDB from "@/lib/mongo";
import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {
  generateVerificationToken,
  generateVerificationExpiry,
  sendVerificationEmail,
} from "@/lib/notifications/emailVerification";
import Business from "@/models/business";
import { stripe } from "@/lib/stripe";
import { Types } from "mongoose";
import mongoose from "mongoose";

/**
 * GET endpoint
 * @description Fetches data from the endpoint
 * @returns Response with the fetched data
 */
export async function GET(req: NextRequest) {
  try {
    // Your GET logic here
    await connectDB();

    const userId = req.nextUrl.searchParams.get("id");

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User ID is required" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (err) {
    console.error("Error in GET request:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Input validation helper
function validateInput(data: UserData): string | null {
  if (!data.name?.trim()) return "Name is required";
  if (!data.email?.trim()) return "Email is required";
  if (!data.phoneNumber?.trim()) return "Phone number is required";
  if (!data.password || data.password.length < 6)
    return "Password must be at least 6 characters";

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) return "Invalid email format";

  return null;
}

interface UserData {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}

/**
 * POST endpoint
 * @description Creates a new resource
 * @param req Request object containing the data to create
 * @returns Response with the created data
 */
export async function POST(req: NextRequest) {
  try {
    console.log("Starting user creation process");

    // Test MongoDB connection
    const db = await connectDB();
    console.log("MongoDB connection state:", mongoose.connection.readyState);
    console.log("Connected to database:", db.connection.db.databaseName);

    const body = await req.json();
    console.log("Received user data:", {
      ...body,
      password: "[REDACTED]",
      email: body.email,
      name: body.name,
      phoneNumber: body.phoneNumber,
    });

    const userData: UserData = body;

    const validationError = validateInput(userData);
    if (validationError) {
      console.log("Validation error:", validationError);
      return NextResponse.json(
        { success: false, error: validationError },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      console.log("User already exists with email:", userData.email);
      return NextResponse.json(
        { success: false, error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password before storing
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    console.log("Password hashed successfully");

    // Generate verification token
    const verificationToken = generateVerificationToken();
    const verificationExpiry = generateVerificationExpiry();
    console.log("Generated verification token");

    const userToCreate = {
      name: userData.name,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      password: hashedPassword,
      emailVerificationToken: verificationToken,
      emailVerificationExpires: verificationExpiry,
      dashboardAccess: false,
    };

    console.log("Attempting to create user with data:", {
      ...userToCreate,
      password: "[REDACTED]",
      emailVerificationToken: "[REDACTED]",
    });

    const new_user = await User.create(userToCreate);
    console.log("User created successfully with ID:", new_user._id);
    console.log("User document:", {
      ...new_user.toObject(),
      password: "[REDACTED]",
      emailVerificationToken: "[REDACTED]",
    });

    try {
      await sendVerificationEmail(
        userData.email,
        userData.name,
        verificationToken
      );
      console.log("Verification email sent successfully");
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError);
    }

    console.log("Creating Stripe customer");
    const customerId = await stripe.customers.create({
      email: userData.email,
      name: userData.name,
    });
    console.log("Stripe customer created:", customerId.id);

    console.log("Creating business record");
    const business = await Business.create({
      name: userData.name,
      ownerId: new_user._id,
      subscription: {
        status: "unsubscribed",
        customerId: customerId.id,
        currentPeriodEnd: new Date(),
      },
    });
    console.log("Business record created:", business._id);

    const updatedUser = await User.findByIdAndUpdate(
      new_user._id,
      { businessId: new Types.ObjectId(business._id.toString()) },
      { new: true }
    ).select("-password");
    console.log("User updated with business ID:", updatedUser._id);
    console.log("Final user document:", {
      ...updatedUser.toObject(),
      password: "[REDACTED]",
      emailVerificationToken: "[REDACTED]",
    });

    const userResponse = updatedUser.toObject();
    console.log("Sending successful response");

    return NextResponse.json(
      { success: true, data: userResponse },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error in POST request:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * PUT endpoint
 * @description Updates an existing resource
 * @param req Request object containing the data to update
 * @returns Response with the updated data
 */
export async function PUT(req: NextRequest) {
  try {
    // Parse the request body
    await connectDB();

    const userId = req.nextUrl.searchParams.get("id");

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User ID is required" },
        { status: 400 }
      );
    }

    const body = await req.json();

    // Your PUT logic here
    const user = await User.findByIdAndUpdate(userId, {
      ...body,
      updatedAt: new Date(),
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (err) {
    console.error("Error in PUT request:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE endpoint
 * @description Deletes a resource
 * @param req Request object containing the ID to delete
 * @returns Response confirming the deletion
 */
export async function DELETE(req: NextRequest) {
  try {
    // Parse the request body
    await connectDB();

    const userId = req.nextUrl.searchParams.get("id");

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User ID is required" },
        { status: 400 }
      );
    }

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (err) {
    console.error("Error in DELETE request:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
