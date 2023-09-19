const connect = require("./connect.js");

const express = require("express");

const app = express();

app.set("view engine", "ejs");

app.get("/data", async (req, resp) => {
    try {
        let data = await connect(); 
        data = await data.find({}).toArray(); 
    
        resp.render("index", { data : data });
    } 
    catch (error)
    {
        console.error("Error fetching data:", error);
        resp.status(500).json({ error: "Error fetching data" });
    }
});

app.use(express.static('public'));

app.listen(7000);