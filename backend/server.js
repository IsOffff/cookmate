const express = require("express");
const app = express();
const { connectMongo } = require("./config/mongo");
const redisCacheRoutes = require("./routes/cache");
const mongoCommentRoutes = require("./routes/comments");
const similarRoutes = require("./routes/similar");
const sqlRecipeRoutes = require("./routes/recipes");



app.use(express.json());
app.use("/cache", redisCacheRoutes);
app.use("/recipes", mongoCommentRoutes);
app.use("/similar", similarRoutes);
app.use("/sql/recipes", sqlRecipeRoutes);

connectMongo();

app.listen(3000, () => console.log("Backend running"));