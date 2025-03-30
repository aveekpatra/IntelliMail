"use client";

import { useState } from "react";
import GmailStatus from "./components/gmail-status";
import { Button } from "@/components/ui/button";
import { BugIcon, XIcon } from "lucide-react";

export default function GmailDebug() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-96 rounded-lg border bg-background shadow-lg">
          <div className="flex items-center justify-between border-b p-3">
            <div className="flex items-center">
              <BugIcon className="mr-2 h-4 w-4" />
              <h3 className="font-medium">Gmail Debug</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8"
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
          <div className="p-3">
            <GmailStatus />
          </div>
        </div>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 hover:bg-blue-600"
        >
          <BugIcon className="mr-2 h-4 w-4" />
          Check Gmail Status
        </Button>
      )}
    </div>
  );
}
