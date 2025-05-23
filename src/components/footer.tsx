export default function Footer() {
  return (
    <footer className="flex flex-row justify-center items-center p-4 text-center w-full mt-auto">
      <span className="text-muted-foreground">
        &copy; {new Date().getFullYear()} Jacob Brasil
      </span>
    </footer>
  );
}
