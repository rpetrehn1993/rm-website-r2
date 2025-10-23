'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 dark:bg-black">
          <div className="mx-auto max-w-md text-center">
            <h1 className="mb-4 text-4xl font-bold text-black dark:text-white">
              Application Error
            </h1>
            <p className="mb-8 text-lg text-zinc-600 dark:text-zinc-400">
              A critical error occurred. Please refresh the page or try again
              later.
            </p>
            <button
              onClick={reset}
              className="rounded-full bg-black px-6 py-3 text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Try again
            </button>
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-8 text-left">
                <summary className="cursor-pointer text-sm text-zinc-500">
                  Error details
                </summary>
                <pre className="mt-2 overflow-auto rounded bg-zinc-100 p-4 text-xs dark:bg-zinc-900">
                  {error.message}
                </pre>
              </details>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}

