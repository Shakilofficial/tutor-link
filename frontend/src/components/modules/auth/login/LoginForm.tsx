/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Form } from "@/components/form/Form";
import { TextInput } from "@/components/form/TextInput";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { loginUser, reCaptchaTokenVarification } from "@/services/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookOpen, GraduationCap, Lock, Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { loginSchema } from "./loginSchema";

const LoginForm = () => {
  const { setIsLoading } = useUser();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const [reCaptchaStatus, setReCaptchaStatus] = useState(false);
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const router = useRouter();

  const {
    formState: { isSubmitting, isValid },
    setValue,
    handleSubmit,
  } = form;

  const handleReCaptcha = async (value: string | null) => {
    try {
      const res = await reCaptchaTokenVarification(value!);

      if (res?.success) {
        setReCaptchaStatus(true);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);
      setIsLoading(true);
      if (res?.success) {
        toast.success(res?.message);
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/");
        }
      } else {
        toast.error(res?.message);
      }
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  const loginWithDemoCredentials = (email: string, password: string) => {
    setValue("email", email, { shouldValidate: true });
    setValue("password", password, { shouldValidate: true });
    setTimeout(() => {
      handleSubmit(onSubmit)();
    }, 100);
  };

  return (
    <div className="flex flex-col space-y-6">
      <Form
        form={form}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        isValid={isValid}
        recaptchaStatus={reCaptchaStatus}
      >
        <TextInput
          name="email"
          icon={Mail}
          label="Email"
          placeholder="john@example.com"
          type="email"
        />
        <TextInput
          icon={Lock}
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
        />

        <div className="flex justify-end w-full mb-4">
          <Link
            href="/forgot-password"
            className="text-sm text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <div className="flex justify-center mt-2">
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY!}
            onChange={handleReCaptcha}
          />
        </div>
      </Form>

      <div className="space-y-3">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-rose-200/50 dark:border-rose-800/50"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-rose-950 px-2 text-muted-foreground">
              Quick Demo Access
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-2 border-primary/30 hover:bg-primary/5 transition-all"
            onClick={() =>
              loginWithDemoCredentials(
                "creative.shakilofficial@gmail.com",
                "123456"
              )
            }
          >
            <GraduationCap className="h-4 w-4 text-primary" />
            <span>Demo Student</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-2 border-primary/30 hover:bg-primary/5 transition-all"
            onClick={() =>
              loginWithDemoCredentials(
                "shakilhossain3877@gmail.com",
                "SecurePass123"
              )
            }
          >
            <BookOpen className="h-4 w-4 text-primary" />
            <span>Demo Tutor</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-2 border-primary/30 hover:bg-primary/5 transition-all"
            onClick={() =>
              loginWithDemoCredentials(
                "mrshakilhossainofficial@gmail.com",
                "admin123"
              )
            }
          >
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>Demo Admin</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
