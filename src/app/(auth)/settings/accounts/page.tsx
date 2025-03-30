import ManageAccounts from "./manage-accounts";
import GmailStatus from "@/app/mail/components/gmail-status";
import GmailEmails from "@/app/mail/components/gmail-emails";
import { getSubscriptionStatus } from "@/lib/stripe-actions";
import { FREE_ACCOUNTS_PER_USER, PRO_ACCOUNTS_PER_USER } from "@/app/constants";

export const metadata = {
  title: "Manage Accounts - Lumi",
  description: "Manage your connected email accounts",
};

export default async function AccountsPage() {
  const isSubscribed = await getSubscriptionStatus();
  const maxAccounts = isSubscribed
    ? PRO_ACCOUNTS_PER_USER
    : FREE_ACCOUNTS_PER_USER;

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">Manage Connected Accounts</h1>
      <div className="mb-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-950">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          Your plan allows up to{" "}
          <span className="font-bold">{maxAccounts}</span> connected{" "}
          {maxAccounts === 1 ? "account" : "accounts"}.
          {!isSubscribed && (
            <span>
              {" "}
              Upgrade to Pro for up to {PRO_ACCOUNTS_PER_USER} accounts.
            </span>
          )}
        </p>
      </div>

      {/* Debug section to check Gmail status */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Gmail Connection Status</h2>
        <GmailStatus />
      </div>

      {/* Display Gmail emails */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Your Gmail Inbox</h2>
        <GmailEmails />
      </div>

      <ManageAccounts maxAccounts={maxAccounts} />
    </div>
  );
}
