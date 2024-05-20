import { GenericObject } from '@/types';

export interface RequestInterface {
  getParams(): GenericObject<any>;
  getQueryParams(): GenericObject<any>;
  getRawQueryParams(): Record<string, string>;
  getBody<T = any>(): T;
  getHeaders(): GenericObject<any>;
  getMethod(): string;
  getUrl(): string;
}
