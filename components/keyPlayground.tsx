import CodeComponent from "./codeComponent";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { useCallback, useEffect, useState } from "react";


type props = {
  className?: string;
  step?: number;
  setCurrentTerminal: (terminal: string) => void;
  currentTerminal: string;
  terminalSteps: Array<{ // Figure out why I can not use callback here instead... Was not working for some reason
    step: number;
    curlCommand: string;
  }>;
}
export default function KeyPlayground(props: props) {
  // Existing code...
  const terminalSteps = props.terminalSteps;
  const currentTerminal = props.currentTerminal;
  const setCurrentTerminal = props.setCurrentTerminal;
  const className = props.className;


  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(props.step);
  const search = new URLSearchParams();
  useEffect(() => {
    if(step){
      createQueryString('step', step.toString());
    }
    console.log(step);
    
    
  }, [step])


  const createQueryString = useCallback(
    (key: string, value: string) => {
      
      search.set(key, value);
      return search.toString();
    },
    [searchParams]
  )

  return (
    <Accordion type="single" collapsible value={`step-${searchParams.get("step")?.toString()}`} >
      <AccordionItem value="step-1">
        <AccordionTrigger onFocus={() => router.push(pathname + '?' + createQueryString('step', '1'))}>1. Create Key</AccordionTrigger>
        <AccordionContent className="AccordionContent">
          <p>Creating a key for your users can be done in two ways. </p>
          <p>
            The first is using the Unkey API at the following
            ‘https://api.unkey.dev/v1/keys.createKey'
          </p>
          <p>
            This can be done with a curl command. The bearer token and apiId are
            both required. For now we can use some fake values. In the terminal
            window paste or type the following curl command.
          </p>
          <p>Example</p>
          <CodeComponent
            val={terminalSteps[0]?.curlCommand ? terminalSteps[0]?.curlCommand : ``}
          />
          <p>
            Or to have this done automatically click the Create Key button
            bellow
          </p>
          <p>Example</p>
          <CodeComponent
            val={`{
"keyId": "key_12345",
"key": "test_12345"
}`}
          />
          <Button
            onClick={() => props.setCurrentTerminal(terminalSteps[0].curlCommand.toString())} variant={"outline"} >Test</Button>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="step-2">
        <AccordionTrigger onFocus={() => router.push(pathname + '?' + createQueryString('step', '2'))}>2. Get Key</AccordionTrigger>
        <AccordionContent>
          <p>
            Next we can retrieve a key by its ID. Like before, either use the
            terminal or the button.
          </p>
          <p>Example</p>
          <CodeComponent
            val={`curl --request GET \
  --url https://api.unkey.dev/v1/keys.getKey?keyId=key_12345 \
  --header 'Authorization: Bearer <token>'`}
          />
          <p>Example</p>
          <CodeComponent
            val={`{
	"id":"key_12345",
	"start":"test_1234",
	"apiId":"api_12345",
	"workspaceId":"ws_12345",
	"meta":{},
	"createdAt":1713891646582,
	"ratelimit":{},
	"roles":[],
	"permissions":[],
	"enabled":true
}`}
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="step-3">
        <AccordionTrigger onFocus={() => router.push(pathname + '?' + createQueryString('step', '3'))}>3. Verify Key</AccordionTrigger>
        <AccordionContent>
          <p>
            use the command of button to verify the key we just got back in the
            last step. Feel free to do this step a few times. This will give you
            a few more points on the fancy chart later on.{" "}
          </p>
          <p>Example</p>
          <CodeComponent
            val={`curl --request POST \
  --url https://api.unkey.dev/v1/keys.verifyKey \
  --header 'Content-Type: application/json' \
  --data '{
  "apiId": "api_1234",
  "key": "sk_1234"
}'`}
          />
          <p>Example</p>
          <CodeComponent
            val={`{
    "keyId": "key_12345",
    "valid": true,
    "enabled": true,
    "permissions": []
}`}
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="step-4">
        <AccordionTrigger onFocus={() => router.push(pathname + '?' + createQueryString('step', '4'))}>4. Update Key</AccordionTrigger>
        <AccordionContent>
          <p>Same story here: </p>
          <p>Example</p>
          <CodeComponent
            val={`curl --request POST \
  --url https://api.unkey.dev/v1/keys.updateKey \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '{
  "keyId": "key_1234",
  "name": "Customer X",
  "ownerId": "user_123",
}'`}
          />
          <p>Example</p>
          <CodeComponent val={`{}`} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="step-5">
        <AccordionTrigger onFocus={() => router.push(pathname + '?' + createQueryString('step', '5'))}>5. Add Expiration</AccordionTrigger>
        <AccordionContent>
          <p>Same thing again but expiration instead of ownerId and name. The input required is “expires”:  UnixTimestampMiliseconds</p>
          <p>To help help here is a button that will copy the current unix timestamp plus 1 day. Feel free to use your own value if you want. </p>
          <p>Example</p>
          <CodeComponent val={`curl --request POST \
  --url https://api.unkey.dev/v1/keys.updateKey \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '{
  "expires": <TimeStamp>,
}'`} />
          <p>Again we provide a just do the thing button for you. </p>
          <p>Example</p>
            <CodeComponent val={`{}`} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="step-6">
        <AccordionTrigger onFocus={() => router.push(pathname + '?' + createQueryString('step', '6'))}>6. Verify Key</AccordionTrigger>
        <AccordionContent>
            <p>use the command of button to verify the key we just got back in the last step. Feel free to do this step a few times. This will give you a few more points on the fancy chart later on. </p>
            <p>Example</p>
            <CodeComponent val={`curl --request POST \
  --url https://api.unkey.dev/v1/keys.verifyKey \
  --header 'Content-Type: application/json' \
  --data '{
  "apiId": "api_1234",
  "key": "sk_1234"
}'`} />
<p>Example</p>
<CodeComponent val={`{
    "keyId": "key_12345",
    "valid": true,
    "enabled": true,
    "permissions": []
}`} />
<p>Seems like your key is still active and can be used by the user. </p>
<p>One more step and will crush your non paying users dreams and Revoke his key 😊</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="step-7">
        <AccordionTrigger onFocus={() => router.push(pathname + '?' + createQueryString('step', '7'))}>7. Show Analytics</AccordionTrigger>
        <AccordionContent>
            <p>Next we can get some analytics data on this key. This can also be done based on apiId or ownerId. But here we will keep it simple</p>
            <p>Example</p>
            <CodeComponent val={`curl --request GET \
  --url https://api.unkey.dev/v1/keys.getVerifications?keyId=<keyId> \
  --header 'Authorization: Bearer <token>'`} />
<p>Example</p>
<CodeComponent val={`{
    "verifications": [
        {
            "time": 1713830400000,
            "success": 4,
            "rateLimited": 0,
            "usageExceeded": 0
        }
    ]
}`} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="step-8">
        <AccordionTrigger onFocus={() => router.push(pathname + '?' + createQueryString('step', '8'))}>8. Revoke Key</AccordionTrigger>
        <AccordionContent><p>Lets say for whatever reason you want to revoke access to a key. This can be done using the same updateKey endpoint we have used before. Only this time we will set enabled to false. This will make sure that if the key is used to verify a user it will return <span>UNAUTHORIZED</span>. </p>
            <p>Example</p>
            <CodeComponent val={`curl --request POST \
  --url https://api.unkey.dev/v1/keys.updateKey \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '{
  "enabled": false,
}'`} />
<p>Example</p>
<CodeComponent val={`{}`} /></AccordionContent>
      </AccordionItem>
      <AccordionItem value="step-9">
        <AccordionTrigger onFocus={() => router.push(pathname + '?' + createQueryString('step', '9'))}>9. Verify Key Invalid</AccordionTrigger>
        <AccordionContent>
            <p>For the last time I promise, we verify our key.</p>
            <p>Example</p>
            <CodeComponent val={`curl --request POST \
  --url https://api.unkey.dev/v1/keys.verifyKey \
  --header 'Content-Type: application/json' \
  --data '{
  "apiId": "api_1234",
  "key": "sk_1234"
}'`} />
<p>Example</p>
<CodeComponent val={`{
    "valid": false,
    "code": "DISABLED"
}`} />
<p>Seems like your key is still active and can be used by the user. </p>
<p>One more step and will crush your non paying users dreams and Revoke his key 😊</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="step-10">
        <AccordionTrigger onFocus={() => router.push(pathname + '?' + createQueryString('step', '10'))}>Sign Up</AccordionTrigger>
        <AccordionContent><p>Now that you've seen all that our platform has to offer, don't wait any longer. Sign up today and elevate your user management experience!</p></AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
