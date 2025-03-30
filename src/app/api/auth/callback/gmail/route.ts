import { NextResponse } from "next/server";
import { getGmailTokens, getGmailUserInfo } from "@/lib/gmail";
import { db } from "@/server/db";

export const GET = async (req: Request) => {
  console.log("[GMAIL CALLBACK] Processing Gmail OAuth callback...");

  try {
    // Get the user ID from the URL state parameter
    const url = new URL(req.url);
    const errorParam = url.searchParams.get("error");

    if (errorParam) {
      console.error("[GMAIL CALLBACK] Auth error from Google:", errorParam);
      return NextResponse.redirect(
        new URL(`/mail?error=${errorParam}`, req.url),
      );
    }

    // Get the authorization code from the URL
    const code = url.searchParams.get("code");
    if (!code) {
      console.error(
        "[GMAIL CALLBACK] No authorization code provided in callback",
      );
      return NextResponse.redirect(new URL("/mail?error=no_code", req.url));
    }

    console.log("[GMAIL CALLBACK] Received authorization code");

    // Get the user ID from the state parameter
    const userState = url.searchParams.get("state");
    if (!userState) {
      console.error("[GMAIL CALLBACK] No user ID found in state parameter");
      return NextResponse.redirect(new URL("/mail?error=no_user", req.url));
    }

    console.log("[GMAIL CALLBACK] User ID from state:", userState);

    // Get the tokens from the authorization code
    console.log("[GMAIL CALLBACK] Exchanging code for tokens...");
    const tokens = await getGmailTokens(code);
    console.log("[GMAIL CALLBACK] Tokens received successfully:", {
      accessTokenLength: tokens.accessToken?.length,
      hasRefreshToken: !!tokens.refreshToken,
      refreshTokenLength: tokens.refreshToken?.length,
    });

    // Check if we have a refresh token
    if (!tokens.refreshToken) {
      console.warn(
        "[GMAIL CALLBACK] No refresh token received - this will limit token refresh capabilities",
      );
    }

    // Get the user info
    console.log("[GMAIL CALLBACK] Fetching user info...");
    const userInfo = await getGmailUserInfo(tokens.accessToken);
    console.log("[GMAIL CALLBACK] User info fetched:", userInfo);

    // Generate a unique account ID
    const accountId = `gmail_${crypto.randomUUID()}`;
    console.log("[GMAIL CALLBACK] Generated account ID:", accountId);

    // Check if an account with this email already exists
    const existingAccount = await db.account.findFirst({
      where: {
        userId: userState,
        emailAddress: userInfo.email,
        provider: "Gmail",
      },
    });

    if (existingAccount) {
      console.log(
        "[GMAIL CALLBACK] Account already exists, updating tokens instead of creating new account",
      );
      // Update the existing account with new tokens
      const updatedAccount = await db.account.update({
        where: { id: existingAccount.id },
        data: {
          token: tokens.accessToken,
          refreshToken:
            tokens.refreshToken || existingAccount.refreshToken || "",
        },
      });
      console.log("[GMAIL CALLBACK] Account tokens updated successfully:", {
        id: updatedAccount.id,
        email: updatedAccount.emailAddress,
        hasRefreshToken: !!updatedAccount.refreshToken,
      });
    } else {
      // Save the account to the database
      console.log("[GMAIL CALLBACK] Creating new account in database...");
      try {
        // Check if user exists in database
        const user = await db.user.findUnique({
          where: { id: userState },
        });

        if (!user) {
          console.error(
            "[GMAIL CALLBACK] User not found in database:",
            userState,
          );
          // Create user if they don't exist
          await db.user.create({
            data: {
              id: userState,
              emailAddress: userInfo.email,
            },
          });
          console.log(
            "[GMAIL CALLBACK] Created new user in database:",
            userState,
          );
        }

        const createdAccount = await db.account.create({
          data: {
            id: accountId,
            userId: userState,
            provider: "Gmail",
            emailAddress: userInfo.email,
            name: userInfo.name,
            token: tokens.accessToken,
            refreshToken: tokens.refreshToken || "",
            nextDeltaToken: "",
          },
        });
        console.log("[GMAIL CALLBACK] ✅ GMAIL ACCOUNT CREATED SUCCESSFULLY!", {
          id: createdAccount.id,
          email: createdAccount.emailAddress,
          userId: createdAccount.userId,
          hasRefreshToken: !!createdAccount.refreshToken,
        });
      } catch (dbError) {
        console.error(
          "[GMAIL CALLBACK] Error creating account in database:",
          dbError,
        );
        console.error("[GMAIL CALLBACK] Account data:", {
          id: accountId,
          userId: userState,
          provider: "Gmail",
          emailAddress: userInfo.email,
          name: userInfo.name,
          tokenLength: tokens.accessToken.length,
          hasRefreshToken: !!tokens.refreshToken,
        });
        throw dbError;
      }
    }

    // Get total Gmail accounts for this user
    const totalGmailAccounts = await db.account.count({
      where: {
        userId: userState,
        provider: "Gmail",
      },
    });
    console.log(
      `[GMAIL CALLBACK] User now has ${totalGmailAccounts} Gmail ${totalGmailAccounts === 1 ? "account" : "accounts"} connected.`,
    );

    // Start initial email sync in the background
    console.log("[GMAIL CALLBACK] Starting background initial sync...");
    try {
      const syncResponse = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/initial-sync`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accountId,
            userId: userState,
          }),
        },
      );

      if (syncResponse.ok) {
        console.log("[GMAIL CALLBACK] Initial sync request successful");
      } else {
        console.error(
          "[GMAIL CALLBACK] Initial sync request failed:",
          await syncResponse.text(),
        );
      }
    } catch (syncError) {
      console.error(
        "[GMAIL CALLBACK] Error requesting initial sync:",
        syncError,
      );
    }

    console.log("[GMAIL CALLBACK] Redirecting to mail page...");
    return NextResponse.redirect(new URL("/mail?success=true", req.url));
  } catch (error) {
    console.error("[GMAIL CALLBACK] Error in Gmail callback:", error);
    if (error instanceof Error) {
      console.error("[GMAIL CALLBACK] Error details:", {
        message: error.message,
        stack: error.stack,
      });
    }

    return NextResponse.redirect(
      new URL("/mail?error=callback_failed", req.url),
    );
  }
};
