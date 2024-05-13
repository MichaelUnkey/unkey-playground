"use server";
import curl2Json from "@bany/curl-to-json";
import StepData from "./data";

const apiId = process.env.NEXT_PUBLIC_UNKEY_API_ID;
const urls = {
  createKey: "https://api.unkey.dev/v1/keys.createKey",
  getkey: "https://api.unkey.dev/v1/keys.getKey",
  verifyKey: "https://api.unkey.dev/v1/keys.verifyKey",
  updateKey: "https://api.unkey.dev/v1/keys.updateKey",
  getVerifications: "https://api.unkey.dev/v1/keys.getVerifications",
};
export async function GetApiId() {
  return apiId;
}


const stepData = StepData();
export async function HandleCurl(
  curlString: string,
  keyId: string | undefined,
  
) {
  const reqString = curl2Json(curlString);
  const reqUrl = await GetUrlFromString(curlString, keyId);
  reqString.url = reqUrl;
  return reqString;
}
export async function SwapValues(data: string) {
  let newData = data;
  if (apiId) {
    newData = data.replace("<apiId>", apiId);
  }
  // if (keyName !== "") {
  //   curlString.replace("<key>", keyName);
  // }
  // if (keyId !== "") {
  //   curlString.replace("<keyId>", keyId);
  // }
  return newData;
}
export async function GetUrlFromString(
  curlString: string,
  keyId: string | undefined
) {
  const reqString = curl2Json(curlString);

  let url = reqString.url;
  switch (url) {
    case urls.createKey:
      url = "/api/createKey";
      break;
    case urls.getkey:
      url = `/api/getKey?keyId=${keyId}`;
      break;
    case urls.verifyKey:
      url = "/api/verifyKey";
      break;
    case urls.updateKey:
      url = "/api/updateKey";
      break;
    case urls.getVerifications:
      url = "/api/getVerifications";
      break;
    default:
  }

  return url;
}
export async function GetData(stepKey: string) {
  const data = await stepData.then((res) => res);
  let dataString = JSON.stringify(data);
  dataString = await SwapValues(dataString);
  const newData = JSON.parse(dataString);
  if (apiId) {
    data.shared.apiId = apiId;
    //console.log("Helper apiId", apiId);
  }
  //console.log("Helper data", data);

  switch (stepKey) {
    case "all":
      return newData;
      break;
    case "step1":
      return newData.step1;
      break;
    case "step2":
      return newData.step2;
      break;
    case "step3":
      return newData.step3;
      break;
    case "step4":
      return newData.step4;
      break;
    case "step5":
      return newData.step5;
      break;
    case "step6":
      return newData.step6;
      break;
    case "step7":
      return newData.step7;
      break;
    case "step8":
      return newData.step8;
      break;
    case "step9":
      return newData.step9;
      break;
    case "shared":
      return newData.shared;
      break;
    default:
      return newData;
      break;
  }
}
