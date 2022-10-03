import Link from "next/link" // TODO: Fix up with Astro (?)
// wtf this seems to work in astro ???
import useDimensions from "react-cool-dimensions";
import { AspectRatio } from "react-aspect-ratio";
import { ReactComponent as RemoteListLogo } from "./logo.svg";
import tw, { theme } from "twin.macro";
import { useEffect } from "react";

const Anchor = tw.a`
  height[100%]
  flex 
  flex-row
  items-center
  hover:cursor-pointer
  hover:opacity[0.6]
`

const Text = tw.span`
  font-size[1.5rem]
  ml-3.5
  font-bold
`

export default function Logo() {
  const { observe, unobserve, width, height, entry } = useDimensions({
    onResize: ({ observe, unobserve, width, height, entry }: any) => {
      // Triggered whenever the size of the target is changed...
      unobserve(); // To stop observing the current target element
      observe(); // To re-start observing the current target element
    },
  });

  return (
    <Link href="/">
      <Anchor>
        <AspectRatio ratio={ height / width }>
          <div 
            ref={observe}
            style={{
              color: 'white',
              maxHeight: '100%',
              width: 44,
            }}
          >
            <RemoteListLogo 
              height="100%" 
              style={{ 
                display: 'block',
                minHeight: '100%',
                maxHeight: '100%',
                width: '100%',
                color: 'inherit', 
              }}
            />
          </div>
        </AspectRatio>

        <Text>
          RemoteList
        </Text>
      </Anchor>
    </Link>
  )
}