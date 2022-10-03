import { parseSalary, determineLocation } from "./utils.ts";

import type { Job } from "./job.ts";

// WorkforceAustralia
export async function getWorkforceAusJobs() {
  let allWorkforceAusJobs: Job[] = [];

  const initalQuery = await fetch(
    `https://www.workforceaustralia.gov.au/api/v1/global/vacancies/?searchText=remote&industryCode=126`
  ).then(res => res.json());

  const totalResults = initalQuery.totalCount;
  const totalPages = Math.ceil(totalResults / initalQuery.pageSize);

  if(totalResults > 0) {
    // add inital results to allWorkforceAusJobs array
    allWorkforceAusJobs = allWorkforceAusJobs
      .concat(
        initalQuery.results
          .map((x: any) => x.result)
          .map(parseWorkforceAusJob)
      );

    if(totalPages > 1) {
      // get all other pages
      // for(let i = 2; i <= totalPages; i++) {
      for(let i = 2; i <= 3; i++) {

        const pageQuery = await fetch(
          `https://www.workforceaustralia.gov.au/api/v1/global/vacancies/?searchText=remote&industryCode=126&page=${i}`
        ).then(res => res.json());

        allWorkforceAusJobs = allWorkforceAusJobs.concat(pageQuery.results.map((x: any) => x.result).map(parseWorkforceAusJob));

        // wait between requests
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  return allWorkforceAusJobs;
}

function parseWorkforceAusJob(job: any): Job {
  const salary = parseSalary(job.salary?.label);

  const parsedJob: Job = {
    title: job.title.replace(/\([^()]*\)/g, ''),
    description: job.description,
    posted: new Date(job.creationDate),
    expiry_date: new Date(job.expiryDate),
    organisation: job.employerName,
    industry: job.industry?.label,
    work_type: job.workType?.label,
    location: determineLocation(job.location?.label),
    area: job.suburb,
    salary_min: salary.length > 0 ? salary[0] : undefined,
    salary_max: salary.length > 1 ? salary[1] : undefined,
    workforce_url: `https://www.workforceaustralia.gov.au/individuals/jobs/details/${job.vacancyId}`,
  };
  return parsedJob;
}