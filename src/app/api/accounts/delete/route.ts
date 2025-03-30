"use server";

import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    console.log("Account deletion request received");

    // Get the authenticated user with proper auth awaiting
    const session = await auth();
    const userId = session.userId;

    if (!userId) {
      console.error("No user ID found in auth");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the account ID from request body
    const { accountId } = await req.json();
    if (!accountId) {
      console.error("No account ID provided");
      return NextResponse.json(
        { error: "Account ID is required" },
        { status: 400 },
      );
    }

    console.log(`Attempting to delete account ${accountId} for user ${userId}`);

    // Check if account belongs to user
    const account = await db.account.findUnique({
      where: {
        id: accountId,
        userId: userId,
      },
    });

    if (!account) {
      console.error(
        `Account ${accountId} not found or doesn't belong to user ${userId}`,
      );
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }

    // Delete account
    await db.account.delete({
      where: {
        id: accountId,
      },
    });

    console.log(`Account ${accountId} successfully deleted`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting account:", error);
    return NextResponse.json(
      { error: "Failed to delete account" },
      { status: 500 },
    );
  }
}
