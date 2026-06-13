"use client";

import React from "react";
import { ArrowRight, Play, ArrowUpRight, TrendingUp, Users, Calendar, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute top-10 left-10 -z-10 h-[300px] w-[300px] rounded-full bg-accent/5 blur-[80px]" />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:grid lg:grid-cols-12 lg:gap-12">
        {/* Left Column: Headline and CTAs */}
        <div className="flex flex-col justify-center lg:col-span-7 space-y-8">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary tracking-wide">
            <Sparkles className="h-3.5 w-3.5" />
            <span>The Patient Engagement Platform for Modern Clinics</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.1] font-sans">
              Human-Like{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Virtual Assistants
              </span>{" "}
              for Modern Clinics
            </h1>
            <p className="text-base text-muted-foreground sm:text-lg lg:text-xl max-w-xl leading-relaxed">
              Give your clinic a friendly, digital helper to guide patients, coordinate appointments, provide quick answers about your services, and offer visual care support.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#sandbox"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/95 transition-all duration-200 active:scale-95 hover:shadow-primary/35"
            >
              Configure Your Agent
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#features"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-secondary/40 backdrop-blur-sm px-6 text-sm font-semibold text-secondary-foreground hover:bg-secondary/70 transition-all duration-200 active:scale-95"
            >
              <Play className="h-4 w-4 fill-current text-secondary-foreground" />
              See Key Features
            </a>
          </div>

          {/* Small Trust Badges */}
          <div className="pt-6 border-t border-border/40 max-w-lg">
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-3">
              Powering Patient Experiences With
            </p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-foreground/80 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-primary" /> Natural Voice
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-accent" /> Smart Medical Help
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-primary" /> Clinic-Approved Answers
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Mock Dashboard Preview */}
        <div className="mt-16 lg:mt-0 lg:col-span-5 flex items-center justify-center">
          <div className="relative w-full max-w-md rounded-[2rem] border border-border bg-card p-6 shadow-2xl backdrop-blur-md">
            {/* Top Bar Decoration */}
            <div className="absolute top-4 left-4 flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-500/60" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
              <span className="h-3 w-3 rounded-full bg-green-500/60" />
            </div>

            <div className="mt-4 space-y-6">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-border/60">
                <div>
                  <h3 className="text-sm font-bold text-foreground">Clinic Care Console</h3>
                  <p className="text-2xs text-muted-foreground">St. Jude Medical Center</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 border border-primary/20 px-2 py-0.5 text-3xs font-semibold text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> Assistant Active
                </span>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border bg-background/50 p-3.5 space-y-1">
                  <div className="flex items-center justify-between">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="flex items-center gap-0.5 text-3xs text-primary font-bold">
                      <TrendingUp className="h-2.5 w-2.5" /> +12%
                    </span>
                  </div>
                  <p className="text-2xs text-muted-foreground font-medium">Conversations</p>
                  <p className="text-lg font-bold text-foreground">1,248</p>
                </div>

                <div className="rounded-2xl border border-border bg-background/50 p-3.5 space-y-1">
                  <div className="flex items-center justify-between">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="inline-flex rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-3xs text-emerald-400 font-bold">
                      Connected
                    </span>
                  </div>
                  <p className="text-2xs text-muted-foreground font-medium">Booked Appointments</p>
                  <p className="text-lg font-bold text-foreground">412</p>
                </div>
              </div>

              {/* Mock RAG Upload File List */}
              <div className="rounded-2xl border border-border bg-background/50 p-4 space-y-3">
                <div className="flex items-center justify-between text-2xs">
                  <span className="font-semibold text-foreground">Active Patient Leaflets</span>
                  <span className="text-primary font-semibold hover:underline cursor-pointer flex items-center gap-0.5">
                    Manage docs <ArrowUpRight className="h-2.5 w-2.5" />
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-lg bg-card border border-border/80 px-2.5 py-1.5">
                    <span className="text-2xs font-medium text-foreground truncate max-w-[150px]">
                      FAQ_Internal_SOP.pdf
                    </span>
                    <span className="text-3xs text-muted-foreground font-bold">128 KB (Ready)</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-card border border-border/80 px-2.5 py-1.5">
                    <span className="text-2xs font-medium text-foreground truncate max-w-[150px]">
                      Pediatric_Schedule_Guidelines.docx
                    </span>
                    <span className="text-3xs text-muted-foreground font-bold">45 KB (Ready)</span>
                  </div>
                </div>
              </div>

              {/* Integration Code Teaser */}
              <div className="rounded-2xl border border-border bg-background/50 p-4 space-y-2.5">
                <p className="text-2xs font-semibold text-foreground">Add to Clinic Website</p>
                <div className="rounded-lg bg-black/40 border border-border px-3 py-2 font-mono text-[9px] text-zinc-400 select-all overflow-x-auto whitespace-nowrap">
                  <code>
                    &lt;script src=&quot;https://cdn.axiom.ai/widget.js&quot; data-agent-id=&quot;ax_902f1a&quot; defer&gt;&lt;/script&gt;
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
