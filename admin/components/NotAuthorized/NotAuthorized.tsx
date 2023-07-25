import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/apiCalls";
import styles from "./notauthorized.module.scss";
import Link from "next/link";

const NotAuthorized = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = (e: any) => {
    e.preventDefault();
    logout(dispatch);
    router.push("/login");
  };

  return (
    <div className={styles.notAuthorized}>
      <div className={styles.img}></div>
      <div className={styles.text}>
        <h1>You Are Not Authorized</h1>
        <div>
          <button onClick={handleLogout}>Logout</button>
          <span className={styles.top}></span>
          <span className={styles.right}></span>
          <span className={styles.bottom}></span>
          <span className={styles.left}></span>
        </div>
      </div>
    </div>
  );
};

export default NotAuthorized;
