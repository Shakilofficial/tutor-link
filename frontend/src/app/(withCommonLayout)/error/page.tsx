import { Button } from "@/components/ui/button";
import { CircleX } from "lucide-react";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <main className="flex flex-col min-h-screen justify-center items-center">
      <div className="max-w-md mx-auto rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="flex flex-col items-center">
            <div className="animate-shake mb-6">
              <CircleX className="h-24 w-24 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-400 mb-4 text-center">
              Oops! Something Went Wrong
            </h2>
            <p className="text-gray-600 mb-8 text-center">
              We&apos;re sorry, but something went wrong. Please try again again
              or contact our support team for assistance.
            </p>
            <div className="flex justify-between gap-4">
              <Link href="/tutors" passHref>
                <Button className="w-full bg-orange-500 hover:bg-orange-600 transition-colors duration-300">
                  Back to Tutors
                </Button>
              </Link>
              <Link href="/" passHref>
                <Button
                  variant="outline"
                  className="w-full border-orange-500 text-orange-500 hover:bg-orange-500/20 transition-colors duration-300"
                >
                  Go Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;
