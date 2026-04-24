const con = require("./db_connect");

async function createUserTable() {
  let sql = `
    CREATE TABLE IF NOT EXISTS User (
      User_Id INT AUTO_INCREMENT PRIMARY KEY,
      First_Name VARCHAR(50) NOT NULL,
      Last_Name VARCHAR(50) NOT NULL,
      Password VARCHAR(255) NOT NULL,
      CreatedDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await con.query(sql);
}

createUserTable();

async function getAllUsers() {
  let sql = `
    SELECT * FROM User;
  `;

  const [rows] = await con.query(sql);
  return rows;
}

module.exports = { getAllUsers };