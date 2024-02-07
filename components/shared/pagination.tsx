type PaginationProps = {
  page: number;
  totalPages: number;
  urlParamsName?: string;
};
export const Pagination = ({
  urlParamsName,
  page,
  totalPages,
}: PaginationProps) => {
  return <div>Pagination</div>;
};
