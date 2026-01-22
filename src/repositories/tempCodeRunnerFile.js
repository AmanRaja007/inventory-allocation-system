import db from '../models/db.js';


async function getProductForUpdate(productId, connection) {
  const [rows] = await connection.query(
    'SELECT * FROM product WHERE id = ? FOR UPDATE',
    [productId]
  );
  return rows[0];
}

async function updateStock(productId, newStock, connection) {
  await connection.query(
    'UPDATE product SET stock = ? WHERE id = ?',
    [newStock, productId]
  );
}

const product = await productRepo.getProductForUpdate(1, connection);
console.log(product);


module.exports = { getProductForUpdate, updateStock };
