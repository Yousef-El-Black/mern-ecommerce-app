import CategoryItem from "../CategoryItem/CategoryItem";
import { Container } from "./Categories.styled";
import { categories } from "@/data";

const Categories = () => {
  return (
    <Container>
      {categories.map((cat) => (
        <CategoryItem key={cat.id} item={cat} />
      ))}
    </Container>
  );
};

export default Categories;
