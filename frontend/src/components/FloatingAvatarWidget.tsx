"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Calendar,
  UserCheck,
  Camera,
  Check,
} from "lucide-react";
import { AgentConfig } from "./InteractiveSandbox";

interface WidgetProps {
  config: AgentConfig;
}

interface Message {
  sender: "user" | "agent";
  text: string;
  type?: "text" | "video_assessment" | "scheduler" | "handoff" | "scanning" | "scan_result" | "booking_success";
}

export default function FloatingAvatarWidget({ config }: WidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // Custom states for interactive features
  const [cameraActive, setCameraActive] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [selectedDoc, setSelectedDoc] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const chatEndRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Restart chat when configurations change
  useEffect(() => {
    let welcomeMsg = "";
    if (config.tone === "Empathetic") {
      welcomeMsg = `Hello! I'm ${config.name}, your virtual ${config.role}. I'm here to listen and guide you through your healthcare inquiries with care. How are you feeling today?`;
    } else if (config.tone === "Professional") {
      welcomeMsg = `Greetings. I am ${config.name}, serving as your ${config.role}. I can coordinate scheduling, RAG documentation search, or run automated symptom audits. Please state your primary clinical request.`;
    } else {
      welcomeMsg = `Hello. I am ${config.name} (${config.role}). Let's check your symptoms, book an appointment, or escalate to staff. What do you need?`;
    }

    setMessages([
      {
        sender: "agent",
        text: welcomeMsg,
      },
    ]);
  }, [config]);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Video scanner animation
  useEffect(() => {
    if (cameraActive) {
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            // Finish scan, show result
            setTimeout(() => {
              setCameraActive(false);
              stopCamera();
              setMessages((prevMsgs) => [
                ...prevMsgs,
                {
                  sender: "agent",
                  text: "Scan complete. Condition identified: Mild Acne and skin irritation.",
                  type: "scan_result",
                },
              ]);
            }, 800);
            return 100;
          }
          return prev + 10;
        });
      }, 250);
      return () => clearInterval(interval);
    }
  }, [cameraActive]);

  const startCamera = async () => {
    setScanProgress(0);
    setCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn("Camera hardware access denied/mocking stream: ", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const normalized = userText.toLowerCase();

      let botReply = "";
      let customType: Message["type"] = "text";

      if (normalized.includes("skin") || normalized.includes("acne") || normalized.includes("rash") || normalized.includes("redness")) {
        botReply = "I notice you're asking about a skin concern. Would you like to run a quick video assessment scan to help identify potential issues?";
        customType = "video_assessment";
      } else if (normalized.includes("book") || normalized.includes("appointment") || normalized.includes("calendar") || normalized.includes("doctor")) {
        botReply = "Certainly. Let's look at doctor availabilities to get you scheduled into Google Calendar.";
        customType = "scheduler";
      } else if (normalized.includes("human") || normalized.includes("staff") || normalized.includes("doctor call") || normalized.includes("transfer")) {
        botReply = "Initiating human handoff. Transferring clinical chat context to live hospital agents...";
        customType = "handoff";
      } else {
        // Fallback RAG response based on Tone
        if (config.tone === "Empathetic") {
          botReply = `I understand. Let me search our clinic guidelines to give you the most comforting and accurate advice. Please consult your physician if symptoms worsen.`;
        } else if (config.tone === "Professional") {
          botReply = `Our clinic pamphlets show relevant medical advice. We recommend observing symptoms for 24-48 hours. Let me know if you wish to book a consult.`;
        } else {
          botReply = `Search results suggest standard recovery. Observe closely. If you need professional advice, book an appointment or ask for human handoff.`;
        }
      }

      setMessages((prev) => [...prev, { sender: "agent", text: botReply, type: customType }]);
    }, 1200);
  };

  const bookDoctorAppointment = () => {
    if (!selectedDoc || !selectedTime) return;
    setMessages((prev) => [
      ...prev,
      {
        sender: "agent",
        text: `Success! Appointment confirmed with ${selectedDoc} on Monday at ${selectedTime}. Confirmation sent via email. Syncing to hospital calendar...`,
        type: "booking_success",
      },
    ]);
    setSelectedDoc("");
    setSelectedTime("");
  };

  return (
    <>
      {/* Floating Toggle Bubble Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{ borderColor: config.primaryColor }}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full border-2 bg-card text-foreground shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-muted-foreground" />
        ) : (
          <div className="relative flex items-center justify-center">
            <MessageSquare className="h-7 w-7 text-primary animate-pulse" />
            <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-emerald-500 border border-card"></span>
            </span>
          </div>
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-26 right-6 z-50 flex h-[580px] w-[380px] flex-col rounded-3xl border border-border bg-card shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-4 border-b border-border/60 text-white"
            style={{
              background: `linear-gradient(135deg, ${config.primaryColor} 0%, rgba(20, 20, 20, 0.95) 100%)`,
            }}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 border border-white/20">
                <Sparkles className="h-5 w-5 text-emerald-300 animate-spin-slow" />
              </div>
              <div>
                <h3 className="text-xs font-bold leading-tight">{config.name}</h3>
                <p className="text-3xs text-white/80 leading-none mt-0.5">{config.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-3xs font-semibold uppercase tracking-wider text-emerald-300">
                Live Voice
              </span>
            </div>
          </div>

          {/* Messages Logs */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/20">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col max-w-[85%] ${
                  msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                }`}
              >
                {/* Message Bubble */}
                <div
                  className={`rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground font-medium rounded-tr-none"
                      : "bg-secondary border border-border/80 text-foreground rounded-tl-none"
                  }`}
                >
                  {msg.text}
                </div>

                {/* Sub Features templates inside chat */}
                {msg.type === "video_assessment" && (
                  <div className="mt-2.5 w-full rounded-xl border border-border bg-card p-3 space-y-2">
                    <p className="text-3xs text-muted-foreground leading-normal">
                      Note: Camera captures are encrypted and analyzed under clinical HIPAA regulations.
                    </p>
                    <button
                      onClick={startCamera}
                      className="w-full h-8 flex items-center justify-center gap-1.5 rounded-lg bg-accent text-3xs font-bold text-accent-foreground hover:bg-accent/90 transition-colors cursor-pointer"
                    >
                      <Camera className="h-3.5 w-3.5" /> Start Skin Scan
                    </button>
                  </div>
                )}

                {cameraActive && msg.type === "video_assessment" && (
                  <div className="mt-2.5 w-full rounded-xl border border-border bg-card p-3 space-y-3">
                    <div className="relative aspect-video w-full rounded-lg bg-black overflow-hidden border border-border flex items-center justify-center">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="h-full w-full object-cover scale-x-[-1]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-primary/10 animate-pulse pointer-events-none" />
                      <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/60 rounded px-1.5 py-0.5 text-[8px] font-bold text-red-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" /> REC
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[8px] font-semibold text-muted-foreground">
                        <span>Analyzing skin redness & acne patterns...</span>
                        <span>{scanProgress}%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-300"
                          style={{ width: `${scanProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {msg.type === "scan_result" && (
                  <div className="mt-2.5 w-full rounded-xl border border-border bg-card p-3 space-y-2.5">
                    <p className="text-3xs font-bold uppercase tracking-wider text-accent">
                      💡 Treatment Guidance
                    </p>
                    <div className="space-y-1.5 text-3xs text-muted-foreground leading-relaxed">
                      <p>
                        <strong>Suggested Steps:</strong> Wash twice daily with salicylic acid face wash. Avoid scrubbing skin.
                      </p>
                      <p className="text-foreground font-semibold">
                        We recommend matching you with Dr. Rachel (Dermatologist) to discuss prescription retinoids.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setMessages((prev) => [
                          ...prev,
                          {
                            sender: "agent",
                            text: "Launching calendar booking for dermatology specialists...",
                            type: "scheduler",
                          },
                        ]);
                      }}
                      className="w-full h-8 flex items-center justify-center gap-1.5 rounded-lg bg-primary text-3xs font-bold text-primary-foreground hover:bg-primary/95 transition-colors cursor-pointer"
                    >
                      <Calendar className="h-3.5 w-3.5" /> Book Derm Consult
                    </button>
                  </div>
                )}

                {msg.type === "scheduler" && (
                  <div className="mt-2.5 w-full rounded-xl border border-border bg-card p-3 space-y-3">
                    <p className="text-3xs font-bold text-foreground">Select Specialist & Time Slot</p>
                    <div className="space-y-2">
                      <select
                        value={selectedDoc}
                        onChange={(e) => setSelectedDoc(e.target.value)}
                        className="w-full h-8 rounded border border-border bg-background px-2 text-3xs font-medium text-foreground focus:outline-none"
                      >
                        <option value="">Choose a Doctor...</option>
                        <option value="Dr. Rachel (Dermatology)">Dr. Rachel (Dermatology)</option>
                        <option value="Dr. Evans (General Medicine)">Dr. Evans (General Medicine)</option>
                        <option value="Dr. Kim (Pediatrics)">Dr. Kim (Pediatrics)</option>
                      </select>

                      <div className="grid grid-cols-2 gap-1.5">
                        {["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"].map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={`h-7 rounded border text-[9px] font-semibold transition-all ${
                              selectedTime === time
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-border bg-background text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={bookDoctorAppointment}
                      disabled={!selectedDoc || !selectedTime}
                      className="w-full h-8 rounded-lg bg-primary text-3xs font-bold text-primary-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/95 transition-colors cursor-pointer"
                    >
                      Confirm Google Calendar Sync
                    </button>
                  </div>
                )}

                {msg.type === "handoff" && (
                  <div className="mt-2.5 w-full rounded-xl border border-border bg-card p-3 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                      <UserCheck className="h-4.5 w-4.5 animate-bounce" />
                    </div>
                    <div>
                      <p className="text-3xs font-bold text-foreground">Handoff Success</p>
                      <p className="text-[10px] text-muted-foreground">Staff member joining shortly...</p>
                    </div>
                  </div>
                )}

                {msg.type === "booking_success" && (
                  <div className="mt-2.5 w-full rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3 flex gap-2.5">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-3xs font-bold text-emerald-400">Doctor&apos;s Calendar Updated</p>
                      <p className="text-[10px] text-muted-foreground leading-normal mt-0.5">
                        Confirmation email sent automatically. Check your inbox shortly.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1 mr-auto rounded-full bg-secondary border border-border px-3 py-1.5 text-2xs text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce" />
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce delay-75" />
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce delay-150" />
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick suggestions */}
          <div className="flex gap-1.5 overflow-x-auto px-4 py-2 border-t border-border/40 bg-secondary/30 scrollbar-none">
            <button
              onClick={() => {
                setInputText("I have redness and skin irritation.");
              }}
              className="h-6 rounded-full bg-secondary border border-border px-2.5 text-[9px] font-semibold text-muted-foreground hover:text-foreground hover:bg-background whitespace-nowrap cursor-pointer"
            >
              Analyze Skin
            </button>
            <button
              onClick={() => {
                setInputText("I need to book a clinical appointment.");
              }}
              className="h-6 rounded-full bg-secondary border border-border px-2.5 text-[9px] font-semibold text-muted-foreground hover:text-foreground hover:bg-background whitespace-nowrap cursor-pointer"
            >
              Book Doctor
            </button>
            <button
              onClick={() => {
                setInputText("Transfer me to a human doctor please.");
              }}
              className="h-6 rounded-full bg-secondary border border-border px-2.5 text-[9px] font-semibold text-muted-foreground hover:text-foreground hover:bg-background whitespace-nowrap cursor-pointer"
            >
              Human Handoff
            </button>
          </div>

          {/* Form Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-border/60 bg-card flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 h-10 px-3.5 rounded-full border border-border bg-background/50 text-foreground text-xs font-medium focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/80 transition-all"
            />
            <button
              type="submit"
              style={{ backgroundColor: config.primaryColor }}
              className="flex h-10 w-10 items-center justify-center rounded-full text-white shadow hover:opacity-90 active:scale-95 transition-all cursor-pointer shrink-0"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
