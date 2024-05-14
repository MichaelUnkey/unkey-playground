import {StepData} from "@/lib/data";

export async function GET() {
    try {
        const data = StepData;
        console.log("dataObject", data);
        return Response.json(data);
    } catch (error) {
        return  Response.json({error: "Error Step Data Not Found"});
    }
}
