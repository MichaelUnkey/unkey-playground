const apiId = process.env.NEXT_PUBLIC_UNKEY_API_ID;
export const StepData =  
  [ {
      step: 0,
      apiId: apiId
  },
     {
      step: 1,
      name: "Create Key",
      curlCommand: `curl --request POST 
     --url https://api.unkey.dev/v1/keys.createKey 
     --header 'Authorization: Bearer <token>' 
     --header 'Content-Type: application/json' 
     --data '{
     "apiId": ${apiId}
   }`
    },
    {
      step: 2,
      name: "Get Key",
      curlCommand: `curl --request GET 
     --url https://api.unkey.dev/v1/keys.getKey?keyId=<keyId> 
     --header 'Authorization: Bearer <token>'`
    },
     {
      step: 3,
      name: "Verify Key",
      curlCommand: `curl --request POST 
     --url https://api.unkey.dev/v1/keys.verifyKey 
     --header 'Content-Type: application/json' 
     --data '{
     "apiId": <apiId>,
     "key": <key>
   }'`
    },
     {
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
   }'`
    },
     {
      step: 5,
      name: "Expiration",
      curlCommand: `curl --request POST 
     --url https://api.unkey.dev/v1/keys.updateKey 
     --header 'Authorization: Bearer <token>' 
     --header 'Content-Type: application/json' 
     --data '{
     "keyId": <keyId>,
     "expires": <timeStamp>,
   }'`
    },
    {
      step: 6,
      name: "Verify Key",
      curlCommand: `curl --request POST 
     --url https://api.unkey.dev/v1/keys.verifyKey 
     --header 'Content-Type: application/json' 
     --data '{
     "apiId": <apiId>,
     "key": <key>
   }'`

    },

     {
      step: 7,
      name: "Show Analytics",
      curlCommand: `curl --request GET \
      --url https://api.unkey.dev/v1/keys.getVerifications?keyId=<keyId> \
      --header 'Authorization: Bearer <token>'`
    },
     {
      step: 8,
      name: "Verify Key",
      curlCommand: `curl --request POST 
     --url https://api.unkey.dev/v1/keys.verifyKey 
     --header 'Content-Type: application/json' 
     --data '{
       "apiId": <apiId>,
       "key": <key>
   }'`
    },
    {
      step: 9,
      name: "Sign up",
    }
  ];


