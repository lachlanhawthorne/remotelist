import { useEffect, useState } from "react";
import tw from "twin.macro";
import Link from "next/link";
import { useRouter } from "next/router";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { 
  userAtom, 
  sessionAtom, 
  signInAtom, 
  registerUserAtom, 
  signOutAtom,
  authErrorAtom,
  regigsterSuccessAtom,
  resetAuthAttemptAtom
} from "@remotelist/data-access";

const Container = tw.div`
  flex
  flex-col
  items-center
  justify-center
  min-height[calc(100vh - 120px)]
  space-y-7
`;

const Button = tw.button`
  width[100%]
  appearance-none 
  outline-none 
  border-none 
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

const Seperator = tw.span`
  mx-2
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

const AuthLinks = tw.div`
  flex
  flex-row
  justify-center
  items-center
  text-remotelist-80
`;

const AuthLink = ({ href, children, ...props }: { 
  href: string; 
  children: React.ReactNode;
  props?: any;
}) => {
  return (
    <Link href={href}>
      <a tw="text-sm hover:(underline text-white) mr-2 cursor-pointer" {...props}>
        {children}
      </a>
    </Link>
  )
};

export function Authentication({ method }: { method: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [aggreedToTerms, setAggreedToTerms] = useState(false);

  const user = useAtomValue(userAtom);
  const session = useAtomValue(sessionAtom);

  const authError = useAtomValue(authErrorAtom);
  const registerSuccess = useAtomValue(regigsterSuccessAtom);

  const signIn = useSetAtom(signInAtom);
  const registerUser = useSetAtom(registerUserAtom);
  const signOut = useSetAtom(signOutAtom);
  const resetAuthAttempt = useSetAtom(resetAuthAttemptAtom);

  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/account");
    }
  }, [user]);


  return (
    <Container>
      <h1 tw="font-size[2rem] mb-0">
        {method === "signin" ? "Sign In" : "Register an account"}
      </h1>
      {
        authError && (
          <div tw="text-red-500 text-center">
            {authError}
          </div>
        )
      }
      {
        registerSuccess && (
          <div tw="text-green-500 text-center">
            Please check your email to verify your account.
          </div>
        )
      }
      <InputContainer>

        {
          method === "register" && (
            <AuthInput
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          )
          
        }

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

        {
          method === "register" && (
            <>
              <AuthInput
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
              {/* <AuthInput
                type="checkbox"
                checked={aggreedToTerms}
                onChange={e => setAggreedToTerms(e.target.checked)}
              /> */}
            </>
          )
        }

        
        

        <Button
          onClick={() => {
            if (method === "signin") {
              signIn({ email, password });
            } else {
              registerUser({ name, email, password });
            }
          }}

          disabled={!email || !password || (method === "register" && !name) 
            // || (method === "register" && !aggreedToTerms)
          }
        >
          {method === "signin" ? "Sign In" : "Register"}
        </Button>
      </InputContainer>

      <AuthLinks>
        {
          method === "signin" ? (
            <>
              <AuthLink href="/forgot-password">Forgot password?</AuthLink>
              <Seperator>&middot;</Seperator>
              <AuthLink onClick={() => resetAuthAttempt()} href="/register">Create an account</AuthLink>
            </>
          )
          : (
            <>
              <span>Already have an account? </span>
              <AuthLink onClick={() => resetAuthAttempt()} href="/signin">Sign In</AuthLink>
            </>
          )
        }
      </AuthLinks>
    </Container>
  )
};