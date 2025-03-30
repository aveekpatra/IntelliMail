"use client";

import { Mail } from "@/app/mail/components/mail";
import { accounts, mails } from "./data";
import Image from "next/image";

interface MailClientProps {
  defaultLayout?: number[];
  defaultCollapsed?: boolean;
  useRealEmails?: boolean;
  useGmailEmails?: boolean;
}

export default function MailClient({
  defaultLayout,
  defaultCollapsed,
  useRealEmails = false,
  useGmailEmails = true,
}: MailClientProps) {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/mail-dark.png"
          width={1280}
          height={727}
          alt="Mail"
          className="hidden dark:block"
        />
        <Image
          src="/examples/mail-light.png"
          width={1280}
          height={727}
          alt="Mail"
          className="block dark:hidden"
        />
      </div>
      <div className="hidden h-full w-full flex-col md:flex">
        <Mail
          accounts={accounts}
          mails={mails}
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
          useRealEmails={useRealEmails}
          useGmailEmails={useGmailEmails}
        />
      </div>
    </>
  );
}
