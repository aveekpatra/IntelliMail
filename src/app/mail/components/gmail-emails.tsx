"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import {
  Mail,
  RefreshCw,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface GmailEmail {
  id: string;
  threadId: string;
  subject: string;
  from: string;
  to: string;
  date: string;
  snippet: string;
  body: string;
  labelIds: string[];
}

interface GmailAccount {
  id: string;
  name: string;
  emailAddress: string;
}

export default function GmailEmails() {
  const [emails, setEmails] = useState<GmailEmail[]>([]);
  const [account, setAccount] = useState<GmailAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedEmail, setExpandedEmail] = useState<string | null>(null);

  const fetchEmails = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("Fetching Gmail emails...");
      const response = await fetch("/api/gmail/emails?limit=10");

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to fetch emails: ${errorData.message || "Unknown error"}`,
        );
      }

      const data = await response.json();
      setEmails(data.emails);
      setAccount(data.account);
      console.log("Fetched emails:", data.emails.length);
    } catch (err) {
      console.error("Error fetching Gmail emails:", err);
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const refreshEmails = async () => {
    try {
      setRefreshing(true);
      await fetchEmails();
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  const toggleExpand = (emailId: string) => {
    if (expandedEmail === emailId) {
      setExpandedEmail(null);
    } else {
      setExpandedEmail(emailId);
    }
  };

  const handleConnect = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/accounts/gmail/auth-url");

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to get auth URL: ${errorText}`);
      }

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No auth URL returned");
      }
    } catch (err) {
      console.error("Error connecting to Gmail:", err);
      setError(err instanceof Error ? err.message : "Unknown error occurred");
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Mail className="h-5 w-5" />
              Gmail Inbox
            </CardTitle>
            <CardDescription>
              {account
                ? `${account.name} (${account.emailAddress})`
                : "Loading account..."}
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={refreshEmails}
            disabled={refreshing || loading}
            className="ml-auto"
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="p-4 text-center">
            <p className="text-red-500">{error}</p>
            {error.includes("No Gmail account found") ||
            error.includes("auth") ||
            error.includes("expired") ? (
              <Button
                variant="default"
                onClick={handleConnect}
                className="mt-4"
              >
                Connect Gmail Account
              </Button>
            ) : (
              <Button variant="outline" onClick={fetchEmails} className="mt-4">
                Try Again
              </Button>
            )}
          </div>
        ) : emails.length === 0 ? (
          <div className="p-4 text-center">
            <p className="text-muted-foreground">
              No emails found in your Gmail inbox
            </p>
          </div>
        ) : (
          <ScrollArea className="h-[500px]">
            <div className="space-y-4">
              {emails.map((email) => (
                <div
                  key={email.id}
                  className="overflow-hidden rounded-md border"
                >
                  <div
                    className="flex cursor-pointer items-start justify-between p-3 hover:bg-muted/50"
                    onClick={() => toggleExpand(email.id)}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="max-w-[240px] truncate font-medium">
                          {email.subject}
                        </span>
                        {email.labelIds?.includes("IMPORTANT") && (
                          <Badge
                            variant="outline"
                            className="border-yellow-600 text-yellow-600"
                          >
                            Important
                          </Badge>
                        )}
                      </div>
                      <div className="max-w-[300px] truncate text-sm text-muted-foreground">
                        From: {email.from}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {email.date &&
                          format(new Date(email.date), "MMM d, yyyy h:mm a")}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {expandedEmail === email.id ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  {expandedEmail === email.id && (
                    <>
                      <Separator />
                      <div className="p-4">
                        <div className="mb-4">
                          <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-medium">To:</span> {email.to}
                          </p>
                        </div>

                        <div
                          className="prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: email.body || email.snippet,
                          }}
                        />

                        <div className="mt-4 flex justify-end">
                          <a
                            href={`https://mail.google.com/mail/u/0/#inbox/${email.threadId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-blue-600"
                          >
                            View in Gmail <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
