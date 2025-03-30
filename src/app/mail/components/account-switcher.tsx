"use client";

import * as React from "react";
import { PlusCircle, Mail, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Default account in case the accounts data is undefined
const DEFAULT_ACCOUNTS = [
  {
    label: "Alicia Koch",
    email: "alicia@example.com",
    icon: null,
  },
];

interface AccountSwitcherProps {
  isCollapsed: boolean;
  accounts: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];
  selectedAccount?: string;
  onAccountSelect?: (account: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }) => void;
}

export function AccountSwitcher({
  isCollapsed,
  accounts,
  selectedAccount,
  onAccountSelect,
}: AccountSwitcherProps) {
  const [selectedAccountState, setSelectedAccountState] =
    React.useState<string>(selectedAccount || accounts[0].email);

  // Dialog state for connecting new accounts
  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <>
      <Select 
        value={selectedAccountState} 
        onValueChange={(value) => {
          setSelectedAccountState(value);
          const account = accounts.find(acc => acc.email === value);
          if (account) onAccountSelect?.(account);
        }}
      >
        <SelectTrigger
          className={cn(
            "flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
            isCollapsed &&
              "flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden"
          )}
          aria-label="Select account"
        >
          <SelectValue placeholder="Select an account">
            {accounts.find((account) => account.email === selectedAccountState)?.icon}
            <span className={cn("ml-2", isCollapsed && "hidden")}>
              {
                accounts.find((account) => account.email === selectedAccountState)
                  ?.label
              }
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {accounts.map((account) => (
            <SelectItem key={account.email} value={account.email}>
              <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
                {account.icon}
                {account.email}
              </div>
            </SelectItem>
          ))}
          <div className="px-2 py-1.5">
            <div
              className="flex cursor-pointer items-center rounded-sm px-1 py-1.5 text-sm outline-none hover:bg-accent"
              onClick={() => setDialogOpen(true)}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              <span>Connect another account</span>
            </div>
          </div>
        </SelectContent>
      </Select>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Connect Email Account</DialogTitle>
            <DialogDescription>
              Add a new email account to manage in Lumi.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="gmail" className="mt-4 w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="gmail">Gmail</TabsTrigger>
              <TabsTrigger value="outlook">Outlook</TabsTrigger>
              <TabsTrigger value="imap">IMAP</TabsTrigger>
            </TabsList>

            <TabsContent value="gmail" className="mt-4 space-y-4">
              <div className="flex flex-col items-center space-y-4">
                <Mail className="h-12 w-12 text-primary" />
                <h3 className="text-lg font-medium">Connect Gmail</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Securely connect your Gmail account to Lumi
                </p>
                <button
                  className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                  onClick={() => {
                    // Replace with your actual Gmail OAuth implementation
                    window.location.href =
                      "/api/aurinko/connect?serviceType=Google";
                  }}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Connect Gmail Account
                </button>
              </div>
            </TabsContent>

            <TabsContent value="outlook" className="mt-4 space-y-4">
              <div className="flex flex-col items-center space-y-4">
                <Mail className="h-12 w-12 text-primary" />
                <h3 className="text-lg font-medium">Connect Outlook</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Securely connect your Outlook account to Lumi
                </p>
                <button
                  className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                  onClick={() => {
                    // Replace with your actual Outlook OAuth implementation
                    window.location.href =
                      "/api/aurinko/connect?serviceType=Office365";
                  }}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Connect Outlook Account
                </button>
              </div>
            </TabsContent>

            <TabsContent value="imap" className="mt-4 space-y-4">
              <div className="flex flex-col space-y-4">
                <h3 className="text-lg font-medium">Connect via IMAP</h3>
                <div className="grid gap-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      className="col-span-3"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="password" className="text-right">
                      Password
                    </Label>
                    <Input id="password" type="password" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="imap-server" className="text-right">
                      IMAP Server
                    </Label>
                    <Input
                      id="imap-server"
                      className="col-span-3"
                      placeholder="imap.example.com"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="imap-port" className="text-right">
                      Port
                    </Label>
                    <Input
                      id="imap-port"
                      className="col-span-3"
                      placeholder="993"
                    />
                  </div>
                </div>
                <button
                  className="mt-4 w-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Connect IMAP Account
                </button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}
