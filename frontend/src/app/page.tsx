"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import InteractiveSandbox, { AgentConfig } from "@/components/InteractiveSandbox";
import DashboardTeaser from "@/components/DashboardTeaser";
import FloatingAvatarWidget from "@/components/FloatingAvatarWidget";
import { Sparkles } from "lucide-react";

export default function Home() {
  const [config, setConfig] = useState<AgentConfig>({
    name: "Dr. Sage",
    role: "General Physician",
    tone: "Empathetic",
    gender: "Female",
    primaryColor: "#22c55e", // Sage Green / Emerald Green tone
  });

  return (
    <div className="font-sans min-h-screen text-foreground bg-background">
      {/* Navigation */}
      <Navbar />

      <main className="relative">
        {/* Hero Section */}
        <Hero />

        {/* Features Grid */}
        <Features />

        {/* Interactive Configuration Sandbox */}
        <InteractiveSandbox config={config} setConfig={setConfig} />

        {/* Admin Dashboard Console Preview */}
        <DashboardTeaser />

        {/* Floating Avatar Preview Widget */}
        <FloatingAvatarWidget config={config} />

        {/* Deployment Section (Integration summary) */}
        <section id="workflow" className="py-20 border-t border-border/40 bg-secondary/10 relative">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="mx-auto max-w-3xl text-center space-y-4 mb-16">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-secondary/80 border border-border px-3 py-1 text-2xs font-semibold text-secondary-foreground">
                <Sparkles className="h-3.5 w-3.5 text-primary" /> Workflow
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Ready to Deploy in 3 Simple Steps
              </h2>
              <p className="text-base text-muted-foreground">
                Simple setup. Configure your assistant and go live on any clinic website.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-3">
              <div className="relative rounded-2xl border border-border bg-card/60 p-6 space-y-4 shadow-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm font-bold">
                  1
                </div>
                <h3 className="text-base font-bold text-foreground">Customize Persona</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Name your assistant, select their tone of voice (Empathetic, Professional, or Direct), and match your clinic brand colors.
                </p>
              </div>

              <div className="relative rounded-2xl border border-border bg-card/60 p-6 space-y-4 shadow-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm font-bold">
                  2
                </div>
                <h3 className="text-base font-bold text-foreground">Sync Medical Info</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Upload FAQs, care leaflets, or guidelines. Sync your clinic calendar instantly to schedule patients.
                </p>
              </div>

              <div className="relative rounded-2xl border border-border bg-card/60 p-6 space-y-4 shadow-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm font-bold">
                  3
                </div>
                <h3 className="text-base font-bold text-foreground">Add to Website</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Copy the generated code snippet and paste it into your clinic&apos;s website. The friendly virtual assistant is ready to help.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background/50 py-12">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold tracking-tight text-foreground">
              Axiom<span className="text-primary font-light">.AI</span>
            </span>
            <span className="text-3xs text-muted-foreground">
              © {new Date().getFullYear()} Axiom Avatar Platform. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-6 text-3xs font-semibold text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">HIPAA Compliance</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
