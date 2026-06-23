import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Sparkles, ArrowRight } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="flex-1 bg-black text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="w-full max-w-md bg-zinc-950/80 border border-zinc-900 rounded-3xl p-8 backdrop-blur-md shadow-2xl text-center relative">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-10 h-10 animate-bounce" />
          </div>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight">
          Payment Successful!
        </h1>
        <p className="text-zinc-400 mt-3 text-sm leading-relaxed">
          Thank you for purchasing <strong>Showcase Pro</strong>. Your
          transaction was processed successfully.
        </p>

        {/* Info box */}
        <div className="my-6 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-400 flex flex-col gap-2 items-center text-center">
          <Sparkles className="w-5 h-5 text-violet-400" />
          <span>
            We are configuring your premium sandbox workspaces. This may take a
            few seconds. If your dashboard doesn&apos;t show PRO features
            immediately, please refresh the page.
          </span>
        </div>

        <div className="space-y-3">
          <Link href="/dashboard">
            <Button className="w-full bg-white hover:bg-zinc-200 text-black py-6 rounded-xl font-semibold flex items-center justify-center gap-2 border-0 shadow-lg shadow-white/5 cursor-pointer">
              Go to Dashboard
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/">
            <Button
              variant="ghost"
              className="w-full text-zinc-500 hover:text-zinc-300 py-3 text-sm cursor-pointer"
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
