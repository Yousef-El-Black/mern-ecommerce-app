import LoginPage from "@/components/Login/Login";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Login = () => {
  // const router = useRouter();

  // const user = false;

  // useEffect(() => {
  //   if (user) {
  //     router.push("/");
  //   }
  // }, []);

  return <LoginPage />;
};

export default Login;
