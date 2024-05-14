"use server";

import { CreateKeyCommand } from "@/lib/unkey";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  const jsonData = await req.json();
  if (jsonData?.apiId) {
    const apiId = await jsonData.apiId;
    const res = await CreateKeyCommand(apiId);
    return Response.json(res);
  }
}
