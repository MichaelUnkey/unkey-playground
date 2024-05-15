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

const apiId = process.env.NEXT_PUBLIC_UNKEY_API_ID;
const urls = {
  createKey: "https://api.unkey.dev/v1/keys.createKey",
  getkey: "https://api.unkey.dev/v1/keys.getKey",
  verifyKey: "https://api.unkey.dev/v1/keys.verifyKey",
  updateKey: "https://api.unkey.dev/v1/keys.updateKey",
  getVerifications: "https://api.unkey.dev/v1/keys.getVerifications",
  deleteKey: "https://api.unkey.dev/v1/keys.deleteKey",
};

export async function HandleCurl(
  curlString: string,
  keyId: string,
  key: string
) {
  const res = await GetDataFromString(curlString, keyId, key);
  return JSON.stringify(res);
}

export async function GetDataFromString(
  curlString: string,
  keyId: string,
  key: string
) {
  const reqString = curl2Json(curlString);
  const testing = false;
  const keyData = {
    keyId: !testing ? keyId : "key_2zD5eYaRgPHd5GFQvJK2gXiMFzCn",
    key: !testing ? key : "3ZbCyxLeugPg8k289354CUYw",
  };

  let url = reqString.url;
  switch (url) {
    case urls.createKey:
      if (apiId) {
        const createRes = await CreateKeyCommand(apiId);
        console.log(createRes);
        return createRes;
      }
      return { error: "No API ID" };

    case urls.getkey:
      const getResponse = await GetKeyCommand(keyData.keyId);
      console.log(getResponse);
      return getResponse;
    case urls.verifyKey:
      const verifyRes = await VerifyKeyCommand(keyData.key, apiId ?? "");
      //console.log(verifyRes);
      return verifyRes;
    case urls.updateKey:
      const updateRes = await UpdateKeyCommand(
        keyData.keyId,
        reqString.data.keyName ?? undefined,
        reqString.data.ownerId ?? undefined,
        reqString.data.metaData ?? undefined,
        reqString.data.expires ?? undefined,
        reqString.data.enabled ?? undefined
      );
      console.log("Update Response", updateRes);
      return updateRes;
    case urls.getVerifications:
      const verificationsRes = await GetVerificationsCommand(keyData.keyId);
      console.log(verificationsRes);
      return verificationsRes;
    case urls.deleteKey:
      const deleteRes = await DeleteKeyCommand(keyData.keyId);
      console.log(deleteRes);
      return deleteRes;
    default:
  }

  return { error: "Invalid URL" };
}
