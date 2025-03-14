import { Button } from "@/components/ui/button";
import { CircleCheckBig } from "lucide-react";
import Link from "next/link";

const SuccessPage = () => {
  return (
    <main className="flex flex-col min-h-screen justify-center items-center">
      <div className="max-w-md mx-auto rounded-2xl overflow-hidden">
        <div className="p-8">
          <div className="flex flex-col items-center">
            <div className="animate-bounce mb-6">
              <CircleCheckBig className="h-24 w-24 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-400 mb-4 text-center">
              Thank You for Your Payment
            </h2>
            <p className="text-gray-600 mb-8 text-center">
              Your payment has been processed successfully. Check your email for
              detailed information about your booking.
            </p>
            <Link href="/tutors" passHref>
              <Button className="w-full bg-orange-500 hover:bg-orange-600 transition-colors duration-300">
                Continue Exploring Tutors
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SuccessPage;
