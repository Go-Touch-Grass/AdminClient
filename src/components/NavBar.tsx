import { useRouter } from "next/router";
import Navigation from "./elements/Navigation";

const NavBar = () => {
  const router = useRouter();
  const adminNavOptions = [
    {
      href: "/business",
      text: "Business",
      urlKeyword: "business",
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
    router.push("/");
  };
  return (
    <div className="fixed z-30 w-56 bg-white flex flex-col h-screen justify-between py-6 border border-border-primary overflow-auto">
      <div className="flex flex-col justify-start p-2">
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
  );
};

export default NavBar;
