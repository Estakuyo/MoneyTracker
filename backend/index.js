require("dotenv").config();
const express = require("express");
const app = express();

// Middleware
app.use(express.json()); // Parses JSON to readable data

app.listen(process.env.PORT, () => {
    console.log(`Server is listening to PORT ${process.env.PORT}`);
});