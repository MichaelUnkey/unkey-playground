"use server";
import curl2Json from "@bany/curl-to-json";
import {
  CreateKeyCommand,
  GetKeyCommand,
  VerifyKeyCommand,
  UpdateKeyCommand,
  GetVerificationsCommand,
  DeleteKeyCommand,
} from "./unkey";

//const apiId = process.env.NEXT_PUBLIC_UNKEY_API_ID;
const urls = {
  createKey: "https://api.unkey.dev/v1/keys.createKey",
  getkey: "https://api.unkey.dev/v1/keys.getKey",
  verifyKey: "https://api.unkey.dev/v1/keys.verifyKey",
  updateKey: "https://api.unkey.dev/v1/keys.updateKey",
  getVerifications: "https://api.unkey.dev/v1/keys.getVerifications",
  deleteKey: "https://api.unkey.dev/v1/keys.deleteKey",
};

export async function HandleCurl(
  curlString: string
) {
  console.log("curlString From HELPER", curlString);
  const res = await GetDataFromString(curlString);
  return JSON.stringify(res);
}

export async function GetDataFromString(
  curlString: string
) {
  const reqString = curl2Json(curlString);
  const params = reqString.params;
  const data = reqString.data;
  
  let url = reqString.url;
  switch (url) {
    case urls.createKey:
      if (!data.apiId) {return { error: "No API ID" };}
        const createRes = await CreateKeyCommand(data.apiId);
        console.log(createRes);
        return createRes;
    case urls.getkey:
      if (!params?.keyId) {return { error: "No key ID" };}
        const getResponse = await GetKeyCommand(params.keyId);
        return getResponse;
    case urls.verifyKey:
      if (!data.key) {return { error: "No key" };}
        if(!data?.apiId) return { error: "No API ID" }
        const verifyRes = await VerifyKeyCommand(data.key, data.apiId);
        return verifyRes;
    case urls.updateKey:
      if (!data.keyId) {
        return { error: "No key ID" };
      }
      if (!data) {
        return { error: "No data" };
      }
        const updateRes = await UpdateKeyCommand(
          data.keyId ?? undefined,
          data.ownerId ?? undefined,
          data.metaData ?? undefined,
          data.expires ? parseInt(data.expires) : undefined,
          data.enabled ?? undefined
        );
        return updateRes;
    case urls.getVerifications:
      if (!params?.keyId) {
        return { error: "No key ID" };
      }
      const verificationsRes = await GetVerificationsCommand(params?.keyId);
      return verificationsRes;
    case urls.deleteKey:
      if (!data.keyId) {
        return { error: "No key ID" };
      }
      const deleteRes = await DeleteKeyCommand(data.keyId);
      return deleteRes;
    default:
  }
  return { error: "Invalid URL" };
}
