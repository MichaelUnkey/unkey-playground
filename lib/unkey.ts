import { Unkey } from "@unkey/api";
const rootKey = process.env.UNKEY_ROOT_KEY;

//Create Key
export async function CreateKeyCommand(apiId: string) {
  
  if (!rootKey) {
    return { key: null, keyId: null, error: "Root Key Not Found" };
  }

  const unkey = new Unkey({ rootKey: rootKey });
  const { result, error } = await unkey.keys.create({
    apiId: apiId,
    byteLength: 16,
    enabled: true,
  });
  if (error) {
    console.error(error.message);
    return { key: null, keyId: null, error: error.message };
  }

  if (!result) {
    // do not grant access
    return { key: null, keyId: null, error: "Error creating key" };
  }
  return { key: result.key, keyId: result.keyId };
}

//Verify Key
export async function VerifyKeyCommand(key: string, apiId: string) {
  if (!rootKey) {
    return { key: null, keyId: null, error: "Root Key Not Found" };
  }

  const unkey = new Unkey({ rootKey: rootKey });
  const { result, error } = await unkey.keys.verify({
    apiId: apiId,
    key: key,
  });
  if (error) {
    // handle potential network or bad request error
    // a link to our docs will be in the `error.docs` field
    console.error(error.message);
    return { key: null, keyId: null, error: error.message };
  }

  if (!result) {
    // do not grant access
    return { key: null, keyId: null, error: "Error creating key" };
  }
  return result;
}

export async function GetKeyCommand(command: string) {
  if (!rootKey) {
    return "'Root key not found'";
  }
  const unkey = new Unkey({ rootKey: rootKey });
  const { result, error } = await unkey.keys.get({ keyId: command });
  if (error) {
    console.error(error.message);
    return error;
  }
  if (!result) {
    return {};
  }
  return result;
}
