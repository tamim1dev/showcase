import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Invalid/Missing environment variable: "STRIPE_SECRET_KEY"');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // We cast to any for compatibility with any newer stripe SDK typing requirements
  apiVersion: "2025-02-24.acacia" as any,
});
