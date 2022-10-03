import tw from "twin.macro";

import { Salary, Timeline, JobType, SortBy } from "."

const Filters = tw.div`
  flex
  flex-row
  my-3
`;

const RowItem = tw.div`
  flex
  flex[1]
  mr-5
  last:mr-0
`;

export function AdvancedFilters() {
  return (
    <Filters>
      <RowItem>
        <Salary />
      </RowItem>
      <RowItem>
        <JobType />
      </RowItem>
      <RowItem>
        <Timeline />
      </RowItem>
      <RowItem>
        <SortBy />
      </RowItem>
    </Filters>
  )
}