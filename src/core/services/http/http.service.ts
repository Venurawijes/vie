import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

import config from '@/config';
import { store } from '@/core/context/store';

export class HttpService {
  private instance: AxiosInstance | undefined;
  private options: AxiosRequestConfig;

  constructor() {
    this.options = {
      baseURL: config.apiBaseUrl,
      headers: { 'Content-Type': 'application/json', tz: 'Asia/Colombo' },
    };
  }

  private setInstance(): void {
    if (!this.instance) {
      this.instance = axios.create(this.options);
      this.instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
        const state = store.getState();
        config.headers.Authorization =
          state.auth.authToken && state.auth.authTokenType
            ? `${state.auth.authTokenType} ${state.auth.authToken}`
            : '';
        return config;
      });
    }
  }

  getInstance(): AxiosInstance {
    if (!this.instance) {
      this.setInstance();
    }
    return this.instance!;
  }
}
