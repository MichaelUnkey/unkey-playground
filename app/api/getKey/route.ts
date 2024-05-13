import { GetKeyCommand } from "@/lib/unkey";
import { NextResponse } from "next/server";

export async function GET(req: any) {

  const { searchParams } = new URL(req.url)
  
  const keyId = searchParams.get("keyId");
  const response = await GetKeyCommand(keyId ?? "");

  return response;
}
