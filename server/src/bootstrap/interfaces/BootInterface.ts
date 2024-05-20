import { RequestInterface } from '@/bootstrap/interfaces/RequestInterface';
import { GenericObject } from '@/types';

export type ApiExecuteCallbackAppConfig = { request: RequestInterface; [key: string]: any };
export type ApiExecuteCallbackReturn = { result: GenericObject<any>; [key: string]: any };
export type ApiExecuteCallback = (appConfig: ApiExecuteCallbackAppConfig) => Promise<ApiExecuteCallbackReturn>;

export type BootController = (args: ApiExecuteCallbackAppConfig) => Promise<ApiExecuteCallbackReturn>;

export interface IBootInterface {
  apiExecute(cb: ApiExecuteCallback): Promise<void>;
  catchError(error: unknown): void;
}
