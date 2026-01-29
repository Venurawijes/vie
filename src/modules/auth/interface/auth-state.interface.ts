import { ICompany } from '@/shared/interfaces/company.interface';
import { IUser } from '@/shared/interfaces/user.interface';

export interface IAuthState {
  authUser: IUser | null;
  company: ICompany | null;
  authToken: string | null;
  authTokenType: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
