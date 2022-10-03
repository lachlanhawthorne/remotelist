import { useEffect, useState } from "react";
import tw from "twin.macro";
import { useRouter } from "next/router";

import { useAtomValue, useSetAtom } from "jotai";
import { 
  userAtom, 
  sessionAtom, 
  signOutAtom
} from "@remotelist/data-access";

const Container = tw.div`
  flex
  flex-col
  items-center
  justify-center
  // min-height[500px]
  space-y-7
`;

const InputContainer = tw.div`
  flex
  flex-col
  space-y-4
`;

const AuthInput = tw.input`
  appearance-none
  border-none
  border-radius[0.3rem]
  bg-remotelist-dark
  border[1px solid] border-remotelist-60
  py-4 px-6
  placeholder-gray-200
  text-white
  font-size[large]
  transition duration-150 ease-in-out
  placeholder-remotelist-80
  focus:(outline-none border-white)
  min-width[300px]
`;

const Button = tw.button`
  width[100%]
  appearance-none 
  outline-none 
  bg-remotelist-dark
  border[1px solid] 
  border-white
  text-white
  m-0 
  mt-5
  py-3 
  px-4 
  border-radius[0.3rem]
  font-size[medium]
  cursor[pointer]
  not-disabled:(hover:(bg-white/75 text-black))
  disabled:(text-white/75 cursor-not-allowed)
`;

export function Account({ method }: { method: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useAtomValue(userAtom);
  const session = useAtomValue(sessionAtom);
  const signOut = useSetAtom(signOutAtom);

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/signin");
    }
  }, [user]);


  return (
    <Container>
      <h1 tw="font-size[2rem] mb-0">
        Account
      </h1>
      <InputContainer>
        <AuthInput
          type="email" 
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <AuthInput 
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <Button
          onClick={() => signOut()}
          disabled={!email || !password || (method === "register" && !name) 
            // || (method === "register" && !aggreedToTerms)
          }
        >
          Sign out
        </Button>
      </InputContainer>

    
    </Container>
  )
};