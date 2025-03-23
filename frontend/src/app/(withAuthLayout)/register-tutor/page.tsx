import RegisterTutorForm from "@/components/modules/user/register-tutor/RegisterTutorForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const RegisterTutorPage = () => {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 ">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-primary md:text-3xl">
          Register as Tutor
        </h1>
        <p className="text-sm text-muted-foreground md:text-base">
          Create your account to start your teaching journey with us.
        </p>
      </div>
      <div className="bg-transparent w-full">
        <RegisterTutorForm />
      </div>
      <div className="flex flex-col space-y-2 text-center">
        <p className="text-sm text-muted-foreground md:text-base">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary font-semibold hover:underline transition-all"
          >
            Login
          </Link>
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center text-sm text-muted-foreground hover:text-primary transition-colors mt-2"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default RegisterTutorPage;
