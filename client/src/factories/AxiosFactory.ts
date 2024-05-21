import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export class AxiosFactory {
  private instance: AxiosInstance;

  constructor(baseURL: string = import.meta.env.VITE_API_URL, config: AxiosRequestConfig = {}) {
    this.instance = axios.create({
      baseURL,
      headers: { 'Content-Type': 'application/json' },
      ...config,
    });

    this.instance.interceptors.response.use(this.handleSuccess, this.handleError);
  }

  private handleSuccess(response: AxiosResponse): AxiosResponse {
    if (import.meta.env.VITE_NODE_ENV === 'development') console.log('Sucesso!', response);
    return response;
  }

  private handleError(error: AxiosError): Promise<never> {
    if (import.meta.env.VITE_NODE_ENV === 'development') console.log('Erro!', error);
    return Promise.reject(error.response?.data);
  }

  public get<T>(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
    return this.instance.get<T>(url, config);
  }

  public post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.post<T>(url, data, config);
  }

  public put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.put<T>(url, data, config);
  }

  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.delete<T>(url, config);
  }
}
