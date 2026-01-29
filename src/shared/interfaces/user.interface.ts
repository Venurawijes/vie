import { EUserRole } from '../enums/user-role.enum';

export interface IUser {
  id: string;
  email: string;
  first_name: string;
  last_name: null | string;
  roles: EUserRole[];
  phone_number?: null | string;
}
