import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();
  const handleOnLogin = () => {
    //check if correct username and password
    //input validation
    router.push("/business");
  };
  return (
    <div className="flex justify-center w-full h-full mt-52">
      <div className="flex flex-col gap-5">
        <h2>Hello there:</h2>
        <Input placeholder="Username"></Input>
        <Input placeholder="Password"></Input>
        <Button onClick={handleOnLogin}>Login</Button>
      </div>
    </div>
  );
}
