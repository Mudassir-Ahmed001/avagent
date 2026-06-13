import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      {/* Ambient glow behind the auth card */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[480px] w-[480px] rounded-full bg-primary/8 blur-[120px]" />
      </div>

      <SignUp
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-card/80 backdrop-blur-xl border border-border shadow-2xl",
          },
        }}
      />
    </main>
  );
}
