import styles from "./navbar.module.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { DarkModeContext } from "@/context/darkModeContext";
import { useSelector } from "react-redux";
import SuccessMessage from "../SuccessMessage/SuccessMessage";

const Navbar = () => {
  const { dispatch }: any = useContext(DarkModeContext);

  const { currentUser } = useSelector((state: any) => state.user);

  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.wrapper}>
          <div className={styles.search}>
            <input type="text" placeholder="Search..." />
            <SearchOutlinedIcon />
          </div>
          <div className={styles.items}>
            <div className={styles.item}>
              <LanguageOutlinedIcon className={styles.icon} />
              English
            </div>
            <div
              className={styles.item}
              onClick={() => dispatch({ type: "TOGGLE" })}
            >
              <DarkModeOutlinedIcon className={styles.icon} />
            </div>
            <div className={styles.item}>
              <FullscreenExitOutlinedIcon className={styles.icon} />
            </div>
            <div className={styles.item}>
              <NotificationsOutlinedIcon className={styles.icon} />
              <div className={styles.counter}>2</div>
            </div>
            <div className={styles.item}>
              <ChatBubbleOutlineOutlinedIcon className={styles.icon} />
              <div className={styles.counter}>2</div>
            </div>
            <div className={styles.item}>
              <ListOutlinedIcon className={styles.icon} />
            </div>
            <div className={styles.item}>
              <Image
                // src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg"
                src={currentUser.img}
                alt=""
                width={500}
                height={500}
                className={styles.avatar}
              />
            </div>
            <div className={styles.item}></div>
          </div>
        </div>
      </div>
      <SuccessMessage />
    </>
  );
};

export default Navbar;
