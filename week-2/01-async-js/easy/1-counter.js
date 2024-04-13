setInterval(()=>{
    console.clear()
    let timer = new Date();
    console.log(`${timer.getHours()}:${timer.getMinutes()}:${timer.getSeconds()}`)
}, 1000)