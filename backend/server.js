const express = require("express");
const app = express();

app.use(express.json());

app.use("/recipes", require("./routes/recipes"));


app.use("/comments", require("./routes/comments"));

app.use("/similar", require("./routes/similar"));

app.listen(3000, () => console.log("Backend running"));