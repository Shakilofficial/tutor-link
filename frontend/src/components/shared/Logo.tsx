import { CircleDashed } from "lucide-react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <h4 className="flex items-center justify-center text-2xl font-extrabold text-orange-500">
        <span>TUT</span>
        <CircleDashed className="h-5 w-5 mt-0.5" />
        <span>RLINK</span>
      </h4>
    </Link>
  );
};

export default Logo;
