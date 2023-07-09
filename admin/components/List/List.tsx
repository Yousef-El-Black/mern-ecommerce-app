import styles from "./list.module.scss";
import * as React from "react";
import MainTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Image from "next/image";

const List = () => {
  const rows = [
    {
      id: 6528309,
      product: "Sony VH001",
      img: "https://images.pexels.com/photos/243757/pexels-photo-243757.jpeg",
      customer: "Ophelia Wagner",
      date: "7 March",
      amount: 538,
      method: "Cash on Dilivery",
      status: "Approved",
    },
    {
      id: 1984980,
      product: "Redragon S101",
      img: "https://images.pexels.com/photos/5076531/pexels-photo-5076531.jpeg",
      customer: "Lewis Evans",
      date: "3 March",
      amount: 489,
      method: "Cash on Dilivery",
      status: "Approved",
    },
    {
      id: 2757816,
      product: "ASUS ROG Strix",
      img: "https://images.pexels.com/photos/14328581/pexels-photo-14328581.jpeg",
      customer: "Jared Bates",
      date: "19 March",
      amount: 744,
      method: "Cash on Dilivery",
      status: "Approved",
    },
    {
      id: 5123289,
      product: "Razer Blade 15",
      img: "https://images.pexels.com/photos/14130157/pexels-photo-14130157.jpeg",
      customer: "Kate Benson",
      date: "22 March",
      amount: 465,
      method: "Cash on Dilivery",
      status: "Pending",
    },
    {
      id: 6022400,
      product: "Playstation 5",
      img: "https://images.pexels.com/photos/14824332/pexels-photo-14824332.jpeg",
      customer: "Birdie Terry",
      date: "12 March",
      amount: 112,
      method: "Cash on Dilivery",
      status: "Pending",
    },
    {
      id: 4209455,
      product: "Iphone 14 Pro Max",
      img: "https://images.pexels.com/photos/3707744/pexels-photo-3707744.jpeg",
      customer: "Eva Wheeler",
      date: "27 March",
      amount: 173,
      method: "Cash on Dilivery",
      status: "Approved",
    },
  ];

  return (
    <TableContainer component={Paper} className={styles.list}>
      <MainTable sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={styles.tableCell}>Tracking ID</TableCell>
            <TableCell className={styles.tableCell}>Product</TableCell>
            <TableCell className={styles.tableCell}>Customer</TableCell>
            <TableCell className={styles.tableCell}>Date</TableCell>
            <TableCell className={styles.tableCell}>Amount</TableCell>
            <TableCell className={styles.tableCell}>Payment Method</TableCell>
            <TableCell className={styles.tableCell}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell className={styles.tableCell}>
                <div className={styles.cellWrapper}>
                  <Image
                    src={row.img}
                    alt=""
                    width={32}
                    height={32}
                    className={styles.image}
                  />
                  {row.product}
                </div>
              </TableCell>
              <TableCell className={styles.tableCell}>{row.customer}</TableCell>
              <TableCell className={styles.tableCell}>{row.date}</TableCell>
              <TableCell className={styles.tableCell}>{row.amount}</TableCell>
              <TableCell className={styles.tableCell}>{row.method}</TableCell>
              <TableCell className={styles.tableCell}>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MainTable>
    </TableContainer>
  );
};

export default List;
