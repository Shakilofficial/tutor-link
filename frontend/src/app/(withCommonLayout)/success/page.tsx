import { Button } from "@/components/ui/button";
import { CircleCheckBig } from "lucide-react";
import Link from "next/link";

const SuccessPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-primary-100">
      <div className="bg-orange-900/0.5 p-8 rounded-lg shadow-lg max-w-md w-full border border-orange-800/30">
        <div className="flex flex-col items-center">
          <CircleCheckBig className="size-40 text-green-500" />

          <h1 className="text-2xl font-bold text-orange-800 mb-2 uppercase mt-5">
            Payment Successful
          </h1>
          <p className="text-gray-600 mb-6 text-center">
            Your payment has been successful. Check your Email for Details Info.
          </p>

          <Link href="/tutors" legacyBehavior>
            <Button>Continue Booking</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
