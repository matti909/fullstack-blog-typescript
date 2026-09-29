import type {
  HydratedDocument,
  ProjectionType,
  QueryFilter,
  QueryOptions,
  SortOrder,
  UpdateQuery,
} from "mongoose";

export interface IBaseRepository<T> {
  create(data: Partial<T>): Promise<HydratedDocument<T>>;

  deleteById(
    id: string,
    options?: QueryOptions,
  ): Promise<HydratedDocument<T> | null>;
  deleteMany(filter: QueryFilter<T>): Promise<{ deletedCount: number }>;

  exists(filter: QueryFilter<T>): Promise<boolean>;

  find(
    filter?: QueryFilter<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions,
  ): Promise<HydratedDocument<T>[]>;

  findById(
    id: string,
    projection?: ProjectionType<T>,
    options?: QueryOptions,
  ): Promise<HydratedDocument<T> | null>;

  findOne(
    filter: QueryFilter<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions,
  ): Promise<HydratedDocument<T> | null>;

  findPaginated(
    filter?: QueryFilter<T>,
    pagination?: PaginationOptions,
    projection?: ProjectionType<T>,
  ): Promise<PaginatedResult<T>>;

  updateById(
    id: string,
    updateData: UpdateQuery<T>,
    options?: QueryOptions,
  ): Promise<HydratedDocument<T> | null>;

  updateOne(
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
