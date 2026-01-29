export interface ICompany {
  id: number;
  name: string;
  name2: string | null;
  registration_no: string;
  description: string;
  status: string | null;
  url_prefix: string;
  logo: string;
  background_image: string | null;
  user_id: number;
  region_id: number;
  company_email: string | null;
  address_line1: string;
  address_line2: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  country: string | null;
  contact_no: string | null;
  is_business_address_same: number;
  type_of_business: string;
  category: string;
  website: string | null;
  company_url: string | null;
}
