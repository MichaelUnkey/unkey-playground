const apiId = process.env.NEXT_PUBLIC_UNKEY_API_ID;
if (!apiId) {
  throw new Error("Missing apiId");
}

export type Message = {
  content: string;
  color: string; // Can be a CSS color name or hex code
}

export type Step = {
  header: string;
  messages: Message[];
  curlCommand?: string;
}

const steps: Step[] = [];
// Step 1 Create your first key
  const step1Header = "";
  const step1Messages: Message[] = [
    { content: "Step 1: Create your first key", color: "text-white"},
    { content: `Welcome to the Unkey playground
Here you can test how Unkey works using curl commands. The first step is to create your first user key.
Use the following command in the terminal. Normally you would place your root key created in the
dashboard where the <token> is in the example. For now leave it as is and we will handle that for you.`, 
    color: "text-white" 
    },
    {
      content: `curl --request POST --url https://api.unkey.dev/v1/keys.createKey
--header 'Authorization: Bearer <token>
--header 'Content-Type: application/json
--data '{"apiId": "${apiId}"}'`,
      color: "text-violet-600",
    },
  ];
  const step1CurlCommand =`curl --request POST --url https://api.unkey.dev/v1/keys.createKey
--header 'Authorization: Bearer <token>
--header 'Content-Type: application/json
--data '{"apiId": "${apiId}"}'`
  
// Step 2 Get the key we just created
  const step2Header = "Step 2: Get the key we just created";
  const step2Messages: Message[] = [
    { content: "Lets get the key we just created. This will show any data related key data.", color: "text-white" },
  ];
  const step2CurlCommand = `curl --request GET
--url https://api.unkey.dev/v1/keys.getKey?keyId=<keyId> 
--header 'Authorization: Bearer <token>'`;

// Step 3 Verify the key
  const step3Header = "Step 3: Verify the key";
  const step3Messages: Message[] = [
    { content: "Now we can verify the key we just created. This will give us some data for analytics and simulate a typical verification process your user might make.", color: "text-white" },
  ];
  const step3CurlCommand =  `curl --request POST
--url https://api.unkey.dev/v1/keys.verifyKey
--header 'Content-Type: application/json'
--data '{"apiId": "${apiId}", "key": "<key>"}'`;

// Step 4  Update the key with ownerId
  const step4Header = "Step 4: Update the key with ownerId";
  const step4Messages: Message[] = [
    { content: "Now lets try to update the key with an ownerId. The ownerId can help you link your user to a spacific key.", color: "text-white" }
  ];
  const step4CurlCommand = `curl --request POST
--url https://api.unkey.dev/v1/keys.updateKey
--header 'Authorization: Bearer <token>'
--header 'Content-Type: application/json'
--data '{"keyId": "<keyId>", "ownerId": "user_1234"}'`;

//Step 5 Verify the key again
  const step5Header = "Step 5: Verify the key again";
  const step5Messages: Message[] = [
    { content: "Lets now verify the key just to make sure your key is updated with the ownerId", color: "text-white" }
  ];
  const step5CurlCommand = `curl --request POST
--url https://api.unkey.dev/v1/keys.verifyKey
--header 'Content-Type: application/json'
--data '{"apiId": "${apiId}", "key": "<key>"}'`;
  
// Step 6 Update with an expiration date
  const step6Header = "Step 6: Update with an expiration date";
  const step6Messages: Message[] = [
    { content: "Lets now lets add an expiration date. This will disable the key based on the epoch time that is set. ", color: "text-white" }
  ];
  const step6CurlCommand = `curl --request POST
--url https://api.unkey.dev/v1/keys.updateKey
--header 'Authorization: Bearer <token>'
--header 'Content-Type: application/json'
--data '{"keyId": "<keyId>", "expires": <timeStamp>}'`;  

// Step 7 Verify the key again
  const step7Header = "Step 7: Verify the key again";
  const step7Messages: Message[] = [
    { content: "Again lets verify the key to make sure expiration was set correctly. It will also give up more data for the next step.", color: "text-white" },
  ];
  const step7CurlCommand = `curl --request POST
--url https://api.unkey.dev/v1/keys.verifyKey
--header 'Content-Type: application/json'
--data '{"apiId": "${apiId}","key": "<key>"}'`;

// Step 8
  const step8Header = "Step 8: Get analytics data";
  const step8Messages: Message[] = [
    { content: "Now lets see the analytics data on our key. This will show how many times the key was verified and other data.", color: "text-white" }
    ];
  const step8CurlCommand = `curl --request GET
--url https://api.unkey.dev/v1/keys.getVerifications?keyId=<keyId>
--header 'Authorization: Bearer <token>'`;

//Step 9
  const step9Header = "Step 9: Delete the key";
  const step9Messages: Message[] = [
    { content: "Lets say we no longer want this key to have any access. While we can use updateKey to set enabled to false. Here lets delete the key so it has not option of being used again.", color: "text-white" },
  ];
  const step9CurlCommand = `curl --request POST
--url https://api.unkey.dev/v1/keys.deleteKey
--header 'Content-Type: application/json'
--data '{"keyId": "<keyId>"}'`;

//Step 10 Last Verification
  const step10Header = "Step 10: Last verification";
  const step10Messages: Message[] = [
    { content: "Now lets verify that deleting a key worked as it should. Use the verifyKey route to check the key again.", color: "text-white" },
  ];
  const step10CurlCommand = `curl --request POST
--url https://api.unkey.dev/v1/keys.verifyKey
--header 'Content-Type: application/json'
--data '{"apiId": "${apiId}", "key": "<key>"}'`;
  
//Step 11 Congrats!
  const step11Header = "Congrats!";
  const step11Messages: Message[] = [
    { content: "Like what you see? Sign up for an account to get your own API setup in no time.", color: "text-white" },
  ];
  const step11CurlCommand = ``;

  const step1: Step = { header: step1Header, messages: step1Messages, curlCommand: step1CurlCommand};
  const step2: Step = { header: step2Header, messages: step2Messages, curlCommand: step2CurlCommand };
  const step3: Step = { header: step3Header, messages: step3Messages, curlCommand: step3CurlCommand };
  const step4: Step = { header: step4Header, messages: step4Messages, curlCommand: step4CurlCommand };
  const step5: Step = { header: step5Header, messages: step5Messages, curlCommand: step5CurlCommand };
  const step6: Step = { header: step6Header, messages: step6Messages, curlCommand: step6CurlCommand };
  const step7: Step = { header: step7Header, messages: step7Messages, curlCommand: step7CurlCommand };
  const step8: Step = { header: step8Header, messages: step8Messages, curlCommand: step8CurlCommand };
  const step9: Step = { header: step9Header, messages: step9Messages, curlCommand: step9CurlCommand };
  const step10: Step = { header: step10Header, messages: step10Messages, curlCommand: step10CurlCommand };
  const step11: Step = { header: step11Header, messages: step11Messages, curlCommand: step11CurlCommand };
  
  steps.push(step1);
  steps.push(step2);
  steps.push(step3);
  steps.push(step4);
  steps.push(step5);
  steps.push(step6);
  steps.push(step7);
  steps.push(step8);
  steps.push(step9);
  steps.push(step10);
  steps.push(step11);

const startData = steps;

export default startData;




