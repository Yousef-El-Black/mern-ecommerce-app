import styles from "./layout.module.scss";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useSelector } from "react-redux";
import NotAuthorized from "../NotAuthorized/NotAuthorized";
import { useRouter } from "next/router";

const Layout = ({ children }: any) => {
  const { currentUser } = useSelector((state: any) => state.user);

  const router = useRouter();

  if (currentUser) {
    if (currentUser.isAdmin) {
      return (
        <div className={styles.page}>
          <Sidebar />
          <div className={styles.pageContainer}>
            <Navbar />
            {children}
          </div>
        </div>
      );
    } else {
      return <NotAuthorized />;
    }
  } else {
    router.push("/login");
  }
};

export default Layout;
