export const data = () => {
  return {
    step1: {
      step: 1,
      name: "Create Key",
      curlCommand: `curl --request POST 
     --url https://api.unkey.dev/v1/keys.createKey 
     --header 'Authorization: Bearer <token>' 
     --header 'Content-Type: application/json' 
     --data '{
     "apiId": <apiId>
   }'`,
      curlInput: "",
      curlResponse: "",
      complete: false,
    },
    step2: {
      step: 2,
      name: "Get Key",
      curlCommand: `curl --request GET 
     --url https://api.unkey.dev/v1/keys.getKey?keyId=<keyId> 
     --header 'Authorization: Bearer <token>'`,
      curlInput: "",
      curlResponse: "",
      complete: false,
    },
    step3: {
      step: 3,
      name: "Verify Key",
      curlCommand: `curl --request POST 
     --url https://api.unkey.dev/v1/keys.verifyKey 
     --header 'Content-Type: application/json' 
     --data '{
     "apiId": <apiId>,
     "key": <key>
   }'`,
      curlInput: "",
      curlResponse: "",
      complete: false,
    },
    step4: {
      step: 4,
      name: "OwnerId",
      curlCommand: `curl --request POST 
     --url https://api.unkey.dev/v1/keys.updateKey 
     --header 'Authorization: Bearer <token>' 
     --header 'Content-Type: application/json' 
     --data '{
     "keyId": <keyId>,
     "name": "Customer X",
     "ownerId": "user_123",
   }'`,
      curlInput: "",
      curlResponse: "",
      complete: false,
    },
    step5: {
      step: 5,
      name: "Expiration",
      curlCommand: `curl --request POST 
     --url https://api.unkey.dev/v1/keys.updateKey 
     --header 'Authorization: Bearer <token>' 
     --header 'Content-Type: application/json' 
     --data '{
     "keyId": <keyId>,
     "expires": <timeStamp>,
   }'`,
      curlInput: "",
      curlResponse: "",
      complete: false,
    },
    step6: {
      step: 6,
      name: "Verify Key",
      curlCommand: `curl --request POST 
     --url https://api.unkey.dev/v1/keys.verifyKey 
     --header 'Content-Type: application/json' 
     --data '{
     "apiId": <apiId>,
     "key": <key>
   }'`,
      curlInput: "",
      curlResponse: "",
      complete: false,
    },

    step7: {
      step: 7,
      name: "Disable Key",
      curlCommand: `curl --request POST 
     --url https://api.unkey.dev/v1/keys.updateKey 
     --header 'Authorization: Bearer <token>' 
     --header 'Content-Type: application/json' 
     --data '{
     "keyId": <keyId>,
     "enabled": false,
   }'`,
      curlInput: "",
      curlResponse: "",
      complete: false,
    },
    step8: {
      step: 8,
      name: "Verify Key",
      curlCommand: `curl --request POST 
     --url https://api.unkey.dev/v1/keys.verifyKey 
     --header 'Content-Type: application/json' 
     --data '{
       "apiId": <apiId>,
       "key": <key>
   }'`,
      curlInput: "",
      curlResponse: "",
      complete: false,
    },
    step9: {
      step: 9,
      name: "Sign up",
      curlCommand: ``,
      curlInput: "",
      curlResponse: "",
      complete: false,
    },
  };
};
