import Register from "@/components/Register/Register";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const RegisterPage = () => {
  const router = useRouter();
  const user = useSelector((state: any) => state.user.currentUser);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, []);

  return <Register />;
};

export default RegisterPage;
