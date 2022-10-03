import { cleanJobTitleStrings, determineLocation, determineJobType } from "./utils.ts";

export async function getCareerOneJobs() {
  let allCareerOneJobs: any[] = [];

  const initialQuery = await searchCarrerOne(1).then((res) => res.json());

  const totalResults = initialQuery.search_results.job_count;
  const totalPages = Math.ceil(totalResults / 20);

  if(totalResults > 0) {
    // add inital results to allCareerOneJobs array
    allCareerOneJobs = allCareerOneJobs.concat(
      initialQuery.search_results.jobs.map((job: any) => { return parseCareerOneJob(job) }
      )
    );

    if(totalPages > 1) {
      // get all other pages
      for(let i = 2; i <= totalPages; i++) {
        const pageQuery = await searchCarrerOne(i).then((res) => res.json()); 
        allCareerOneJobs = allCareerOneJobs.concat(pageQuery.search_results.jobs);
        
        // wait between requests
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }
  
  return allCareerOneJobs.map(parseCareerOneJob).filter(x => x.title !== undefined && x.organisation !== undefined);
}

async function searchCarrerOne(page: number) {
  return await fetch("https://seeker-api.careerone.com.au/api/v1/search-job", {
    "headers": {
      "accept": "application/json",
      "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
      "cache-control": "no-cache",
      "content-type": "application/json",
      "platform-code": "careerone",
      "pragma": "no-cache",
      "sec-ch-ua": "\"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"104\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "site-code": "careerone",
      "Referer": "https://www.careerone.com.au/",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": "{\"search_keywords\":\"remote\",\"search\":\"remote\",\"sort_by\":\"\",\"job_type\":[],\"categories\":[{\"id\":17,\"name\":\"Information Technology (IT)\",\"slug\":\"information-technology\",\"live_job_count\":7992,\"occupations\":[]},{\"id\":25,\"name\":\"Science, Technology & Environment\",\"slug\":\"science-technology-and-environment\",\"live_job_count\":431,\"occupations\":[]}],\"skills\":[],\"source_code\":[],\"ad_type\":[],\"posted_within_days\":{\"days\":0,\"value\":\"Any time\"},\"keywords\":[],\"sector\":[],\"job_title\":[],\"industry\":[],\"company_size\":[],\"job_mode\":[],\"contract_type\":[],\"career_level\":[],\"perks\":[],\"work_authorisation\":[],\"education_level\":[],\"languages\":[],\"licenses\":[],\"certifications\":[],\"pay_max\":\"\",\"pay_min\":\"\",\"brands\":[],\"employer_name\":\"\",\"location\":\"\",\"include_surrounding_location\":true,\"page\":2,\"resultsPerPage\":20,\"parsed_filter\":\"1\",\"parsed\":{\"brand\":[{\"id\":\"254987\",\"strip_text_from_phrase\":\"remote\"}],\"search_phrase\":\"\"},\"locale\":\"AU\",\"bucket_code\":\"ORGANIC,PRIORITISE\"}",
    "method": "POST"
  });
}

function parseCareerOneJob(job: any) {
  return {
    title: cleanJobTitleStrings(job.job_title),
    description: job.job_description,
    posted: job.activates_at,
    organisation: job.company_name,
    industry: job.category_label,
    work_type: determineJobType(job.job_type_label),
    location: determineLocation(job.location_label),
    area: job.location_level_2_label,
    salary_min: job.pay_min,
    salary_max: job.pay_max,
    careerone_url: `https://www.careerone.com.au/jobview/${job.URL}`,
  }
}