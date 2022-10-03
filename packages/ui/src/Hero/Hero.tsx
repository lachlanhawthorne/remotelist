import tw from "twin.macro";

const Container = tw.div`
  flex
  flex-col
  items-start
  mt-12
`

const Heading = tw.h1`
  text-white
  font-size[2.5rem]
  font-bold
  mb-3
  margin-top[0]
  line-height[1]
`

const Text = tw.p`
  text-white
  text-3xl
  text-remotelist-80
  margin-top[0.5rem]
  line-height[1]
`


export function Hero() {
  return (
    <Container>
      <Heading>Find a remote job</Heading>
      <Text>Remote job listings, for positions based in Australia</Text>
    </Container>
  )
}