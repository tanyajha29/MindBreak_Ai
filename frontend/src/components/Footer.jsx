export default function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-4 py-12 text-sm text-neutral-500">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <div>© {new Date().getFullYear()} DawnFocus</div>
        <div className="flex gap-4">
          <a className="hover:text-neutral-700 dark:hover:text-neutral-200" href="#">About</a>
          <a className="hover:text-neutral-700 dark:hover:text-neutral-200" href="#">Privacy</a>
          <a className="hover:text-neutral-700 dark:hover:text-neutral-200" href="#">GitHub</a>
          <a className="hover:text-neutral-700 dark:hover:text-neutral-200" href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
}
