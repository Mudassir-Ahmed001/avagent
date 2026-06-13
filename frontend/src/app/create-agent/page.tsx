import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CreateAgentForm from "@/components/CreateAgentForm";

export const metadata = {
  title: "Create AI Agent - Axiom.AI",
  description: "Create and configure your personalized AI agent",
};

export default async function CreateAgentPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return <CreateAgentForm />;
}
