"use server";

import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Get the authenticated user - make sure auth() is properly awaited
    const session = await auth();
    const userId = session.userId;

    if (!userId) {
      console.error("No user ID found in auth");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get all Gmail accounts for the user
    const gmailAccounts = await db.account.findMany({
      where: {
        userId: userId,
        provider: "Gmail",
      },
      select: {
        id: true,
        emailAddress: true,
        name: true,
        // Remove createdAt since it doesn't exist in the Account model
      },
    });

    // Add timestamp instead of using createdAt
    const accountsWithTimestamp = gmailAccounts.map((acc) => ({
      ...acc,
      createdAt: new Date().toISOString(), // Using current time as fallback
    }));

    console.log(
      `[GMAIL STATUS] Found ${gmailAccounts.length} Gmail accounts for user ${userId}:`,
      accountsWithTimestamp.map((acc) => ({
        email: acc.emailAddress,
        name: acc.name,
        connected: new Date().toLocaleString(), // Use current time as fallback
      })),
    );

    // Check if there are any Gmail accounts
    const isConnected = gmailAccounts.length > 0;

    return NextResponse.json({
      isConnected,
      count: gmailAccounts.length,
      accounts: accountsWithTimestamp,
    });
  } catch (error) {
    console.error("[GMAIL STATUS] Error checking Gmail accounts:", error);
    return NextResponse.json(
      { error: "Failed to check Gmail accounts" },
      { status: 500 },
    );
  }
}
