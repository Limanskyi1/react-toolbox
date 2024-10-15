import { Link as IconLink } from "lucide-react";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="p-5 bg-primary">
      <div className="flex items-center gap-2 border border-background p-2 w-fit rounded-xl">
        <IconLink className="text-background" />
        <Link className="text-background" href="/1-lazy-loading">Lazy-loading on-scroll</Link>
      </div>
    </header>
  );
};
