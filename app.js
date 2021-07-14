const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + '/routes/login/index.html')
})

app.get("/register", (req, res) => {
    res.sendFile(__dirname + '/routes/register/index.html')
})

app.use((req, res, next) => {
    res.status(404).send("404")
})
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

