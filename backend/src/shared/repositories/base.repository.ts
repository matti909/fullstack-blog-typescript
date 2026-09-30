import type {
  HydratedDocument,
  ProjectionType,
  QueryFilter,
  QueryOptions,
  SortOrder,
  UpdateQuery,
} from "mongoose";

export interface GetAllOptions<T> {
  filter?: QueryFilter<T>;
  pagination?: GetAllPagination;
  sort?: GetAllSort;
}

export interface GetAllPagination {
  limit?: number;
  page?: number;
}

export interface GetAllSort {
  sortBy?: string;
  sortOrder?: SortOrder;
}

export interface IBaseRepository<T> {
  create(data: Partial<T>): Promise<T>;

  deleteById?(
    id: string,
    options?: QueryOptions,
  ): Promise<HydratedDocument<T> | null>;
  deleteMany?(filter: QueryFilter<T>): Promise<{ deletedCount: number }>;

  exists?(filter: QueryFilter<T>): Promise<boolean>;

  find?(
    filter?: QueryFilter<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions,
  ): Promise<HydratedDocument<T>[]>;

  findById?(
    id: string,
    projection?: ProjectionType<T>,
    options?: QueryOptions,
  ): Promise<HydratedDocument<T> | null>;

  findOne?(
    filter: QueryFilter<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions,
  ): Promise<HydratedDocument<T> | null>;

  findPaginated?(
    filter?: QueryFilter<T>,
    pagination?: PaginationOptions,
    projection?: ProjectionType<T>,
  ): Promise<PaginatedResult<T>>;

  getAll(opts?: GetAllOptions<T>): Promise<T[]>;

  updateById?(
    id: string,
    updateData: UpdateQuery<T>,
    options?: QueryOptions,
  ): Promise<HydratedDocument<T> | null>;

  updateOne?(
    filter: QueryFilter<T>,
    updateData: UpdateQuery<T>,
    options?: QueryOptions,
  ): Promise<HydratedDocument<T> | null>;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    page: number;
    totalDocs: number;
    totalPages: number;
  };
}

export interface PaginationOptions {
  limit?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

interface FindableModel<T> {
  new (data?: Partial<T>): { save(): Promise<T> };
  find(filter?: QueryFilter<T>): PageableQuery<T>;
}

interface PageableQuery<T> extends Promise<T[]> {
  limit(limit: number): PageableQuery<T>;
  skip(skip: number): PageableQuery<T>;
  sort(sort: Record<string, SortOrder> | string): PageableQuery<T>;
}

export const createBaseRepository = <T>(
  model: FindableModel<T>,
): IBaseRepository<T> => {
  async function create(data: Partial<T>): Promise<T> {
    return await new model(data).save();
  }

  async function getAll({
    filter = {},
    pagination,
    sort,
  }: GetAllOptions<T> = {}): Promise<T[]> {
    const { sortBy = "createdAt", sortOrder = "descending" } = sort ?? {};

    let query = model.find(filter).sort({ [sortBy]: sortOrder });

    if (pagination?.limit) {
      const page = pagination.page ?? 1;
      query = query.skip((page - 1) * pagination.limit).limit(pagination.limit);
    }

    return await query;
  }

  return { create, getAll };
};
