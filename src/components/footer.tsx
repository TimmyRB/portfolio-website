export default function Footer() {
  return (
    <footer className="p-4 text-center w-full">
      <p className="text-zinc-500 dark:text-zinc-400">
        &copy; {new Date().getFullYear()} Jacob Brasil
      </p>
    </footer>
  );
}
