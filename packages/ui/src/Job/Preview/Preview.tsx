import Link from "next/link";
import tw from "twin.macro";

export function JobPreview({ job }: any) {
  const { title, organisation, location, type, salary } = job;

  return (
    <div tw="w-full py-10 first:pt-0 border-bottom[1px solid] border-remotelist-60">
      <div tw="flex flex-row justify-between">
        <Link href={`/jobs/remotelist/front-end-developer-24`}>
          <a className="group" tw="flex[1] cursor-pointer">
            <h3 tw="font-weight[500] font-size[1.3rem] mt-0 group-hover:underline">{title}</h3>
            <div tw="text-remotelist-80 space-y-1.5 font-size[1.2rem]">
              <div tw="flex flex-row space-x-2">
                <div>{organisation}</div>
                <span>&middot;</span>
                <div>{location}</div>
              </div>
              <div tw="flex flex-row space-x-2">
                <div>{type}</div>
                <span>&middot;</span>
                <div>{salary}</div>
              </div>
            </div>
          </a>
        </Link>
        <div tw="flex justify-between items-end flex-col">
          <div>
            <p tw="m-0">Hello</p>
          </div>
          <div tw="flex flex-row justify-end space-x-2">
            <button tw="bg-remotelist-dark text-white py-2 px-4 font-size[1rem] border-radius[0.3rem]">
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};