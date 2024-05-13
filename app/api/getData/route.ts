import StepData from "@/lib/data";

export async function GET() {
    try {
        const data = await StepData();
        //console.log("dataObject", dataObject);
        return Response.json(data);
    } catch (error) {
        return  Response.json({error: "Error Step Data Not Found"}) ;
    }
}
