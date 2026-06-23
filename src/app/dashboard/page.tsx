import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { DashboardHeader } from "@/components/dashboard-header";
import { UpgradeButton } from "@/components/upgrade-button";
import {
  Sparkles,
  Zap,
  Lock,
  Unlock,
  Terminal,
  Cpu,
  Server,
  Activity,
  Layers,
  Database,
  ArrowUpRight,
} from "lucide-react";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Redirect to login if not authenticated
  if (!session || !session.user) {
    redirect("/login");
  }

  const user = session.user;
  const isPremium = user.isPremium ?? false;

  return (
    <div className="flex-1 bg-black text-white flex flex-col min-h-screen">
      <DashboardHeader user={user} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10">
        {isPremium ? (
          /* PREMIUM DASHBOARD */
          <div className="space-y-8">
            {/* Premium Welcome Banner */}
            <div className="p-8 rounded-3xl border border-violet-500/30 bg-gradient-to-tr from-zinc-950 via-zinc-900/50 to-violet-950/20 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-950/30 text-violet-300 text-xs font-semibold uppercase tracking-wider mb-4">
                    <Sparkles className="w-3.5 h-3.5 fill-violet-400/20" />
                    Pro Membership Active
                  </div>
                  <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                    Welcome back, {user.name}!
                  </h1>
                  <p className="text-zinc-400 mt-2 text-sm md:text-base max-w-2xl">
                    You have lifetime access to Showcase Pro. Your workspaces
                    are loaded with priority CPU/GPU compile power.
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="px-5 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-center">
                    <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">
                      Tier
                    </span>
                    <span className="text-violet-400 font-extrabold text-lg flex items-center gap-1">
                      PRO
                      <Zap className="w-4 h-4 fill-violet-400" />
                    </span>
                  </div>
                  <div className="px-5 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-center">
                    <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">
                      Workspaces
                    </span>
                    <span className="text-white font-extrabold text-lg">
                      Unlimited
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Grid Control Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Premium Sandbox Tool */}
              <div className="lg:col-span-2 p-8 rounded-3xl border border-zinc-800 bg-zinc-950/40 backdrop-blur-sm space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="font-bold text-lg">
                        Pro Sandbox Workspaces
                      </h2>
                      <p className="text-zinc-500 text-xs">
                        Deploy virtual containerized sandbox environments
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium">
                    <Unlock className="w-3.5 h-3.5" /> Ready
                  </span>
                </div>

                <div className="bg-black border border-zinc-900 rounded-2xl p-4 font-mono text-xs text-zinc-400 space-y-2 max-h-60 overflow-y-auto">
                  <p className="text-zinc-600">// Showcase CLI v1.0.0</p>
                  <p className="text-violet-400">$ Showcase workspaces list</p>
                  <p className="text-zinc-300">
                    ✓ production-api [active] (NodeJS 20.4, 2 Cores, 4GB RAM)
                  </p>
                  <p className="text-zinc-300">
                    ✓ database-replica [active] (MongoDB 7.0, 1 Core, 2GB RAM)
                  </p>
                  <p className="text-zinc-300">
                    ✓ frontend-sandbox [active] (NextJS 15, 2 Cores, 4GB RAM)
                  </p>
                  <p className="text-violet-400">$ Showcase system health</p>
                  <p className="text-zinc-300">
                    ✓ All subsystems operational. Resource usage: 14% CPU, 32%
                    RAM
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm transition-colors flex items-center gap-1.5 shadow-lg shadow-violet-500/25">
                    Launch New Sandbox
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <button className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white font-medium text-sm transition-colors">
                    Reboot Active Sandboxes
                  </button>
                </div>
              </div>

              {/* Resource Monitoring Widget */}
              <div className="p-8 rounded-3xl border border-zinc-800 bg-zinc-950/40 backdrop-blur-sm space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">Subsystem Stats</h2>
                    <p className="text-zinc-500 text-xs">
                      Live compiling resource consumption
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* CPU Usage */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-zinc-400 flex items-center gap-1">
                        <Cpu className="w-3.5 h-3.5" /> Priority CPU
                      </span>
                      <span className="text-white">12%</span>
                    </div>
                    <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
                        style={{ width: "12%" }}
                      />
                    </div>
                  </div>

                  {/* Node instances */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-zinc-400 flex items-center gap-1">
                        <Server className="w-3.5 h-3.5" /> API Edge Gateways
                      </span>
                      <span className="text-white">3 / 8 Nodes</span>
                    </div>
                    <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full"
                        style={{ width: "37.5%" }}
                      />
                    </div>
                  </div>

                  {/* Database Adapter */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-zinc-400 flex items-center gap-1">
                        <Database className="w-3.5 h-3.5" /> MongoDB Connections
                      </span>
                      <span className="text-white">Pool Active (10/50)</span>
                    </div>
                    <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: "20%" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-900 text-xs text-zinc-500 flex items-center justify-between">
                  <span>Server Node ID:</span>
                  <span className="font-mono text-zinc-400 bg-zinc-900 px-1.5 py-0.5 rounded">
                    ap-west-1a-prod
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* BASIC / FREE UPGRADE INTERFACE */
          <div className="max-w-4xl mx-auto space-y-10">
            {/* Free Welcome Banner */}
            <div className="p-8 rounded-3xl border border-zinc-800 bg-zinc-950/20 text-center">
              <h1 className="text-3xl font-extrabold tracking-tight">
                Welcome back, {user.name}!
              </h1>
              <p className="text-zinc-400 mt-2 text-sm max-w-xl mx-auto">
                You are currently on the{" "}
                <strong className="text-zinc-200">Basic Tier</strong>. Unlock
                your developer account to access high-performance sandboxes,
                unlimited resources, and priority GPU instances.
              </p>
            </div>

            {/* Locked Features Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {/* Upgrade pricing card */}
              <div className="p-8 rounded-3xl border-2 border-violet-500 bg-zinc-950/80 flex flex-col justify-between hover:shadow-2xl hover:shadow-violet-500/10 transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-violet-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-bl-2xl">
                  Lifetime Unlock
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    Showcase Pro
                    <Sparkles className="w-5 h-5 text-violet-400 fill-violet-400" />
                  </h2>
                  <p className="text-zinc-400 mt-2 text-sm">
                    Upgrade once. Own forever. No subscription fees.
                  </p>

                  <div className="my-6 flex items-baseline gap-1">
                    <span className="text-5xl font-extrabold text-white">
                      $19
                    </span>
                    <span className="text-zinc-500 text-sm">
                      one-time payment
                    </span>
                  </div>

                  <div className="space-y-4 border-t border-zinc-900 pt-6">
                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                      <Unlock className="w-4 h-4 text-violet-400" />
                      <span>Deploy Unlimited Cloud Workspaces</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                      <Unlock className="w-4 h-4 text-violet-400" />
                      <span>Dedicated GPU Compiling Instances</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                      <Unlock className="w-4 h-4 text-violet-400" />
                      <span>Custom API Gateway Sandbox Access</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                      <Unlock className="w-4 h-4 text-violet-400" />
                      <span>24/7 Priority Support SLA</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <UpgradeButton />
                </div>
              </div>

              {/* Locked Features Preview */}
              <div className="p-8 rounded-3xl border border-zinc-900 bg-zinc-950/20 flex flex-col justify-between opacity-75">
                <div>
                  <h3 className="text-xl font-bold text-zinc-300 flex items-center gap-2">
                    Locked Subsystems
                    <Lock className="w-4.5 h-4.5 text-zinc-600" />
                  </h3>
                  <p className="text-zinc-500 text-sm mt-1">
                    Upgrade to Showcase Pro to unlock these modules
                  </p>

                  <div className="mt-6 space-y-4">
                    {/* Sandbox item */}
                    <div className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/40 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Terminal className="w-5 h-5 text-zinc-600" />
                        <span className="text-zinc-400 text-sm font-medium">
                          Virtual Sandbox
                        </span>
                      </div>
                      <span className="text-zinc-600 text-xs flex items-center gap-1 bg-zinc-900 px-2 py-1 rounded-md border border-zinc-800">
                        <Lock className="w-3 h-3" /> Locked
                      </span>
                    </div>

                    {/* Stats item */}
                    <div className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/40 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Cpu className="w-5 h-5 text-zinc-600" />
                        <span className="text-zinc-400 text-sm font-medium">
                          Resource Controller
                        </span>
                      </div>
                      <span className="text-zinc-600 text-xs flex items-center gap-1 bg-zinc-900 px-2 py-1 rounded-md border border-zinc-800">
                        <Lock className="w-3 h-3" /> Locked
                      </span>
                    </div>

                    {/* Database item */}
                    <div className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/40 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Layers className="w-5 h-5 text-zinc-600" />
                        <span className="text-zinc-400 text-sm font-medium">
                          Metrics Dashboard
                        </span>
                      </div>
                      <span className="text-zinc-600 text-xs flex items-center gap-1 bg-zinc-900 px-2 py-1 rounded-md border border-zinc-800">
                        <Lock className="w-3 h-3" /> Locked
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center text-xs text-zinc-600 flex items-center justify-center gap-1.5 py-3.5 border border-zinc-900 bg-zinc-950/50 rounded-2xl">
                  <Sparkles className="w-4 h-4" />
                  Upgrade triggers instant webhook database unlock
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
