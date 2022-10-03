import tw from "twin.macro";
import { JobPreview } from "../Preview";

const Button = tw.button`
  border[1px solid]
  border-remotelist-60
  bg-remotelist-dark 
  text-white 
  py-2 
  px-4
  font-size[1rem]
  border-radius[0.3rem]
  hover:border-white
`;

export function JobCollection({ jobs }: any) {
  return (
    <div>
      <div>
        {jobs.map((job: any) => <JobPreview job={job} />)}
      </div>
      <div tw="flex flex-row justify-between items-center pt-8">
        <div tw="text-remotelist-80">
          <p><b>1</b> to <b>12</b> of <b>24</b> results</p>
        </div>
        <div tw="flex space-x-4">
          <Button>
            Previous
          </Button>
          <Button>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}