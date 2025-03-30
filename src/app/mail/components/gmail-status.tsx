"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Mail } from "lucide-react";

interface GmailAccount {
  id: string;
  name: string;
  emailAddress: string;
  createdAt: string;
}

export default function GmailStatus() {
  const [status, setStatus] = useState<{
    isConnected: boolean;
    count: number;
    accounts: GmailAccount[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const checkStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Checking Gmail connection status...");

      // First check if user is authenticated
      const authResponse = await fetch("/api/auth/test-auth");

      if (!authResponse.ok) {
        throw new Error("Authentication check failed - please sign in again");
      }

      const authData = await authResponse.json();
      console.log("Authentication status:", authData);

      if (!authData.authenticated) {
        throw new Error("User is not authenticated");
      }

      // Now check Gmail accounts
      const response = await fetch("/api/accounts/gmail/status");

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to check Gmail status");
      }

      const data = await response.json();
      setStatus(data);
      console.log("Gmail connection status:", data);
    } catch (err) {
      console.error("Error checking Gmail status:", err);
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const refreshAccounts = async () => {
    try {
      setRefreshing(true);
      console.log("Refreshing Gmail accounts...");

      // Trigger a refresh of accounts - you could implement an API endpoint for this
      // For now, just re-check the status
      await checkStatus();

      console.log("Gmail accounts refreshed");
    } catch (err) {
      console.error("Error refreshing Gmail accounts:", err);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

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
              Gmail Connection Status
            </CardTitle>
            <CardDescription>
              Check if your Gmail account is connected
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={refreshAccounts}
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
          <p className="text-sm text-muted-foreground">Loading status...</p>
        ) : error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : status ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-medium">Status:</span>
              {status.isConnected ? (
                <Badge variant="success" className="bg-green-500">
                  Connected
                </Badge>
              ) : (
                <Badge variant="destructive">Not Connected</Badge>
              )}
            </div>

            <div>
              <span className="font-medium">
                Connected accounts: {status.count}
              </span>

              {status.accounts.length > 0 ? (
                <div className="mt-2 space-y-2">
                  {status.accounts.map((account) => (
                    <div
                      key={account.id}
                      className="flex items-center justify-between rounded-md border p-2"
                    >
                      <div>
                        <div className="font-medium">{account.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {account.emailAddress}
                        </div>
                      </div>
                      <Badge variant="outline" className="ml-auto">
                        Gmail
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-4 flex flex-col items-center">
                  <p className="mb-3 text-sm text-muted-foreground">
                    No Gmail accounts connected
                  </p>
                  <Button onClick={handleConnect}>Connect Gmail Account</Button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Unable to determine status
          </p>
        )}
      </CardContent>
    </Card>
  );
}
