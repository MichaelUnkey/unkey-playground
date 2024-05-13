"use server";

export async function GET() {
  const apiId = process.env.NEXT_PUBLIC_UNKEY_API_ID;
  return apiId;
}
