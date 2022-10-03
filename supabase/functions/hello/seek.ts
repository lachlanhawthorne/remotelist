import { parseSalary, determineLocation } from "./utils.ts";

import type { Job } from "./job.ts";

export async function getSeekJobs() {
  let allSeekJobs: Job[] = [];

  const initalQuery = await fetch(
    `https://www.seek.com.au/api/chalice-search/search?siteKey=AU-Main&sourcesystem=houston&where=All+Australia&page=1&seekSelectAllPages=true&keywords=remote&classification=6281&salarytype=annual&include=seodata`
  ).then(res => res.json());

  const totalResults = initalQuery.totalCount;
  const totalPages = Math.ceil(totalResults / 20);

  if(totalResults > 0) {
    // add inital results to allSeekJobs array
    allSeekJobs = allSeekJobs.concat(initalQuery?.data.map(parseSeekJob));
    console.log(`${totalResults} jobs found`);

    if(totalPages > 1) {
      // get all other pages
      for(let i = 2; i <= totalPages; i++) {
        const pageQuery = await fetch(
          `https://www.seek.com.au/api/chalice-search/search?siteKey=AU-Main&sourcesystem=houston&where=All+Australia&page=${i}&seekSelectAllPages=true&keywords=remote&classification=6281&salarytype=annual&include=seodata`
        ).then(res => res.json());

        allSeekJobs = [...allSeekJobs, ...pageQuery?.data.map(parseSeekJob)];
        
        // wait between requests
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
  }

  return allSeekJobs;
}

function parseSeekJob(job: any): Job {
  // parse so it always returns anual salary
  const salary = parseSalary(job.salary);

  const parsedJob: Job = {
    title: job.title,
    description: job.teaser,
    posted: new Date(job.listingDate),
    organisation: job.advertiser.description,
    industry: job.classification.description,
    work_type: job.workType,
    location: determineLocation(job.location.split(" &")[0]),
    area: job.area,
    salary_min: salary.length > 0 ? salary[0] : undefined,
    salary_max: salary.length > 1 ? salary[1] : undefined,
    seek_url: `https://www.seek.com.au/job/${job.id}`,
  };
  return parsedJob;
}