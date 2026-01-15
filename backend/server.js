const express = require("express");
const app = express();

app.use(express.json());

app.use("/sql/recipes", require("./routes/recipes"));
app.use("/cache", require("./routes/cache"));
app.use("/recipes", require("./routes/comments"));
app.use("/similar", require("./routes/similar"));

app.listen(3000, () => console.log("Backend running"));