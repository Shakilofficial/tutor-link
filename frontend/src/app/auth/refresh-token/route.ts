/* eslint-disable @typescript-eslint/no-unused-vars */

import { getNewToken } from "@/services/authService";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await getNewToken();
    
    if (result.success) {
      return NextResponse.json({ success: true, message: "Token refreshed successfully" });
    } else {
      return NextResponse.json({ success: false, message: result.message }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to refresh token" }, { status: 500 });
  }
}