type PaginationInput = Record<"page" | "perPage", number>;

interface PaginationDto {
  perPage: number;
  total: number;
  page: number;
  prevPage?: number | null;
  nextPage?: number | null;
  totalPages: number | null;
}

export const paginationSerializer = (
  total: number,
  query: PaginationInput
): PaginationDto => {
  const { page, perPage } = query;
  const itemsPerPage = total >= perPage ? perPage : total;
  const totalPages = itemsPerPage > 0 ? Math.ceil(total / itemsPerPage) : null;
  const prevPage =
    page > 1 && totalPages && page <= totalPages ? page - 1 : null;
  const nextPage =
    totalPages && totalPages > 1 && page < totalPages ? page + 1 : null;

  return {
    perPage: itemsPerPage,
    total,
    page,
    prevPage,
    nextPage,
    totalPages,
  };
};
