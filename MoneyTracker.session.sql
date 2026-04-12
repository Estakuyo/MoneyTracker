CREATE TABLE Users (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);
CREATE TABLE Categories (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);
CREATE TABLE Transactions (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    category_id INT UNSIGNED,
    user_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (category_id) REFERENCES Categories(id) ON DELETE
    SET NULL,
        FOREIGN KEY (user_id) REFERENCES Users(id)
);
---@block
SHOW TABLES;
---@block
SELECT *
FROM Users;
SELECT *
FROM categories;
SELECT *
FROM transactions;
---@block
DROP TABLE users,
categories,
transactions;