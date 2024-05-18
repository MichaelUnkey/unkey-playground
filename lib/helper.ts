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

const urls = {
  createKey: "https://api.unkey.dev/v1/keys.createKey",
  getkey: "https://api.unkey.dev/v1/keys.getKey",
  verifyKey: "https://api.unkey.dev/v1/keys.verifyKey",
  updateKey: "https://api.unkey.dev/v1/keys.updateKey",
  getVerifications: "https://api.unkey.dev/v1/keys.getVerifications",
  deleteKey: "https://api.unkey.dev/v1/keys.deleteKey",
};

export async function handleCurlServer(
  curlString: string
) {
  const res = await getDataFromString(curlString);
  console.log(res);
  
  return res;
}

export async function getDataFromString(
  curlString: string
) {
  const reqString = curl2Json(curlString);
  const params = reqString.params;
  const data = reqString.data;
  const url = reqString.url;
  switch (url) {
    case urls.createKey:
        const createRes = await CreateKeyCommand(data.apiId);
        console.log(createRes);
        return createRes;
    case urls.getkey:
        const getResponse = await GetKeyCommand(params?.keyId ?? "");
        return getResponse;
    case urls.verifyKey:
        const verifyRes = await VerifyKeyCommand(data.key, data.apiId);
        return verifyRes;
    case urls.updateKey:
        const updateRes = await UpdateKeyCommand(
          data.keyId ?? undefined,
          data.ownerId ?? undefined,
          data.metaData ?? undefined,
          data.expires ? parseInt(data.expires) : undefined,
          data.enabled ?? undefined
        );
        return updateRes;
    case urls.getVerifications:
      const verificationsRes = await GetVerificationsCommand(params?.keyId ?? "");
      return verificationsRes;
    case urls.deleteKey:
      const deleteRes = await DeleteKeyCommand(data.keyId);
      return deleteRes;
    default:
  }
  return { error: "Invalid URL" };
}
