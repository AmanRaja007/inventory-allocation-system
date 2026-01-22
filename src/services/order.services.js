import pool from "../models/db.js";
import ProductRepository from "../repositories/product.repositories.js";
import OrderRepository from "../repositories/order.repositories.js";

const OrderService = {
  async placeOrder({ productId, quantity }) {
    if (!productId || !quantity || quantity <= 0) {
      throw new Error("Invalid productId or quantity");
    }

    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      // 1. Fetch product with row-level lock
      const product =
        await ProductRepository.findByIdForUpdate(productId, connection);

      if (!product) {
        await OrderRepository.create(
          { productId, quantity, status: "failed" },
          connection
        );
        throw new Error("Product not found");
      }

      // 2. Check stock
      if (product.stock < quantity) {
        await OrderRepository.create(
          { productId, quantity, status: "failed" },
          connection
        );
        throw new Error("Insufficient stock");
      }

      // 3. Deduct stock
      const newStock = product.stock - quantity;

      await ProductRepository.updateStock(
        productId,
        newStock,
        connection
      );

      // 4. Create successful order
      await OrderRepository.create(
        { productId, quantity, status: "success" },
        connection
      );

      // 5. Commit transaction
      await connection.commit();

      return {
        success: true,
        message: "Order placed successfully",
      };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },
};

export default OrderService;
