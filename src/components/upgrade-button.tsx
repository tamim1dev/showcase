"use client";

   import { useState } from "react";
   import { createCheckoutSession } from "@/app/actions/stripe";
   import { Button } from "@/components/ui/button";
   import { Loader2, Sparkles } from "lucide-react";

   export function UpgradeButton() {
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState("");

     const handleUpgrade = async () => {
       setLoading(true);
       setError("");
       try {
         const { url } = await createCheckoutSession();
         window.location.href = url;
       } catch (err: any) {
         setError(err.message || "Failed to initiate payment. Please try again.");
         setLoading(false);
       }
     };

     return (
       <div className="space-y-3 w-full">
         <Button
           onClick={handleUpgrade}
           disabled={loading}
           className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl py-6 shadow-lg shadow-violet-500/25 border-0 font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
         >
           {loading ? (
             <Loader2 className="w-5 h-5 animate-spin" />
           ) : (
             <>
               <Sparkles className="w-5 h-5 fill-white/20 animate-pulse" />
               Upgrade to Pro Now ($19)
             </>
           )}
         </Button>
         {error && <p className="text-red-400 text-xs text-center font-medium">{error}</p>}
       </div>
     );
   }
