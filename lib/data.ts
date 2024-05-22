const apiId = process.env.NEXT_PUBLIC_UNKEY_API_ID;
if (!apiId) {
  throw new Error("Missing apiId");
}
export type stepDataType = {
  [key: number]: {
    step: number;
    apiId: string | undefined;
    name: string;
    url: string | undefined;
    headers:
      | {
          authorization: string | undefined;
          contentType: string | undefined;
        }
      | undefined;
    method: string | undefined;
    blurb: string | undefined;
    curlCommand: string | undefined;
  };
};

export const data: stepDataType = [
  {
    step: 0,
    apiId: apiId,
    name: "Welcome",
    url: undefined,
    headers: undefined,
    method: undefined,
    blurb:
      "Here you can test out the Unkey API using curl commands to make Unkey API calls.",
    curlCommand: undefined,
  },
  {
    step: 1,
    apiId: undefined,
    name: "Create Key",
    url: "https://api.unkey.dev/v1/keys.createKey",
    headers: {
      authorization: "Authorization: Bearer <token>",
      contentType: "Content-Type: application/json",
    },
    method: "POST",
    blurb:
      `Making requests to Unkey's API is easy. Lets start with creating a key for a user. We will use the curl command in ther codeblock for this.`,
    curlCommand: `curl --request POST
     --url https://api.unkey.dev/v1/keys.createKey
     --header 'Authorization: Bearer <token>'
     --header 'Content-Type: application/json'
     --data '{"apiId": "${apiId}"}'`,
  },
  {
    step: 2,
    apiId: undefined,
    name: "Get Key",
    url: "https://api.unkey.dev/v1/keys.getKey",
    headers: {
      authorization: "Authorization: Bearer <token>",
      contentType: "Content-Type: application/json",
    },
    method: "GET",
    blurb:
      "Lets get the key we just created. This will show any data related key data.",
    curlCommand: `curl --request GET
     --url https://api.unkey.dev/v1/keys.getKey?keyId=<keyId>
     --header 'Authorization: Bearer <token>'`,
  },
  {
    step: 3,
    apiId: undefined,
    name: "Verify Key",
    url: "https://api.unkey.dev/v1/keys.verifyKey",
    headers: {
      contentType: "Content-Type: application/json",
      authorization: undefined,
    },
    method: "POST",
    blurb:
      "Now we can verify the key we just created. This will give us some data for analytics and simulate a typical verification process.",
    curlCommand: `curl --request POST
     --url https://api.unkey.dev/v1/keys.verifyKey
     --header 'Content-Type: application/json'
     --data '{"apiId": "<apiId>", "key": "<key>"}'`,
  },
  {
    step: 4,
    apiId: undefined,
    name: "Update ownerId",
    url: "https://api.unkey.dev/v1/keys.updateKey",
    headers: {
      authorization: "Authorization: Bearer <token>",
      contentType: "Content-Type: application/json",
    },
    method: "POST",
    blurb: "",
    curlCommand: `curl --request POST
     --url https://api.unkey.dev/v1/keys.updateKey
     --header 'Authorization: Bearer <token>'
     --header 'Content-Type: application/json'
     --data '{"keyId": "<keyId>", "ownerId": "user_1234"}'`,
  },
  {
    step: 5,
    apiId: undefined,
    name: "Verify Key",
    url: "https://api.unkey.dev/v1/keys.verifyKey",
    headers: {
      contentType: "Content-Type: application/json",
      authorization: undefined,
    },
    method: "POST",
    blurb: "",
    curlCommand: `curl --request POST
    --url https://api.unkey.dev/v1/keys.verifyKey
    --header 'Content-Type: application/json'
    --data '{"apiId": "${apiId}", "key": "<key>"}'`,
  },
  {
    step: 6,
    apiId: undefined,
    name: "Update expiration",
    url: "https://api.unkey.dev/v1/keys.updateKey",
    headers: {
      authorization: "Authorization: Bearer <token>",
      contentType: "Content-Type: application/json",
    },
    method: "POST",
    blurb: "",
    curlCommand: `curl --request POST
     --url https://api.unkey.dev/v1/keys.updateKey
     --header 'Authorization: Bearer <token>'
     --header 'Content-Type: application/json'
     --data '{"keyId": "<keyId>", "expires": <timeStamp>}'`,
  },
  {
    step: 7,
    apiId: undefined,
    name: "Verify Key",
    url: "https://api.unkey.dev/v1/keys.verifyKey",
    headers: {
      contentType: "Content-Type: application/json",
      authorization: undefined,
    },
    method: "POST",
    blurb: "",
    curlCommand: `curl --request POST
     --url https://api.unkey.dev/v1/keys.verifyKey
     --header 'Content-Type: application/json'
     --data '{"apiId": "${apiId}","key": "<key>"}'`,
  },
  {
    step: 8,
    apiId: undefined,
    name: "Show Analytics",
    url: "https://api.unkey.dev/v1/keys.getVerifications",
    headers: {
      authorization: "Authorization: Bearer <token>",
      contentType: "Content-Type: application/json",
    },
    method: "GET",
    blurb: "",
    curlCommand: `curl --request GET \
      --url https://api.unkey.dev/v1/keys.getVerifications?keyId=<keyId> \
      --header 'Authorization: Bearer <token>'`,
  },
  {
    step: 9,
    apiId: undefined,
    name: "Delete Key",
    url: "https://api.unkey.dev/v1/keys.deleteKey",
    headers: {
      authorization: "Authorization: Bearer <token",
      contentType: "Content-Type: application/json",
    },
    method: "POST",
    blurb: "",
    curlCommand: `curl --request POST
     --url https://api.unkey.dev/v1/keys.deleteKey
     --header 'Content-Type: application/json'
     --data '{"keyId": "<keyId>"}'`,
  },
  {
    step: 10,
    apiId: undefined,
    name: "Verify Key",
    url: "https://api.unkey.dev/v1/keys.verifyKey",
    headers: {
      contentType: "Content-Type: application/json",
      authorization: undefined,
    },
    method: "POST",
    blurb: "",
    curlCommand: `curl --request POST
      --url https://api.unkey.dev/v1/keys.verifyKey
      --header 'Content-Type: application/json'
      --data '{"apiId": "${apiId}", "key": "<key>"}'`,
  },
  {
    step: 11,
    apiId: undefined,
    name: "Sign up",
    url: undefined,
    headers: undefined,
    method: undefined,
    blurb:
      "Like what you see? Sign up for an account to get your own API setup in no time.",
    curlCommand: undefined,
  },
];
