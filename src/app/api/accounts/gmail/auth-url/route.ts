import { getGmailAuthUrl } from "@/lib/gmail";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("Generating Gmail auth URL...");
    const authUrl = await getGmailAuthUrl();
    console.log("Auth URL generated successfully");

    return NextResponse.json({ url: authUrl });
  } catch (error) {
    console.error("Error generating auth URL:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to generate auth URL", message: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: "Failed to generate auth URL" },
      { status: 500 },
    );
  }
}
