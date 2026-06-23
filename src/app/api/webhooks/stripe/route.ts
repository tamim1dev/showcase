import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import clientPromise from "@/lib/mongodb";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return new NextResponse("Webhook signature missing", { status: 400 });
  }

  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not configured.");
    return new NextResponse("Webhook secret configuration missing", { status: 500 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const userId = session.metadata?.userId;

    if (userId) {
      try {
        const client = await clientPromise;
        const db = client.db();

        // Better Auth schema collections are typically singular: 'user'
        const result = await db.collection("user").updateOne(
          { id: userId },
          { $set: { isPremium: true } }
        );

        if (result.matchedCount === 0) {
          console.warn(`User ${userId} not found during premium upgrade update.`);
          // If singular 'user' didn't match, double check if it might be 'users'
          await db.collection("users").updateOne(
            { id: userId },
            { $set: { isPremium: true } }
          );
        }

        console.log(`Successfully upgraded user ${userId} to Premium status`);
      } catch (dbError) {
        console.error("Database update error inside Stripe Webhook:", dbError);
        return new NextResponse("Database update failed", { status: 500 });
      }
    } else {
      console.warn("No userId found in checkout session metadata.");
    }
  }

  return NextResponse.json({ received: true });
}
