import { useRouter } from "next/router";
import styles from "./successmessage.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const SuccessMessage = () => {
  const router = useRouter();

  const [closeMessage, setCloseMessage] = useState(false);

  const handleCloseMessage = () => {
    setCloseMessage(true);
  };

  if (router.query.message) {
    return (
      <div
        className={styles.successMessage}
        style={{ display: `${closeMessage && "none"}` }}
      >
        <div className={styles.icon} onClick={handleCloseMessage}>
          <CloseIcon fontSize="small" />
        </div>
        <span>{router.query.message}</span>
        <div className={styles.bottomLine}></div>
      </div>
    );
  } else {
    return;
  }
};

export default SuccessMessage;
