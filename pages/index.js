import styles from "../styles/Home.module.css";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

export default function Home() {
  return (
    <div className={styles.container}>
      <PayPalScriptProvider
        options={{
          "client-id": "",
        }}
      >
        <PayPalButtons
          createOrder={async () => {
            try {
              const res = await axios({
                url: "http://localhost:3000/api/payment",
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              });
              return res.data.id;
            } catch (error) {
              console.log(error);
            }
          }}
          onCancel={(data) => console.log("compra cancelada")}
          onApprove={(data, actions) => {
            console.log(data);
            actions.order.capture();
          }}
          style={{ layout: "horizontal", color: "blue" }}
        />
      </PayPalScriptProvider>
    </div>
  );
}
