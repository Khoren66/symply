class Gladioator {
    constructor(name, health, power, speed) {
        this.name = name,
            this.health = health,
            this.power = power,
            this.speed = speed
    }
}
let gladioators = []

function start(n) {
    gladioators = []
    document.getElementById("life").style.display = "inline"
    document.getElementById("kill").style.display = "inline"
    let stepP = 0.1;
    let stepH = 1;
    let stepS = 0.001;
    for (let i = 0; i < n; i++) {
        let randomPower = Math.floor(Math.random() * (4 - 2 + 1) + 2) + stepP;
        let randomSpeed = Math.floor(Math.random() * 5 - 1 + 1 + 1) + stepS
        let randomHealth = (Math.floor(Math.random() * (100 - 80 + 1)) + 80) + stepH
        gladioators.push(new Gladioator(`${faker.name.findName()}`, randomHealth, randomPower, randomSpeed))
        stepP += 0.1
        stepS += 0.001
        stepH += 1
    }
    fight()
}

function fight() {
    document.getElementById("action_background").src = "/images/fight.gif"


    let interval = setInterval(() => {
        for (let j = 0; j < gladioators.length; j++) {
            let target = Math.floor(Math.random() * gladioators.length)
            while (j == target) {
                target = Math.floor(Math.random() * gladioators.length)
            }

            if (j !== target) {
                let initSpeed = null
                let initHealth = null
                if(!initSpeed && !initHealth){
                    initSpeed = gladioators[target].speed
                    initHealt = gladioators[target].health
                }
                //for speed
                if(gladioators[j].health<30 || gladioators[j].health >0){
                    gladioators[j].speed *= 3
                }
                let ms = 5000/gladioators[j].speed 
                //for damage
                gladioators[target].health = (gladioators[target].health - gladioators[j].power).toFixed()
                gladioators[target].speed = initSpeed * gladioators[target].health / initHealth

                let p = document.createElement("p")
                p.innerHTML = `${gladioators[j].name} x ${gladioators[j].health} hits ${gladioators[target].name} x ${gladioators[target].health} with power ${gladioators[j].power}`
                document.getElementById("battle_field").appendChild(p)

                if (gladioators[target].health <= 0) {
                    document.getElementById("action_background").src = "/images/Life.gif"
                    clearInterval(interval)
                    break
                }
                
            }
           // console.log(`${gladioators[j].name} x ${gladioators[j].health} hits ${gladioators[target].name} x ${gladioators[target].health} with power ${gladioators[j].power}`)
        }
    }, 500)
}

function life() {
    let wounded = gladioators.find(g => g.health <= 0)
    let newLife = Math.abs(wounded.health) + 50
    wounded.health = newLife
    fight()
}
function kill() {
    document.getElementById("action_background").src = "/images/kill.gif"
    setTimeout(() => {
        let wounded = gladioators.find(g => g.health <= 0)
        let indexOfWound = gladioators.indexOf(wounded)

        let p = document.createElement("p")
        p.innerHTML = `${gladioators[indexOfWound].name} is dying `
        document.getElementById("battle_field").appendChild(p)
        gladioators.splice(indexOfWound, 1)
        if (gladioators.length > 1) {
            fight()
        } else {
            document.getElementById("action_background").src = "/images/winner.gif"
            document.getElementById("life").style.display = "none"
            document.getElementById("kill").style.display = "none"
            let p = document.createElement("p")
            p.innerHTML = `${gladioators[0].name} won the battle with health x${gladioators[0].health}`
            document.getElementById("battle_field").appendChild(p)
        }
    }, 1000)
}
