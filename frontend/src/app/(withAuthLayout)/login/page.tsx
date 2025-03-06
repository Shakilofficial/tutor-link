import LoginForm from "@/components/modules/auth/login/LoginForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] ">
      <div className="flex flex-col space-y-4 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-gray-700 dark:text-white">
          Login
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to access your account.
        </p>
      </div>
      <div className="bg-transparent">
        <LoginForm />
      </div>
      <div className="flex flex-col space-y-2 text-center">
        <div className="text-sm text-muted-foreground">
          Don &apos;t have an account?
          <div className="flex gap-2 justify-between mt-4">
            <Link
              href="/register-student"
              className="text-orange-500 pl-1 font-semibold"
            >
              <Button variant="outline">Register as Student</Button>
            </Link>
            <Link
              href="/register-tutor"
              className="text-orange-500 pl-1 font-semibold"
            >
              <Button variant="outline">Register as Tutor</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
