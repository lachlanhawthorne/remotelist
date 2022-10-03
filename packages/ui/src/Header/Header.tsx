import tw, { styled } from "twin.macro";
// @ts-ignore
import HeadScroll from 'react-headscroll';

import { useInView } from 'react-intersection-observer';

import { useAtomValue, useSetAtom, useAtom } from "jotai";
import { disableHeaderScrollAtom, headerVisibleAtom } from "@remotelist/data-access";

import Logo from "./Logo";
import Account from "./Account";
import { useEffect } from "react";

const Container = tw.header`
  height[80px]
  flex
  items-center
  justify-center
  m-0 
  px-4 
  text-black 
  dark:text-white
  dark:bg-remotelist-dark
  font-size[medium]
  border-bottom[1px solid]
  border-gray-200
  dark:border-remotelist-60
  user-select[none]
  z-index[9999]
`

const Content = tw.div`
  height[100%]
  width[100%]
  max-w-5xl
  flex
  items-center
  justify-between
`

const Row = tw.div`
  height[100%]
  flex 
  flex-row
  items-center
`

export const Header = () => {
  const setHeaderVisible = useSetAtom(headerVisibleAtom);
  const [disableHeaderScroll, setDisableHeaderScroll] = useAtom(disableHeaderScrollAtom);
  
  // const [headerRef, inView, entry] = useInView({
  //   threshold: 0.5,
  // });

  // useEffect(() => setHeaderVisible(inView), [inView]);

  return (
    // <HeadScroll
    //   fixed={true}
    //   offsettop={-85}
    //   upTolerance={disableHeaderScroll ? 9999 : 2}
    //   downTolerance={disableHeaderScroll ? 9999 : 5}
    //   position="top"
    //   style={{
    //     zIndex: 9
    //   }}
    // >
      <Container>
        <Content>
          <Logo />
          <Row>
            <Account />
          </Row>
        </Content>
      </Container>
    // </HeadScroll>
  );
};