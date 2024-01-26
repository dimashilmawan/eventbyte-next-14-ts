import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain ">
        <div className="wrapper grid grid-cols-1 gap-3 py-8 md:grid-cols-2">
          <div className="">
            <h1 className="text-4xl font-bold ">
              Host, Connect, Celebrate: Your Events, Our Platform!
            </h1>
            <p className="mt-3 text-xl">
              Book and learn helpful tips from 3,168+ mentors in world-class
              companies with our global community.
            </p>
            <Button
              size="lg"
              asChild
              className="mt-6 w-full rounded-full md:w-fit "
            >
              <Link href="#events">Explore</Link>
            </Button>
          </div>
          <Image
            alt="hero image"
            width={1000}
            height={1000}
            src="/assets/images/hero.png"
            className="max-h-[50vh] object-contain "
          />
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
