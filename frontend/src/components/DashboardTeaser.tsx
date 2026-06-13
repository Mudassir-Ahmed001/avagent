"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  BarChart3,
  FileUp,
  Check,
  Eye,
  X,
} from "lucide-react";

interface Transcript {
  id: string;
  patient: string;
  avatar: string;
  status: "completed" | "escalated" | "active";
  snippet: string;
  time: string;
  messages: { sender: "user" | "bot"; text: string }[];
}

export default function DashboardTeaser() {
  const [selectedTranscript, setSelectedTranscript] = useState<Transcript | null>(null);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success">("idle");
  const [dragActive, setDragActive] = useState(false);

  const transcripts: Transcript[] = [
    {
      id: "tr_1",
      patient: "John Doe",
      avatar: "Dr. Sage",
      status: "completed",
      time: "10 mins ago",
      snippet: "Checked doctor times and scheduled dermatology consult",
      messages: [
        { sender: "user", text: "I have a skin rash that won't go away." },
        { sender: "bot", text: "I can launch a video assessment to check the skin condition, or book an appointment with Dr. Rachel." },
        { sender: "user", text: "Let's book with Dr. Rachel." },
        { sender: "bot", text: "Perfect. I have synced the calendar slot on Monday at 09:30 AM." },
      ],
    },
    {
      id: "tr_2",
      patient: "Sarah Jenkins",
      avatar: "Dr. Sage",
      status: "escalated",
      time: "25 mins ago",
      snippet: "Escalated to human staff due to sudden chest tightness queries",
      messages: [
        { sender: "user", text: "My chest feels tight and I'm a bit dizzy." },
        { sender: "bot", text: "WARNING: Chest tightness can indicate a cardiac emergency. I am immediately alerting the emergency room team and calling your transfer contact." },
        { sender: "user", text: "Thank you, please do." },
      ],
    },
    {
      id: "tr_3",
      patient: "Mike Miller",
      avatar: "Dr. Evans",
      status: "active",
      time: "Just now",
      snippet: "Reading child care leaflets for pediatrician advice",
      messages: [
        { sender: "user", text: "What is the standard children's ibuprofen dosage for a 3-year-old?" },
        { sender: "bot", text: "According to the child care guidelines leaflet: Standard dosage is 100mg (5mL of 100mg/5mL suspension) every 6-8 hours as needed. Do not exceed 4 doses in 24 hours. Let me know if you'd like to consult Dr. Kim." },
      ],
    },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    simulateUpload();
  };

  const simulateUpload = () => {
    setUploadStatus("uploading");
    setTimeout(() => {
      setUploadStatus("success");
      setTimeout(() => setUploadStatus("idle"), 2500);
    }, 1800);
  };

  return (
    <section id="dashboard" className="py-20 border-t border-border/40 relative">
      <div className="absolute bottom-10 right-1/4 -z-10 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[80px]" />
      
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-secondary/80 border border-border px-3 py-1 text-2xs font-semibold text-secondary-foreground">
            <BarChart3 className="h-3.5 w-3.5 text-primary" /> Admin Portal
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Centralized Hospital Dashboard
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Supervise conversations, review clinical transcripts, manage vector knowledge bases, and coordinate human overrides from a single secure portal.
          </p>
        </div>

        {/* Dashboard Grid Container */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Main Console Box (8 cols) */}
          <div className="lg:col-span-8 rounded-3xl border border-border bg-card/50 p-6 sm:p-8 backdrop-blur-sm shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-border/60 pb-5 gap-4">
              <div>
                <h3 className="text-base font-bold text-foreground">Clinic Supervision Hub</h3>
                <p className="text-2xs text-muted-foreground">Monitor real-time patient interactions</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-2xs font-semibold text-foreground">3 Active Patient Sessions</span>
              </div>
            </div>

            {/* Live Session List */}
            <div className="space-y-3">
              {transcripts.map((item) => (
                <div
                  key={item.id}
                  className="group flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-2xl border border-border/70 bg-background/40 p-4 hover:border-primary/40 hover:bg-background/60 transition-all duration-200"
                >
                  <div className="space-y-1.5 max-w-md">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-foreground">{item.patient}</span>
                      <span className="text-3xs text-muted-foreground">• {item.time}</span>
                      <span
                        className={`rounded-full px-1.5 py-0.5 text-3xs font-bold uppercase tracking-wider ${
                          item.status === "completed"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : item.status === "escalated"
                            ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                            : "bg-primary/10 text-primary border border-primary/20"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p className="text-2xs text-muted-foreground truncate font-medium">
                      {item.snippet}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedTranscript(item)}
                    className="mt-4 sm:mt-0 flex h-9 items-center justify-center gap-1.5 rounded-xl border border-border bg-card px-4 text-2xs font-bold text-foreground hover:bg-secondary transition-all duration-200 cursor-pointer"
                  >
                    <Eye className="h-3.5 w-3.5" /> View Transcript
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* RAG Knowledge Base Console (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Upload File Widget */}
            <div className="rounded-3xl border border-border bg-card/50 p-6 backdrop-blur-sm shadow-xl flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-foreground">Add Medical Leaflets</h3>
                <p className="text-3xs text-muted-foreground">Provide leaflets and FAQs to help guide the assistant</p>
              </div>

              {/* Upload Drag Box */}
              <label
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragActive(false);
                  if (e.dataTransfer.files?.length) simulateUpload();
                }}
                className={`flex-1 flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-6 transition-all cursor-pointer ${
                  dragActive
                    ? "border-primary bg-primary/5"
                    : "border-border/60 hover:border-border/100 bg-background/20"
                }`}
              >
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.docx,.txt"
                  onChange={handleFileUpload}
                />
                
                {uploadStatus === "idle" && (
                  <div className="text-center space-y-2 flex flex-col items-center">
                    <FileUp className="h-8 w-8 text-muted-foreground animate-bounce" />
                    <span className="text-2xs font-semibold text-foreground">Drag & drop booklets</span>
                    <span className="text-3xs text-muted-foreground">PDF, DOCX, TXT up to 10MB</span>
                  </div>
                )}

                {uploadStatus === "uploading" && (
                  <div className="text-center space-y-3 flex flex-col items-center">
                    <div className="h-6 w-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                    <span className="text-2xs font-semibold text-primary">Syncing file guidelines...</span>
                  </div>
                )}

                {uploadStatus === "success" && (
                  <div className="text-center space-y-2 flex flex-col items-center">
                    <Check className="h-8 w-8 text-emerald-400" />
                    <span className="text-2xs font-semibold text-emerald-400">Leaflet Uploaded!</span>
                    <span className="text-3xs text-muted-foreground">Information parsed and ready.</span>
                  </div>
                )}
              </label>
            </div>

            {/* Quick Metrics Widget */}
            <div className="rounded-3xl border border-border bg-card/50 p-6 backdrop-blur-sm shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-2xs font-bold uppercase tracking-wider text-muted-foreground">
                  Escalation Performance
                </h4>
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-3xs text-muted-foreground font-medium">Auto-Resolution</p>
                  <p className="text-lg font-bold text-foreground">94.8%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-3xs text-muted-foreground font-medium">Avg Handoff Speed</p>
                  <p className="text-lg font-bold text-foreground">12.4s</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transcript Detail Modal Popup */}
      {selectedTranscript && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl border border-border bg-card p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div>
                <h4 className="text-sm font-bold text-foreground">
                  Transcript: {selectedTranscript.patient}
                </h4>
                <p className="text-3xs text-muted-foreground">
                  Avatar Agent: {selectedTranscript.avatar}
                </p>
              </div>
              <button
                onClick={() => setSelectedTranscript(null)}
                className="h-8 w-8 rounded-full hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-all cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Chats body */}
            <div className="h-64 overflow-y-auto space-y-3 pr-2">
              {selectedTranscript.messages.map((m, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-[9px] font-bold text-muted-foreground">
                    {m.sender === "user" ? selectedTranscript.patient : selectedTranscript.avatar}
                  </p>
                  <div
                    className={`text-xs rounded-xl px-3 py-2 leading-relaxed ${
                      m.sender === "user"
                        ? "bg-primary/10 border border-primary/20 text-foreground"
                        : "bg-secondary border border-border/80 text-foreground"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-3 border-t border-border/60">
              <button
                onClick={() => setSelectedTranscript(null)}
                className="h-10 rounded-xl bg-primary px-5 text-2xs font-bold text-primary-foreground hover:bg-primary/95 transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
