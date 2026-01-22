import express from "express";
import cors from "cors";
import pool from "./src/models/db.js";
import orderRoutes from "./src/routes/order.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("MySQL connected successfully");
    connection.release();
  } catch (err) {
    console.error("MySQL connection failed:", err.message);
    process.exit(1);
  }
})();

app.use(orderRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
