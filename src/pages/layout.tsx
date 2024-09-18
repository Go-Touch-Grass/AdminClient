import NavBar from "@/components/NavBar";
import { RootState } from "@/redux/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const router = useRouter();
  const loggedOut = useSelector((state: RootState) => state.auth.token == null);
  useEffect(() => {
    if (loggedOut) {
      router.replace("/");
    }
  }, [loggedOut]);

  useEffect(() => {
    // If user is logged out, prevent going back to the previous page
    if (loggedOut) {
      window.history.pushState(null, "", window.location.href);
      window.onpopstate = function () {
        router.replace("/");
      };
    }
  }, [loggedOut, router]);

  const keywords = ["business", "customer", "registrations"];
  const containsKeyword = keywords.some((word) =>
    router.pathname.includes(word)
  );
  return (
    <div className="flex flex-row">
      {containsKeyword && <NavBar />}
      {children}
    </div>
  );
}
