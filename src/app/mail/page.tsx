import { cookies } from "next/headers";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import MailClient from "./client";
import GmailDebug from "./gmail-debug";

export const metadata = {
  title: "Mail - Lumi",
  description: "AI-powered email client",
};

export default async function MailPage() {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  // Get cookie values
  const cookiesStore = await cookies();
  const layout = cookiesStore.get("react-resizable-panels:layout:mail");
  const collapsed = cookiesStore.get("react-resizable-panels:collapsed");

  // Parse the layout from cookies
  let defaultLayout = undefined;
  try {
    if (layout?.value) {
      defaultLayout = JSON.parse(layout.value);
    }
  } catch (e) {
    console.error("Failed to parse layout from cookies", e);
  }

  // Parse collapsed state
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  return (
    <div className="flex h-screen w-screen flex-col">
      <div className="hidden h-full w-full flex-1 md:flex">
        <MailClient
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          useRealEmails={false}
          useGmailEmails={true}
        />
      </div>
      <div className="block p-4 text-center md:hidden">
        <p>Mail interface not available on mobile devices.</p>
      </div>

      {/* Gmail Debug Widget */}
      <GmailDebug />
    </div>
  );
}
