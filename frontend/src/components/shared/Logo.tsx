import { Lightbulb } from "lucide-react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <p className="flex items-center text-3xl font-extrabold text-orange-500">
        <span>TUT</span>
        <Lightbulb className="h-6 w-6" />
        <span>RLINK</span>
      </p>
    </Link>
  );
};

export default Logo;
