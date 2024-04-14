const express = require("express")
const bodyParser = require("body-parser");
const fs = require("fs")
const port = 3000;

const app = express()
app.use(bodyParser.json())

app.get("/", (req, res) => {
    const homepage = "<h1>TODO LIST</h1><ul><li><b>/todos</b> : get all todos</li><li><b>/todos/:id</b> : get todo with given id</li><li><b>/todos</b> : post a new todo</li><li><b>/todos/:id</b> : edit a todo with given id</li><li><b>/todos/:id</b> : delete a todo with given id</li></ul>"
    res.status(200).send(homepage)
})

function readData() {
    return new Promise((resolve, reject) => {
        fs.readFile("todos.json", "utf-8", (err, data) => {
            if (err) throw err;
            resolve(JSON.parse(data))
        })
    })
}

function writeData(data) {
    return new Promise((resolve, reject) => {
        fs.writeFile("todos.json", JSON.stringify(data), "utf-8", (err) => {
            if (err) throw err;
            resolve()
        })
    })
}

app.get("/todos", async (req, res) => {
    const data = await readData()
    res.status(200).send(data)
})

app.get("/todos/:id", async (req, res) => {
    const id = req.params.id
    const data = await readData()
    const index = data.findIndex(item => item.id == id)
    if (index === -1) {
        res.status(404).send()
    }
    res.status(200).send(data[index])
})

app.post("/todos", async (req, res) => {
    const newTodo = {
        "id": Date.now().toString(36),
        "title": req.body.title,
        "description": req.body.description
    }
    const data = await readData()
    data.push(newTodo)
    await writeData(data)
    res.status(200).send(newTodo)
})

app.put("/todos/:id", async (req, res) => {
    const id = req.params.id
    const data = await readData()
    const index = data.findIndex(item => item.id == id)
    if (index === -1) {
        res.status(404).send()
    }
    data[index].title = req.body.title
    data[index].description = req.body.description
    await writeData(data)
    res.status(200).send(data[index])
})

app.delete("/todos/:id", async (req, res) => {
    const id = req.params.id
    let data = await readData()
    const index = data.findIndex(item => item.id == id)
    if (index === -1) {
        res.status(200).json({
            "msg": "No todo with given id found"
        })
    }
    data = data.filter(item => item.id != id)
    await writeData(data)
    res.status(200).json({
        "msg": "Todo Deleted Successfully"
    })
})

app.use((req, res, next) => {
    res.status(404).send();
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})