import Link from "next/link";

export function Navbar() {
  return (
    <header className="fixed left-1/2 top-0 z-50 mx-auto block w-full max-w-screen-xl -translate-x-1/2 transform px-1">
      <nav className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8 rounded-xl rounded-t-none bg-base-300">
        <Link
          href="/"
          className="btn btn-ghost font-bold text-accent transition-colors hover:text-primary"
        >
          Automatas.tech
        </Link>

        <div className="flex items-center space-x-3">
          <Link href="/" className="hidden sm:inline-flex btn btn-ghost">
            Home
          </Link>
          <Link href="/b/" className="btn btn-ghost">
            Blog
          </Link>
          <Link href="/about/" className="hidden sm:inline-flex btn btn-ghost">
            About
          </Link>
        </div>
      </nav>
    </header>
  );
}
