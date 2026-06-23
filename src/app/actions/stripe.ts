"use server";

import { auth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

export async function createCheckoutSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    throw new Error("You must be logged in to upgrade.");
  }

  // Check if user is already premium
  if (session.user.isPremium) {
    throw new Error("You are already a premium user.");
  }

  const userId = session.user.id;
  const userEmail = session.user.email;

  const headersList = await headers();
  const origin = headersList.get("origin") || "http://localhost:3000";

  const priceId = process.env.STRIPE_PRICE_ID;
  if (!priceId) {
    throw new Error("STRIPE_PRICE_ID environment variable is missing.");
  }

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
      customer_email: userEmail,
      metadata: {
        userId: userId,
      },
    });

    if (!checkoutSession.url) {
      throw new Error("Failed to generate checkout session URL");
    }

    return { url: checkoutSession.url };
  } catch (error: any) {
    console.error("Error creating checkout session:", error);
    throw new Error(error.message || "Failed to initiate payment");
  }
}
