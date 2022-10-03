import { Filter } from "./Filter";
import tw from "twin.macro";
import { Select } from "../../../controls/Select";

const Container = tw.div`
  flex
  flex-row
  height[100%]
`;

export function SortBy() {
  return (
    <Filter title="Sort By">
      <Container>
        <div tw="flex[1]">
          <Select 
            items={[
              { name: "Newest" },
              { name: "Oldest" },
              { name: "Salary (High - Low)" },
              { name: "Salary (Low - High)" },
              { name: "Title" },
              { name: "Organisation" },
              { name: "Location" },
              { name: "Saved" },
            ]}
          />
        </div>
      </Container>
    </Filter>
  )
}