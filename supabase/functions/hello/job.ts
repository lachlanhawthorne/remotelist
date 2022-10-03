export type Job = {
  title: string;
  description: string;

  posted: Date;
  expiry_date?: Date;

  location?: string;
  organisation: string;
  industry: string;
  work_type: string;
  area?: string;

  salary_min?: number;
  salary_max?: number;

  listing_url?: string;
  careerone_url?: string;
  ethicaljobs_url?: string;
  indeed_url?: string;
  seek_url?: string;
  workforce_url?: string;
}