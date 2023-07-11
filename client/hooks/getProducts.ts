import axios from "axios";

const getProducts = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/products/");
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

export default getProducts;
