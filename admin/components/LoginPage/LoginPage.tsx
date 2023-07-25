import styles from "./loginpage.module.scss";
import { login } from "@/redux/apiCalls";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const { isFetching, error, currentUser } = useSelector(
    (state: any) => state.user
  );

  if (currentUser) {
    router.push("/");
  }

  const handleLogin = (e: any) => {
    e.preventDefault();
    if (username.trim() !== "" && password.trim() !== "") {
      login(dispatch, { username, password });
      if (!error && currentUser) {
        router.push("/");
      }
    } else {
      alert("Username or Password is Empty!");
    }
  };

  return (
    <form className={styles.loginPage}>
      <input
        type="text"
        placeholder="username"
        onChange={(e: any) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e: any) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} disabled={isFetching}>
        Login
      </button>
      {error && <span style={{ color: "red" }}>Something went Wrong!</span>}
    </form>
  );
};

export default LoginPage;
