import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

// Initialize client and db synchronously to avoid connecting during Next.js build compile phase.
// The MongoDB driver connects lazily when the first operation is performed.
const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "mock-google-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "mock-google-client-secret",
    },
  },
  user: {
    additionalFields: {
      isPremium: {
        type: "boolean",
        required: false,
        defaultValue: false,
        input: false, // Internal field updated via Stripe webhooks
      },
    },
  },
});

export type AuthType = typeof auth;
