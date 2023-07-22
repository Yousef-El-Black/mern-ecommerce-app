import Image from "next/image";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./singlepage.module.scss";
import Chart from "../Chart/Chart";
import List from "../List/List";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { userRequest } from "@/requestMethods";
import { useSelector } from "react-redux";
import Link from "next/link";

const SinglePage = () => {
  const [user, setUser] = useState<any>({});
  const [userStats, setUserStats] = useState<any>({});

  const router = useRouter();
  const userId = router.query.userId;
  const token = useSelector((state: any) => state.user.currentUser.accessToken);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await userRequest(token).get("/users/" + userId);
        setUser(res.data);
      } catch (err) {}
    };
    fetchUser();
  }, [router, userId]);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const res = await userRequest(token).get(
          "/orders/userstats/" + user._id
        );
        setUserStats(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserStats();
  }, [user]);

  return (
    <div className={styles.single}>
      <Sidebar />
      <div className={styles.singleContainer}>
        <Navbar />
        <div className={styles.top}>
          <div className={styles.left}>
            <Link
              href={"/users/edit/" + user._id}
              className={styles.editButton}
            >
              Edit
            </Link>
            <h1 className={styles.title}>Information</h1>
            <div className={styles.item}>
              <Image
                className={styles.itemImg}
                src={
                  // "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg"
                  user.img
                }
                alt=""
                width={250}
                height={250}
              />
              <div className={styles.details}>
                <h1 className={styles.itemTitle}>{user.username}</h1>
                <div className={styles.detailItem}>
                  <span className={styles.itemKey}>Email:</span>
                  <span className={styles.itemValue}>{user.email}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.itemKey}>Phone:</span>
                  <span className={styles.itemValue}>
                    {user.phone ? user.phone : "Not Found"}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.itemKey}>Address:</span>
                  <span className={styles.itemValue}>
                    {user.address ? user.address : "Not Found"}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.itemKey}>Country:</span>
                  <span className={styles.itemValue}>
                    {user.country ? user.country : "Not Found"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <Chart
              aspect={3 / 1}
              title={"User Spending (last 12 Month)"}
              stats={userStats}
            />
          </div>
        </div>
        <div className={styles.bottom}>
          <h1 className={styles.title}>Last Transactions</h1>
          <List userId={router.query.userId as string} />
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
