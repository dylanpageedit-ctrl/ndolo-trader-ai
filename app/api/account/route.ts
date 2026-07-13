import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  try {
    const auth = request.headers.get("authorization");

    if (!auth) {
      return NextResponse.json(
        { error: "Missing Authorization header" },
        { status: 401 }
      );
    }

    const response = await axios.get(
      "https://api.deriv.com/user/account",
      {
        headers: {
          Authorization: auth,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.response?.data || error.message,
      },
      { status: 500 }
    );
  }
}
