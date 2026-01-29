import { ICompany } from '@/shared/interfaces/company.interface';
import { IUser } from '@/shared/interfaces/user.interface';

export interface IAuthResponse {
  access_token: string;
  token_type: string;
  expires_at: string | Date;
  datetime_format: string;
  user: IUser;
  company: ICompany;
}
