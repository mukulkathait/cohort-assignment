const fs = require("fs")

function readingData() {
    const p = new Promise((resolve) => {
        fs.readFile("easy/sample.txt", "utf-8", (err, data) => {
            resolve(data)
        })
    })
    return p;
}

function appendData() {
    fs.appendFile("easy/sample.txt", "\nI love node.js", (err) => {
        if (err) throw err
        readingData()
    })
}

function onDone(data) {
    console.log(data)
}

async function main() {
    const value = await readingData()
    console.log(value)
    console.log("\nHello\n")
}

main()
