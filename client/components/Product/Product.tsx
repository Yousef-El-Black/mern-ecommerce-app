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

const Product = () => {
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image
            src={
              "https://images.pexels.com/photos/2363825/pexels-photo-2363825.jpeg"
            }
            alt=""
            width={1000}
            height={1000}
            // FIXME: h => 40vh
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </ImgContainer>
        <InfoContainer>
          <Title>Denim Jumpsuit</Title>
          <Desc>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad optio
            fugiat fuga in. Corporis qui inventore architecto fugiat! Enim, rem
            assumenda fugiat illum debitis est hic fugit voluptatem. Laboriosam,
            temporibus.
          </Desc>
          <Price>$ 20</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              <FilterColor color="000000" />
              <FilterColor color="4f5fe3" />
              <FilterColor color="00ff00" />
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSizeSelect>
                <FilterSizeOption>XS</FilterSizeOption>
                <FilterSizeOption>S</FilterSizeOption>
                <FilterSizeOption>M</FilterSizeOption>
                <FilterSizeOption>L</FilterSizeOption>
                <FilterSizeOption>XL</FilterSizeOption>
                <FilterSizeOption>2XL</FilterSizeOption>
              </FilterSizeSelect>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <RemoveIcon />
              <Amount>1</Amount>
              <AddIcon />
            </AmountContainer>
            <Button>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
