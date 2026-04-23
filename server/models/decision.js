const con = require("./db_connect");

async function createDecisionTable() {
  let sql = `
    CREATE TABLE IF NOT EXISTS Decision (
      Decision_Id INT AUTO_INCREMENT PRIMARY KEY,
      User_Id INT NOT NULL,
      Category_Id INT NOT NULL,
      Title VARCHAR(100) NOT NULL,
      Description TEXT,
      CreatedDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      Status VARCHAR(30) NOT NULL,
      CONSTRAINT fk_decision_user
        FOREIGN KEY (User_Id) REFERENCES User(User_Id),
      CONSTRAINT fk_decision_category
        FOREIGN KEY (Category_Id) REFERENCES Category(Category_Id)
    );
  `;

  await con.query(sql);
}

createDecisionTable();

async function getAllDecisions() {
  let sql = `
    SELECT * FROM Decision;
  `;

  const [rows] = await con.query(sql);
  return rows;
}

module.exports = { getAllDecisions };