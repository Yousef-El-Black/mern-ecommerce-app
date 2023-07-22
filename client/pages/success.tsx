import { userRequest } from "@/requestMethods";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { resetCart } from "@/redux/cartRedux";

const Success = () => {
  const [orderId, setOrderId] = useState("");
  const { currentUser } = useSelector((state: any) => state.user);
  const router = useRouter();
  const products = router.query.products;
  const cart = JSON.parse(products as string);
  const stripeData = router.query.stripeData;
  const data = JSON.parse(stripeData as string);

  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.user.currentUser.accessToken);

  // useEffect(() => {
  //   const createOrder = async () => {
  //     try {
  //       const res = await userRequest(token).post("/orders", {
  //         userId: currentUser._id,
  //         products: cart.products.map((item: any) => ({
  //           productId: item._id,
  //           quantity: item._quantity,
  //         })),
  //         amount: cart.total,
  //         address: data.billing_details.address,
  //       });
  //       setOrderId(res.data._id);
  //       dispatch(resetCart());
  //     } catch {}
  //   };
  //   if (data && cart) {
  //     createOrder();
  //   }
  // }, []);

  useEffect(() => {
    // Only run the effect if data and cart are available
    if (data && cart) {
      const createOrder = async () => {
        try {
          const res = await userRequest(token).post("/orders", {
            userId: currentUser._id,
            products: cart.products.map((item: any) => ({
              productId: item._id,
              quantity: item._quantity,
            })),
            amount: cart.total,
            address: data.billing_details.address,
          });
          setOrderId(res.data._id);
          dispatch(resetCart());
        } catch (error) {
          console.error("Error creating order:", error);
        }
      };

      createOrder();
    }
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <button
        style={{ padding: 10, marginTop: 20 }}
        onClick={() => router.push("/")}
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default Success;
