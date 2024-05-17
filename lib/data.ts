const apiId = process.env.NEXT_PUBLIC_UNKEY_API_ID;
export const StepData =  
  [ {
      step: 0,
      apiId: apiId,
      name: "Welcome",
      blurb: "Welcome to the Unkey playground. Here you can test out the Unkey API. Click on 'Next' or step 1 to begin.",  
      curlCommand: ""
  },
     {
      step: 1,
      name: "Create Key",
      blurb: "Lets start by creating a key. In any of these steps you can click the 'Next' button to automatically use the command and see the result. Copy or type the command into the terminal and make sure to use the provided apiId.",
      curlCommand: `curl --request POST 
     --url https://api.unkey.dev/v1/keys.createKey 
     --header 'Authorization: Bearer <token>' 
     --header 'Content-Type: application/json' 
     --data '{"apiId": "${apiId}"}'`
    },
    {
      step: 2,
      name: "Get Key",
      blurb: "",
      curlCommand: `curl --request GET 
     --url https://api.unkey.dev/v1/keys.getKey?keyId=<keyId> 
     --header 'Authorization: Bearer <token>'`
    },
     {
      step: 3,
      name: "Verify Key",
      blurb: "",
      curlCommand: `curl --request POST 
     --url https://api.unkey.dev/v1/keys.verifyKey 
     --header 'Content-Type: application/json' 
     --data '{"apiId": "<apiId>", "key": "<key>"}'`
    },
     {
      step: 4,
      name: "Update ownerId",
      blurb: "",
      curlCommand: `curl --request POST 
     --url https://api.unkey.dev/v1/keys.updateKey 
     --header 'Authorization: Bearer <token>' 
     --header 'Content-Type: application/json' 
     --data '{"keyId": "<keyId>", "ownerId": "user_123"}'`
    },
     {
      step: 5,
      name: "Update expiration",
      blurb: "",
      curlCommand: `curl --request POST 
     --url https://api.unkey.dev/v1/keys.updateKey 
     --header 'Authorization: Bearer <token>' 
     --header 'Content-Type: application/json' 
     --data '{"keyId": "<keyId>", "expires": <timeStamp>}'`
    },
    {
      step: 6,
      name: "Verify Key",
      blurb: "",
      curlCommand: `curl --request POST 
     --url https://api.unkey.dev/v1/keys.verifyKey 
     --header 'Content-Type: application/json' 
     --data '{"apiId": "<apiId>","key": "<key>"}'`

    },

     {
      step: 7,
      name: "Show Analytics",
      blurb: "",
      curlCommand: `curl --request GET \
      --url https://api.unkey.dev/v1/keys.getVerifications?keyId=<keyId> \
      --header 'Authorization: Bearer <token>'`
    },
     {
      step: 8,
      name: "Delete Key",
      blurb: "",
      curlCommand: `curl --request POST 
     --url https://api.unkey.dev/v1/keys.deleteKey 
     --header 'Content-Type: application/json' 
     --data '{"keyId": "<keyId>"}'`
    },
     {
      step: 9,
      name: "Verify Key",
      blurb: "",
      curlCommand:  `curl --request POST 
      --url https://api.unkey.dev/v1/keys.verifyKey 
      --header 'Content-Type: application/json' 
      --data '{"apiId": "<apiId>", "key": "<key>"}'`
    },
    {
      step: 10,
      name: "Sign up",
      blurb: "",
      curlCommand: ""
    }
  ];


