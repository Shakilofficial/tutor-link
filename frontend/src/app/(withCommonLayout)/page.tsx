import { Button } from "@/components/ui/button";
import { getNewToken } from "@/services/authService";

const HomePage = async () => {
  const result = await getNewToken();
  console.log(result);
  return (
    <div>
      <Button variant="destructive">Click Here</Button>
    </div>
  );
};

export default HomePage;
