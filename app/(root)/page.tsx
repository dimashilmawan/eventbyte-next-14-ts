import { CategoryFilter } from "@/components/shared/category-filter";
import { Collection } from "@/components/shared/collection";
import { Container } from "@/components/shared/container";
import { Search } from "@/components/shared/search";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/event.action";
import Image from "next/image";
import Link from "next/link";

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
        <Container className=" grid grid-cols-1 items-center gap-8 py-6 md:grid-cols-2 md:gap-4 md:py-10">
          <div className="">
            <h1 className="text-4xl font-bold ">
              Host, Connect, Celebrate: Your Events, Our Platform!
            </h1>
            <p className="mt-6 text-xl">
              Book and learn helpful tips from 3,168+ mentors in world-class
              companies with our global community.
            </p>
            <Button
              size="lg"
              asChild
              className="mt-9 w-full rounded-full md:w-fit "
            >
              <Link href="#events">Explore now</Link>
            </Button>
          </div>
          <div className="relative h-[100vw] md:h-[33vw]">
            <Image
              alt="hero image"
              src="/assets/images/confrence.png"
              fill
              sizes="97vw"
              className=" object-contain object-center"
            />
          </div>
        </Container>
      </section>
      <section id="events">
        <Container className=" space-y-8 py-8">
          <h2 className="text-3xl font-bold">
            Trust by <br /> Thousands of Events
          </h2>
          <div className="flex items-center gap-3">
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
