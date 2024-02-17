import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-center h-full w-full flex-col">
      <h2 className="text-3xl font-semibold">404: Page Not Found</h2>
      <p className="mt-3 ">
        Sorry, the page you are looking for might be in another castle.
      </p>
      <Button size={"lg"} asChild>
        <Link href="/" className="mt-5">
          Return Home
        </Link>
      </Button>
    </div>
  );
}
