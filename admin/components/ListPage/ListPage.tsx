import Datatable from "../Datatable/Datatable";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./listpage.module.scss";

const ListPage = () => {
  return (
    <div className={styles.list}>
      <Sidebar />
      <div className={styles.listContainer}>
        <Navbar />
        <Datatable />
      </div>
    </div>
  );
};

export default ListPage;
