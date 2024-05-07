import { NextResponse } from "next/server";
import { StepData } from "@/lib/data";
export async function GET(req: any, res: NextResponse) {
    const getData = StepData;
    try {
        const dataObject = await getData();
        //console.log("dataObject", dataObject);
        return NextResponse.json(dataObject, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Error Step Data Not Found" }, { status: 500 });
    }
 
  
  

 
}
