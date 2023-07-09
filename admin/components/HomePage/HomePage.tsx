import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./homepage.module.scss";
import Widget from "../Widget/Widget";
import FeaturedChart from "../Featured/Featured";
import Chart from "../Chart/Chart";
import Table from "../List/List";

const Home = () => {
  return (
    <div className={styles.home}>
      <Sidebar />
      <div className={styles.homeContainer}>
        <Navbar />
        <div className={styles.widgets}>
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className={styles.charts}>
          <FeaturedChart />
          <Chart />
        </div>
        <div className={styles.listContainer}>
          <div className={styles.listTitle}>Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
