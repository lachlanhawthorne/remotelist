import { determineLocation } from './utils';

export async function getEthicalJobs() { 
  let allEthicalJobs: any[] = [];

  const initalQuery = await fetch(
    `https://api.ethicaljobs.com.au/search/jobs?workTypes[]=8&categories[]=34&page=1&from=0&limit=30&status=APPROVED&includeExpired=false&orderBy[]=prioritised_for_search:desc&orderBy[]=approved_at:desc&fields=id,title,slug,expires_at,location_id,locality_id,organisation_id,featured,summary,expiration_hidden,created_at,approved_at,workTypes,prioritised_for_search,organisation_id&include=organisation,locality&expired=0`
  ).then(res => res.json());

  const totalResults = initalQuery.meta.total;
  const totalPages = Math.ceil(totalResults / 30);

  const organisations = initalQuery.data.entities.organisations;
  const localities = initalQuery.data.entities.localities;
  
  if(totalResults > 0) {
    // add inital results to allEthicalJobs array
    allEthicalJobs = allEthicalJobs.concat(
      initalQuery.data.result.map( (job: any) => { return parseEthicalJob(initalQuery.data.entities.jobs[job], organisations, localities) }
      )
    );

    if(totalPages > 1) {
      // get all other pages
      for(let i = 2; i <= totalPages; i++) {
        const pageQuery = await fetch(
          `https://api.ethicaljobs.com.au/search/jobs?workTypes[]=8&categories[]=34&page=${i}&from=0&limit=30&status=APPROVED&includeExpired=false&orderBy[]=prioritised_for_search:desc&orderBy[]=approved_at:desc&fields=id,title,slug,expires_at,location_id,locality_id,organisation_id,featured,summary,expiration_hidden,created_at,approved_at,workTypes,prioritised_for_search,organisation_id&include=organisation,locality&expired=0`
        ).then(res => res.json()); 
        allEthicalJobs = allEthicalJobs.concat(pageQuery.data.entities.jobs);
        
        // wait between requests
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  return allEthicalJobs;
}

function parseEthicalJob(job: any, organisations: any, localities: any) {
  const industries = job.categories.map((cat: any) => { return categories[cat]?.name });
  const industriesText = industries.slice(0, -1).join(', ').replace(/, ([^,]*)$/, ', $1');

  const workTypesItems = job.workTypes.map((workType: any) => { return workTypes[workType]?.name });
  const workTypesText = workTypesItems.slice(0, -1).join(', ').replace(/, ([^,]*)$/, ', $1');

  const parsedJob: any = {
    title: job.title.split(' - ')[0],
    description: job.summary,
    posted: new Date(job.created_at),
    organisation: organisations[job.organisation_id].name,
    industry: industriesText,
    work_type: workTypesText,
    location: determineLocation(locations.filter((location: any) => location.id === job.location_id)[0]?.name),
    area: localities[job.locality_id]?.name,
    // salary_min: job.salary_min,
    // salary_max: job.salary_max,
    ethicaljobs_url: job.url,
  };

  return parsedJob;
}

const locations = [
  { id: 1, name: "Melbourne" },
  { id: 2, name: "Regional VIC" },
  { id: 3, name: "Syndey" },
  { id: 4, name: "Regional NSW" },
  { id: 5, name: "Brisbane & Gold Coast" },
  { id: 6, name: "Regional QLD" },
  { id: 7, name: "Perth" },
  { id: 8, name: "Regional WA" },
  { id: 9, name: "Adelaide" },
  { id: 10, name: "Regional SA" },
  { id: 11, name: "Hobart" },
  { id: 12, name: "Regional TAS" },
  { id: 13, name: "Darwin" },
  { id: 14, name: "Regional NT" },
  { id: 15, name: "Canberra & ACT" },
  { id: 16, name: "International" }
]

const workTypes = [
  { id: 1, name: "Casual" },
  { id: 2, name: "Contract" },
  { id: 3, name: "Full Time" },
  { id: 4, name: "Graduate" },
  { id: 5, name: "Part Time" },
  { id: 6, name: "Volunteer" },
  { id: 7, name: "Board Member" },
  { id: 8, name: "Remote / Work from Home" },
]

const categories = [
  { id: "1", name: "Administration" },
  { id: "2", name: "Advocacy and Campaigns" },
  { id: "3", name: "Aged Care and Seniors Rights" },
  { id: "4", name: "Alcohol and Other Drugs" },
  { id: "5", name: "Animal Welfare and Protection" },
  { id: "6", name: "Business Development and Sales" },
  { id: "7", name: "Care and Support Work" },
  { id: "8", name: "Co-ops and Credit Unions" },
  { id: "9", name: "Communications and Marketing" },
  { id: "10", name: "Community Development" },
  { id: "11", name: "Conservation and Land Management" },
  { id: "12", name: "Corporate Social Responsibility" },
  { id: "13", name: "Disability Services" },
  { id: "54", name: "Domestic & Family Violence" },
  { id: "14", name: "Early Childhood" },
  { id: "15", name: "Eco-Tourism" },
  { id: "16", name: "Education and Training" },
  { id: "17", name: "Environment and Sustainability" },
  { id: "55", name: "Events Management" },
  { id: "18", name: "Executive and Senior Management" },
  { id: "20", name: "FairTrade and Organic" },
  { id: "19", name: "Family Services" },
  { id: "21", name: "Finance and Accounting" },
  { id: "22", name: "Fundraising" },
  { id: "24", name: "Green Architecture/Property" },
  { id: "25", name: "Green Energy" },
  { id: "26", name: "Green Products and Services" },
  { id: "27", name: "Health Care and Allied Health" },
  { id: "28", name: "Health Promotion" },
  { id: "29", name: "Housing and Homelessness" },
  { id: "31", name: "HR and Employment Services" },
  { id: "32", name: "Indigenous" },
  { id: "34", name: "Information Technology & Digital" },
  { id: "33", name: "International Aid and Development" },
  { id: "35", name: "Legal and Human Rights" },
  { id: "23", name: "LGBTQIA+" },
  { id: "36", name: "Management" },
  { id: "37", name: "Media and Arts" },
  { id: "38", name: "Medical Research" },
  { id: "39", name: "Mental Health and Counselling" },
  { id: "40", name: "Multiculturalism and Diversity" },
  { id: "41", name: "Nursing" },
  { id: "42", name: "Operations and Risk Management" },
  { id: "43", name: "Organic Farming and Gardening" },
  { id: "44", name: "Policy and Research" },
  { id: "45", name: "Project Management" },
  { id: "46", name: "Recycling and Waste Management" },
  { id: "30", name: "Retail and Hospitality" },
  { id: "47", name: "Social Work" },
  { id: "48", name: "Sustainable Transport" },
  { id: "49", name: "Trades and Services" },
  { id: "50", name: "Unions and Workers Rights" },
  { id: "51", name: "Volunteer Management" },
  { id: "52", name: "Womens Organisations and Services" },
  { id: "53", name: "Youth" }
]