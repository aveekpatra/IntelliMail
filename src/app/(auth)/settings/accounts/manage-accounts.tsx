"use client";

import { useState, useEffect } from "react";
import { Mail, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Account = {
  id: string;
  provider: string;
  emailAddress: string;
  name: string;
  createdAt: string;
};

export default function ManageAccounts({
  maxAccounts,
}: {
  maxAccounts: number;
}) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      console.log("Fetching accounts...");
      const response = await fetch("/api/accounts");

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(
          `Failed to fetch accounts: ${response.status} ${errorText}`,
        );
      }

      const data = await response.json();
      console.log("Accounts data:", data);

      if (!data.accounts || !Array.isArray(data.accounts)) {
        console.error("Invalid accounts data format:", data);
        throw new Error("Invalid accounts data format");
      }

      setAccounts(data.accounts);
    } catch (error) {
      console.error("Error fetching accounts:", error);
      toast.error("Failed to load accounts");
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async (accountId: string) => {
    try {
      setDeleting(accountId);
      const response = await fetch("/api/accounts/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accountId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete account");
      }

      // Remove the account from the state
      setAccounts((prevAccounts) =>
        prevAccounts.filter((account) => account.id !== accountId),
      );

      toast.success("Account deleted successfully");
      router.refresh();
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Failed to delete account");
    } finally {
      setDeleting(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex justify-between">
        <h2 className="text-xl font-semibold">
          Your Connected Accounts ({accounts.length}/{maxAccounts})
        </h2>
        <Button
          onClick={() => router.push("/mail")}
          disabled={accounts.length >= maxAccounts}
        >
          Connect New Account
        </Button>
      </div>

      {accounts.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <Mail className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
          <h3 className="mb-2 text-lg font-medium">No Connected Accounts</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Connect your email accounts to start using Lumi.
          </p>
          <Button onClick={() => router.push("/mail")}>Connect Account</Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {accounts.map((account) => (
            <Card key={account.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="text-base">{account.name}</CardTitle>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Account</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete the account{" "}
                          <strong>{account.emailAddress}</strong>? This action
                          cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={(e) => {
                            e.preventDefault();
                            deleteAccount(account.id);
                          }}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          {deleting === account.id ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="mr-2 h-4 w-4" />
                          )}
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                <CardDescription className="truncate">
                  {account.emailAddress}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  <div className="mb-1 flex items-center">
                    <span className="mr-2 font-medium">Provider:</span>
                    <span>{account.provider}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 font-medium">Connected:</span>
                    <span>{formatDate(account.createdAt)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
