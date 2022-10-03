import tw from "twin.macro";
import NextLink from "next/link";
import { RiBookmarkLine, RiUser3Line } from "react-icons/ri";

import { userAtom } from "@remotelist/data-access";
import { useAtomValue } from "jotai";

const LinkAnchor = tw.a`
  height[100%] 
  flex 
  flex-row
  items-center
  hover:cursor-pointer
  hover:text-remotelist-80
  font-size[3rem]
`

const IconContainer = tw.div`
  flex
  items-center
  justify-center
  mr-2.5
  height[100%]
`

const LinkText = tw.div`
  font-size[1.25rem]
`

type LinkProps = {
  href: string;
  title: string;
  icon: React.ReactNode;
}

function Link({ href, title, icon }: LinkProps) {
  return (
    <div>
      <NextLink href={href}>
        <LinkAnchor>
          <>
            <IconContainer>{icon}</IconContainer>
            <LinkText>{title}</LinkText>
          </>
        </LinkAnchor>
      </NextLink>
    </div>
  );
}

// Account
const Container = tw.div`
  flex 
  flex-row 
  height[100%]
  space-x-6
`

export default function Account() {
  const user = useAtomValue(userAtom);

  return (
    <Container>
      <Link 
        icon={ <RiBookmarkLine size={24} /> } 
        title="Saved" 
        href="/saved"
      />
      <Link 
        icon={ <RiUser3Line size={24} /> } 
        title={user ? "Account" : "Sign In"}
        href={user ? "/account" : "/signin"}
      />
    </Container>
  )
}