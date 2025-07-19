import { stripe } from "@/lib/stripe";
import { User } from "@/models/user";
import Stripe from "stripe";

// Function to get plan name from subscription
async function getPlanName(subscriptionId: string): Promise<string | null> {
    try {
        console.log(`[getPlanName] Retrieving plan name for subscription: ${subscriptionId}`);
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const priceId = subscription.items.data[0]?.price.id;
        
        if (!priceId) {
            console.log(`[getPlanName] No price ID found for subscription: ${subscriptionId}`);
            return null;
        }

        // Map price IDs to plan names using environment variables
        const planMap: { [key: string]: string } = {
            [process.env.NEXT_PUBLIC_FREE_PLAN_KEY || '']: 'free',
            [process.env.NEXT_PUBLIC_BASIC_PLAN_KEY || '']: 'basic',
            [process.env.NEXT_PUBLIC_PREMIUM_PLAN_KEY || '']: 'pro',
            [process.env.NEXT_PUBLIC_ENTREPRISE_PLAN_KEY || '']: 'enterprise'
        };

        const planName = planMap[priceId];
        if (!planName) {
            console.log(`[getPlanName] No matching plan found for price ID: ${priceId}`);
            return 'free'; // Default to free plan if no match found
        }

        console.log(`[getPlanName] Retrieved plan name: ${planName}`);
        return planName;
    } catch (error) {
        console.error("[getPlanName] Error retrieving plan name:", error);
        return 'free'; // Default to free plan on error
    }
}

export async function POST(req: Request){
    console.log("[Webhook] Received webhook request");
    const endpointSecret = process.env.NODE_ENV === "development" ? process.env.STRIPE_DEV_WEBHOOK_SECRET : process.env.STRIPE_WEBHOOK_SECRET;
    const signature = req.headers.get("stripe-signature");

    if (!signature || !endpointSecret) {
        console.error("[Webhook] Missing signature or endpoint secret");
        return new Response("Missing signature or endpoint secret", {status: 400});
    }

    // Get the raw body as text
    let rawBody;
    try {
        rawBody = await req.text();
        console.log("[Webhook] Successfully read request body");
    } catch (error) {
        console.error("[Webhook] Error reading request body:", error);
        return new Response("Error reading request body", { status: 400 });
    }

    if (!rawBody) {
        console.error("[Webhook] Empty request body");
        return new Response("Empty request body", { status: 400 });
    }

    let event;

    try {
        event = stripe.webhooks.constructEvent(rawBody, signature, endpointSecret);
        console.log(`[Webhook] Successfully constructed event of type: ${event.type}`);
    } catch (error) {
        console.error("[Webhook] Error constructing event:", error);
        return new Response(`Webhook Error: ${error instanceof Error ? error.message : 'Unknown Error'}`, { status: 400 });
    }

    switch(event.type){
        case "checkout.session.completed":
            console.log("[Webhook:checkout.session.completed] Processing completed checkout session");
            const session = event.data.object as Stripe.Checkout.Session;
            const userBusiness = session.customer;
            const subscription_name = session.subscription;

            if(!userBusiness || !subscription_name){
                console.error("[Webhook:checkout.session.completed] Missing user business or subscription", {
                    userBusiness,
                    subscription_name
                });
                return new Response("User business or subscription not found", {status: 404});
            }   

            // Get the plan name
            const planName = await getPlanName(subscription_name as string);

            console.log("[Webhook:checkout.session.completed] Subscription details:", {
                customerId: userBusiness,
                status: session.status,
                plan: planName,
                sessionId: session.id,
                paymentStatus: session.payment_status
            });

            try {
                const user = await User.findOne({
                    "subscription.customerId": userBusiness
                }).select("_id id");
                await User.findByIdAndUpdate(user?._id, {
                    subscription: {
                        customerId: userBusiness,
                        status: session.status,
                        plan: planName,
                    },
                    dashboardAccess: true,
                });


                console.log("[Webhook:checkout.session.completed] User updated successfully");
            } catch (error) {
                console.error("[Webhook:checkout.session.completed] Error updating user:", error);
            }

            break;
        case "invoice.payment_succeeded":
            console.log("[Webhook:invoice.payment_succeeded] Processing successful payment");
            const invoiceSucceeded = event.data.object as Stripe.Invoice;
            const customerIdSucceeded = invoiceSucceeded.customer;
            // @ts-expect-error Stripe webhook includes subscription property
            const subscriptionIdSucceeded = (invoiceSucceeded.subscription ?? "") as string;

            if (customerIdSucceeded && subscriptionIdSucceeded) {
                const planNameSucceeded = await getPlanName(subscriptionIdSucceeded);
                console.log("[Webhook:invoice.payment_succeeded] Payment details:", {
                    customerId: customerIdSucceeded,
                    subscriptionId: subscriptionIdSucceeded,
                    plan: planNameSucceeded,
                    amount: invoiceSucceeded.amount_paid,
                    invoiceId: invoiceSucceeded.id
                });

                try {
                    await User.findByIdAndUpdate(customerIdSucceeded, {
                        subscription: {
                            customerId: customerIdSucceeded,
                            status: "active",
                            plan: planNameSucceeded,
                        },
                        dashboardAccess: true,
                    });
                    console.log("[Webhook:invoice.payment_succeeded] Business subscription activated");
                } catch (error) {
                    console.error("[Webhook:invoice.payment_succeeded] Error updating business:", error);
                }
            }
            break;
        case "invoice.payment_failed":
            console.log("[Webhook:invoice.payment_failed] Processing failed payment");
            const invoiceFailed = event.data.object as Stripe.Invoice;
            const customerIdFailed = invoiceFailed.customer;
            // @ts-expect-error Stripe webhook includes subscription property
            const subscriptionIdFailed = (invoiceFailed.subscription ?? "") as string;

            if (customerIdFailed && subscriptionIdFailed) {
                const planNameFailed = await getPlanName(subscriptionIdFailed as string);
                
                console.log("[Webhook:invoice.payment_failed] Failed payment details:", {
                    customerId: customerIdFailed,
                    subscriptionId: subscriptionIdFailed,
                    plan: planNameFailed,
                    amount: invoiceFailed.amount_due,
                    invoiceId: invoiceFailed.id,
                    attemptCount: invoiceFailed.attempt_count
                });

                try {
                    await User.findByIdAndUpdate(customerIdFailed, {
                        subscription: {
                            customerId: customerIdFailed,
                            status: "past_due",
                            plan: planNameFailed,
                        },
                        dashboardAccess: false,
                    });
                    console.log("[Webhook:invoice.payment_failed] Business subscription marked as past due");
                } catch (error) {
                    console.error("[Webhook:invoice.payment_failed] Error updating business:", error);
                }
            }
            break;
        case "customer.subscription.deleted":
            console.log("[Webhook:customer.subscription.deleted] Processing subscription cancellation");
            const subscriptionDeleted = event.data.object as Stripe.Subscription;
            const customerIdDeleted = subscriptionDeleted.customer;
            
            if (customerIdDeleted) {
                console.log("[Webhook:customer.subscription.deleted] Cancellation details:", {
                    customerId: customerIdDeleted,
                    subscriptionId: subscriptionDeleted.id,
                    cancelAt: subscriptionDeleted.cancel_at,
                    canceledAt: subscriptionDeleted.canceled_at
                });

                try {
                    await User.findByIdAndUpdate(customerIdDeleted, {
                        subscription: {
                            customerId: customerIdDeleted,
                            status: "canceled",
                            plan: null,
                        },
                        dashboardAccess: false,
                    });
                    console.log("[Webhook:customer.subscription.deleted] Business subscription canceled");
                } catch (error) {
                    console.error("[Webhook:customer.subscription.deleted] Error updating business:", error);
                }
            }
            break;
        default:
            console.log(`[Webhook] Unhandled event type: ${event.type}`);
    }

    return new Response("Webhook processed successfully", { status: 200 });
}
