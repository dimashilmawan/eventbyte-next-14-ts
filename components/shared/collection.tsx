import { PopulatedEvent } from "@/lib/actions/event.action";
import { IEvent } from "@/lib/database/models/event.model";
import { Container } from "./container";
import { Card } from "./card";
import { Pagination } from "./pagination";

type CollectionProps = {
  data: PopulatedEvent[];
  page: number;
  limit: number;
  emptyTitle: string;
  emptySubtitle: string;
  totalPages?: number;
  urlParamsName?: string;
  collectionType?: "events-organized" | "my-tickets" | "all-events";
};

export const Collection = ({
  data,
  page,
  limit,
  totalPages = 1,
  emptyTitle,
  emptySubtitle,
  urlParamsName,
  collectionType,
}: CollectionProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="space-y-4">
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
              page={page}
              totalPages={totalPages}
              urlParamsName={urlParamsName}
            />
          )}
        </div>
      ) : (
        <div className="flex-center flex-col space-y-3 rounded-md bg-gray-50 py-24">
          <h3 className="text-3xl font-bold">{emptyTitle}</h3>
          <p className="text-gray-600">{emptySubtitle}</p>
        </div>
      )}
    </>
  );
};
