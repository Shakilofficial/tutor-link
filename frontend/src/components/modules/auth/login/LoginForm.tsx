/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Form } from "@/components/form/Form";
import { TextInput } from "@/components/form/TextInput";
import { useUser } from "@/context/UserContext";
import { loginUser, reCaptchaTokenVarification } from "@/services/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { loginSchema } from "./loginSchema";

const LoginForm = () => {
  const { setUser, setIsLoading } = useUser();
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

      if (res?.success) {
        setUser(res.user);
        setIsLoading(false);
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

  return (
    <div className="-space-y-2 flex justify-center items-center">
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

        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY!}
          onChange={handleReCaptcha}
        />
      </Form>
    </div>
  );
};

export default LoginForm;
