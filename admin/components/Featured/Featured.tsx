import styles from "./featured.module.scss";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, useState } from "react";
import { userRequest } from "@/requestMethods";
import { useSelector } from "react-redux";

const Featured = () => {
  const [sales, setSales] = useState<any>(null);

  const { currentUser } = useSelector((state: any) => state.user);

  let token: string;

  if (currentUser) {
    token = currentUser.accessToken;
  }

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await userRequest(token).get("/orders/sales");
        setSales(res.data);
      } catch (err) {}
    };
    fetchSales();
  }, []);

  return (
    <div className={styles.featured}>
      <div className={styles.top}>
        <h1 className={styles.title}>Total Revenue</h1>
        <MoreVertOutlinedIcon fontSize="small" />
      </div>
      <div className={styles.bottom}>
        <div className={styles.featuredChart}>
          <CircularProgressbar
            value={
              sales &&
              sales.dataToday.length > 0 &&
              sales.dataLastMonth.length > 0
                ? (sales.dataToday[0].totalSales * 100) /
                  (sales.dataLastMonth[0].totalSales * 1.1)
                : 0
            }
            text={`${
              sales &&
              sales.dataToday.length > 0 &&
              sales.dataLastMonth.length > 0
                ? (sales.dataToday[0].totalSales * 100) /
                  (sales.dataLastMonth[0].totalSales * 1.1)
                : 0
            }%`}
            strokeWidth={5}
          />
        </div>
        <p className={styles.title}>Total sales made today</p>
        <p className={styles.amount}>
          $
          {sales && sales.dataToday.length > 0
            ? sales.dataToday[0].totalSales
            : 0}
        </p>
        <p className={styles.desc}>
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className={styles.summary}>
          <div className={styles.item}>
            <div className={styles.itemTitle}>Target</div>
            <div className={`${styles.itemResult} ${styles.negative}`}>
              <KeyboardArrowDownIcon fontSize="small" />
              <div className={styles.resultAmount}>
                $
                {sales && sales.dataLastMonth.length > 0
                  ? sales.dataLastMonth[0].totalSales * 1.1
                  : 0}
              </div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.itemTitle}>Last Week</div>
            <div className={`${styles.itemResult} ${styles.positive}`}>
              <KeyboardArrowUpIcon fontSize="small" />
              <div className={styles.resultAmount}>
                $
                {sales && sales.dataLastWeek.length > 0
                  ? sales.dataLastWeek[0].totalSales
                  : 0}
              </div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.itemTitle}>Last Month</div>
            <div className={`${styles.itemResult} ${styles.positive}`}>
              <KeyboardArrowUpIcon fontSize="small" />
              <div className={styles.resultAmount}>
                $
                {sales && sales.dataLastMonth.length > 0
                  ? sales.dataLastMonth[0].totalSales
                  : 0}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
