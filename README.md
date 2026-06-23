# Next.js + MongoDB + Better Auth + Stripe Integration Starter

A premium, production-ready starter project featuring secure authentication (Email/Password & Google OAuth) using **Better Auth**, and lifetime membership one-time checkout using **Stripe**.

---

## 🚀 Getting Started & Local Setup

### 1. Prerequisites

Ensure you have the following installed on your local development machine:

- **Node.js** (v18.18.0 or newer)
- **MongoDB** (running locally on port `27017` or a MongoDB Atlas cloud URI)
- **Stripe CLI** (for testing payment webhooks locally)

### 2. Install Project Dependencies

Run the package installation command in the project root:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file by copying the template:

```bash
cp .env.example .env.local
```

Open `.env.local` and configure your credentials:

```env
# Database connection
MONGODB_URI="mongodb://localhost:27017/nextjs-auth-stripe"

# Better Auth Secret (generate one using: npx better-auth secret)
BETTER_AUTH_SECRET="your-better-auth-secret-here-at-least-32-characters"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Google OAuth Credentials
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Stripe Developer Settings (https://dashboard.stripe.com/test/apikeys)
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_PRICE_ID="price_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

---

## 🛠️ Step-by-Step Testing Guide

### Step A: Database Setup

Make sure your MongoDB server is up and listening. For local MongoDB, start the service:

```bash
# On macOS
brew services start mongodb-community
# On Linux
sudo systemctl start mongod
```

### Step B: Google OAuth Setup

1. Go to the [Google Cloud Console Credentials Page](https://console.cloud.google.com/apis/credentials).
2. Click **Create Credentials** > **OAuth client ID** (select _Web application_).
3. Under **Authorized redirect URIs**, add:
   - `http://localhost:3000/api/auth/callback/google`
4. Copy the **Client ID** and **Client Secret** into your `.env.local`.

### Step C: Stripe Price Creation

1. Toggle **Test Mode** in your Stripe Dashboard.
2. Go to **Product Catalog** > **Add Product**.
3. Create a one-time product named **"Antigravity Pro"** priced at `$19.00`.
4. Copy the **API ID** under the pricing section (starts with `price_...`) and save it as `STRIPE_PRICE_ID` in `.env.local`.

### Step D: Setup Webhook Forwarding (CRITICAL)

Since Stripe needs to tell your database when a payment is successful, you must forward webhook events to your local machine:

1. Log in to Stripe via the CLI:
   ```bash
   stripe login
   ```
2. Start the webhook forwarding listener:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
3. Stripe CLI will print a **Webhook Signing Secret** (looks like `whsec_...`). Copy this secret and save it as `STRIPE_WEBHOOK_SECRET` in your `.env.local` file.
4. Keep this terminal tab running!

### Step E: Run Development Server

Boot your Next.js application:

```bash
npm run dev
```

Open `http://localhost:3000` in your web browser.

---

## 🧪 Testing the User Flow

1. **Access Landpage:** Visit `http://localhost:3000`. You will see our premium, dark-themed SaaS UI.
2. **Register/Login:** Click **Get Started** or **Sign In** and create an account via Credentials or Google OAuth.
3. **Inspect Basic Dashboard:** You will be redirected to `/dashboard`. Since your account is new, it is on the _Basic Tier_. Subsystem stats, terminal containers, and metric widgets will display **"Locked"** states.
4. **Trigger Checkout:** Click the **Upgrade to Pro Now ($19)** button. You will be redirected to the secure Stripe Checkout hosted screen.
5. **Make Test Payment:** Use Stripe's default test credit card details:
   - **Card Number:** `4242 4242 4242 4242`
   - **Expiry Date:** Any future date (e.g. `12/28`)
   - **CVC:** `123`
   - **Name:** Any test name
6. **Redirect to Success:** Click **Pay**. Once successful, Stripe redirects you back to your application's `/success` route.
7. **Observe Webhook Output:** In your Stripe CLI terminal, you should see a successful log output for the event:
   ```text
   --> checkout.session.completed [evt_...]
   <-- [200] POST http://localhost:3000/api/webhooks/stripe [evt_...]
   ```
8. **Enjoy Premium Access:** Return to `/dashboard` (or refresh the page). The locks are now unlocked! You can see the live developer sandbox container cli logs, CPU utilization sliders, and active database connection pool stats.

---

## 📦 Production Builds

To test compile sanity before deploying, run:

```bash
npm run build
```

This tests typescript checks and runs optimized bundling.
