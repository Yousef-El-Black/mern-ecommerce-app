import Image from "next/image";
import Announcement from "../Announcement/Announcement";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import {
  Container,
  Wrapper,
  Title,
  Top,
  Bottom,
  TopButton,
  TopTexts,
  TopText,
  Info,
  Summary,
  Product,
  ProductDetail,
  ProductName,
  Details,
  ProductColor,
  ProductId,
  ProductSize,
  PriceDetail,
  ProductAmountContainer,
  ProductAmount,
  ProductPrice,
  Hr,
  SummaryItem,
  SummaryItemPrice,
  SummaryItemText,
  SummaryTitle,
  Button,
} from "./CartPage.styled";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import dotenv from "dotenv";
import { userRequest } from "@/requestMethods";
import { useRouter } from "next/router";
import { quantityPlus, quantityMinus } from "@/redux/cartRedux";
import Link from "next/link";

dotenv.config();

const KEY = process.env.REACT_APP_STRIPE;

const CartPage = () => {
  const cart = useSelector((state: any) => state.cart);

  const [stripeToken, setStripeToken] = useState<any>("");

  const router = useRouter();

  const dispatch = useDispatch();

  const token = useSelector((state: any) => state.user.currentUser.accessToken);

  const onToken = (token: any) => {
    setStripeToken(token);
  };

  const handleQuantityPlus = (id: any) => {
    dispatch(quantityPlus({ id } as any) as any);
  };

  const handleQuantityMinus = (id: any) => {
    dispatch(quantityMinus({ id } as any) as any);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest(token).post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 500,
        });
        router.push({
          pathname: "/success",
          query: {
            stripeData: JSON.stringify(res.data),
            products: JSON.stringify(cart),
          },
        });
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, router]);
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link href={"/"}>
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText>Shopping Bag ({cart.quantity})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product: any, index: number) => {
              return (
                <Product key={index}>
                  <ProductDetail>
                    <Image
                      src={
                        // "https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg"
                        product.img
                      }
                      alt=""
                      width={1000}
                      height={1000}
                      style={{
                        width: "200px",
                        height: "auto",
                        objectFit: "cover",
                      }}
                    />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {product.title}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {product._id}
                      </ProductId>
                      <ProductColor color={product.color} />
                      <ProductSize>
                        <b>Size:</b> {product.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <AddIcon
                        onClick={() => handleQuantityPlus(product._id)}
                      />
                      <ProductAmount>{product.quantity}</ProductAmount>
                      <RemoveIcon
                        onClick={() => handleQuantityMinus(product._id)}
                      />
                    </ProductAmountContainer>
                    <ProductPrice>
                      $ {product.price * product.quantity}
                    </ProductPrice>
                  </PriceDetail>
                </Product>
              );
            })}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="el-black Shop"
              image="https://lh3.googleusercontent.com/a/AAcHTtdvqW9mQe11sOJrS9SoLDDZMAuT-6aORwo9Esgk5UKAIg=s360-c-no"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={
                "pk_test_51NRBkADBVetQQ3NDGFBf0f3DalnYvhSpMPFrfVxXBIvUIzNkSJby4q6FeFquVrTXLjHx68O322uXbbmKKNUCrAq4001Q0BmkCN"
              }
            ></StripeCheckout>
            <Button>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default CartPage;
