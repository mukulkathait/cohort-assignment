function displayTimer(){
    console.clear()
    let timer = new Date();
    console.log(`${timer.getHours()}:${timer.getMinutes()}:${timer.getSeconds()}`)
    setTimeout(displayTimer, 1000)
}

displayTimer()
