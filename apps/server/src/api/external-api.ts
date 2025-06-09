import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

interface ExternalAPIOptions {
  headers?: Record<string, unknown>;
}

class ExternalAPI {
  protected axios: AxiosInstance;

  constructor(baseUrl: string, params: Record<string, unknown>, options: ExternalAPIOptions = {}) {
    this.axios = axios.create({
      baseURL: baseUrl,
      params,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...options.headers,
      },
    });
  }

  protected async get<T>(endpoint: string, config?: AxiosRequestConfig, ttl?: number): Promise<T> {
    const response = await this.axios.get<T>(endpoint, config);
    return response.data;
  }

  protected async post<T>(
    endpoint: string,
    data: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axios.post<T>(endpoint, data, config);
    return response.data;
  }
}

export default ExternalAPI;
