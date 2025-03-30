"use server";

import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("Account list request received");

    // Get the authenticated user with proper auth awaiting
    const session = await auth();
    const userId = session.userId;

    if (!userId) {
      console.error("No user ID found in auth");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get all accounts for the user
    const accounts = await db.account.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        provider: true,
        emailAddress: true,
        name: true,
        // createdAt is not in the schema, so remove it
      },
      orderBy: {
        id: "desc", // Use id instead of createdAt for ordering
      },
    });

    // Add fake createdAt field to match the expected structure in the UI
    const accountsWithCreatedAt = accounts.map((account) => ({
      ...account,
      createdAt: new Date().toISOString(), // Add a current date since we don't have actual creation dates
    }));

    console.log(`Found ${accounts.length} accounts for user ${userId}`);

    return NextResponse.json({ accounts: accountsWithCreatedAt });
  } catch (error) {
    console.error("Error listing accounts:", error);
    return NextResponse.json(
      { error: "Failed to list accounts" },
      { status: 500 },
    );
  }
}
