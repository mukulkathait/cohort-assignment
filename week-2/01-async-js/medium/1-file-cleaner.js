const fs = require("fs")

function readFileData() {
    const p = new Promise((resolve) => {
        fs.readFile("medium/sample.txt", "utf-8", (_err, data) => {
            if (_err) throw _err
            resolve(data)
        })
    })
    return p;
}

function editFileData(data) {
    const editedData = data.replace(/\s+/g, ' ')
    const p = new Promise((resolve) => {
        fs.writeFile("medium/sample.txt", editedData, 'utf-8', async (err) => {
            if (err) throw err
            resolve(await readFileData())
        })
    })
    return p
}

async function main() {
    const data = await readFileData()
    const updatedData = await editFileData(data)
    console.log(updatedData)
    console.log("Hello world")
}

main()