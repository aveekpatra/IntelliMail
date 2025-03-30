"use client";

import * as React from "react";
import { formatDistanceToNow } from "date-fns";
import { RefreshCw, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useMail } from "../use-mail";
import { useGmailEmails } from "../use-gmail-emails";
import { ComponentProps } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function GmailMailList() {
  const {
    emails,
    loading,
    error,
    needsReconnect,
    refreshEmails,
    reconnectAccount,
  } = useGmailEmails();
  const [mail, setMail] = useMail();
  const [refreshing, setRefreshing] = React.useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshEmails();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <ScrollArea className="h-screen">
        <div className="flex flex-col gap-2 p-4 pt-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-2 rounded-lg border p-3">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          ))}
        </div>
      </ScrollArea>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center p-4">
        <Alert variant="destructive" className="mb-4 max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error loading emails</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>

        {needsReconnect ? (
          <div className="flex flex-col items-center">
            <p className="mb-4 text-sm text-muted-foreground">
              Your Gmail authentication has expired. Please reconnect your
              account.
            </p>
            <Button onClick={reconnectAccount} variant="default">
              Reconnect Gmail Account
            </Button>
          </div>
        ) : (
          <Button onClick={handleRefresh} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        )}
      </div>
    );
  }

  return (
    <ScrollArea className="h-screen">
      <div className="flex justify-end p-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={refreshing}
        >
          <RefreshCw
            className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>
      <div className="flex flex-col gap-2 p-4 pt-0">
        {emails.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No emails found in your Gmail inbox
          </div>
        ) : (
          emails.map((item) => (
            <button
              key={item.id}
              className={cn(
                "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                mail.selected === item.id && "bg-muted",
              )}
              onClick={() =>
                setMail({
                  ...mail,
                  selected: item.id,
                })
              }
            >
              <div className="flex w-full flex-col gap-1">
                <div className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold">{item.from}</div>
                    {item.labelIds?.includes("UNREAD") && (
                      <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "ml-auto text-xs",
                      mail.selected === item.id
                        ? "text-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    {formatDistanceToNow(new Date(item.date), {
                      addSuffix: true,
                    })}
                  </div>
                </div>
                <div className="text-xs font-medium">{item.subject}</div>
              </div>
              <div className="line-clamp-2 text-xs text-muted-foreground">
                {item.snippet || "No message content"}
              </div>
              {item.labelIds && item.labelIds.length ? (
                <div className="flex items-center gap-2">
                  {item.labelIds
                    .filter(
                      (label) =>
                        ![
                          "INBOX",
                          "UNREAD",
                          "CATEGORY_PERSONAL",
                          "IMPORTANT",
                        ].includes(label),
                    )
                    .slice(0, 3)
                    .map((label) => (
                      <Badge
                        key={label}
                        variant={getBadgeVariantFromLabel(label)}
                      >
                        {formatLabel(label)}
                      </Badge>
                    ))}
                </div>
              ) : null}
            </button>
          ))
        )}
      </div>
    </ScrollArea>
  );
}

function formatLabel(label: string): string {
  return label
    .replace("CATEGORY_", "")
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

function getBadgeVariantFromLabel(
  label: string,
): ComponentProps<typeof Badge>["variant"] {
  if (["IMPORTANT", "CATEGORY_UPDATES"].includes(label)) {
    return "default";
  }

  if (["CATEGORY_PERSONAL", "CATEGORY_SOCIAL"].includes(label)) {
    return "outline";
  }

  if (["CATEGORY_PROMOTIONS", "CATEGORY_FORUMS"].includes(label)) {
    return "secondary";
  }

  return "secondary";
}
