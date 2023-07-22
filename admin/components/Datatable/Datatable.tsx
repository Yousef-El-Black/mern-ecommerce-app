import styles from "./datatable.module.scss";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Image from "next/image";
import { productRows, userRows } from "@/datatablesrc";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { userRequest } from "@/requestMethods";
import { useSelector } from "react-redux";

export const userColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 270 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params: GridRenderCellParams): any => {
      return (
        <div className={styles.cellWithImg}>
          <Image
            src={params.row.img}
            alt="avatar"
            className={styles.cellImg}
            width={32}
            height={32}
          />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
];

export const productColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 270 },
  {
    field: "product",
    headerName: "Product",
    width: 230,
    renderCell: (params: GridRenderCellParams): any => {
      return (
        <div className={styles.cellWithImg}>
          <Image
            src={params.row.img[0]}
            alt="avatar"
            className={styles.cellImg}
            width={32}
            height={32}
          />
          {params.row.title}
        </div>
      );
    },
  },
  {
    field: "price",
    headerName: "Price",
    width: 160,
  },
];

export const orderColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 270 },
  {
    field: "userId",
    headerName: "User ID",
    width: 250,
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 160,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
  },
];

const Datatable = ({ type }: { type: string }) => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params: any) => {
        return (
          <div className={styles.cellAction}>
            <Link
              href={`/${
                type === "users"
                  ? "users"
                  : type === "products"
                  ? "products"
                  : "orders"
              }/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className={styles.viewButton}>View</div>
            </Link>
            <div
              className={styles.deleteButton}
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  const [data, setData] = useState<any>([]);

  const token = useSelector((state: any) => state.user.currentUser.accessToken);

  const handleDelete = async (id: number) => {
    if (type === "users") {
      await userRequest(token).delete("/users/" + id);
    } else if (type === "products") {
      await userRequest(token).delete("/produts/" + id);
    } else {
      await userRequest(token).delete("/orders/" + id);
    }
    setData(data.filter((item: any) => item.id !== id));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res;
        if (type === "users") {
          res = await userRequest(token).get("/users");
          setUsers(res.data.map((item: any) => ({ ...item, id: item._id })));
        } else if (type === "products") {
          res = await userRequest(token).get("/products");
          setProducts(res.data.map((item: any) => ({ ...item, id: item._id })));
        } else {
          res = await userRequest(token).get("/orders");
          setOrders(res.data.map((item: any) => ({ ...item, id: item._id })));
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setData(type === "users" ? users : type === "products" ? products : orders);
  }, [users, products, orders]);

  return (
    <div className={styles.datatable}>
      <div className={styles.datatableTitle}>
        <Link
          href={`/${
            type === "users"
              ? "users"
              : type === "products"
              ? "products"
              : "orders"
          }/new`}
          className={styles.link}
        >
          Add New{" "}
          {type === "users"
            ? "User"
            : type === "products"
            ? "Product"
            : "Order"}
        </Link>
      </div>
      <DataGrid
        rows={data}
        columns={
          type === "users"
            ? userColumns.concat(actionColumn)
            : type === "products"
            ? productColumns.concat(actionColumn)
            : orderColumns.concat(actionColumn)
        }
        initialState={{
          pagination: {
            paginationModel: { pageSize: 9 },
          },
        }}
        pageSizeOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
