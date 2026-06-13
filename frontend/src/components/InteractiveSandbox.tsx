"use client";

import React, { useState } from "react";
import { Sparkles, Bot, Clipboard, Check } from "lucide-react";

export interface AgentConfig {
  name: string;
  role: string;
  tone: "Empathetic" | "Professional" | "Direct";
  gender: "Male" | "Female";
  primaryColor: string;
}

interface SandboxProps {
  config: AgentConfig;
  setConfig: React.Dispatch<React.SetStateAction<AgentConfig>>;
}

export default function InteractiveSandbox({ config, setConfig }: SandboxProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"settings" | "code">("settings");

  const copyScript = () => {
    navigator.clipboard.writeText(
      `<script src="https://cdn.axiom.ai/widget.js" data-agent-id="ax_${config.name.toLowerCase().replace(/\s+/g, "_")}" defer></script>`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tones: AgentConfig["tone"][] = ["Empathetic", "Professional", "Direct"];
  const roles = [
    { title: "General Physician", desc: "For routine symptoms & check-up coordination" },
    { title: "Pediatric Assistant", desc: "Warm care coordination for kids and parents" },
    { title: "Dermatology Specialist", desc: "Skin, acne, and redness guidance coordinator" },
    { title: "Dental Assistant", desc: "Booking, pre-op steps, and oral hygiene FAQs" },
  ];

  return (
    <section id="sandbox" className="py-20 border-t border-border/40 relative">
      <div className="absolute top-1/2 left-1/3 -z-10 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[100px]" />
      
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-secondary/80 border border-border px-3 py-1 text-2xs font-semibold text-secondary-foreground">
            <Bot className="h-3.5 w-3.5 text-primary" /> Live Configurator
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Design Your Avatar Assistant
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Customize branding, personality traits, and deployment configurations. Experience the changes live in the floating widget preview!
          </p>
        </div>

        {/* Sandbox Content */}
        <div className="grid gap-10 lg:grid-cols-12 bg-card/40 border border-border/80 rounded-[2.5rem] p-6 sm:p-10 backdrop-blur-sm shadow-xl">
          {/* Controls - Left side (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Tabs */}
            <div className="flex border-b border-border/60">
              <button
                onClick={() => setActiveTab("settings")}
                className={`pb-4 text-sm font-semibold tracking-wide border-b-2 px-4 transition-all duration-200 ${
                  activeTab === "settings"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                1. Persona Settings
              </button>
              <button
                onClick={() => setActiveTab("code")}
                className={`pb-4 text-sm font-semibold tracking-wide border-b-2 px-4 transition-all duration-200 ${
                  activeTab === "code"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                2. Add to Website
              </button>
            </div>

            {activeTab === "settings" ? (
              <div className="space-y-6">
                {/* Agent Name */}
                <div className="space-y-2.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Agent Name
                  </label>
                  <input
                    type="text"
                    value={config.name}
                    onChange={(e) => setConfig((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full h-12 px-4 rounded-xl border border-border bg-background/50 text-foreground text-sm font-medium focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/80 transition-all duration-200"
                    placeholder="e.g. Dr. Sage"
                  />
                </div>

                {/* Role / Expertise Select */}
                <div className="space-y-2.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Agent Role & Specialty
                  </label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {roles.map((role) => (
                      <button
                        key={role.title}
                        type="button"
                        onClick={() => setConfig((prev) => ({ ...prev, role: role.title }))}
                        className={`flex flex-col text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                          config.role === role.title
                            ? "border-primary bg-primary/10 shadow-sm"
                            : "border-border/80 bg-background/30 hover:border-border/60 hover:bg-background/50"
                        }`}
                      >
                        <span className="text-xs font-bold text-foreground">{role.title}</span>
                        <span className="text-3xs text-muted-foreground mt-1 leading-relaxed">{role.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tone of Voice */}
                <div className="space-y-2.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Tone of Voice
                  </label>
                  <div className="flex gap-3">
                    {tones.map((tone) => (
                      <button
                        key={tone}
                        type="button"
                        onClick={() => setConfig((prev) => ({ ...prev, tone }))}
                        className={`flex-1 h-11 rounded-xl border text-xs font-bold transition-all duration-200 cursor-pointer ${
                          config.tone === tone
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border/80 bg-background/30 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {tone}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Theme & Styling */}
                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Color Picker */}
                  <div className="space-y-2.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Theme Accent Color
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={config.primaryColor}
                        onChange={(e) => setConfig((prev) => ({ ...prev, primaryColor: e.target.value }))}
                        className="h-10 w-12 rounded border border-border bg-background/30 cursor-pointer"
                      />
                      <span className="text-2xs font-mono font-medium text-foreground">
                        {config.primaryColor.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Gender Selector */}
                  <div className="space-y-2.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Voice Avatar
                    </label>
                    <div className="flex gap-3">
                      {(["Female", "Male"] as const).map((gender) => (
                        <button
                          key={gender}
                          type="button"
                          onClick={() => setConfig((prev) => ({ ...prev, gender }))}
                          className={`flex-1 h-10 rounded-xl border text-xs font-bold transition-all duration-200 cursor-pointer ${
                            config.gender === gender
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border/80 bg-background/30 text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {gender === "Female" ? "Aria (Female)" : "Rohan (Male)"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Once your assistant is configured, simply copy the generated website snippet below and paste it into your clinic builder templates.
                </p>

                {/* Code Block */}
                <div className="relative rounded-2xl border border-border bg-background/50 p-5 font-mono text-2xs text-zinc-300 leading-normal overflow-x-auto whitespace-pre">
                  <code>
                    {`<!-- Axiom AI Avatar Widget -->
<script
  src="https://cdn.axiom.ai/widget.js"
  data-agent-id="ax_${config.name.toLowerCase().replace(/\s+/g, "_")}"
  data-primary-color="${config.primaryColor}"
  data-tone="${config.tone.toLowerCase()}"
  defer
></script>`}
                  </code>

                  <button
                    onClick={copyScript}
                    className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground transition-all duration-200 cursor-pointer"
                  >
                    {copied ? <Check className="h-4 w-4 text-primary" /> : <Clipboard className="h-4 w-4" />}
                  </button>
                </div>

                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 flex gap-3">
                  <Sparkles className="h-5 w-5 text-primary shrink-0" />
                  <p className="text-2xs leading-relaxed text-foreground/90 font-medium">
                    <strong>Tip:</strong> The assistant automatically synchronizes with your uploaded care leaflets and schedule settings.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Static Sandbox Display - Right side (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-border/60 pt-8 lg:pt-0 lg:pl-10">
            <div className="rounded-2xl border border-border bg-background/40 p-5 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Assistant Specifications
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between text-2xs py-2 border-b border-border/40">
                  <span className="text-muted-foreground">Vocal Style</span>
                  <span className="font-semibold text-foreground">
                    {config.gender === "Female" ? "Aria (Friendly)" : "Rohan (Warm)"}
                  </span>
                </div>
                <div className="flex justify-between text-2xs py-2 border-b border-border/40">
                  <span className="text-muted-foreground">Response Speed</span>
                  <span className="font-semibold text-primary">Instant</span>
                </div>
                <div className="flex justify-between text-2xs py-2 border-b border-border/40">
                  <span className="text-muted-foreground">Information Source</span>
                  <span className="font-semibold text-foreground">Clinic Leaflets</span>
                </div>
                <div className="flex justify-between text-2xs py-2 border-b border-border/40">
                  <span className="text-muted-foreground">Appointment System</span>
                  <span className="font-semibold text-foreground">Connected</span>
                </div>
                <div className="flex justify-between text-2xs py-2 border-b border-border/40">
                  <span className="text-muted-foreground">Staff Override Alerts</span>
                  <span className="font-semibold text-foreground">Active</span>
                </div>
              </div>

              <div className="rounded-xl bg-secondary p-3 flex items-center gap-3">
                <div
                  className="h-3 w-3 rounded-full shrink-0"
                  style={{ backgroundColor: config.primaryColor }}
                />
                <span className="text-2xs font-semibold text-foreground/90">
                  Active theme color: {config.primaryColor}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
