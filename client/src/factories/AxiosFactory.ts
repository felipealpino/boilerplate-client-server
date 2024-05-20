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
    console.log('Successo!' /* , response */);
    // Você pode adicionar lógica de tratamento de sucesso global aqui
    return response;
  }

  private handleError(error: AxiosError): Promise<never> {
    console.log('Erro!', error);
    // Você pode adicionar lógica de tratamento de erro global aqui
    return Promise.reject(error);
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
