import { auth } from "@/auth/auth";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import { Types } from "mongoose";
import { User } from "@/models/user";
import Business from "@/models/business";

export async function POST(req: Request){
    try {
        await connectDB();

        const {priceId, lang} = await req.json();

        if(!priceId){
            console.error("No priceId provided");
            return NextResponse.json({error: "PriceId not found"}, {status: 404});
        }

        console.log("The priceId is", priceId);

        const userSession = await auth();
        console.log("User session:", userSession);

        if(!userSession?.user?.id){
            console.error("No user id in session:", userSession?.user);
            return NextResponse.json({error: "User ID not found"}, {status: 404});
        }

        const user = await Business.findOne({ownerId: new Types.ObjectId(userSession?.user?.id.toString())}).select("subscription.customerId");

        if(!user){
            console.error("Business not found for ID:", userSession.user.id);
            return NextResponse.json({error: "Business not found"}, {status: 404});
        }

        if(!user.subscription?.customerId){
            console.error("No customerId found in business subscription:", user.subscription);
            return NextResponse.json({error: "Business customerId not found"}, {status: 404});
        }

        console.log("Creating Stripe session with customerId:", user.subscription.customerId);

        // Get the base URL with the correct protocol
        const baseUrl = process.env.NODE_ENV === "development" 
            ? "http://localhost:3000"
            : process.env.NEXT_PUBLIC_APP_URL;

        const session = await stripe.checkout.sessions.create({
            customer: user.subscription.customerId,
            payment_method_types: ["card"],
            line_items: [{
                price: priceId,
                quantity: 1
            }],
            mode: "subscription",
            success_url: `${baseUrl}/${lang}/success-checkout`,
            cancel_url: `${baseUrl}/${lang}/cancel-checkout`,
        });

        if(!session.url){
            console.error("Stripe session created but no URL:", session);
            return NextResponse.json({error: "Failed to create checkout session - no URL"}, {status: 500});
        }

        console.log("Checkout session created successfully:", session.id);
        return NextResponse.json({ url: session.url }, {status: 200});

    } catch (error) {
        console.error("Error in checkout-stipe route:", error);
        return NextResponse.json({
            error: "Internal server error", 
            details: error instanceof Error ? error.message : "Unknown error"
        }, {status: 500});
    }
}