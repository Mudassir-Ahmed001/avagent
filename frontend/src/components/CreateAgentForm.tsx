"use client";

import React, { useState } from "react";
import {
  Bot,
  Sparkles,
  ArrowRight,
  Zap,
  MessageSquare,
  Lightbulb,
  Activity,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface AgentFormData {
  name: string;
  role: string;
  tone: string;
  personality: string;
  description: string;
  knowledgeBase: string;
}

const agentRoles = [
  { value: "receptionist", label: "🏥 Receptionist" },
  { value: "doctor", label: "👨‍⚕️ Doctor Assistant" },
  { value: "patient_advisor", label: "👤 Patient Advisor" },
  { value: "scheduler", label: "📅 Appointment Scheduler" },
  { value: "support", label: "🆘 Support Agent" },
  { value: "educator", label: "📚 Health Educator" },
];

const agentTones = [
  { value: "professional", label: "Professional" },
  { value: "friendly", label: "Friendly" },
  { value: "empathetic", label: "Empathetic" },
  { value: "formal", label: "Formal" },
  { value: "casual", label: "Casual" },
  { value: "compassionate", label: "Compassionate" },
];

export default function CreateAgentForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<AgentFormData>({
    name: "",
    role: "receptionist",
    tone: "professional",
    personality: "",
    description: "",
    knowledgeBase: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Send to backend API
      console.log("Agent data:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to embed page with agent details
      router.push(
        `/embed?id=agent-${Date.now()}&name=${encodeURIComponent(formData.name)}`
      );
    } catch (error) {
      console.error("Error creating agent:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 border border-primary/30 text-primary">
              <Activity className="h-4 w-4" />
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">
              Axiom<span className="text-primary font-light">.AI</span>
            </span>
          </div>

          <button
            onClick={() => router.push("/dashboard")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Dashboard
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-6 sm:px-8 py-12">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 border border-primary/30 text-primary">
              <Sparkles className="h-5 w-5" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              Create Your AI Agent
            </h1>
          </div>
          <p className="text-muted-foreground">
            Set up a personalized AI assistant with custom personality, role,
            and tone. Your agent will be ready to deploy in minutes.
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information Card */}
          <div className="rounded-xl border border-border bg-card/60 backdrop-blur-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <Bot className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">
                Basic Information
              </h2>
            </div>

            <div className="space-y-4">
              {/* Agent Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Agent Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="e.g., Dr. Assistant, Reception AI"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Brief description of what this agent will do"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {/* Agent Characteristics Card */}
          <div className="rounded-xl border border-border bg-card/60 backdrop-blur-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">
                Agent Characteristics
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Role */}
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Role *
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                >
                  {agentRoles.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tone */}
              <div>
                <label
                  htmlFor="tone"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Tone *
                </label>
                <select
                  id="tone"
                  name="tone"
                  value={formData.tone}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                >
                  {agentTones.map((tone) => (
                    <option key={tone.value} value={tone.value}>
                      {tone.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Personality & Voice Card */}
          <div className="rounded-xl border border-border bg-card/60 backdrop-blur-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">
                Personality & Voice
              </h2>
            </div>

            <div className="space-y-4">
              {/* Personality */}
              <div>
                <label
                  htmlFor="personality"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Personality Description *
                </label>
                <textarea
                  id="personality"
                  name="personality"
                  placeholder="Describe your agent's personality, values, and communication style. e.g., 'Warm and supportive, always patient with patients, uses simple language, emphasizes care and compassion'"
                  value={formData.personality}
                  onChange={handleInputChange}
                  rows={4}
                  required
                  className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                />
              </div>

              {/* Knowledge Base */}
              <div>
                <label
                  htmlFor="knowledgeBase"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Knowledge Base / Specialty
                </label>
                <textarea
                  id="knowledgeBase"
                  name="knowledgeBase"
                  placeholder="What specific knowledge should this agent have? e.g., 'Expertise in cardiology, familiar with hospital procedures, knows appointment scheduling system'"
                  value={formData.knowledgeBase}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 flex gap-3">
            <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Pro Tips:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Be specific about your agent's role and responsibilities</li>
                <li>Define the tone to ensure consistent communication</li>
                <li>
                  Include personality traits that align with your brand values
                </li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="flex-1 inline-flex h-11 items-center justify-center rounded-lg border border-border bg-secondary/50 text-foreground hover:bg-secondary transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 inline-flex h-11 items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-95 font-medium gap-2"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  Create Agent <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
