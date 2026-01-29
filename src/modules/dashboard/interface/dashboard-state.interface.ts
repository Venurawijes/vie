import { IBranch } from '@/shared/interfaces/branch.interface';

export interface IDashboardState {
  branches: IBranch[] | [];
  branchIds: number[];
  isLoading: boolean;
  error: string | null;
}
