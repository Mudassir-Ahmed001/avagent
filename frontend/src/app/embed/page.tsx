import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import EmbedWidget from "@/components/EmbedWidget";

export const metadata = {
  title: "Embed Agent - Axiom.AI",
  description: "Get embed code for your AI agent",
};

export default async function EmbedPage({
  searchParams,
}: {
  searchParams: { id?: string; name?: string };
}) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const agentId = searchParams.id || "your-agent-id-here";
  const agentName = searchParams.name || "Your Agent";

  return <EmbedWidget agentId={agentId} agentName={agentName} />;
}
