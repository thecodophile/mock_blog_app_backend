const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(express.json());

const blog = require("./routes/blog");
const dummy = require("./routes/dummy");

app.use("/api/v1", blog);
app.use("/api/v1", dummy);

const dbConnect = require("./config/database");
dbConnect();

app.listen(PORT, () => {
  console.log(`Server is Running succesfully on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("<h1>This is HOMEPAGE baby</h1>");
});
