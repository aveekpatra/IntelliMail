import { useState, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

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

interface UseGmailEmailsResult {
  emails: GmailEmail[];
  account: GmailAccount | null;
  loading: boolean;
  error: string | null;
  needsReconnect: boolean;
  refreshEmails: () => Promise<void>;
  reconnectAccount: () => Promise<void>;
}

export function useGmailEmails(): UseGmailEmailsResult {
  const [emails, setEmails] = useState<GmailEmail[]>([]);
  const [account, setAccount] = useState<GmailAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [needsReconnect, setNeedsReconnect] = useState(false);
  const [accountId] = useLocalStorage("accountId", "");

  const fetchEmails = async () => {
    try {
      setLoading(true);
      setError(null);
      setNeedsReconnect(false);

      const url = accountId
        ? `/api/gmail/emails?limit=20&accountId=${accountId}`
        : "/api/gmail/emails?limit=20";

      const response = await fetch(url);

      if (!response.ok) {
        const data = await response.json();
        if (
          response.status === 401 ||
          data.message?.includes("expired") ||
          data.message?.includes("reconnect")
        ) {
          setNeedsReconnect(true);
          throw new Error(
            `${data.error || "Authentication error"}: ${data.message || "Please reconnect your Gmail account"}`,
          );
        }
        throw new Error(`Failed to fetch emails: ${JSON.stringify(data)}`);
      }

      const data = await response.json();
      setEmails(data.emails);
      setAccount(data.account);
    } catch (err) {
      console.error("Error fetching Gmail emails:", err);
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const refreshEmails = async () => {
    await fetchEmails();
  };

  const reconnectAccount = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/accounts/gmail/auth-url");
      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Failed to get Gmail authentication URL");
      }
    } catch (err) {
      console.error("Error reconnecting Gmail account:", err);
      setError(err instanceof Error ? err.message : "Unknown error occurred");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, [accountId]);

  return {
    emails,
    account,
    loading,
    error,
    needsReconnect,
    refreshEmails,
    reconnectAccount,
  };
}
