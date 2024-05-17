'use server'
import { Unkey } from "@unkey/api";
const rootKey = process.env.UNKEY_ROOT_KEY;
//console.log("Root Key", rootKey);

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
    //console.error(error.message);
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
    //console.error(error.message);
    return { key: null, keyId: null, error: error.message };
  }

  if (!result) {
    // do not grant access
    return { key: null, keyId: null, error: "Error creating key" };
  }
  return result;
}
// Get Key
export async function GetKeyCommand(keyId: string) {
  if (!rootKey) {
    return "'Root key not found'";
  }
  const unkey = new Unkey({ rootKey: rootKey });
  const { result, error } = await unkey.keys.get({keyId: keyId});

  if(error){
    return error.message;
  }
  
  return result;
}

// Update Key
export async function UpdateKeyCommand(
  keyId: string,
  ownerId: string | undefined,
  metaData: {} | undefined,
  expires: number | undefined, 
  enabled: boolean | undefined
) {
  if (!rootKey) {
    return "'Root key not found'";
  }
  if(!keyId){
    console.log("No Key ID from UNKEY.ts");
    
  }
  console.log("Key ID", keyId);
  
  const unkey = new Unkey({ rootKey: rootKey });
  const { result, error } = await unkey.keys.update({
    keyId: keyId, 
    ownerId: ownerId ?? undefined, 
    meta: metaData ?? undefined, 
    expires: expires ?? undefined, 
    enabled: enabled ?? undefined
  });

  if(error){
    return error.message;
  }
  
  return result;
}

// Get Verifications
export async function GetVerificationsCommand(keyId: string) {
  if (!rootKey) {
    return "'Root key not found'";
  }
  const unkey = new Unkey({ rootKey: rootKey });
  const { result, error } = await unkey.keys.getVerifications({keyId: keyId});
  if(error){
    return error.message;
  }
  return result;

}

export async function DeleteKeyCommand(keyId: string) {
  if (!rootKey) {
    return "'Root key not found'";
  }
  const unkey = new Unkey({ rootKey: rootKey });
  const { result, error } = await unkey.keys.delete({keyId: keyId});
  if(error){
    return error.message;
  }
  return result;
}