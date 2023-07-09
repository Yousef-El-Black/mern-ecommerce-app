import {
  Center,
  Container,
  Left,
  Right,
  Logo,
  Desc,
  SocialContainer,
  SocialIcon,
  Title,
  List,
  ListItem,
  ContactItem,
} from "./Footer.styled";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import RoomIcon from "@mui/icons-material/Room";
import PhoneIcon from "@mui/icons-material/Phone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Image from "next/image";

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>EL-BLACK.</Logo>
        <Desc>
          There are many variations of progress of Lorem ipsum dolor, sit amet
          consectetur adipisicing elit. Nostrum laborum molestiae rem dolorem
          maiores? Recusandae ea obcaecati totam reiciendis cumque ipsam hic.{" "}
        </Desc>
        <SocialContainer>
          <SocialIcon color="385999">
            <FacebookIcon />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <InstagramIcon />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <TwitterIcon />
          </SocialIcon>
          <SocialIcon color="E60023">
            <PinterestIcon />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>Women Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <RoomIcon style={{ marginRight: "20px" }} />
          Abshan in front of the railway station / Bella Center 33716
        </ContactItem>
        <ContactItem>
          <PhoneIcon style={{ marginRight: "20px" }} />
          +201003758787
        </ContactItem>
        <ContactItem>
          <MailOutlineIcon style={{ marginRight: "20px" }} />
          yousefelblackdev@gmail.com
        </ContactItem>
        <Image
          src={
            "https://as2.ftcdn.net/v2/jpg/04/73/84/61/1000_F_473846184_0k637f6855ZJqaulKqAmgJTEVGVibR1P.jpg"
          }
          alt=""
          width={1000}
          height={1000}
          style={{ width: "100%", height: "auto" }}
        />
      </Right>
    </Container>
  );
};

export default Footer;
