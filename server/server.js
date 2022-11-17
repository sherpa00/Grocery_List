const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');

const connection = require("./models/index");

app.use(cors());

app.use(bodyParser.json());

const readRouter = require("./routes/read");
const addRouter = require("./routes/add");
const editRouter = require("./routes/edit");
const deleteRouter = require("./routes/delete");
const completedRouter = require("./routes/completed");
const removeAllRouter = require("./routes/removeall");


app.get("/",(req,res) => {
    res.send("We are at home");
});

app.use("/read",readRouter);
app.use("/add",addRouter);
app.use("/edit",editRouter);
app.use("/delete",deleteRouter);
app.use("/completed",completedRouter);
app.use("/removeall",removeAllRouter);


app.listen(3000,() => {
    console.log("Server is listening at 3000...");
});

