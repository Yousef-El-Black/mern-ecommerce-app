import styles from "./widget.module.scss";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import { useEffect, useState } from "react";
import { userRequest } from "@/requestMethods";
import { useSelector } from "react-redux";

const Widget = ({ type }: { type: string }) => {
  let data;

  const [usersCount, setUsersCount] = useState<any>(null);
  const [ordersCount, setOrdersCount] = useState<any>(null);
  const [earningsCount, setEarningsCount] = useState<any>(null);
  const [balance, setBalance] = useState(0);

  const { currentUser } = useSelector((state: any) => state.user);

  let token: string;

  if (currentUser) {
    token = currentUser.accessToken;
  }

  useEffect(() => {
    const fetchUserCountData = async () => {
      try {
        const thisMonth = await userRequest(token).get("/users/countthismonth");
        const lastMonth = await userRequest(token).get("/users/countlastmonth");
        setUsersCount({ thisMonth: thisMonth.data, lastMonth: lastMonth.data });
      } catch (err) {}
    };
    fetchUserCountData();

    const fetchOrderCountData = async () => {
      try {
        const thisMonth = await userRequest(token).get(
          "/orders/countthismonth"
        );
        const lastMonth = await userRequest(token).get(
          "/orders/countlastmonth"
        );
        setOrdersCount({
          thisMonth: thisMonth.data,
          lastMonth: lastMonth.data,
        });
      } catch (err) {}
    };
    fetchOrderCountData();

    const fetchEarningCountData = async () => {
      try {
        const thisMonth = await userRequest(token).get(
          "/orders/countearningthismonth"
        );
        const lastMonth = await userRequest(token).get(
          "/orders/countearninglastmonth"
        );
        setEarningsCount({
          thisMonth: thisMonth.data.totalAmount,
          lastMonth: lastMonth.data.totalAmount,
        });
      } catch (err) {}
    };
    fetchEarningCountData();

    const fetchBalance = async () => {
      try {
        const res = await userRequest(token).get("/orders/balance");
        setBalance(res.data.totalAmount);
      } catch (err) {}
    };
    fetchBalance();
  }, []);

  // FIXME:
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        amount: usersCount && usersCount.thisMonth,
        lastAmount: usersCount && usersCount.lastMonth,
        diff: usersCount && (usersCount.thisMonth / usersCount.lastMonth) * 100,
        isMoney: false,
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className={styles.icon}
            style={{ color: "crimson", backgroundColor: "rgba(255,0,0,0.2)" }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        amount: ordersCount && ordersCount.thisMonth,
        lastAmount: ordersCount && ordersCount.lastMonth,
        diff:
          ordersCount && (ordersCount.thisMonth / ordersCount.lastMonth) * 100,
        isMoney: false,
        link: "View all orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className={styles.icon}
            style={{
              color: "goldenrod",
              backgroundColor: "rgba(218,165,32,0.2)",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        amount: earningsCount && earningsCount.thisMonth,
        lastAmount: earningsCount && earningsCount.lastMonth,
        diff:
          earningsCount &&
          (earningsCount.thisMonth / earningsCount.lastMonth) * 100,
        isMoney: true,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className={styles.icon}
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        amount: balance && balance,
        lastAmount:
          earningsCount && balance && balance - earningsCount.thisMonth,
        diff:
          earningsCount &&
          balance &&
          (earningsCount.thisMonth / balance) * 100 + 100,
        isMoney: true,
        link: "See Details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className={styles.icon}
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      data = {
        title: "",
        isMoney: false,
        link: "",
        icon: null,
      };
      break;
  }

  return (
    <div className={styles.widget}>
      <div className={styles.left}>
        <span className={styles.title}>{data.title}</span>
        <span className={styles.counter}>
          {data?.isMoney && "$"}
          {data.amount}
        </span>
        <span className={styles.link}>{data.link}</span>
      </div>
      <div className={styles.right}>
        <div
          className={`${styles.percentage} ${
            data.amount >= data.lastAmount ? styles.positive : styles.negative
          }`}
        >
          {data.amount >= data.lastAmount ? (
            <KeyboardArrowUpOutlinedIcon />
          ) : (
            <KeyboardArrowDownOutlinedIcon />
          )}
          {data.diff && data.diff.toFixed() - 100} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
