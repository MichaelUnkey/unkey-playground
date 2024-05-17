import { url } from "inspector";
import { headers } from "next/headers";

const apiId = process.env.NEXT_PUBLIC_UNKEY_API_ID;
export const StepData = [
  {
    step: 0,
    apiId: apiId,
    name: "Welcome",
    blurb:
      "Welcome to the Unkey playground. Here you can test out the Unkey API. Click on 'Next' or step 1 to begin.",
    curlCommand: "",
  },
  {
    step: 1,
    name: "Create Key",
    url: "https://api.unkey.dev/v1/keys.createKey",
    headers: {
      authorization: "Authorization: Bearer <token>",
      contentType: "Content-Type: application/json",
    },
    method: "POST",
    blurb:
      "Lets start by creating a key. In any of these steps you can click the 'Next' button to automatically use the command and see the result. Copy or type the command into the terminal and make sure to use the provided apiId.",
    curlCommand: `curl --request POST 
     --url https://api.unkey.dev/v1/keys.createKey 
     --header 'Authorization: Bearer <token>' 
     --header 'Content-Type: application/json' 
     --data '{"apiId": "${apiId}"}'`,
  },
  {
    step: 2,
    name: "Get Key",
    url: "https://api.unkey.dev/v1/keys.getKey",
    headers: {
      authorization: "Authorization: Bearer <token>",
      contentType: "Content-Type: application/json",
    },
    method: "GET",
    blurb: "Lets get the key we just created. This will show any data related to this key.",
    curlCommand: `curl --request GET 
     --url https://api.unkey.dev/v1/keys.getKey?keyId=<keyId> 
     --header 'Authorization: Bearer <token>'`,
  },
  {
    step: 3,
    name: "Verify Key",
    url: "https://api.unkey.dev/v1/keys.verifyKey",
    headers: {
      contentType: "Content-Type: application/json",
    },
    method: "POST",
    blurb: "Now we can verify the key we just created. This will give us some data for analytics and simulate a typical verification process.",
    curlCommand: `curl --request POST 
     --url https://api.unkey.dev/v1/keys.verifyKey 
     --header 'Content-Type: application/json' 
     --data '{"apiId": "<apiId>", "key": "<key>"}'`,
  },
  {
    step: 4,
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
    name: "Verify Key",
    url: "https://api.unkey.dev/v1/keys.verifyKey",
    headers: {
      contentType: "Content-Type: application/json",
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
    name: "Verify Key",
    url: "https://api.unkey.dev/v1/keys.verifyKey",
    headers: {
      contentType: "Content-Type: application/json",
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
    name: "Verify Key",
    url: "https://api.unkey.dev/v1/keys.verifyKey",
    headers: {
      contentType: "Content-Type: application/json",
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
    name: "Sign up",
    blurb: "",
    curlCommand: "",
  },
];
