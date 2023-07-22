import Datatable from "../Datatable/Datatable";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import SuccessMessage from "../SuccessMessage/SuccessMessage";
import styles from "./listpage.module.scss";

const ListPage = ({ type }: { type: string }) => {
  return (
    <div className={styles.list}>
      <Sidebar />
      <div className={styles.listContainer}>
        <Navbar />
        <Datatable type={type} />
      </div>
    </div>
  );
};

export default ListPage;
