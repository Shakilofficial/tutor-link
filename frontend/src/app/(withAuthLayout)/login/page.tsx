import LoginForm from "@/components/modules/auth/login/LoginForm";
import { Button } from "@/components/ui/button";
import { BookOpen, GraduationCap } from "lucide-react";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[400px]">
      <div className="flex flex-col space-y-4 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white md:text-3xl">
          Welcome Back
        </h1>
        <p className="text-sm text-muted-foreground md:text-base">
          Enter your credentials to access your account
        </p>
      </div>

      <LoginForm />

      <div className="flex flex-col space-y-4 text-center">
        <div className="text-sm text-muted-foreground md:text-base">
          Don&apos;t have an account?
          <div className="flex flex-col gap-3 mt-4">
            <Link href="/register-student" passHref>
              <Button
                size="lg"
                className="w-full gap-2 bg-gradient-to-r from-primary to-orange-500 hover:opacity-90 transition-opacity"
              >
                <GraduationCap className="h-5 w-5" />
                Sign Up as Student
              </Button>
            </Link>
            <Link href="/register-tutor" passHref>
              <Button
                variant="outline"
                size="lg"
                className="w-full gap-2 border-primary/50 text-primary hover:bg-primary/10"
              >
                <BookOpen className="h-5 w-5" />
                Register as Tutor
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
