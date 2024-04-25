const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())

const todos = [
    {
        id: 1,
        title: "ABC",
        decription: "abc"
    },
    {
        id: 2,
        title: "hv",
        decription: "vhn"
    },
    {
        id: 3,
        title: "vhnn",
        decription: "vhn"
    },
    {
        id: 7,
        title: "Server",
        decription: "server still running"
    }
]

app.get("/todos", (req, res) => {
    res.json(todos)
})

app.listen(3000)