import { GetKeyCommand } from "@/lib/unkey";
import { NextResponse } from "next/server";

export async function GET(req: any, res: NextResponse) {
  const data = await req.json();
  console.log("req", req);

  const keyId = data.params.keyId;

  //const response = await GetKeyCommand(keyId);

  return NextResponse.json({ keyId }, { status: 201 });
}