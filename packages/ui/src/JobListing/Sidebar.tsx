import tw from "twin.macro";
import { RiBookmarkLine, RiTimeLine, RiCalendarEventFill, RiMapPin5Line, RiTimerLine, RiBuildingLine } from "react-icons/ri";

function JobListingExternalLink({ icon, title, url }: any) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" tw="flex flex-row items-center justify-between space-x-2">
      {icon}
      <div>{title}</div>
    </a>
  )

}

export function JobListingsExternal() {
  return (
    <div>
      <h3 tw="font-size[0.9rem] uppercase text-white/50 font-weight[400]">Listed On</h3>
      <div tw="flex flex-col space-y-2">
        {[
            { icon: RiBookmarkLine, title: 'EthicalJobs', url: 'https://ethicaljobs.com.au/' },
            { icon: RiTimeLine, title: 'SEEK', url: 'https://www.seek.com.au/' },
            { icon: RiCalendarEventFill, title: 'Indeed', url: 'https://www.indeed.com.au/' },
            { icon: RiMapPin5Line, title: 'LinkedIn', url: 'https://www.linkedin.com/' },
            { icon: RiTimerLine, title: 'JobSeek', url: 'https://www.jobseek.com.au/' },
            { icon: RiBuildingLine, title: 'Workforce Australia', url: 'https://www.workforce.com.au/' },

          ].map((item: any) => <JobListingExternalLink {...item} />)}
      </div>
    </div>
  )
}

function DescriptionItem({ icon, label, value }: any) {
  return (
    <div tw="flex flex-row space-x-2 text-white/50">
      <div tw="flex flex-row items-center space-x-2">
        {icon({ size: 20, color: 'inherit' })}
        <div>{label}</div>
      </div>
      <div>{value}</div>
    </div>
  )
}


export function JobListingMeta() {
  return (
    <div tw="space-y-3 py-4 border[1px solid] border-left[0] border-right[0] border-remotelist-60">
      <DescriptionItem
        icon={RiTimerLine}
        label="Posted"
      />
      <DescriptionItem
        icon={RiCalendarEventFill}
        label="Applications Close"
      />
      <DescriptionItem
        icon={RiMapPin5Line}
        label="Location"
      />
      
      <DescriptionItem
        icon={RiTimerLine}
        label="Job Type"
      />
      <DescriptionItem
        icon={RiBuildingLine}
        label="Industry"
      /> 
    </div>
  )
}

export function JobListingSideBar() {
  return (
    <div tw="min-width[280px] space-y-6">
      <button tw="
        flex
        flex-row
        items-center
        justify-center
        height[50px]
        w-full 
        appearance-none 
        bg-transparent 
        border[1px solid] 
        border-white 
        text-white
        border-radius[0.3rem]
      ">
        <RiBookmarkLine size={22} style={{ marginRight: 8 }} />
        <span tw="text-base">Save Job</span>
      </button>

      <JobListingMeta />

      <JobListingsExternal />
    </div>
  )
}