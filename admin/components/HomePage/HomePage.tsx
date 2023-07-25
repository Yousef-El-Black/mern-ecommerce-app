import styles from "./homepage.module.scss";
import Widget from "../Widget/Widget";
import FeaturedChart from "../Featured/Featured";
import Chart from "../Chart/Chart";
import Table from "../List/List";
import { useState, useEffect } from "react";
import { userRequest } from "@/requestMethods";
import { useSelector } from "react-redux";
import Layout from "../Layout/Layout";

const Home = () => {
  const [incomeStats, setIncomeStats] = useState({});

  const { currentUser } = useSelector((state: any) => state.user);

  let token: string;

  if (currentUser) {
    token = currentUser.accessToken;
  }

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const res = await userRequest(token).get("/orders/income");
        setIncomeStats(res.data);
      } catch (err) {}
    };
    fetchIncome();
  }, []);

  return (
    <Layout>
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
          title={"Last 12 Months (Revenue)"}
          stats={incomeStats}
        />
      </div>
      <div className={styles.listContainer}>
        <div className={styles.listTitle}>Latest Transactions</div>
        <Table userId="all" />
      </div>
    </Layout>
  );
};

export default Home;
