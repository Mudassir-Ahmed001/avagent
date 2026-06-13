import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardContent from "@/components/DashboardContent";

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <DashboardContent
      firstName={user.firstName ?? "there"}
      imageUrl={user.imageUrl}
      email={user.emailAddresses[0]?.emailAddress ?? ""}
    />
  );
}
