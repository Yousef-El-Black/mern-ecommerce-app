import Login from "@/components/Login/Login";
import { useRouter } from "next/router";
import { useEffect } from "react";

const login = () => {
  const router = useRouter();
  const user = true;

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, []);

  return <Login />;
};

export default login;
