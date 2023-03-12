const pool = require("./db");

const login = async (req, res) => {
  const { email, password } = req.body;

  // Check if the email and password are valid
  const [rows, fields] = await pool.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password]
  );

  if (rows.length > 0) {
    res.json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

const getUsers = async (req, res) => {
  const [rows, fields] = await pool.query("SELECT * FROM users");
  res.json(rows);
};

module.exports = {
  login,
  getUsers,
};
