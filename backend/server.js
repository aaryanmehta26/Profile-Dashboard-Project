const express = require("express");
const posts = require("./data/posts");
const userRoutes = require("./routes/userRoutes");
const dotenv = require("dotenv");
const path = require("path");
const connectDataBase = require("./config/db");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
dotenv.config();
connectDataBase();
app.use(express.json()); // to request json data from user (request)

app.use("/api/users", userRoutes);

app.get("/api/posts", (req, res) => {
  res.send(posts);
});

/** ------------ DEPLOYMENT --------------- */
const __dirname1 = path.resolve(); // path comes from node
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("All good guys. Cheers!!");
  });
}

// Error handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 9000;

app.listen(9000, console.log(`Server started on PORT ${PORT}`));