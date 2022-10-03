import { Filter } from "./Filter";
import tw from "twin.macro";
import { Select } from "../../../controls/Select";

const Container = tw.div`
  height[100%]
  flex
  flex-row
`;

export function Salary() {
  return (
    <Filter title="Salary">
      <Container>
        <div tw="flex[1] height[100%]">
          <Select
            items={[
              { name: "Any" },
              { name: "$50k" },
              { name: "$75k" },
              { name: "$100k" },
              { name: "$150k" },
              { name: "$200k" }
            ]}
          />
        </div>
        <span tw="mx-3 height[100%] flex items-center">-</span>
        <div tw="flex[1]">
          <Select
            items={[
              { name: "Any" },
              { name: "$75k" },
              { name: "$150k" },
              { name: "$200k" },
              { name: "$250k" },
              { name: "$350k" }
            ]}
            
          />
        </div>
      </Container>
    </Filter>
  )
}