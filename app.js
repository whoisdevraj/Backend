const express = require("express");
const mongoose = require("mongoose");
const formRoutes = require("./routes/formRoutes");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
require("dotenv").config();

const corsOptions = {
  origin: ["https://api4forms.vercel.app"],
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.use("/", formRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
