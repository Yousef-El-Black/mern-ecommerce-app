import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./homepage.module.scss";
import Widget from "../Widget/Widget";
import FeaturedChart from "../Featured/Featured";
import Chart from "../Chart/Chart";
import Table from "../List/List";
import { useState, useEffect } from "react";
import { userRequest } from "@/requestMethods";
import { useSelector } from "react-redux";

const Home = () => {
  const [incomeStats, setIncomeStats] = useState({});

  const token = useSelector((state: any) => state.user.currentUser.accessToken);

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const res = await userRequest(token).get("/orders/income");
        setIncomeStats(res.data);
      } catch (err) {}
    };
    fetchIncome();
  }, []);

  console.log(incomeStats);

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
          <Chart
            aspect={2 / 1}
            title={"Last 6 Months (Revenue)"}
            stats={incomeStats}
          />
        </div>
        <div className={styles.listContainer}>
          <div className={styles.listTitle}>Latest Transactions</div>
          <Table userId="all" />
        </div>
      </div>
    </div>
  );
};

export default Home;
