"use client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";

type MyPaginationProps = {
  currentPage: number;
  totalPages: number;
  urlParamsName?: string;
};
export const Pagination = ({
  urlParamsName,
  currentPage,
  totalPages,
}: MyPaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const totalPagesArr = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  function handlePreviousPage() {
    let newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamsName ? urlParamsName : "page",
      value: (currentPage - 1).toString(),
      pathname,
    });

    router.push(newUrl, { scroll: false });
  }
  function handleNextPage() {
    let newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamsName ? urlParamsName : "page",
      value: (currentPage + 1).toString(),
      pathname,
    });

    router.push(newUrl, { scroll: false });
  }

  function handleSetPage(page: number) {
    let newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamsName ? urlParamsName : "page",
      value: page.toString(),
      pathname,
    });

    router.push(newUrl, { scroll: false });
  }

  return (
    <div className="flex justify-center gap-2">
      <Button
        className="flex-center gap-1.5"
        variant="ghost"
        onClick={handlePreviousPage}
        disabled={currentPage <= 1}
      >
        <ChevronLeftIcon className="h-4 w-4" />
        <span>Previous</span>
      </Button>

      <div className="flex-center gap-1">
        {totalPagesArr.map((page) => (
          <Button
            size="icon"
            key={page}
            variant={currentPage === page ? "outline" : "ghost"}
            onClick={() => handleSetPage(page)}
          >
            {page}
          </Button>
        ))}
      </div>

      <Button
        className="flex-center gap-1.5"
        variant="ghost"
        onClick={handleNextPage}
        disabled={currentPage >= totalPages}
      >
        <span>Next</span>
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};
