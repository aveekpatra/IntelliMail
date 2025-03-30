"use server";

import { google } from "googleapis";
import { auth } from "@clerk/nextjs/server";
import { getSubscriptionStatus } from "./stripe-actions";
import { db } from "@/server/db";
import { FREE_ACCOUNTS_PER_USER, PRO_ACCOUNTS_PER_USER } from "@/app/constants";

// Create OAuth2 client
function getOAuth2Client() {
  console.log("Creating OAuth2 client with credentials...");
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${process.env.NEXT_PUBLIC_URL}/api/auth/callback/gmail`,
  );
}

/**
 * Generate the authorization URL for Gmail OAuth
 */
export const getGmailAuthUrl = async () => {
  try {
    console.log("Starting Gmail auth URL generation...");
    const { userId } = await auth();
    if (!userId) {
      console.error("No user ID found in auth");
      throw new Error("User not found");
    }
    console.log("Got user ID:", userId);

    const user = await db.user.upsert({
      where: { id: userId },
      update: {},
      create: {
        id: userId,
        emailAddress: "temp@example.com", // This will be updated by the webhook
        role: "user",
      },
    });
    console.log("User record created/updated:", user);

    // Check subscription limits
    console.log("Checking subscription limits...");
    const isSubscribed = await getSubscriptionStatus();
    console.log("Subscription status:", isSubscribed);

    const accounts = await db.account.count({
      where: { userId },
    });
    console.log("Current account count:", accounts);
    console.log(
      "Account limit:",
      isSubscribed ? PRO_ACCOUNTS_PER_USER : FREE_ACCOUNTS_PER_USER,
    );

    // Temporarily disabled account limits
    /*
    if (user.role === "user") {
      if (isSubscribed) {
        if (accounts >= PRO_ACCOUNTS_PER_USER) {
          console.error("User has reached maximum accounts for subscription", {
            currentAccounts: accounts,
            maxAccounts: PRO_ACCOUNTS_PER_USER,
            isSubscribed: true,
          });
          throw new Error(
            "You have reached the maximum number of accounts for your subscription",
          );
        }
      } else {
        if (accounts >= FREE_ACCOUNTS_PER_USER) {
          console.error("User has reached maximum free accounts", {
            currentAccounts: accounts,
            maxAccounts: FREE_ACCOUNTS_PER_USER,
            isSubscribed: false,
          });
          throw new Error(
            "You have reached the maximum number of accounts for your subscription",
          );
        }
      }
    }
    */

    console.log("Creating OAuth2 client...");
    const oauth2Client = getOAuth2Client();
    const scopes = [
      "https://www.googleapis.com/auth/gmail.readonly",
      "https://www.googleapis.com/auth/gmail.send",
      "https://www.googleapis.com/auth/gmail.compose",
      "https://www.googleapis.com/auth/gmail.modify",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ];
    console.log("Using scopes:", scopes);

    console.log("Generating auth URL with state:", userId);
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: scopes,
      prompt: "consent",
      state: userId,
      include_granted_scopes: true,
    });
    console.log("Auth URL generated successfully:", authUrl);

    return authUrl;
  } catch (error) {
    console.error("Error in getGmailAuthUrl:", error);
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
      });
    }
    throw error;
  }
};

/**
 * Exchange authorization code for tokens
 */
export const getGmailTokens = async (code: string) => {
  try {
    console.log("Starting token exchange process...");
    console.log("Creating OAuth2 client for token exchange...");
    const oauth2Client = getOAuth2Client();

    console.log("Exchanging code for tokens...");
    const { tokens } = await oauth2Client.getToken(code);

    console.log("Token exchange successful");
    if (!tokens.access_token) {
      console.error("No access token received");
      throw new Error("Failed to get access token");
    }

    console.log("Tokens received:", {
      accessTokenExists: !!tokens.access_token,
      refreshTokenExists: !!tokens.refresh_token,
      expiryDate: tokens.expiry_date,
    });

    return {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiryDate: tokens.expiry_date,
    };
  } catch (error) {
    console.error("Error in getGmailTokens:", error);
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
      });
    }
    throw error;
  }
};

/**
 * Get Gmail user information
 */
export const getGmailUserInfo = async (accessToken: string) => {
  try {
    console.log("Starting user info fetch process...");
    console.log("Setting up OAuth2 client with access token...");
    const oauth2Client = getOAuth2Client();
    oauth2Client.setCredentials({ access_token: accessToken });

    console.log("Creating People API client...");
    const peopleApi = google.people({ version: "v1", auth: oauth2Client });

    console.log("Fetching user profile...");
    const profile = await peopleApi.people.get({
      resourceName: "people/me",
      personFields: "emailAddresses,names",
    });

    console.log("User profile fetched successfully");
    const userInfo = {
      email: profile.data.emailAddresses?.[0]?.value || "",
      name: profile.data.names?.[0]?.displayName || "",
    };
    console.log("User info:", userInfo);

    return userInfo;
  } catch (error) {
    console.error("Error in getGmailUserInfo:", error);
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
      });
    }
    throw error;
  }
};

/**
 * Create a Gmail account for syncing emails
 */
export async function createGmailAccount(
  accessToken: string,
  refreshToken: string | null | undefined,
) {
  try {
    console.log("Creating Gmail account with tokens...");
    console.log("Token info:", {
      accessTokenExists: !!accessToken,
      refreshTokenExists: !!refreshToken,
    });

    // Implementation for syncing emails and sending
    const gmailAccount = {
      accessToken,
      refreshToken,

      async syncEmails() {
        console.log("Starting email sync process...");
        // Implement email syncing logic here
        return { success: true, count: 0 };
      },

      async sendEmail(options: { to: string; subject: string; body: string }) {
        console.log("Sending email:", options);
        const oauth2Client = getOAuth2Client();
        oauth2Client.setCredentials({ access_token: accessToken });

        const gmail = google.gmail({ version: "v1", auth: oauth2Client });

        // Format the email according to Gmail API requirements
        const message = [
          `To: ${options.to}`,
          `Subject: ${options.subject}`,
          "Content-Type: text/html; charset=utf-8",
          "",
          options.body,
        ].join("\n");

        const encodedMessage = Buffer.from(message)
          .toString("base64")
          .replace(/\+/g, "-")
          .replace(/\//g, "_")
          .replace(/=+$/, "");

        console.log("Sending email via Gmail API...");
        await gmail.users.messages.send({
          userId: "me",
          requestBody: {
            raw: encodedMessage,
          },
        });

        console.log("Email sent successfully");
        return { success: true };
      },
    };

    console.log("Gmail account created successfully");
    return gmailAccount;
  } catch (error) {
    console.error("Error in createGmailAccount:", error);
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
      });
    }
    throw error;
  }
}

/**
 * Refresh the Gmail access token using the refresh token
 */
export const refreshGmailToken = async (refreshToken: string) => {
  try {
    console.log("Starting token refresh process...");
    const oauth2Client = getOAuth2Client();

    console.log("Setting refresh token...");
    oauth2Client.setCredentials({
      refresh_token: refreshToken,
    });

    console.log("Refreshing access token...");
    const { credentials } = await oauth2Client.refreshAccessToken();

    console.log("Access token refreshed successfully");
    return {
      accessToken: credentials.access_token,
      expiryDate: credentials.expiry_date,
    };
  } catch (error) {
    console.error("Error refreshing Gmail token:", error);
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
      });
    }
    throw error;
  }
};

/**
 * Fetch Gmail emails directly from Gmail API
 */
export const fetchGmailEmails = async (
  accessToken: string,
  maxResults = 20,
  refreshToken?: string | null,
) => {
  try {
    console.log("Starting Gmail email fetch process...");
    console.log("Setting up OAuth2 client with access token...");
    const oauth2Client = getOAuth2Client();
    oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken || undefined,
    });

    console.log("Creating Gmail API client...");
    const gmail = google.gmail({ version: "v1", auth: oauth2Client });

    console.log("Fetching emails from Gmail API...");
    const response = await gmail.users.messages.list({
      userId: "me",
      maxResults: maxResults,
      q: "in:inbox",
    });

    console.log(`Retrieved ${response.data.messages?.length || 0} email IDs`);

    if (!response.data.messages || response.data.messages.length === 0) {
      console.log("No emails found");
      return [];
    }

    // Get email details for each message ID
    console.log("Fetching email details...");
    const emails = await Promise.all(
      response.data.messages.map(async (message) => {
        if (!message.id) return null;

        const emailDetail = await gmail.users.messages.get({
          userId: "me",
          id: message.id,
        });

        const headers = emailDetail.data.payload?.headers || [];

        // Extract email headers
        const subject =
          headers.find((h) => h.name === "Subject")?.value || "(No subject)";
        const from = headers.find((h) => h.name === "From")?.value || "";
        const to = headers.find((h) => h.name === "To")?.value || "";
        const date = headers.find((h) => h.name === "Date")?.value || "";

        // Extract email body (text or HTML)
        let body = "";
        const parts = emailDetail.data.payload?.parts || [];

        if (parts.length > 0) {
          // Try to find HTML body first
          const htmlPart = parts.find((p) => p.mimeType === "text/html");
          const textPart = parts.find((p) => p.mimeType === "text/plain");

          if (htmlPart && htmlPart.body && htmlPart.body.data) {
            body = Buffer.from(htmlPart.body.data, "base64").toString("utf-8");
          } else if (textPart && textPart.body && textPart.body.data) {
            body = Buffer.from(textPart.body.data, "base64").toString("utf-8");
          }
        } else if (emailDetail.data.payload?.body?.data) {
          // For single-part messages
          body = Buffer.from(
            emailDetail.data.payload.body.data,
            "base64",
          ).toString("utf-8");
        }

        // Create a snippet from the body (first 100 chars)
        const snippet =
          body.substring(0, 100) + (body.length > 100 ? "..." : "");

        return {
          id: message.id,
          threadId: emailDetail.data.threadId,
          labelIds: emailDetail.data.labelIds || [],
          snippet: emailDetail.data.snippet || snippet,
          subject,
          from,
          to,
          date,
          body,
        };
      }),
    );

    console.log(`Fetched details for ${emails.filter(Boolean).length} emails`);
    return emails.filter(Boolean);
  } catch (error) {
    console.error("Error in fetchGmailEmails:", error);
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
      });
    }
    throw error;
  }
};
