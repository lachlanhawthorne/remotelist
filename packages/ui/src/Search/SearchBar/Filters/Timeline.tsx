import { Filter } from "./Filter";
import tw from "twin.macro";
import { Select } from "../../../controls/Select";

const Container = tw.div`
  flex
  flex-row
  height[100%]
`;

export function Timeline() {
  return (
    <Filter title="Posted">
      <Container>
        <div tw="flex[1]">
          <Select 
            items={[
              { name: "Any" },
              { name: "Last week" },
              { name: "Last 2 weeks" },
              { name: "Last 4 weeks" },
              { name: "Last 3 months" },
            ]}
          />
        </div>
      </Container>
    </Filter>
  )
}