let enterSubmit = () => {

    let dream = document.querySelector("#dream")
    dream.addEventListener("keyup", (event) => {
        if (event.keyCode === 13)
        {
            let x = document.querySelector("#dreamForm")
            x.submit()
            return false
        }
        })
}
// this is ugly there will be a better form of do this
let submitTimer = () => {

    let timer = document.querySelector(".timer")
    timer.addEventListener("keyup", (event) => {
        if (event.keyCode === 13)
        {
            let x = document.querySelector("#timerForm")
            x.submit()
            return false
        }
    })
}

let fetchGif = async (feeling) =>{
    api_url = `https://api.giphy.com/v1/gifs/random?api_key=QCRziCMRKghancsR25ewIK9XXXy5obzR&tag=${feeling}`
    let res = await fetch(api_url)
    res = await res.json()
    return res.data.images.downsized_medium.url
}
let dreamFortune = async (e) => {
    e.preventDefault()
    // see if is already a dream and delete it
    if(document.querySelector(".futureFortune"))
    {
        let parent = document.querySelector("#dreamTeller")
        parent.removeChild(document.querySelector(".futureFortune"))
    }

    let dreamTeller = document.querySelector("#dreamTeller")
    let fortune = Math.random()
    dreamTeller.append(await Fortune(fortune))
}

let Fortune = async (number) => {
    // get the persons dream
    let dream = document.querySelector("#dream").value
    dream = dream.charAt(0).toUpperCase() + dream.slice(1);
    // create fortune container
    let futureFortune = document.createElement("div")
    futureFortune.classList = "futureFortune"

    // create inside elments
    let futureFortuneMessage
    let futureFortuneImage

    // make a good or bad fortune message
    if(number > 0.55)
    {
    futureFortuneMessage = document.createElement("h3")
    futureFortuneMessage.appendChild(document.createTextNode(`Your dream of ${dream} seems very likely`))
    futureFortuneImage = document.createElement("img")
    futureFortuneImage.src = await fetchGif('happy')
    }
    else
    {
        futureFortuneMessage = document.createElement("h3")
        futureFortuneMessage.appendChild(document.createTextNode(`Your dream of ${dream} doesn't seem very likely`))
        futureFortuneImage = document.createElement("img")
        futureFortuneImage.src = await fetchGif('sad')
    }
    futureFortune.appendChild(futureFortuneMessage)
    futureFortune.appendChild(futureFortuneImage)
    return futureFortune
}

let timerON = (e) => {
    e.preventDefault()
    let timer = document.querySelector(".timer")
    let timervalues = [parseInt(timer.value.charAt(0)),parseInt(timer.value.charAt(1)),parseInt(timer.value.charAt(3)),parseInt(timer.value.charAt(4))]
    let timerInterval = setInterval(() => {

        // minutes checker second column
        if(timervalues[1] == 0 && timervalues[0] != 0 && timervalues[2] == 0 && timervalues[3] == 0)
        {
            timervalues[0] -= 1
            timervalues[1] = 10
        }

        //minutes checker first column
        if(timervalues[2] == 0 && timervalues[3] == 0)
        {
            timervalues[1] -= 1
            timervalues[2] = 5
            timervalues[3] = 10
        }

        // seconds checker
        if(timervalues[3] == 0 && timervalues[2] != 0)
        {
            timervalues[2] -= 1
            timervalues[3] = 10
        }

        if(timervalues[1] < 0)
        {
            document.querySelector("#pomosound").play();
            timer.value = "Finish!"
            clearInterval(timerInterval);
            return
        }


        timervalues[3] -= 1
        let newtime = `${timervalues[0]}${timervalues[1]}:${timervalues[2]}${timervalues[3]}`
        timer.value = newtime
    }, 1000)
}

let timerChecker = (e) => {
    let time = e.target.value
    if((!time.includes(":")) && time.length > 1)
    {
        e.target.value = time + ":"
    }

    // seconds checker
    if(time.length > 3 && parseInt(time.slice(-2)) > 59)
    {
        e.target.value = time.slice(0,time.indexOf(":")) + ":" + 59
        alert("The seconds cannot excced 59")
    }

    // minutes checker
    if(time.length = 5 && parseInt(time.slice(0,time.indexOf(":"))) > 60)
    {
        e.target.value = 60 + ":" + "00"
        alert("The minutes cannot excced 60")
    }

    // hour overflow
    if(time.length = 5 && parseInt(time.slice(0,time.indexOf(":"))) == 60 && parseInt(time.slice(-2)) > 0)
    {
        e.target.value = 60 + ":" + "00"
        alert("The minutes cannot excced 60")
    }

}