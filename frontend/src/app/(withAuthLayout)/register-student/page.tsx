import RegisterStudentForm from "@/components/modules/user/register-student/RegisterStudentForm";
import Link from "next/link";

const RegisterStudentPage = () => {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] ">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-primary">
          Register as Student
        </h1>
        <p className="text-sm text-muted-foreground">
          Create your account to start your journey with us.
        </p>
      </div>
      <div className="bg-transparent">
        <RegisterStudentForm />
      </div>
      <div className="flex flex-col space-y-2 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?
          <Link href="/login" className="text-primary pl-1 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterStudentPage;
