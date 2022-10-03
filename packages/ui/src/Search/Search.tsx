import React from "react";
import tw from "twin.macro";

import { SearchBar } from "./SearchBar";
import { SearchResults } from "./SearchResults"

const Container = tw.table`width[100%] border-collapse box-sizing[border-box]`

export function Search() {
  return (
    <Container>
      <SearchBar />
      <SearchResults />
    </Container>
  )
}