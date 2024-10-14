import { useRouter } from "next/router";
import Navigation from "./elements/Navigation";
import { AppDispatch, store } from "@/redux/store";
import { useDispatch } from "react-redux";
import { clearToken } from "@/redux/auth/authSlice";

const NavBar = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const adminNavOptions = [
    {
      href: "/business",
      text: "Business",
      urlKeyword: "business",
    },
    {
      href: "/registrations",
      text: "Registrations",
      urlKeyword: "registrations",
    },
    {
      href: "/requests",
      text: "Requests",
      urlKeyword: "requests",
    },
    {
      href: "/customers",
      text: "Customers",
      urlKeyword: "customers",
    },
  ];

  const handleLogout = () => {
    if (store) {
      dispatch(clearToken());
      router.push("/");
    }
  };
  return (
    <div className="fixed z-30 w-56 bg-white flex flex-col h-screen justify-between py-6 border border-border-primary overflow-auto">
      <div className="flex flex-col justify-start p-2">
        <b className="pl-6 pb-6 text-blue-500 text-2xl">Admin Portal</b>
        <hr className="border-border-primary w-full p-2"></hr>
        {adminNavOptions.map((navOption, index) => (
          <div key={index} className="p-2">
            <Navigation
              href={navOption.href}
              text={navOption.text}
              urlKeyword={navOption.urlKeyword}
            />
          </div>
        ))}
      </div>
      <div>
        <hr className="border-border-primary w-full p-2"></hr>
        <div className="pl-10">
          <button
            onClick={handleLogout}
            className="rounded-3xl p-4 bg-blue-500 text-white font-bold text-lg hover:bg-blue-600 transition-colors duration-300"
          >
            <span className="hover:underline text-text-primary">Log out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
