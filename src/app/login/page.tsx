import { Suspense } from "react";
import LoginForm from "@/components/login-form";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 bg-black text-white flex items-center justify-center p-6">
          <Loader2 className="w-8 h-8 animate-spin text-zinc-600" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
