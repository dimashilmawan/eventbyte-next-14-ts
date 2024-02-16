import { PopulatedEvent } from "@/lib/actions/event.action";
import { Card } from "./card";
import { Pagination } from "./pagination";

type CollectionProps = {
  data: PopulatedEvent[];
  page: number;
  emptyTitle: string;
  emptySubtitle: string;
  totalPages?: number;
  urlParamsName?: string;
  collectionType?: "events-organized" | "my-tickets" | "all-events";
};

export const Collection = ({
  data,
  page,
  totalPages = 1,
  emptyTitle,
  emptySubtitle,
  urlParamsName,
  collectionType,
}: CollectionProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="space-y-8">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {data.map((event) => {
              const hasOrderLink = collectionType === "events-organized";
              const hidePrice = collectionType === "my-tickets";

              return (
                <Card
                  key={event._id}
                  event={event}
                  hasOrderLink={hasOrderLink}
                  hidePrice={hidePrice}
                />
              );
            })}
          </ul>
          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              urlParamsName={urlParamsName}
            />
          )}
        </div>
      ) : (
        <div className="flex-center flex-col space-y-3 rounded-md bg-gray-50 px-4 py-24">
          <h3 className="text-balance text-center text-xl font-bold md:text-3xl">
            {emptyTitle}
          </h3>
          <p className="text-balance text-center text-gray-600">
            {emptySubtitle}
          </p>
        </div>
      )}
    </>
  );
};
