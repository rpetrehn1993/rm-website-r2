import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 dark:bg-black">
      <div className="mx-auto max-w-md text-center">
        <h1 className="mb-4 text-6xl font-bold text-black dark:text-white">
          404
        </h1>
        <h2 className="mb-4 text-2xl font-semibold text-black dark:text-white">
          Page not found
        </h2>
        <p className="mb-8 text-lg text-zinc-600 dark:text-zinc-400">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have
          been moved or deleted.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-full bg-foreground px-6 py-3 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
          >
            Go home
          </Link>
          <Link
            href="/"
            className="rounded-full border border-solid border-black/[.08] px-6 py-3 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
          >
            Browse pages
          </Link>
        </div>
      </div>
    </div>
  );
}

