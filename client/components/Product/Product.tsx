import Image from "next/image";
import Announcement from "../Announcement/Announcement";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Newsletter from "../Newsletter/Newsletter";
import {
  Container,
  Wrapper,
  ImgContainer,
  InfoContainer,
  Title,
  Desc,
  Price,
  FilterContainer,
  Filter,
  FilterTitle,
  FilterColor,
  FilterSizeSelect,
  FilterSizeOption,
  AddContainer,
  AmountContainer,
  Amount,
  Button,
} from "./Product.styled";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { publicRequest } from "@/requestMethods";
import { addProduct } from "@/redux/cartRedux";
import { useDispatch } from "react-redux";

const Product = () => {
  const router = useRouter();
  const id = router.query.id;
  const [product, setProduct] = useState<any>({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  const dispatch = useDispatch();

  const handleQuantity = (type: string) => {
    if (type === "dec") {
      if (quantity > 0) {
        setQuantity(quantity - 1);
      }
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    dispatch(addProduct({ ...product, quantity, color, size }));
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await publicRequest.get("/products/" + id);
        console.log(res.data);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduct();
  }, [id]);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image
            // "https://images.pexels.com/photos/2363825/pexels-photo-2363825.jpeg"
            src={product.img && (product.img[0] as any)}
            alt=""
            width={1000}
            height={1000}
            // FIXME: h => 40vh
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>$ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color &&
                product.color.length > 0 &&
                product.color.map((color: string, index: number) => {
                  return (
                    <FilterColor
                      color={color}
                      key={index}
                      onClick={() => setColor(color)}
                    />
                  );
                })}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSizeSelect onChange={(e: any) => setSize(e.target.value)}>
                {product.size &&
                  product.size.length > 0 &&
                  product.size.map((size: string, index: number) => {
                    return (
                      <FilterSizeOption key={index}>{size}</FilterSizeOption>
                    );
                  })}
              </FilterSizeSelect>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <RemoveIcon onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <AddIcon onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={handleAddToCart}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;

// export async function getStaticPaths() {
//   const res = await fetch("http://localhost:8080/api/products");
//   const products = await res.json();

//   const paths = products.map((product: any) => ({
//     params: { id: product.id },
//   }));

//   return { paths, fallback: false };
// }
