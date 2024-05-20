export type GenericObject<T = any> = Record<string, T>;

export type EnviromentStagesPrefix = 'dev' | 'homolog' | 'production';

export type Pagination = {
  sort: 'ASC' | 'DESC';
  page: number;
  size: number;
  query?: string | number;
  order?: string;
};

export type PaginationResponse<T = any[]> = {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  items: T;
};

export type Nullish<T = any> = T | null | undefined;
