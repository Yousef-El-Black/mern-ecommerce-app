import Datatable from "../Datatable/Datatable";
import Layout from "../Layout/Layout";

const ListPage = ({ type }: { type: string }) => {
  return (
    <Layout>
      <Datatable type={type} />;
    </Layout>
  );
};

export default ListPage;
