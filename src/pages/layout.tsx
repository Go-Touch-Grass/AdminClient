import NavBar from "@/components/NavBar";
import { useRouter } from "next/router";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const router = useRouter();

  //need to check if user is logged in to decide whether to show
  //navbar or not
  //current check is not the correct check, will be replaced
  const keywords = ["business", "customer", "request"];
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
