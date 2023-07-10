import NewPage from "@/components/NewPage/NewPage";
import { productInputs } from "@/formsrc";

const New = () => {
  return (
    <div>
      <NewPage inputs={productInputs} title={"Add New Product"} />
    </div>
  );
};

export default New;
