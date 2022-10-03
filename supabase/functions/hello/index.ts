import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
// import { createClient } from "https://esm.sh/@supabase/supabase-js@1.35.5";
import { determineLocation, cleanJobTitleStrings } from "./utils.ts";

// import * as d3 from "https://cdn.skypack.dev/d3@7";
import * as stringSimilarity from "https://deno.land/x/string_similarity/mod.ts"

// Supabase client ===
// https://github.com/dijonmusters/happy-days/blob/main/supabase/functions/create-stripe-customer/index.ts
// const supabase = createClient(
//   Deno.env.get("SUPABASE_URL")!,
//   Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
// );

import { getSeekJobs } from "./seek.ts";
// import { getWorkforceAusJobs } from "./workforceaustralia.ts";
// import { getEthicalJobs } from "./ethicaljobs.ts";
import { getCareerOneJobs } from "./careerone.ts";
// import { getLinkedInJobs } from "./linkedin.ts";

// match and merge job listings
import careeroneData from "./data/careerone.json" assert {type: "json"};
import ethicaljobsData from "./data/ethicaljobs.json" assert {type: "json"};
import linkedinData from "./data/linkedin.json" assert {type: "json"};
import seekData from "./data/seek.json" assert {type: "json"};
import workforceData from "./data/workforce.json" assert {type: "json"};

function matchAndMergeJobs() {
  let mergedJobs: any[] = [];
  let matchedCount = 0;
  let matchedJobs: any[] = []
  
  function mergeJobs(jobs: any[]) {
    jobs.forEach((job, i) => {

      if(job.title && job.location && job.organisation) {
        let matched = false;

        if(mergedJobs.length > 0) {
          mergedJobs.map((mj: any, j: any) => {

            const alreadyExistsFromSource = 
              (job.careerone_url && mj.careerone_url)
              || (job.ethicaljobs_url && mj.ethicaljobs_url)
              || (job.linkedin_url && mj.linkedin_url)
              || (job.seek_url && mj.seek_url)
              || (job.workforce_url && mj.workforce_url)

            if(!alreadyExistsFromSource) {
              if(determineLocation(job.location) === determineLocation(mj.location)) {
                if(stringSimilarity.compareTwoStrings(job.organisation, mj.organisation) > 0.8) {
                  if(stringSimilarity.compareTwoStrings(
                      cleanJobTitleStrings(job.title), 
                      cleanJobTitleStrings(mj.title)
                    ) > 0.75) {
                    matched = true;
                    matchedJobs.push(job);
                    mergedJobs[j] = {
                      ...mj,
                      ...job,
                      matched: true
                    };
                  }
                }
              }
            }
            
          });
        }

        if (!matched) {
          mergedJobs.push(job);
        }
      }
    });
  }

  let careeroneJobs = careeroneData,
      ethicaljobsJobs = ethicaljobsData,
      linkedinJobs = linkedinData,
      seekJobs = seekData,
      workforceJobs = workforceData;

  mergeJobs(careeroneJobs.data);
  mergeJobs(ethicaljobsJobs.data);
  mergeJobs(linkedinJobs.data);
  mergeJobs(seekJobs.data);
  mergeJobs(workforceJobs.data);


  const multiLinkJobs = mergedJobs.filter((mj: any) => {
    let linkCount = 0;

    mj.careerone_url?.length > 1 ? linkCount++ : null;
    mj.ethicaljobs_url?.length > 1 ? linkCount++ : null;
    mj.linkedin_url?.length > 1 ? linkCount++ : null;
    mj.seek_url?.length > 1 ? linkCount++ : null;
    mj.workforce_url?.length > 1 ? linkCount++ : null;

    return linkCount > 1;
  })

  console.log(multiLinkJobs);


  return mergedJobs;
}

serve(async (req: any) => {
  
  // const { name } = await req.json();

  // call all the functions and return the results
  // clean, match and merge data

  const careerOneRes = await getCareerOneJobs(); // done
  // const ethicalJobsRes = await getEthicalJobs(); // done
  // const linkedInRes = await getLinkedInJobs(); // done
  // const seekRes = await getSeekJobs(); // done
  // const workforceAusRes = await getWorkforceAusJobs(); // done

  // console.log("hello, world")

  // run d3 to match and merge data
  // http://learnjsdata.com/combine_data.html

  // const mergedData = d3.merge(
  //   [
  //     careerOneRes,
  //     ethicalJobsRes,
  //     linkedInRes,
  //     seekRes,
  //     workforceAusRes,
  //   ]
  // );

  // console.log(mergedData);

  // send to database function to update database
  // run sql 

  // good documentation on data assumptions
  // http://learnjsdata.com/assumptions.html

  // get seek salary maybe
  // https://github.com/b3n-j4m1n/salary-seeker

  // const data = matchAndMergeJobs();
  const data = careerOneRes;

  return new Response(
    JSON.stringify(data),
    { headers: { "Content-Type": "application/json" } },
  );
});

// To invoke:
// curl -i --location --request POST "http://localhost:54321/functions/v1/" \
//   --header "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs" \
//   --header "Content-Type: application/json" \
//   --data "{"name":"Functions"}"
