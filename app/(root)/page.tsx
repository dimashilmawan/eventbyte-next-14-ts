// check this out https://www.youtube.com/watch?v=nsMzWA6_3RA
// for proper handle server action and error
// the code bellow not proper handler server action and error

import { CategoryFilter } from "@/components/shared/category-filter";
import { Collection } from "@/components/shared/collection";
import { Container } from "@/components/shared/container";
import { Search } from "@/components/shared/search";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/event.action";
import Image from "next/image";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    query?: string;
    page?: string;
    category?: string;
  };
}) {
  const page = Number(searchParams.page) || 1;
  const query = searchParams.query || "";
  const category = searchParams.category || "";

  const { data, totalPages } = await getAllEvents({
    page,
    limit: 3,
    query,
    category,
  });

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center">
        <Container className=" grid grid-cols-1 items-center gap-0 pt-10 md:grid-cols-2 md:gap-4  md:py-14">
          <div>
            <h1 className="text-center text-3xl font-bold md:text-left md:text-4xl lg:text-5xl">
              Host, Connect, Celebrate: Your Events, Our Platform!
            </h1>
            <p className="mt-6 text-center text-xl md:text-left lg:text-2xl">
              Book and learn helpful tips from 3,168+ mentors in world-class
              companies with our global community.
            </p>
            <Button
              size="lg"
              asChild
              className="mt-9 w-full rounded-full text-base md:w-fit md:text-sm"
            >
              <a href="#events">Explore now</a>
            </Button>
          </div>
          <div className="relative h-[100vw] md:h-full">
            <Image
              alt="hero image"
              src="/assets/images/confrence-crop.png"
              fill
              sizes="97vw"
              className="object-contain object-center"
            />
          </div>
        </Container>
      </section>
      <section id="events">
        <Container className=" space-y-8 py-8">
          <h2 className="text-2xl font-bold md:text-3xl">
            Trust by <br /> Thousands of Events
          </h2>
          <div className="flex flex-col items-center gap-3 md:flex-row">
            <Search />
            <CategoryFilter />
          </div>

          <Collection
            data={data}
            emptyTitle="No Events found"
            emptySubtitle="Come back later!"
            page={page}
            totalPages={totalPages}
            collectionType="all-events"
          />
        </Container>
      </section>
    </>
  );
}

// "use client";

// import { Button } from "@/components/ui/button";
// import { createUser } from "@/lib/actions/user.action";

// export default function Page() {
//   async function handleClick() {
//     const user = await createUser({
//       clerkId: "awdawd",
//       email: "hilmawan22@gmail.com",
//       firstName: "dimas",
//       lastName: "hilmawan",
//       photo: "awd",
//       username: "hilmawan28",
//     });

//     console.log(user);
//   }
//   return (
//     <div className="flex-center h-screen w-full">
//       <Button variant={"default"} size={"lg"} onClick={handleClick}>
//         Save
//       </Button>
//     </div>
//   );
// }
