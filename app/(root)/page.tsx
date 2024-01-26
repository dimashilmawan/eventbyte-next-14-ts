import { Button } from "@/components/ui/button";
import { connectToDB } from "@/lib/database";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain ">
        <div className="wrapper grid grid-cols-1 items-center gap-8 py-8 md:grid-cols-2 md:gap-4">
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
              <Link href="#events">Explore noew</Link>
            </Button>
          </div>
          <div className="relative h-[100vw] md:h-[33vw]">
            <Image
              alt="hero image"
              src="/assets/images/hero.png"
              fill
              sizes="97vw"
              className=" object-contain object-center"
            />
          </div>
        </div>
      </section>
      <section id="events">
        <div className="wrapper py-8">
          <h2 className="text-xl font-bold">
            Trust by <br /> Thousands of Events
          </h2>
          <div></div>
        </div>
      </section>
    </>
  );
}
