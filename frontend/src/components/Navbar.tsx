"use client";

import React from "react";
import { Activity, Shield } from "lucide-react";
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs";

export default function Navbar() {
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 border border-primary/30 text-primary">
            <Activity className="h-5 w-5 animate-pulse" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            Axiom<span className="text-primary font-light">.AI</span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-secondary/80 border border-border px-2.5 py-0.5 text-2xs font-semibold text-secondary-foreground">
            <Shield className="h-3 w-3 text-primary" /> Healthcare
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </a>
          <a
            href="#sandbox"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Agent Sandbox
          </a>
          <a
            href="#dashboard"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Hospital Dashboard
          </a>
          <a
            href="#workflow"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            How it Works
          </a>
        </nav>

        {/* Auth Actions */}
        <div className="flex items-center gap-3">
          {/* Show skeleton while Clerk loads to prevent layout shift */}
          {!isLoaded && (
            <div className="h-10 w-28 animate-pulse rounded-full bg-secondary/60" />
          )}

          {/* When signed OUT — show Sign In + Get Started */}
          {isLoaded && !isSignedIn && (
            <>
              <SignInButton mode="modal">
                <button className="hidden sm:inline-flex text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-all duration-200 active:scale-95 cursor-pointer">
                  Get Started
                </button>
              </SignUpButton>
            </>
          )}

          {/* When signed IN — show Launch Console + Avatar */}
          {isLoaded && isSignedIn && (
            <>
              <a
                href="/dashboard"
                className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-all duration-200 active:scale-95"
              >
                Launch Console
              </a>
              <UserButton />
            </>
          )}
        </div>
      </div>
    </header>
  );
}
