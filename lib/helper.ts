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
  keyId: string | undefined,
  key: string | undefined
) {
  const res = await GetDataFromString(curlString, keyId, key);
  return JSON.stringify(res);
}

export async function GetDataFromString(
  curlString: string,
  keyId: string | undefined,
  key: string | undefined
) {
  const reqString = curl2Json(curlString);
  // const testing = true;
  // const keyData = {
  //   keyId: !testing ? keyId : "key_2zD5eYaRgPHd5GFQvJK2gXiMFzCn",
  //   key: !testing ? key : "3ZbCyxLeugPg8k289354CUYw",
  // };

  let url = reqString.url;
  switch (url) {
    case urls.createKey:
      // if (testing) {
      //   return keyData;
      // }
      if (apiId) {
        const createRes = await CreateKeyCommand(apiId);
        console.log(createRes);
        return createRes;
      }
      return { error: "No API ID" };

    case urls.getkey:
      if (keyId) {
        const getResponse = await GetKeyCommand(keyId);

        return getResponse;
      }
      return { error: "No key ID" };

    case urls.verifyKey:
      
      if (key) {
        if(!apiId) return { error: "No API ID" }
        const verifyRes = await VerifyKeyCommand(key, apiId);
        return verifyRes;
      }
      return { error: "No key" };

    case urls.updateKey:
      if (!keyId) {
        return { error: "No key ID" };
      }
      if (!reqString.data) {
        return { error: "No data" };
      }
      if(keyId){
        const updateRes = await UpdateKeyCommand(
          reqString.data.keyId ?? undefined,
          reqString.data.keyName ?? undefined,
          reqString.data.ownerId ?? undefined,
          reqString.data.metaData ?? undefined,
          reqString.data.expires ?? undefined,
          reqString.data.enabled ?? undefined
        );
        if(updateRes) return updateRes;
      }
      
      return { error: "Invalid data" };
    case urls.getVerifications:
      if (!reqString.data.keyId) {
        return { error: "No key ID" };
      }
      const verificationsRes = await GetVerificationsCommand(reqString.data.keyId);
      if(verificationsRes) return verificationsRes;
      return { error: "Invalid data"};
    case urls.deleteKey:
      if (!reqString.data.keyId) {
        return { error: "No key ID" };
      }
      const deleteRes = await DeleteKeyCommand(reqString.data.keyId);
      if(deleteRes) {return deleteRes;}
      return { error: "Invalid data" };
    default:
  }

  return { error: "Invalid URL" };
}
