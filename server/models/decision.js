const con = require("./db_connect");

async function createDecisionTable() {
  let sql = `
    CREATE TABLE IF NOT EXISTS Decision (
      Decision_Id INT AUTO_INCREMENT PRIMARY KEY,
      User_Id INT NOT NULL,
      Category_Id INT NOT NULL,
      Title VARCHAR(100) NOT NULL,
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
    SELECT Decision.*, Category.Category_Name 
    FROM Decision 
    JOIN Category ON Decision.Category_Id = Category.Category_Id;
  `;
  const rows = await con.query(sql);
  return rows;
}

// CREATE - create a new decision
async function createDecision(userId, categoryId, title, status) {
  const sql = `INSERT INTO Decision (User_Id, Category_Id, Title, Status) VALUES (?, ?, ?, ?)`;
  const result = await con.query(sql, [userId, categoryId, title, status]);
  return result.insertId;
}

// READ - get a decision by ID
async function getDecisionById(decisionId) {
  const sql = `SELECT * FROM Decision WHERE Decision_Id = ?`;
  const rows = await con.query(sql, [decisionId]);
  return rows[0];
}

// UPDATE - update a decision by ID
async function updateDecision(decisionId, title, status, categoryId) {
  const sql = `UPDATE Decision SET Title = ?, Status = ?, Category_Id = ? WHERE Decision_Id = ?`;
  const result = await con.query(sql, [title, status, categoryId, decisionId]);
  return result;
}

// DELETE - delete a decision by ID
async function deleteDecision(decisionId) {
  const sql = `DELETE FROM Decision WHERE Decision_Id = ?`;
  const result = await con.query(sql, [decisionId]);
  return result;
}

module.exports = { getAllDecisions, createDecision, getDecisionById, updateDecision, deleteDecision };