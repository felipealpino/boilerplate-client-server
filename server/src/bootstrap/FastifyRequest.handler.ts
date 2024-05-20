import { QueryStringHelper } from '@/helpers/QueryString.helper';
import { GenericObject } from '@/types';
import { FastifyRequest } from 'fastify';

export class FastifyRequestHandler {
  private request: FastifyRequest;

  constructor(request: FastifyRequest) {
    this.request = request;
  }

  // Obtém os parâmetros da URL
  getParams(): GenericObject<any> {
    return this.request.params as GenericObject<any>;
  }

  // Obtém os parâmetros de query string (decodificados)
  getQueryParams(): GenericObject<any> {
    return QueryStringHelper.convert(this.request.query as Record<string, string>);
  }

  // Obtém os parâmetros de query string (como estão)
  getRawQueryParams(): Record<string, string> {
    return this.request.query as Record<string, string>;
  }

  // Obtém o corpo da requisição
  getBody<T = any>(): T {
    return this.request.body as T;
  }

  // Obtém os headers da requisição
  getHeaders(): GenericObject<any> {
    return this.request.headers as GenericObject<any>;
  }

  // Obtém o método HTTP da requisição
  getMethod(): string {
    return this.request.method;
  }

  // Obtém o URL da requisição
  getUrl(): string {
    return this.request.url;
  }
}
