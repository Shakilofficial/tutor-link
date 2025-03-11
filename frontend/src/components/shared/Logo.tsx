import logoImg from "@/assets/t-logo.png";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="inline-block">
      <div className="flex items-center h-5 gap-1 justify-center">
        <Image src={logoImg} alt="TutorMatch Logo" width={40} height={20} />
        <span className="text-xl font-bold text-primary">TUTORLINK</span>
      </div>
    </Link>
  );
};

export default Logo;
