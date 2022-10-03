import tw from "twin.macro";
import { JobListingDescription } from "./Description";
import { JobListingSideBar } from "./Sidebar";

export function JobListing() {
  return (
    <div tw="flex flex-row my-5 space-x-8">
      <JobListingDescription />
      <JobListingSideBar />
    </div>
  )
}