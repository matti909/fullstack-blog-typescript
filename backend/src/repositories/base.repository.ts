import type { QueryFilter, SortOrder } from "mongoose";

export interface GetAllOptions<T> {
  filter?: QueryFilter<T>;
  sort?: SortOptions;
}

// Solo nuestros params: filter (author/tags) + sort (sortBy/sortOrder).
export interface SortOptions {
  sortBy?: string;
  sortOrder?: SortOrder;
}

interface FindableModel<T> {
  find(filter?: QueryFilter<T>): SortableQuery<T>;
}

interface SortableQuery<T> extends Promise<T[]> {
  sort(sort: Record<string, SortOrder> | string): SortableQuery<T>;
}

export const createBaseRepository = <T>(model: FindableModel<T>) => {
  async function getAll({
    filter = {},
    sort,
  }: GetAllOptions<T> = {}): Promise<T[]> {
    const { sortBy = "createdAt", sortOrder = "descending" } = sort ?? {};
    return await model.find(filter).sort({ [sortBy]: sortOrder });
  }

  return { getAll };
};
