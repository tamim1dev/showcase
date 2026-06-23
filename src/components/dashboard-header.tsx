"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut, Zap } from "lucide-react";
import Link from "next/link";

export function DashboardHeader({ user }: { user: any }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login");
            router.refresh();
          },
        },
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="border-b border-zinc-800 bg-zinc-950/40 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Zap className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Showcase
            </span>
          </Link>
          <span className="text-zinc-700 text-sm">/</span>
          <span className="text-zinc-400 text-sm font-medium">Dashboard</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-zinc-300">{user.name}</p>
            <p className="text-xs text-zinc-500">{user.email}</p>
          </div>
          <Button
            variant="ghost"
            className="text-zinc-400 hover:text-white hover:bg-zinc-900 px-3 py-2 flex items-center gap-2 rounded-lg cursor-pointer"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Log Out</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
