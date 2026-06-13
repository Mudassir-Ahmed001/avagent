import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "Axiom AI — Intelligent Healthcare Assistants",
  description:
    "Deploy custom AI avatar agents on your hospital website in minutes. Voice conversations, video assessments, appointment booking — all in one platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#6ee7b7",
        },
      }}
    >
      <html lang="en" className="dark">
        <body className="antialiased">{children}</body>
      </html>
    </ClerkProvider>
  );
}
