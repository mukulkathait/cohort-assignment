function displayClock() {
    console.clear()
    const timer = new Date()
    console.log(`${timer.getHours()}:${timer.getMinutes()}:${timer.getSeconds()}`)

}

function displayClock2() {
    const timer = new Date()

    let hours = timer.getHours() % 12 || 12;
    const ampm = (hours < 12) ? "AM" : "PM"

    console.log(`${hours}:${timer.getMinutes()}:${timer.getSeconds()} ${ampm}`)
}

function clock() {
    displayClock()
    displayClock2()
}

setInterval(clock, 1000)