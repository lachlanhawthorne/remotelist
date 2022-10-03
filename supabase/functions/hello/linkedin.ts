// @deno-types="https://cdn.jsdelivr.net/gh/justjavac/deno_cheerio/cheerio.d.ts"
import cheerio from "https://esm.sh/cheerio@1.0.0-rc.11";
import { determineLocation } from './utils';

export async function getLinkedInJobs() {
  // https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=Tech&location=Australia&locationId=&geoId=101452733&f_TPR=&f_WT=2&start=0

  let allLinkedInJobs: any[] = [];

  const initalQuery = await fetch(
    `https://www.linkedin.com/jobs/search?keywords=Tech&location=Australia&locationId=&geoId=101452733&f_TPR=&f_WT=2&position=1&pageNum=0`
  ).then((res) => res.text());

  const $ = cheerio.load(initalQuery);

  const totalResultsNode = $("#totalResults")[0].children[0] as any
  const totalResults = totalResultsNode.data

  const resultsPerPageNode = $("#resultsPerPage")[0].children[0] as any
  const resultsPerPage = resultsPerPageNode.data

  const totalPages = Math.ceil(totalResults / resultsPerPage);

  for (let i = 0; i < totalPages; i++) {
    const page = await fetch(
      `https://www.linkedin.com/jobs/search?keywords=Tech&location=Australia&locationId=&geoId=101452733&f_TPR=&f_WT=2&position=1&pageNum=${i}`
    ).then((res) => res.text());

    const $$ = cheerio.load(page);
    const jobs = $$("li").map((i, el) => {
        const title = $$(el).find('h3.base-search-card__title').text().trim();
        const company = $$(el).find('h4.base-search-card__subtitle').text().trim();
        const location = $$(el).find('span.job-search-card__location').text().trim();
        const linkedin_url = $$(el).find('a.base-card__full-link').attr('href');

        if(title && company && location && linkedin_url) {
          return {
            title,
            company,
            location: determineLocation(location),
            linkedin_url
          }
        }
      }
    );

    allLinkedInJobs = allLinkedInJobs.concat(jobs.get());

    // wait between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  return allLinkedInJobs;
}