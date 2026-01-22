import pool from "../models/db.js";

const ProductRepository = {
  async findByIdForUpdate(productId, connection) {
    const [rows] = await connection.query(
      "SELECT * FROM product WHERE id = ? FOR UPDATE",
      [productId]
    );
    return rows[0];
  },

  async updateStock(productId, newStock, connection) {
    await connection.query(
      "UPDATE product SET stock = ? WHERE id = ?",
      [newStock, productId]
    );
  }
};

export default ProductRepository;