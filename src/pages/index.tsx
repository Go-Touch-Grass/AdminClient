import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { adminLogin } from "@/redux/auth/authSlice";
import { LoginArguments } from "@/redux/auth/authSlice";
import type { AppDispatch } from "@/redux/store";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Index() {
  const [showError, setShowError] = useState<Boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const initialLoginDetails = {
    username: "",
    password: "",
  };
  const [loginDetails, setLoginDetails] =
    useState<LoginArguments>(initialLoginDetails);

  const onChangeDetails =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setLoginDetails(() => ({
        ...loginDetails,
        [field]: e.target.value,
      }));
    };

  const handleOnLogin = async () => {
    try {
      const result = await dispatch(adminLogin(loginDetails));
      if (adminLogin.fulfilled.match(result)) {
        router.push("/business");
      } else {
        setShowError(true);
      }
    } catch (error) {
      setShowError(true);
    }
  };
  return (
    <div className="flex flex-col justify-center w-full h-full m-28 bg-blue-50 p-6 gap-10">
      <h1 className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold leading-none tracking-wide sm:text-6xl text-blue-900">
        Admin Portal
      </h1>
      {showError && (
        <Alert className="flex flex-col bg-red-50 w-96 self-center ">
          <AlertTitle className="font-bold">Login Failed.</AlertTitle>
          <AlertDescription>Please check your details again.</AlertDescription>
        </Alert>
      )}
      <div className="flex flex-col gap-5 mx-64">
        <Input
          className="bg-white"
          placeholder="Username"
          value={loginDetails.username}
          onChange={onChangeDetails("username")}
        ></Input>
        <Input
          className="bg-white"
          placeholder="Password"
          type="password"
          value={loginDetails.password}
          onChange={onChangeDetails("password")}
        ></Input>
        <Button
          className="p-6 bg-blue-500 text-white font-bold text-lg hover:bg-blue-600 transition-colors duration-300"
          onClick={handleOnLogin}
        >
          Login
        </Button>
      </div>
    </div>
  );
}
