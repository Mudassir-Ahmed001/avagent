"use client";

import React from "react";
import {
  Mic,
  Video,
  FileText,
  CalendarDays,
  UserCheck,
  Bot,
  HeartPulse,
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
  highlights: string[];
}

function FeatureCard({ icon, title, description, badge, highlights }: FeatureCardProps) {
  return (
    <div className="group relative rounded-2xl border border-border/80 bg-card/65 p-6 md:p-8 hover:border-primary/50 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1">
      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary border border-border/75 text-primary group-hover:scale-110 group-hover:bg-primary/15 group-hover:border-primary/30 transition-all duration-300">
          {icon}
        </div>
        {badge && (
          <span className="rounded-full bg-accent/10 border border-accent/20 px-2.5 py-0.5 text-3xs font-bold text-accent tracking-wide uppercase">
            {badge}
          </span>
        )}
      </div>

      <h3 className="mt-6 text-lg font-bold text-foreground tracking-tight group-hover:text-primary transition-colors duration-200">
        {title}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>

      {/* Highlights */}
      <ul className="mt-6 space-y-2.5 border-t border-border/40 pt-4">
        {highlights.map((highlight, index) => (
          <li key={index} className="flex items-center gap-2 text-2xs text-foreground/80 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
            {highlight}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Features() {
  const items: FeatureCardProps[] = [
    {
      icon: <Bot className="h-5.5 w-5.5" />,
      title: "Custom Clinic Avatar",
      description:
        "Choose your virtual helper’s name, appearance, and friendly personality. Ensure they represent your practice with the perfect tone of voice.",
      badge: "Fully Tailored",
      highlights: ["Matches your clinic colors", "Personalized names & roles", "Choose friendly presets"],
    },
    {
      icon: <Mic className="h-5.5 w-5.5" />,
      title: "Speak Naturally",
      description:
        "Allow patients to talk directly to the assistant. The avatar speaks back clearly with helpful care instructions.",
      badge: "Instant Speech",
      highlights: ["Zero-delay voice responses", "Warm vocal tones", "Understands natural speech"],
    },
    {
      icon: <Video className="h-5.5 w-5.5" />,
      title: "Visual Care Helper",
      description:
        "Allows patients to show issues like skin redness, acne, or irritation on camera for quick care guidance.",
      badge: "Guided Triage",
      highlights: ["Recognizes common skin conditions", "Safe medical disclaimers", "Suggested home care steps"],
    },
    {
      icon: <FileText className="h-5.5 w-5.5" />,
      title: "Clinic Leaflet Reader",
      description:
        "Upload your clinic's brochure, FAQs, and treatment instructions. The assistant reads them to answer patient questions instantly.",
      badge: "Accurate Answers",
      highlights: ["Reads PDFs and pamphlets", "Finds exact facts in seconds", "Strict clinic guidelines lookup"],
    },
    {
      icon: <CalendarDays className="h-5.5 w-5.5" />,
      title: "Automatic Calendar Booking",
      description:
        "Looks at doctor availability, secures a calendar slot, and emails confirmation details directly to the patient.",
      badge: "Auto-Scheduler",
      highlights: ["Prevents double-bookings", "Automatic email confirmations", "Simple doctor schedule overview"],
    },
    {
      icon: <UserCheck className="h-5.5 w-5.5" />,
      title: "Instant Staff Connection",
      description:
        "Directly forward serious patient concerns to your actual clinic team. Escalate to phone calls or staff chat overrides.",
      highlights: ["Notifies your front desk", "Passes along the conversation log", "Direct telephone forwarding"],
    },
  ];

  return (
    <section id="features" className="py-20 border-t border-border/40 bg-background/30">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-secondary/80 border border-border px-3 py-1 text-2xs font-semibold text-secondary-foreground">
            <HeartPulse className="h-3.5 w-3.5 text-primary" /> Key Features
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything your medical practice needs to engage patients 24/7
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            From appointment booking to instant clinical Q&A, discover the modular capabilities built directly into Axiom&apos;s AI avatar widget.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((feat, index) => (
            <FeatureCard key={index} {...feat} />
          ))}
        </div>
      </div>
    </section>
  );
}
