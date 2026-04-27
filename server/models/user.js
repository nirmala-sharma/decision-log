const con = require("./db_connect");
const bcrypt = require("bcrypt");

async function createUserTable() {
  let sql = `
    CREATE TABLE IF NOT EXISTS User (
      User_Id INT AUTO_INCREMENT PRIMARY KEY,
      First_Name VARCHAR(50) NOT NULL,
      Last_Name VARCHAR(50) NOT NULL,
      Username VARCHAR(100) NOT NULL UNIQUE,
      Password VARCHAR(255) NOT NULL,
      CreatedDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await con.query(sql);
}

createUserTable();

async function getAllUsers() {
  let sql = `SELECT * FROM User;`;
  const rows = await con.query(sql);
  return rows;
}

// CREATE - register a new user
async function registerUser(firstname, lastname, username, password, phone) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const userSql = `INSERT INTO User (First_Name, Last_Name, Username, Password) VALUES (?, ?, ?, ?)`;
  const result = await con.query(userSql, [firstname, lastname, username, hashedPassword]);

  const userId = result.insertId;

  const phoneSql = `INSERT INTO User_Phone (User_Id, PhoneNumber) VALUES (?, ?)`;
  await con.query(phoneSql, [userId, phone]);

  return userId;
}

// READ - login a user
async function loginUser(username, password) {
  const sql = `SELECT * FROM User WHERE Username = ?`;
  const rows = await con.query(sql, [username]);

  if (rows.length === 0) return null;

  const user = rows[0];
  const match = await bcrypt.compare(password, user.Password);

  if (!match) return null;

  return user;
}

// UPDATE - update a user by ID
async function updateUser(userId, firstname, lastname, username) {
  const sql = `UPDATE User SET First_Name = ?, Last_Name = ?, Username = ? WHERE User_Id = ?`;
  const result = await con.query(sql, [firstname, lastname, username, userId]);
  return result;
}

// DELETE - delete a user by ID
async function deleteUser(userId) {
  const sql = `DELETE FROM User WHERE User_Id = ?`;
  const result = await con.query(sql, [userId]);
  return result;
}

module.exports = { getAllUsers, registerUser, loginUser, updateUser, deleteUser };