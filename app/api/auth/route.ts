import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { code, codeVerifier } = await request.json();

    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/callback`;

    const body = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.NEXT_PUBLIC_DERIV_APP_ID!,
      code,
      code_verifier: codeVerifier,
      redirect_uri: redirectUri,
    });

    const response = await fetch(
      "https://auth.deriv.com/oauth2/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      }
    );

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 }
    );
  }
}
