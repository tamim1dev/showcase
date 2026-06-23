import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft } from "lucide-react";

export default function CancelPage() {
  return (
    <div className="flex-1 bg-black text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="w-full max-w-md bg-zinc-950/80 border border-zinc-900 rounded-3xl p-8 backdrop-blur-md shadow-2xl text-center relative">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <AlertTriangle className="w-10 h-10" />
          </div>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight">Checkout Canceled</h1>
        <p className="text-zinc-400 mt-3 text-sm leading-relaxed">
          The Stripe checkout process was canceled. No charges have been made to your account.
        </p>

        <div className="my-6 p-4 rounded-2xl bg-zinc-900/40 border border-zinc-900 text-xs text-zinc-500">
          Feel free to restart the upgrade process whenever you are ready.
        </div>

        <div className="space-y-3">
          <Link href="/dashboard">
            <Button className="w-full bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 py-6 rounded-xl font-semibold flex items-center justify-center gap-2 cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
              Return to Dashboard
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="w-full text-zinc-600 hover:text-zinc-400 py-3 text-sm cursor-pointer">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
