(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('MySQL connected successfully');
    connection.release();
  } catch (err) {
    console.error('MySQL connection failed', err.message);
  }
})();