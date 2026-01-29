import { AxiosInstance, AxiosResponse } from 'axios';

import { HttpService } from '@/core/services/http/http.service';
import { IAuthResponse } from '../interface/auth-response.interface';
import { LoginInputProps } from '../types/login-input-props.type';

export class AuthApi {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = new HttpService().getInstance();
  }

  async login(props: LoginInputProps): Promise<AxiosResponse<IAuthResponse>> {
    return this.axiosInstance.post('/api/v2/auth/login', props);
  }
}
