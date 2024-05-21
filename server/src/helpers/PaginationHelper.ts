import { PaginationResponse } from '@/types';

export class PaginationHelper {
  static getPagination(size?: number, page?: number) {
    const limit = size ? Number(size) : 50;
    const offset = page ? Number(page) * limit : 0;
    return { limit, offset, page: page ? Number(page) : 0 };
  }

  static formatData<T>(data: [T[], number], limit: number, page?: number | string): PaginationResponse<T[]> {
    const [rows, count] = data;
    const currentPage = page ? Number(page) : 0;
    const totalPages = Math.ceil(count / limit);
    return { totalItems: count, items: rows, totalPages, currentPage };
  }
}
