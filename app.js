const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.port || 5004;
const {mongoURL} = require("./keys.js");
const path = require("path");

const cors= require("cors");
app.use(cors());

require('./models/model.js');
require('./models/post.js');

app.use(express.json());
app.use(require("./routes/createPost.js"));
app.use(require("./routes/auth.js"));

mongoose.connect(mongoURL);

mongoose.connection.on("connected", () => {
    console.log("Successfully connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
    console.log("Not connected to MongoDB. Error:", err);
});

app.use(express.static(path.join(__dirname,"./frontend/build")))
app.get("*",(req,res)=>{
    res.sendFile(
        path.join(__dirname,"./frontend/build/index.html"),
        function(err){
            res.status(500).send(err);
        }

    )
})

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});
