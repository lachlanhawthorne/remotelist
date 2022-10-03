import tw, { theme } from "twin.macro";
import { Search as SearchIcon } from "react-feather";
import { useEffect, useState } from "react";

const Container = tw.label`
  height[100%]
  flex[1]
  flex
  flex-row
  focus-within:border-white
  items-center
  px-5
  hover:cursor-text
  border[1px solid]
  border-remotelist-60
  border-radius[5px]
  border-top-right-radius[0]
  border-bottom-right-radius[0]
`

const IconContainer = tw.div`
  mr-3
  dark:text-white
`

const Input = tw.input`
  flex
  flex[1]
  height[100%]
  width[100%]
  min-width[unset]
  bg-transparent
  appearance-none
  border-none
  outline-none
  font-size[larger]
  text-gray-50
  placeholder:text-remotelist-80
`

export function SearchInput() {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const gridSearchInput = document.querySelector(".gridjs-search-input") as HTMLInputElement;
      if (gridSearchInput) {
        gridSearchInput.value = searchQuery;
        var gridSearchInputEvent = new Event("input", { bubbles: true });
        gridSearchInput.dispatchEvent(gridSearchInputEvent);
      }
    }
  }, [searchQuery]);

  return (
    <Container>
      <IconContainer>
        <SearchIcon 
          size={24} 
          strokeWidth={2} 
          color={theme`colors.remotelist.80`}
        />
      </IconContainer>
      <Input 
        type="text" 
        placeholder="Search" 
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
      />
    </Container>
  )
}