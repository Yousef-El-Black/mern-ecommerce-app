import styles from "./datatable.module.scss";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Image from "next/image";
import { userRows } from "@/datatablesrc";
import Link from "next/link";
import { useState } from "react";

export const userColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
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

  {
    field: "age",
    headerName: "Age",
    width: 100,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <div
          className={`${styles.cellWithStatus} ${styles[params.row.status]}`}
        >
          {params.row.status}
        </div>
      );
    },
  },
];

const Datatable = () => {
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params: any) => {
        return (
          <div className={styles.cellAction}>
            <Link href={"/users/test"} style={{ textDecoration: "none" }}>
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

  const [data, setData] = useState(userRows);

  const handleDelete = (id: number) => {
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <div className={styles.datatable}>
      <div className={styles.datatableTitle}>
        Add New User
        <Link href={"/users/new"} className={styles.link}>
          Add New
        </Link>
      </div>
      <DataGrid
        rows={data}
        columns={userColumns.concat(actionColumn)}
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
