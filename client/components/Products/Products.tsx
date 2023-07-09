import { popularProducts } from "@/data";
import { Container } from "./Products.styled";
import Product from "../PorductCard/ProductCard";

const Products = () => {
  return (
    <Container>
      {popularProducts.map((item) => (
        <Product key={item.id} item={item} />
      ))}
    </Container>
  );
};

export default Products;
