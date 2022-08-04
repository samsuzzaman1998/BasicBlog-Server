const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log("ok connected"))
    .catch((err) => console.log(err));

app.get("/authUser", authRoute);

app.listen("5000", () => {
    console.log("running");
});
