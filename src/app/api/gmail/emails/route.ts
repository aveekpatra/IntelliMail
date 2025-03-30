"use server";

import { db } from "@/server/db";
import { fetchGmailEmails, refreshGmailToken } from "@/lib/gmail";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET(req: Request) {
  try {
    // Get query parameters
    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get("limit") || "20");
    const accountId = url.searchParams.get("accountId");

    console.log(
      `[GMAIL EMAILS] Fetching emails, limit: ${limit}, accountId: ${accountId}`,
    );

    // Get user from auth - explicitly wait for headers
    const headersList = headers();
    const { userId } = await auth({ headersList });

    if (!userId) {
      console.error("[GMAIL EMAILS] No user ID found in auth");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("[GMAIL EMAILS] Authenticated user:", userId);

    // If accountId is provided, use that specific account
    // Otherwise, get the first Gmail account
    let account;
    if (accountId) {
      account = await db.account.findUnique({
        where: {
          id: accountId,
          userId: userId,
          provider: "Gmail",
        },
      });
    } else {
      account = await db.account.findFirst({
        where: {
          userId: userId,
          provider: "Gmail",
        },
      });
    }

    if (!account) {
      console.error("[GMAIL EMAILS] No Gmail account found for user:", userId);
      return NextResponse.json(
        { error: "No Gmail account found" },
        { status: 404 },
      );
    }

    console.log(
      `[GMAIL EMAILS] Found account: ${account.emailAddress}, ID: ${account.id}`,
    );

    try {
      // Try to fetch emails using the current access token
      console.log("Attempting to fetch emails with current access token");
      console.log("Token info:", {
        tokenLength: account.token?.length || 0,
        hasRefreshToken: !!account.refreshToken,
        refreshTokenLength: account.refreshToken?.length || 0,
      });
      const emails = await fetchGmailEmails(
        account.token,
        limit,
        account.refreshToken,
      );

      console.log(
        `[GMAIL EMAILS] Successfully fetched ${emails.length} emails`,
      );

      return NextResponse.json({
        emails,
        account: {
          id: account.id,
          emailAddress: account.emailAddress,
          name: account.name,
        },
      });
    } catch (error) {
      // If the token is invalid, try refreshing it
      if (
        error instanceof Error &&
        (error.message.includes("Invalid Credentials") ||
          error.message.includes("401") ||
          error.message.includes("invalid_grant") ||
          error.message.includes("unauthorized")) &&
        account.refreshToken
      ) {
        console.log(
          "[GMAIL EMAILS] Access token expired, attempting to refresh",
        );
        console.log("Refresh token info:", {
          refreshTokenExists: !!account.refreshToken,
          refreshTokenLength: account.refreshToken?.length || 0,
        });

        try {
          // Refresh the token
          const { accessToken } = await refreshGmailToken(account.refreshToken);

          // Update the token in the database
          await db.account.update({
            where: { id: account.id },
            data: { token: accessToken },
          });

          console.log(
            "[GMAIL EMAILS] Token refreshed successfully, retrying fetch",
          );
          console.log("New token info:", {
            tokenLength: accessToken?.length || 0,
          });

          // Retry with the new token
          const emails = await fetchGmailEmails(
            accessToken,
            limit,
            account.refreshToken,
          );

          console.log(
            `[GMAIL EMAILS] Successfully fetched ${emails.length} emails after token refresh`,
          );

          return NextResponse.json({
            emails,
            account: {
              id: account.id,
              emailAddress: account.emailAddress,
              name: account.name,
            },
          });
        } catch (refreshError) {
          console.error(
            "[GMAIL EMAILS] Failed to refresh token:",
            refreshError,
          );
          console.error(
            "Error details:",
            refreshError instanceof Error
              ? refreshError.message
              : "Unknown error",
          );
          return NextResponse.json(
            {
              error: "Failed to refresh Gmail access token",
              message:
                "Your Gmail access has expired. Please reconnect your account.",
            },
            { status: 401 },
          );
        }
      }

      // If not a token issue or no refresh token available, rethrow the error
      throw error;
    }
  } catch (error) {
    console.error("[GMAIL EMAILS] Error fetching emails:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: "Failed to fetch emails",
          message: error.message,
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        error: "Failed to fetch emails",
      },
      { status: 500 },
    );
  }
}
