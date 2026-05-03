CREATE DATABASE IF NOT EXISTS decisionlog_db;

USE decisionlog_db;

CREATE TABLE IF NOT EXISTS User (
    User_Id INT AUTO_INCREMENT PRIMARY KEY,
    First_Name VARCHAR(50) NOT NULL,
    Last_Name VARCHAR(50) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    CreatedDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS User_Phone (
    Phone_Id INT AUTO_INCREMENT PRIMARY KEY,
    User_Id INT NOT NULL,
    PhoneNumber VARCHAR(20) NOT NULL,
    CONSTRAINT fk_user_phone_user
        FOREIGN KEY (User_Id) REFERENCES User(User_Id)
);

CREATE TABLE IF NOT EXISTS Category (
    Category_Id INT AUTO_INCREMENT PRIMARY KEY,
    Category_Name VARCHAR(100) NOT NULL,
    Description VARCHAR(255)
);

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

ALTER TABLE User
ADD Username VARCHAR(100) NOT NULL UNIQUE;

-- I am inserting data to the Category table manually because i dont have created the input form for it and i want to have some data to work with when i create the decision input form.
INSERT INTO Category (Category_Name, Description)
VALUES 
('School', 'School related decisions'),
('Work', 'Work related decisions'),
('Personal', 'Personal decisions');

