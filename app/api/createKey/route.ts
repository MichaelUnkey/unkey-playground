"use server";

import { CreateKeyCommand, VerifyKeyCommand, GetKeyCommand } from "@/lib/unkey";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: any, res: NextResponse) {
  const data = await req.json();
  console.log("data", data);
  //Delete me after the rest is working properly
  //return NextResponse.json({ key: "key_1234", keyId: "key1234567" }, { status: 201 });
  if (data?.apiId) {
    const apiId = await data.apiId;
    try {
      const key = await CreateKeyCommand(apiId);
      if (key.error) {
        return NextResponse.json({ error: key.error }, { status: 500 });
      }
      if (key.key) {
        console.log("Key", key.key, "keyId", key.keyId);

        return NextResponse.json(
          { key: key.key, keyId: key.keyId },
          { status: 201 }
        );
      }

      return NextResponse.json(key, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: "Error doing this" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "No apiId" }, { status: 500 });
  }
}
