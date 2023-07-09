import Image from "next/image";
import { Container, Circle, Info, Icon } from "./ProductCard.styled";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const ProductCard = ({
  item,
}: {
  item: {
    id: number;
    img: string;
  };
}) => {
  return (
    <Container>
      <Circle />
      <Image
        src={item.img}
        alt=""
        width={1280}
        height={1280}
        style={{ height: "75%", width: "auto", zIndex: "2" }}
      />
      <Info>
        <Icon>
          <ShoppingCartOutlinedIcon />
        </Icon>
        <Icon>
          <SearchIcon />
        </Icon>
        <Icon>
          <FavoriteBorderIcon />
        </Icon>
      </Info>
    </Container>
  );
};

export default ProductCard;
