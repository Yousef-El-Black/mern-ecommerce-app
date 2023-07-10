import Image from "next/image";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./singlepage.module.scss";
import Chart from "../Chart/Chart";
import List from "../List/List";

const SinglePage = () => {
  return (
    <div className={styles.single}>
      <Sidebar />
      <div className={styles.singleContainer}>
        <Navbar />
        <div className={styles.top}>
          <div className={styles.left}>
            <div className={styles.editButton}>Edit</div>
            <h1 className={styles.title}>Information</h1>
            <div className={styles.item}>
              <Image
                className={styles.itemImg}
                src={
                  "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg"
                }
                alt=""
                width={250}
                height={250}
              />
              <div className={styles.details}>
                <h1 className={styles.itemTitle}>Jane Doe</h1>
                <div className={styles.detailItem}>
                  <span className={styles.itemKey}>Email:</span>
                  <span className={styles.itemValue}>janedoe1@gmail.com</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.itemKey}>Phone:</span>
                  <span className={styles.itemValue}>+201062995781</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.itemKey}>Address:</span>
                  <span className={styles.itemValue}>
                    Elton St. 234 Garden Yd. NewYork
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.itemKey}>Country:</span>
                  <span className={styles.itemValue}>USA</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <Chart aspect={3 / 1} title={"User Spending (last 6 Month)"} />
          </div>
        </div>
        <div className={styles.bottom}>
          <h1 className={styles.title}>Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
