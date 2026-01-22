import OrderService from "../services/order.services.js";

const OrderController = {
  async placeOrder(req, res) {
    try {
      const result = await OrderService.placeOrder(req.body);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message
      });
    }
  }
};

export default OrderController;
