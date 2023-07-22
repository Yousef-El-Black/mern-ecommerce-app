import { useRouter } from "next/router";
import styles from "./errormessage.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const ErrorMessage = () => {
  const router = useRouter();

  const [closeMessage, setCloseMessage] = useState(false);

  const handleCloseMessage = () => {
    setCloseMessage(true);
  };

  if (router.query.error) {
    return (
      <div
        className={styles.errorMessage}
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

export default ErrorMessage;
