import { NextRequest, NextResponse } from 'next/server';
import { CreateKeyCommand, VerifyKeyCommand, GetKeyCommand } from "@/lib/unkey";
export const dynamic = 'force-dynamic' // defaults to auto



export async function POST(req:NextRequest) {

  return NextResponse.json(
    {
      success: true,
      message: 'Note Created Successfully!',
      data: "Stuff",
    },
    { status: 201 }
  );
}

// export async function POST(req:NextApiRequest) {
  
//     const createkey = CreateKeyCommand;
    



//     const res = await createkey(req.body.apiId);
    
    
//     // await fetch('https://data.mongodb-api.com/...', {
//     //   method: 'POST',
//     //   headers: {
//     //     'Content-Type': 'application/json',
//     //     'API-Key': process.env.DATA_API_KEY!,
//     //   },
//     //   body: JSON.stringify({ time: new Date().toISOString() }),
//     // })
   
//     // const data = await res.json()
   
//     return res;
//   }