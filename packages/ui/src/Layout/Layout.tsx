import tw, { theme } from "twin.macro";

import { Header } from "../Header";
import { Footer } from "../Footer";

const Container = tw.div`
  text-black 
  dark:text-white
`

const Page = tw.div`
  flex
  items-center
  justify-center
  p-5
  bg-remotelist-40
`

const Content = tw.div`
  width[100%]
  max-w-5xl
`

export const Layout = ({ children }: { children?: React.ReactNode}) => {
  return (
    <Container>
      <style>
        {`
          @media (prefers-color-scheme: dark) {
            html {
              background-color: ${theme`colors.remotelist.dark`};
              color: #fff;
            }
          }

          @media (prefers-color-scheme: light) {
            html {
              background-color: #fafafa;
              color: #000;
            }
          }
        `}
      </style>
      <Header />
      <Page>
        <Content>
          {children}
        </Content>
      </Page>
      <Footer />
    </Container>
  );
};