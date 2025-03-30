"use client";

import { format } from "date-fns";
import { useMail } from "../use-mail";
import { Button } from "@/components/ui/button";
import { useGmailEmails } from "../use-gmail-emails";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ExternalLink } from "lucide-react";

export function GmailMailDisplay() {
  const [mail] = useMail();
  const { emails } = useGmailEmails();

  const email = emails.find((item) => item.id === mail.selected);

  if (!email) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h3 className="mt-2 text-lg font-semibold">No email selected</h3>
          <p className="text-sm text-muted-foreground">
            Select an email from your inbox to view it here
          </p>
        </div>
      </div>
    );
  }

  // Extract the sender name from the email
  const fromMatch = email.from.match(/([^<]+)(?:<[^>]+>)?/);
  const senderName = fromMatch ? fromMatch[1].trim() : email.from;
  const senderInitial = senderName.charAt(0).toUpperCase();

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center p-4">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarFallback>{senderInitial}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">{senderName}</div>
            <div className="text-sm text-muted-foreground">{email.from}</div>
          </div>
        </div>
        <div className="ml-auto text-sm text-muted-foreground">
          {format(new Date(email.date), "PPpp")}
        </div>
      </div>
      <Separator />
      <div className="p-4">
        <div className="text-xl font-bold">{email.subject}</div>
      </div>
      <Separator />
      <div className="flex-1 overflow-auto p-4">
        {email.body ? (
          <div dangerouslySetInnerHTML={{ __html: email.body }} />
        ) : (
          <div>{email.snippet}</div>
        )}
      </div>
      <Separator />
      <div className="p-4">
        <div className="flex justify-end">
          <a
            href={`https://mail.google.com/mail/u/0/#inbox/${email.threadId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="sm">
              <ExternalLink className="mr-2 h-4 w-4" />
              View in Gmail
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
