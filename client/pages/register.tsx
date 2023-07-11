import Register from "@/components/Register/Register";
import { useRouter } from "next/router";
import { useEffect } from "react";

const RegisterPage = () => {
  const router = useRouter();
  const user = true;

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, []);

  return <Register />;
};

export default RegisterPage;
