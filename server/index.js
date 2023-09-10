const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, '../build')));

app.get("/api", (req, res) => {
    res.json({message: "What up from Nodemon!?!"});
})

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});