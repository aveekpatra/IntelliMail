import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { db } from "@/server/db";

export async function GET(req: Request) {
  try {
    console.log("[TEST-AUTH] Testing authentication...");

    // Get headers
    const headersList = headers();
    console.log("[TEST-AUTH] Headers received");

    // Get user from auth
    const { userId } = await auth({ headersList });

    if (!userId) {
      console.error("[TEST-AUTH] No user ID found in auth");
      return NextResponse.json(
        { error: "Unauthorized", authenticated: false },
        { status: 401 },
      );
    }

    console.log("[TEST-AUTH] Authenticated user:", userId);

    // Check for Gmail accounts
    const accounts = await db.account.findMany({
      where: { userId, provider: "Gmail" },
      select: {
        id: true,
        emailAddress: true,
        name: true,
        provider: true,
        token: true,
        refreshToken: true,
      },
    });

    console.log(`[TEST-AUTH] Found ${accounts.length} Gmail accounts`);

    // Mask tokens for security
    const maskedAccounts = accounts.map((account) => ({
      ...account,
      token: account.token ? `${account.token.substring(0, 10)}...` : null,
      refreshToken: account.refreshToken
        ? `${account.refreshToken.substring(0, 5)}...`
        : null,
      hasRefreshToken: !!account.refreshToken,
    }));

    return NextResponse.json({
      authenticated: true,
      userId,
      accounts: maskedAccounts,
      totalAccounts: accounts.length,
    });
  } catch (error) {
    console.error("[TEST-AUTH] Error testing auth:", error);

    return NextResponse.json(
      {
        error: "Authentication test failed",
        message: error instanceof Error ? error.message : "Unknown error",
        authenticated: false,
      },
      { status: 500 },
    );
  }
}
