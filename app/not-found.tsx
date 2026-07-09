import Link from "next/link";
import { ArrowRightIcon } from "@/components/Icons";

export default function NotFound() {
  return (
    <section className="container-px flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
      <span className="font-display text-7xl font-bold tracking-tight text-accent sm:text-8xl">
        404
      </span>
      <h1 className="mt-6 font-display text-2xl font-bold">Page not found</h1>
      <p className="mt-3 max-w-md text-muted">
        The page you're looking for doesn't exist or may have moved. Let's get you
        back to editing.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn-primary">
          Back Home <ArrowRightIcon className="h-4 w-4" />
        </Link>
        <Link href="/tools" className="btn-ghost">
          Browse Tools
        </Link>
      </div>
    </section>
  );
}
