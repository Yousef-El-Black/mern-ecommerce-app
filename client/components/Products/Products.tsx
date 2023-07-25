import { popularProducts } from "@/data";
import { Container } from "./Products.styled";
import ProductCard from "../PorductCard/ProductCard";
import { useEffect, useState } from "react";
import getProducts from "@/hooks/getProducts";
import axios from "axios";
import { publicRequest } from "@/requestMethods";
export default function Products({
  cat,
  filters,
  sort,
}: {
  cat?: string | undefined | null;
  filters?: Object;
  sort?: string;
}) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await publicRequest.get(
          cat ? `products/?category=${cat}` : "products/"
        );
        setProducts(response.data);
        // setFilteredProducts(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
    // setFilteredProducts(products);
  }, [cat]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a: any, b: any) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a: any, b: any) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a: any, b: any) => b.price - a.price)
      );
    }
  }, [sort]);

  useEffect(() => {
    if (cat) {
      const filtered = products.filter((item: any) => {
        return Object.entries(filters as any).every(([key, value]) => {
          return item[key].includes(value);
        });
      });
      setFilteredProducts(filtered);
    }
  }, [products, cat, filters]);

  return (
    <Container>
      {cat
        ? filteredProducts.map((item: any) => (
            <ProductCard key={item.id} item={item} />
          ))
        : products
            .slice(0, 8)
            .map((item: any) => <ProductCard key={item.id} item={item} />)}
    </Container>
  );
}

// export default Products;
