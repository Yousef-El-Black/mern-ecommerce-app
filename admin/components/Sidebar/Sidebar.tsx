import styles from "./sidebar.module.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PollIcon from "@mui/icons-material/Poll";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import SettingsApplicationsRoundedIcon from "@mui/icons-material/SettingsApplicationsRounded";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import Link from "next/link";
import { useContext } from "react";
import { DarkModeContext } from "@/context/darkModeContext";

const Sidebar = () => {
  const { dispatch }: any = useContext(DarkModeContext);

  return (
    <div className={styles.sidebar}>
      <div className={styles.top}>
        <Link href={"/"} style={{ textDecoration: "none" }}>
          <span className={styles.logo}>elblackadmin</span>
        </Link>
      </div>
      <hr />
      <div className={styles.center}>
        <ul>
          <p className={styles.title}>MAIN</p>
          <Link href={"/"} style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className={styles.icon} />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className={styles.title}>LIST</p>
          <Link href={"/users"} style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineOutlinedIcon className={styles.icon} />
              <span>Users</span>
            </li>
          </Link>
          <Link href={"/products"} style={{ textDecoration: "none" }}>
            <li>
              <StorefrontOutlinedIcon className={styles.icon} />
              <span>Products</span>
            </li>
          </Link>
          <Link href={"/orders"} style={{ textDecoration: "none" }}>
            <li>
              <CreditCardOutlinedIcon className={styles.icon} />
              <span>Orders</span>
            </li>
          </Link>
          <Link href={"/delivery"} style={{ textDecoration: "none" }}>
            <li>
              <LocalShippingIcon className={styles.icon} />
              <span>Delivery</span>
            </li>
          </Link>
          <p className={styles.title}>USEFUL LINKS</p>
          <Link href={"/"} style={{ textDecoration: "none" }}></Link>
          <li>
            <PollIcon className={styles.icon} />
            <span>Stats</span>
          </li>
          <Link href={"/"} style={{ textDecoration: "none" }}></Link>
          <li>
            <NotificationsNoneIcon className={styles.icon} />
            <span>Notifications</span>
          </li>
          <p className={styles.title}>SERVICES</p>
          <Link href={"/"} style={{ textDecoration: "none" }}></Link>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className={styles.icon} />
            <span>System Health</span>
          </li>
          <Link href={"/"} style={{ textDecoration: "none" }}></Link>
          <li>
            <PsychologyOutlinedIcon className={styles.icon} />
            <span>Logs</span>
          </li>
          <Link href={"/"} style={{ textDecoration: "none" }}></Link>
          <li>
            <SettingsApplicationsRoundedIcon className={styles.icon} />
            <span>Settings</span>
          </li>
          <p className={styles.title}>USER</p>
          <Link href={"/"} style={{ textDecoration: "none" }}></Link>
          <li>
            <AccountCircleOutlinedIcon className={styles.icon} />
            <span>Profile</span>
          </li>
          <li>
            <ExitToAppOutlinedIcon className={styles.icon} />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className={styles.bottom}>
        <div
          className={styles.colorOption}
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className={styles.colorOption}
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
