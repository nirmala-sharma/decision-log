const con = require("./db_connect");

async function createCategoryTable() {
  let sql = `
    CREATE TABLE IF NOT EXISTS Category (
      Category_Id INT AUTO_INCREMENT PRIMARY KEY,
      Category_Name VARCHAR(100) NOT NULL,
      Description VARCHAR(255)
    );
  `;

  await con.query(sql);
}

createCategoryTable();

async function getAllCategories() {
  let sql = `
    SELECT * FROM Category;
  `;

  const [rows] = await con.query(sql);
  return rows;
}

module.exports = { getAllCategories };