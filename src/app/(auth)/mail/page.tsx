import { cookies } from "next/headers";
import MailClient from "@/app/mail/client";

export const metadata = {
  title: "Mail - shadcn/ui",
  description: "Example mail app built with shadcn/ui components",
};

export default async function MailPage() {
  // Read cookies on the server side
  const layout = await cookies().get("react-resizable-panels:layout:mail");
  const collapsed = await cookies().get("react-resizable-panels:collapsed");

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
        />
      </div>
      <div className="block p-4 text-center md:hidden">
        <p>Mail interface not available on mobile devices.</p>
      </div>
    </div>
  );
}
