import { PayPalButtons } from "@paypal/react-paypal-js";

const PaypalPayment = () => {
  const createOrder = (data: any) => {
    // Order is created on the server and the order id is returned
    return fetch("http://localhost:8080/create-paypal-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // use the "body" param to optionally pass additional order information
      // like product skus and quantities
      body: JSON.stringify({
        cart: [
          {
            sku: "YOUR_PRODUCT_STOCK_KEEPING_UNIT",
            quantity: "YOUR_PRODUCT_QUANTITY",
          },
        ],
        product: {
          description: "Wood Can Sofa",
          cost: "399.00",
        },
      }),
    })
      .then((response) => response.json())
      .then((order) => order.id);
  };
  const onApprove = (data: any) => {
    // Order is captured on the server and the response is returned to the browser
    return fetch("/my-server/capture-paypal-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    }).then((response) => response.json());
  };
  return (
    <PayPalButtons
      createOrder={(data: any) => createOrder(data)}
      onApprove={(data: any) => onApprove(data)}
    />
  );
};

export default PaypalPayment;
