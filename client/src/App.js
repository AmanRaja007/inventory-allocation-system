import { useState } from "react";

function App() {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");

  const placeOrder = async () => {
    setMessage("");

    try {
      const response = await fetch("http://localhost:3000/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: Number(productId),
          quantity: Number(quantity),
        }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Server error");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Place Order</h2>

      <input
        placeholder="Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <br /><br />

      <button onClick={placeOrder}>Submit</button>

      <p>{message}</p>
    </div>
  );
}

export default App;
