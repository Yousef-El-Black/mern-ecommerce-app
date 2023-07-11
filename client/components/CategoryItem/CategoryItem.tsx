import Link from "next/link";
import { Button, Container, Info, Title } from "./CategoryItem.styled";
import Image from "next/image";

const CategoryItem = ({
  item,
}: {
  item: {
    id: number;
    img: string;
    title: string;
    cat: string;
  };
}) => {
  return (
    <Container>
      <Link href={"/products/" + item.cat}>
        <Image
          src={item.img}
          alt=""
          width={1280}
          height={1280}
          // FIXME: h => 30vh
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <Info>
          <Title>{item.title}</Title>
          <Button>SHOP NOW</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;
