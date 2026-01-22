const OrderRepository = {
  async create(orderData, connection) {
    const { productId, quantity, status } = orderData;

    const [result] = await connection.query(
      "INSERT INTO `order` (productId, quantity, status) VALUES (?, ?, ?)",
      [productId, quantity, status]
    );

    return result.insertId;
  }
};

export default OrderRepository;

