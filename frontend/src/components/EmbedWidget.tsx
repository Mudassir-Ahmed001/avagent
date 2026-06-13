"use client";

import React, { useState } from "react";
import {
  Copy,
  Check,
  Code,
  FileJson,
  Globe,
  Zap,
  Lightbulb,
  Activity,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface EmbedCodeProps {
  agentId?: string;
  agentName?: string;
}

const techStacks = [
  {
    id: "html",
    name: "HTML",
    icon: "📄",
    code: `<!-- Axiom.AI Agent Widget -->
<script src="https://widget.axiom.ai/embed.js"></script>
<axiom-widget agent-id="{{AGENT_ID}}" theme="dark"></axiom-widget>

<style>
  axiom-widget {
    display: block;
    width: 100%;
    max-width: 600px;
  }
</style>`,
  },
  {
    id: "react",
    name: "React",
    icon: "⚛️",
    code: `import { AxiomWidget } from '@axiom.ai/react';
import '@axiom.ai/react/styles.css';

export default function App() {
  return (
    <AxiomWidget
      agentId="{{AGENT_ID}}"
      theme="dark"
      onMessage={(msg) => console.log('Agent message:', msg)}
    />
  );
}`,
  },
  {
    id: "vue",
    name: "Vue.js",
    icon: "💚",
    code: `<template>
  <AxiomWidget
    :agent-id="agentId"
    theme="dark"
    @message="handleMessage"
  />
</template>

<script setup>
import { AxiomWidget } from '@axiom.ai/vue';
import '@axiom.ai/vue/styles.css';

const agentId = '{{AGENT_ID}}';

const handleMessage = (msg) => {
  console.log('Agent message:', msg);
};
</script>`,
  },
  {
    id: "angular",
    name: "Angular",
    icon: "🔴",
    code: `import { Component } from '@angular/core';
import { AxiomWidgetComponent } from '@axiom.ai/angular';

@Component({
  selector: 'app-root',
  template: \`
    <axiom-widget
      [agentId]="agentId"
      theme="dark"
      (onMessage)="handleMessage($event)"
    ></axiom-widget>
  \`,
  imports: [AxiomWidgetComponent],
})
export class AppComponent {
  agentId = '{{AGENT_ID}}';

  handleMessage(msg: any) {
    console.log('Agent message:', msg);
  }
}`,
  },
  {
    id: "nextjs",
    name: "Next.js",
    icon: "⬛",
    code: `'use client';

import dynamic from 'next/dynamic';
import '@axiom.ai/react/styles.css';

const AxiomWidget = dynamic(
  () => import('@axiom.ai/react').then(mod => mod.AxiomWidget),
  { ssr: false }
);

export default function Page() {
  return (
    <AxiomWidget
      agentId="{{AGENT_ID}}"
      theme="dark"
      onMessage={(msg) => console.log('Agent message:', msg)}
    />
  );
}`,
  },
  {
    id: "svelte",
    name: "Svelte",
    icon: "🔥",
    code: `<script>
  import { AxiomWidget } from '@axiom.ai/svelte';
  import '@axiom.ai/svelte/styles.css';

  const agentId = '{{AGENT_ID}}';

  function handleMessage(event) {
    console.log('Agent message:', event.detail);
  }
</script>

<AxiomWidget
  {agentId}
  theme="dark"
  on:message={handleMessage}
/>`,
  },
  {
    id: "wordpress",
    name: "WordPress",
    icon: "🔵",
    code: `<!-- Add this to your WordPress page/post -->
[axiom_widget agent_id="{{AGENT_ID}}" theme="dark"]

<!-- Or add this to your theme's functions.php -->
add_shortcode('axiom_widget', function($atts) {
  $atts = shortcode_atts(array(
    'agent_id' => '',
    'theme' => 'dark'
  ), $atts);
  
  return sprintf(
    '<script src="https://widget.axiom.ai/embed.js"></script>
     <axiom-widget agent-id="%s" theme="%s"></axiom-widget>',
    esc_attr($atts['agent_id']),
    esc_attr($atts['theme'])
  );
});`,
  },
  {
    id: "webflow",
    name: "Webflow",
    icon: "🎨",
    code: `<!-- Add this to your Webflow page -->
<!-- Go to: Settings → Custom Code → Footer Code -->

<script src="https://widget.axiom.ai/embed.js"></script>
<axiom-widget agent-id="{{AGENT_ID}}" theme="dark"></axiom-widget>

<style>
  axiom-widget {
    display: block;
    width: 100%;
    max-width: 600px;
    margin: 20px auto;
  }
</style>`,
  },
];

export default function EmbedWidget({ agentId = "your-agent-id-here", agentName = "Your Agent" }: EmbedCodeProps) {
  const router = useRouter();
  const [selectedStack, setSelectedStack] = useState("html");
  const [copied, setCopied] = useState(false);

  const currentCode = techStacks
    .find((stack) => stack.id === selectedStack)
    ?.code.replace(/{{AGENT_ID}}/g, agentId) || "";

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
      <main className="mx-auto max-w-6xl px-6 sm:px-8 py-12">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 border border-primary/30 text-primary">
              <Code className="h-5 w-5" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              Add {agentName} to Your Website
            </h1>
          </div>
          <p className="text-muted-foreground">
            Get embed code for your preferred technology stack. Copy and paste
            into your website to add the agent widget.
          </p>
        </div>

        {/* Tech Stack Selector */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">
              Choose Your Tech Stack
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {techStacks.map((stack) => (
              <button
                key={stack.id}
                onClick={() => setSelectedStack(stack.id)}
                className={`rounded-lg border-2 p-4 transition-all text-center ${
                  selectedStack === stack.id
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card/60 hover:border-primary/50"
                }`}
              >
                <div className="text-2xl mb-2">{stack.icon}</div>
                <div className="text-sm font-medium text-foreground">
                  {stack.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Code Display */}
        <div className="rounded-xl border border-border bg-card/60 backdrop-blur-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileJson className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">
                Embed Code
              </h3>
            </div>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/20 border border-primary/30 text-primary hover:bg-primary/30 transition-colors font-medium text-sm"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy Code
                </>
              )}
            </button>
          </div>

          <div className="relative">
            <pre className="bg-secondary/80 border border-border rounded-lg p-4 overflow-x-auto text-sm text-foreground font-mono leading-relaxed">
              <code>{currentCode}</code>
            </pre>
          </div>
        </div>

        {/* Installation Instructions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Setup Instructions */}
          <div className="rounded-xl border border-border bg-card/60 backdrop-blur-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">
                Installation Steps
              </h3>
            </div>

            <ol className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary font-medium text-xs">
                  1
                </span>
                <span>Copy the code snippet above</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary font-medium text-xs">
                  2
                </span>
                <span>Paste it into your website or application</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary font-medium text-xs">
                  3
                </span>
                <span>Replace {{"{AGENT_ID}"}} with your actual agent ID</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary font-medium text-xs">
                  4
                </span>
                <span>Save and deploy your changes</span>
              </li>
            </ol>
          </div>

          {/* Configuration Options */}
          <div className="rounded-xl border border-border bg-card/60 backdrop-blur-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">
                Configuration Options
              </h3>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <code className="text-primary">agent-id</code>
                <p className="text-muted-foreground mt-1">
                  Your unique agent identifier (required)
                </p>
              </div>
              <div>
                <code className="text-primary">theme</code>
                <p className="text-muted-foreground mt-1">
                  "dark" or "light" - Widget appearance
                </p>
              </div>
              <div>
                <code className="text-primary">position</code>
                <p className="text-muted-foreground mt-1">
                  "bottom-right" or "embedded" - Display position
                </p>
              </div>
              <div>
                <code className="text-primary">auto-open</code>
                <p className="text-muted-foreground mt-1">
                  true/false - Auto-open conversation on page load
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Example */}
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            💡 Example with Additional Options
          </h3>
          <pre className="bg-secondary/80 border border-border rounded-lg p-4 overflow-x-auto text-sm text-foreground font-mono leading-relaxed">
            <code>{`<axiom-widget
  agent-id="${agentId}"
  theme="dark"
  position="bottom-right"
  auto-open="false"
  on-message="handleAgentMessage"
></axiom-widget>`}</code>
          </pre>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-8">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex-1 inline-flex h-11 items-center justify-center rounded-lg border border-border bg-secondary/50 text-foreground hover:bg-secondary transition-colors font-medium"
          >
            Back to Dashboard
          </button>
          <button
            onClick={handleCopy}
            className="flex-1 inline-flex h-11 items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 active:scale-95 font-medium gap-2"
          >
            <Copy className="h-4 w-4" />
            Copy Embed Code
          </button>
        </div>
      </main>
    </div>
  );
}
