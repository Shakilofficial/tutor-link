import Hero from "@/components/modules/home/Hero";
import { getNewToken } from "@/services/authService";

const HomePage = async () => {
  const result = await getNewToken();
  console.log(result);
  return (
    <div>
      <Hero />
    </div>
  );
};

export default HomePage;
