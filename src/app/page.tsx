import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { Check, Shield, Zap, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function LandingPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isLoggedIn = !!session;
  const isPremium = session?.user?.isPremium ?? false;

  return (
    <div className="flex-1 bg-black text-white relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-950/20 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-violet-950/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Navbar */}
      <header className="border-b border-zinc-800/80 backdrop-blur-md bg-black/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <Zap className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Showcase
            </span>
          </div>

          <nav className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <Link href="/dashboard">
                  <Button
                    variant="ghost"
                    className="text-zinc-400 hover:text-white hover:bg-zinc-900"
                  >
                    Dashboard
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button className="bg-white text-black hover:bg-zinc-200 rounded-full px-5">
                    {isPremium ? "Pro Member" : "Upgrade"}
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="text-zinc-400 hover:text-white hover:bg-zinc-900"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-full px-5 shadow-lg shadow-violet-500/25 border-0">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-20 text-center relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm text-zinc-300 text-sm mb-6 animate-pulse">
          <Sparkles className="w-4 h-4 text-violet-400" />
          <span>Introducing Showcase Pro v1.0</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight md:leading-[1.1] bg-gradient-to-b from-white via-zinc-100 to-zinc-500 bg-clip-text text-transparent">
          Supercharge your development pipeline in seconds.
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mt-6">
          Access high-performance development tools, unlimited cloud workspaces,
          and premium coding assistance. Pay once, own forever.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Link href={isLoggedIn ? "/dashboard" : "/signup"}>
            <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium text-lg px-8 py-6 rounded-full shadow-xl shadow-violet-500/20 border-0 flex items-center gap-2 group">
              Start Building Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-900/50 font-medium text-lg px-8 py-6 rounded-full"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                />
              </svg>
              Star on GitHub
            </Button>
          </a>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-zinc-900">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Everything you need to build faster
          </h2>
          <p className="text-zinc-400 mt-4 text-lg">
            Stop worrying about infrastructure and database configs. We handle
            it all.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-8 rounded-2xl border border-zinc-800 bg-zinc-950/40 backdrop-blur-sm hover:border-zinc-700 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-6 group-hover:bg-violet-600/20 transition-colors">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Secure Authentication
            </h3>
            <p className="text-zinc-400 leading-relaxed">
              Powered by Better Auth with credentials and Google OAuth. Safe,
              compliant, and lightning fast.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 rounded-2xl border border-zinc-800 bg-zinc-950/40 backdrop-blur-sm hover:border-zinc-700 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 group-hover:bg-indigo-600/20 transition-colors">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Stripe Checkout</h3>
            <p className="text-zinc-400 leading-relaxed">
              Accept credit card payments instantly with Stripe. Robust checkout
              session management and webhooks.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 rounded-2xl border border-zinc-800 bg-zinc-950/40 backdrop-blur-sm hover:border-zinc-700 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:bg-emerald-600/20 transition-colors">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">MongoDB Storage</h3>
            <p className="text-zinc-400 leading-relaxed">
              Fully integrated adapter schema storage. No complex database setup
              or configuration models needed.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-zinc-900 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="text-zinc-400 mt-4 text-lg">
            Choose the tier that fits your development needs. No recurring
            monthly fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Tier */}
          <div className="p-8 rounded-3xl border border-zinc-900 bg-zinc-950/20 flex flex-col justify-between hover:border-zinc-800 transition-all">
            <div>
              <h3 className="text-2xl font-bold text-zinc-300">Basic Tier</h3>
              <p className="text-zinc-500 mt-2">
                Get started with our standard developer tools.
              </p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-extrabold">$0</span>
                <span className="text-zinc-500 text-sm">forever</span>
              </div>

              <ul className="mt-8 space-y-4">
                <li className="flex items-center gap-3 text-zinc-300">
                  <Check className="w-5 h-5 text-zinc-600" />
                  <span>Standard authentication client</span>
                </li>
                <li className="flex items-center gap-3 text-zinc-300">
                  <Check className="w-5 h-5 text-zinc-600" />
                  <span>1 active cloud workspace</span>
                </li>
                <li className="flex items-center gap-3 text-zinc-300">
                  <Check className="w-5 h-5 text-zinc-600" />
                  <span>Community support forum</span>
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <Link
                href={isLoggedIn ? "/dashboard" : "/signup"}
                className="w-full"
              >
                <Button
                  variant="outline"
                  className="w-full border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-xl py-6"
                >
                  {isLoggedIn ? "Access Dashboard" : "Sign Up Free"}
                </Button>
              </Link>
            </div>
          </div>

          {/* Premium Tier */}
          <div className="p-8 rounded-3xl border-2 border-violet-500 bg-zinc-950/60 flex flex-col justify-between hover:shadow-2xl hover:shadow-violet-500/10 transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-violet-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-bl-2xl">
              Most Popular
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                Showcase Pro
                <Sparkles className="w-5 h-5 text-violet-400 fill-violet-400" />
              </h3>
              <p className="text-zinc-400 mt-2">
                Full access to advanced, high-performance features.
              </p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-extrabold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                  $19
                </span>
                <span className="text-zinc-500 text-sm">one-time payment</span>
              </div>

              <ul className="mt-8 space-y-4">
                <li className="flex items-center gap-3 text-zinc-200">
                  <Check className="w-5 h-5 text-violet-400 fill-violet-400/20" />
                  <span className="font-medium text-white">
                    All features in Basic Tier
                  </span>
                </li>
                <li className="flex items-center gap-3 text-zinc-200">
                  <Check className="w-5 h-5 text-violet-400 fill-violet-400/20" />
                  <span>Unlimited cloud workspaces</span>
                </li>
                <li className="flex items-center gap-3 text-zinc-200">
                  <Check className="w-5 h-5 text-violet-400 fill-violet-400/20" />
                  <span>24/7 dedicated support</span>
                </li>
                <li className="flex items-center gap-3 text-zinc-200">
                  <Check className="w-5 h-5 text-violet-400 fill-violet-400/20" />
                  <span className="text-violet-300 font-semibold">
                    Priority GPU compiling
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <Link href="/dashboard" className="w-full">
                <Button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl py-6 shadow-lg shadow-violet-500/20 border-0 font-medium">
                  {isLoggedIn
                    ? isPremium
                      ? "Already Pro — Go to Dashboard"
                      : "Upgrade to Pro"
                    : "Get Started Pro"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-8 bg-zinc-950/20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between text-zinc-500 text-sm">
          <p>© 2026 Showcase Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-zinc-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-zinc-300 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
