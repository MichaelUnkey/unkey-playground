export type StepDataType = {
  shared: {
    apiId: string;
    key: string;
    keyId: string;
  };
  step1: {
    step: number;
    name: string;
    curlCommand: string;
    curlInput: string;
    curlResponse: string;
    curlSent: boolean;
    curlComplete: boolean;
  };
  step2: {
    step: number;
    name: string;
    curlCommand: string;
    curlInput: string;
    curlResponse: string;
    curlSent: boolean;
    curlComplete: boolean;
  };
  step3: {
    step: number;
    name: string;
    curlCommand: string;
    curlInput: string;
    curlResponse: string;
    curlSent: boolean;
    curlComplete: boolean;
  };
  step4: {
    step: number;
    name: string;
    curlCommand: string;
    curlInput: string;
    curlResponse: string;
    curlSent: boolean;
    curlComplete: boolean;
  };
  step5: {
    step: number;
    name: string;
    curlCommand: string;
    curlInput: string;
    curlResponse: string;
    curlSent: boolean;
    curlComplete: boolean;
  };
  step6: {
    step: number;
    name: string;
    curlCommand: string;
    curlInput: string;
    curlResponse: string;
    curlSent: boolean;
    curlComplete: boolean;
  };
  step7: {
    step: number;
    name: string;
    curlCommand: string;
    curlInput: string;
    curlResponse: string;
    curlSent: boolean;
    curlComplete: boolean;
  };
  step8: {
    step: number;
    name: string;
    curlCommand: string;
    curlInput: string;
    curlResponse: string;
    curlSent: boolean;
    curlComplete: boolean;
  };
  step9: {
    step: number;
    name: string;
    curlCommand: string;
    curlInput: string;
    curlResponse: string;
    curlSent: boolean;
    curlComplete: boolean;
  };
};


export default async function StepData() {
  return {
    shared: {
      apiId:"",
      key: "",
      keyId: "",
      
    },
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
      curlSent: false,
      curlComplete: false
    },
    step2: {
      step: 2,
      name: "Get Key",
      curlCommand: `curl --request GET 
     --url https://api.unkey.dev/v1/keys.getKey?keyId=<keyId> 
     --header 'Authorization: Bearer <token>'`,
      curlInput: "",
      curlResponse: "",
      curlSent: false,
      curlComplete: false
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
      curlSent: false,
      curlComplete: false
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
      curlSent: false,
      curlComplete: false
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
      curlSent: false,
      curlComplete: false
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
      curlSent: false,
      curlComplete: false
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
      curlSent: false,
      curlComplete: false
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
      curlSent: false,
      curlComplete: false
    },
    step9: {
      step: 9,
      name: "Sign up",
      curlCommand: ``,
      curlInput: "",
      curlResponse: "",
      curlSent: false,
      curlComplete: false
    }
  };
};

