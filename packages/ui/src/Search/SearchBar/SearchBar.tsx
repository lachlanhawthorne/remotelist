import tw, { theme } from "twin.macro";
import { useEffect, useState } from "react";

import { SearchInput } from "./SearchInput";
import { SearchFilter } from "./SearchFilter";
import { AdvancedFilters } from "./Filters/AdvancedFilters";

import { Sliders, Bookmark } from "react-feather";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import { useAtom, useAtomValue } from "jotai";
import { disableHeaderScrollAtom, headerVisibleAtom } from "@remotelist/data-access";
import { useDebouncedCallback } from "use-debounce";

const Container = tw.div`
  flex
  flex-col
  justify-center
  min-height[115px]
  border-bottom[1px solid]
  border-remotelist-60
  bg-remotelist-40
  z-index[2]
`;

const BarContainer = tw.div`
  flex
  justify-center
  height[65px]
  my-6
`;

const SearchBox = tw.div`
  flex[1]
  flex
  flex-row
  justify-center
  bg-remotelist-dark
  border-radius[8px]
  px[4]
`;

const Text = tw.div`
  flex
  flex-row
  items-center
  font-size[1rem]
  line-height[1.15]
  dark:text-white
  dark:last:text-white
`;

const Button = tw.button`
  flex
  items-center
  height[100%]
  bg-white
  hover:background[#ddd]
  active:background[#bbb]
  cursor-pointer
  text-black
  appearance-none 
  outline-none 
  border-none 
  m-0 
  
  px-6
  border-radius[5px]
  text-lg
`;

const AdvancedFiltersContainer = tw.div`
  height[100%]
  bg-transparent
  flex
  items-center
  justify-center
  appearance-none 
  outline-none 
  border[1px solid]
  m-0 
  px-5
  mx-4
  border-radius[5px]
  text-lg
  cursor-pointer
  user-select[none]
  hover:(
    background-color[rgba(255, 255, 255, 0.1)]
  )

`;


export function SearchBar() {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [disableHeaderScroll, setDisableHeaderScroll] = useAtom(disableHeaderScrollAtom);

  const headerVisible = useAtomValue(headerVisibleAtom);

  const [stickyRef, stickyInView] = useInView({
    threshold: 0.5,
    // rootMargin: '60px'
  })

  const [overflow, setOverflow] = useState(false);

  const debouncedOverflow = useDebouncedCallback(() => 
    setOverflow(true), 
    600
  );

  useEffect(() => {
    if(showAdvancedFilters) {
      debouncedOverflow()
    } else {
      setOverflow(false)
    }
  }, [showAdvancedFilters]);


  useEffect(() => {
    if(stickyInView) {
      setDisableHeaderScroll(false);
    }
  }, [stickyInView]);

  const debouncedHeaderScroll = useDebouncedCallback(() => 
    setDisableHeaderScroll(false), 
    600
  );
  
  return (
      <thead tw="width[100%]">
        <tr tw="width[100%]">
          <th tw="width[100%] sticky top[0] z-index[1] height[115px] margin-bottom[445px] p-0">
            <div ref={stickyRef} style={{ position: 'relative', height: 0, width: '100%' }} />
            <Container>
              <BarContainer>
                <SearchBox>
                  <SearchInput />
                  <SearchFilter title="Classification">
                    <Text>Technology</Text>
                  </SearchFilter>
                  <SearchFilter title="Location">
                    <Text>Naarm</Text>
                    {/* <Text>Melbourne</Text> */}
                  </SearchFilter>
                </SearchBox>

                <AdvancedFiltersContainer
                  onClick={() => { 
                    setDisableHeaderScroll(true);
                    setShowAdvancedFilters(!showAdvancedFilters);
                    debouncedHeaderScroll();
                  }}

                  style={{
                    borderColor: showAdvancedFilters ? "white" : theme`colors.remotelist.60`,
                  }}
                >
                  <Sliders style={{ marginRight: 10 }} />
                  Filters
                </AdvancedFiltersContainer>

                <Button>
                  <Bookmark style={{ marginRight: 10 }} />
                  Save
                </Button>
              </BarContainer>

              
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={ showAdvancedFilters 
                  ? { height: 'auto', opacity: 1 } 
                  : { height: 0, opacity: 0} 
                }
                transition={{ type: 'tween', duration: 0.333 }}
                style={{ overflow: overflow ? "visible" : "hidden" }}
              >
                <AdvancedFilters />

              </motion.div>
            </Container>
          </th>
        </tr>

      </thead>
  );
}