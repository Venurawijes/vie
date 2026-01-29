import { AxiosInstance, AxiosResponse } from 'axios';

import { HttpService } from '@/core/services/http/http.service';
import { FetchBranchesProps } from '../types/fetch-branches-props.type';
import { IBranchesResponse } from '../interface/dashboard-response.interface';

export class DashboardApi {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = new HttpService().getInstance();
  }

  async fetchBranches(props: FetchBranchesProps): Promise<AxiosResponse<IBranchesResponse>> {
    return this.axiosInstance.get(`api/v2/company/${props.companyId}`, {
      headers: {
        prefix: props.prefix,
      },
    });
  }
}
