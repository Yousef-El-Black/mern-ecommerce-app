import styles from "./list.module.scss";
import * as React from "react";
import MainTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import { userRequest } from "@/requestMethods";
import { useSelector } from "react-redux";

const List = ({ userId }: { userId: string }) => {
  const [orders, setOrders] = useState([]);
  const [id, setId] = useState("");

  const token = useSelector((state: any) => state.user.currentUser.accessToken);

  useEffect(() => {
    setId(userId);
  }, [userId]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        if (id === "all") {
          const res = await userRequest(token).get("/orders?new=true");
          setOrders(res.data);
        } else {
          const res = await userRequest(token).get(
            "/orders/" + id + "?new=true"
          );
          setOrders(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, [id]);

  return (
    <TableContainer component={Paper} className={styles.list}>
      <MainTable sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={styles.tableCell}>Tracking ID</TableCell>
            <TableCell className={styles.tableCell}>Products IDs</TableCell>
            <TableCell className={styles.tableCell}>Customer ID</TableCell>
            <TableCell className={styles.tableCell}>Date</TableCell>
            <TableCell className={styles.tableCell}>Amount</TableCell>
            <TableCell className={styles.tableCell}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row: any) => (
            <TableRow key={row._id}>
              <TableCell>{row._id}</TableCell>
              <TableCell className={styles.tableCell}>
                <div className={styles.cellWrapper}>
                  {row.products.map((p: any) => {
                    return <p key={p._id}>{p.productId}</p>;
                  })}
                </div>
              </TableCell>
              <TableCell className={styles.tableCell}>{row.userId}</TableCell>
              <TableCell className={styles.tableCell}>
                {row.createdAt}
              </TableCell>
              <TableCell className={styles.tableCell}>{row.amount}</TableCell>
              <TableCell className={styles.tableCell}>
                <span className={`${styles.status} ${styles[row.status]}`}>
                  {row.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MainTable>
    </TableContainer>
  );
};

export default List;
