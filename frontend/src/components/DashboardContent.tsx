"use client";

import React from "react";
import {
  Activity,
  Shield,
  Bot,
  CalendarCheck,
  MessageSquare,
  TrendingUp,
  Users,
  Clock,
  ArrowRight,
  Plus,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";

interface DashboardContentProps {
  firstName: string;
  imageUrl: string;
  email: string;
}

export default function DashboardContent({
  firstName,
  email,
}: DashboardContentProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Nav */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 border border-primary/30 text-primary">
              <Activity className="h-4 w-4" />
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">
              Axiom<span className="text-primary font-light">.AI</span>
            </span>
            <span className="rounded-md bg-primary/10 border border-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
              Console
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-sm text-muted-foreground">
              {email}
            </span>
            <UserButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 sm:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back, {firstName} 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Here&apos;s an overview of your AI agents and their performance.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Active Agents",
              value: "0",
              icon: Bot,
              change: "Create your first",
              color: "text-emerald-400",
            },
            {
              label: "Conversations",
              value: "0",
              icon: MessageSquare,
              change: "This month",
              color: "text-blue-400",
            },
            {
              label: "Appointments",
              value: "0",
              icon: CalendarCheck,
              change: "Booked this week",
              color: "text-amber-400",
            },
            {
              label: "Patient Satisfaction",
              value: "—",
              icon: TrendingUp,
              change: "No data yet",
              color: "text-purple-400",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card/60 backdrop-blur-sm p-5 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">
                  {stat.label}
                </span>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {stat.change}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Create Agent Card */}
          <div className="lg:col-span-2 rounded-xl border border-dashed border-primary/30 bg-primary/5 p-8 flex flex-col items-center justify-center text-center min-h-[240px] transition-all hover:border-primary/50 hover:bg-primary/10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 border border-primary/30 text-primary mb-4">
              <Plus className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Create Your First AI Agent
            </h3>
            <p className="text-sm text-muted-foreground mb-5 max-w-md">
              Set up a personalized AI assistant for your hospital. Define its
              name, personality, and knowledge — then deploy it to your website
              with a single line of code.
            </p>
            <button className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-all duration-200 active:scale-95 gap-2">
              Create Agent <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            {[
              {
                icon: Shield,
                title: "Security Settings",
                desc: "Configure HIPAA compliance",
              },
              {
                icon: Users,
                title: "Team Management",
                desc: "Invite your care team",
              },
              {
                icon: Clock,
                title: "Scheduling",
                desc: "Connect Google Calendar",
              },
            ].map((item) => (
              <button
                key={item.title}
                className="w-full rounded-xl border border-border bg-card/60 backdrop-blur-sm p-4 text-left transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/80 border border-border text-muted-foreground group-hover:text-primary group-hover:border-primary/30 transition-colors">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">
                      {item.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item.desc}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
