const x = [110, 174, 238, 302, 366, 430, 494, 558, 622, 686]
const y = [10, 74, 138, 202, 266, 330, 394, 458, 522, 586]

const rotateFive = Math.floor(Math.random() * 2)
const rotateFour = Math.floor(Math.random() * 2)
const rotateThree = Math.floor(Math.random() * 2)
const rotateTwo = Math.floor(Math.random() * 2)

let tableRows = document.querySelectorAll('tr')
let tableCells = document.querySelectorAll('td')
let notifier = document.querySelector('.notifier')
let tries = document.querySelector('.tries')

let five = document.querySelector(rotateFive ? '.five-rotated' : '.five')
let four = document.querySelector(rotateFour ? '.four-rotated' : '.four')
let three = document.querySelector(rotateThree ? '.three-rotated' : '.three')
let two = document.querySelector(rotateTwo ? '.two-rotated' : '.two')
let tShaped = document.querySelector('.t-shaped')
let zShaped = document.querySelector('.z-shaped')

five.style.display = 'block'
four.style.display = 'block'
three.style.display = 'block'
two.style.display = 'block'
tShaped.style.display = 'block'
zShaped.style.display = 'block'

const pxToInt = px => parseInt(px.substring(0, px.length - 2))
const getPossibleFiveX = () => rotateFive ? x[Math.floor(Math.random() * 6)] : x[Math.floor(Math.random() * 10)]
const getPossibleFiveY = () => rotateFive ? y[Math.floor(Math.random() * 10)] : y[Math.floor(Math.random() * 6)]
const getPossibleFourX = () => rotateFour ? x[Math.floor(Math.random() * 7)] : x[Math.floor(Math.random() * 10)]
const getPossibleFourY = () => rotateFour ? y[Math.floor(Math.random() * 10)] : y[Math.floor(Math.random() * 7)]
const getPossibleThreeX = () => rotateThree ? x[Math.floor(Math.random() * 8)] : x[Math.floor(Math.random() * 10)]
const getPossibleThreeY = () => rotateThree ? y[Math.floor(Math.random() * 10)] : y[Math.floor(Math.random() * 8)]
const getPossibleTwoX = () => rotateTwo ? x[Math.floor(Math.random() * 9)] : x[Math.floor(Math.random() * 10)]
const getPossibleTwoY = () => rotateTwo ? y[Math.floor(Math.random() * 10)] : y[Math.floor(Math.random() * 9)]
const getPossibleTShapedX = () => x[Math.floor(Math.random() * 9)]
const getPossibleTShapedY = () => y[Math.floor(Math.random() * 8)]
const getPossibleZShapedX = () => x[Math.floor(Math.random() * 9)]
const getPossibleZShapedY = () => y[Math.floor(Math.random() * 7)]

function shipsOverlap(ship1, ship2) {
    const shipRect1 = ship1.getBoundingClientRect();
    const shipRect2 = ship2.getBoundingClientRect();
  
    return !(
      shipRect1.top > shipRect2.bottom ||
      shipRect1.right < shipRect2.left ||
      shipRect1.bottom < shipRect2.top ||
      shipRect1.left > shipRect2.right
    );
}


function getCellCoordinates(initX, initY, spanX, spanY) {
    let cellCoordinates = []
    for (let i = 0; i < spanY.length; i++) {
        for (let j = 0; j < spanX.length; j++) {
            cellCoordinates.push({
                x: pxToInt(initX) + (64 * j),
                y: pxToInt(initY) + (64 * i),
            })
        }
    }
    return cellCoordinates
}

five.spanY = rotateFive ? [1] : [1, 2, 3, 4, 5]
five.spanX = rotateFive ? [1, 2, 3, 4, 5] : [1]  
five.squares = 5

four.spanY = rotateFour ? [1] : [1, 2, 3, 4]
four.spanX = rotateFour ? [1, 2, 3, 4] : [1]
four.squares = 4

three.spanY = rotateThree ? [1] : [1, 2, 3]
three.spanX = rotateThree ? [1, 2, 3] : [1]
three.squares = 3

two.spanY = rotateTwo ? [1] : [1, 2]
two.spanX = rotateTwo ? [1, 2] : [1]
two.squares = 2

zShaped.spanY = [1, 2, 3, 4]
zShaped.spanX = [1, 2]
zShaped.squares = 6

tShaped.spanY = [1, 2, 3]
tShaped.spanX = [1, 2]
tShaped.squares = 4

function arrangeZShaped() {
    zShaped.style.left = `${getPossibleZShapedX()}px`
    zShaped.style.top = `${getPossibleZShapedY()}px`
}

arrangeZShaped()

function arrangeTShaped() {
    tShaped.style.left = `${getPossibleTShapedX()}px`
    tShaped.style.top = `${getPossibleTShapedY()}px`
    if(shipsOverlap(zShaped, tShaped)) {
        for(let i = 0; i < 72; i++) {
            if(shipsOverlap(zShaped, tShaped)) {
                tShaped.style.left = `${getPossibleTShapedX()}px`
                tShaped.style.top = `${getPossibleTShapedY()}px`
            } 
        }
    } 
}

arrangeTShaped()

function arrangeFive() {
    five.style.left = `${getPossibleFiveX()}px`
    five.style.top = `${getPossibleFiveY()}px`
    let isColliding = shipsOverlap(zShaped, five) || shipsOverlap(tShaped, five)
    if(isColliding) {
        for(let i = 0; i < 80; i++) {
            let isColliding = shipsOverlap(zShaped, five) || shipsOverlap(tShaped, five)
            if(isColliding) {
                five.style.left = `${getPossibleFiveX()}px`
                five.style.top = `${getPossibleFiveY()}px`
            }
        }
    }
}

arrangeFive()

function arrangeFour() {
    four.style.left = `${getPossibleFourX()}px`
    four.style.top = `${getPossibleFourY()}px`
    let part1Colliding = shipsOverlap(zShaped, four) || shipsOverlap(tShaped, four)
    if(part1Colliding || shipsOverlap(five, four)) {
        for(let i = 0; i < 90; i++) {
            let part1Colliding = shipsOverlap(zShaped, four) || shipsOverlap(tShaped, four)
            if(part1Colliding || shipsOverlap(five, four)) {
                four.style.left = `${getPossibleFourX()}px`
                four.style.top = `${getPossibleFourY()}px`
            }
        }
    }
}

arrangeFour()

function arrangeThree() {
    three.style.left = `${getPossibleThreeX()}px`
    three.style.top = `${getPossibleThreeY()}px`
    let part1Colliding = shipsOverlap(zShaped, three) || shipsOverlap(tShaped, three)
    let part2Colliding = shipsOverlap(five, three) || shipsOverlap(four, three)
    if(part1Colliding || part2Colliding) {
        for(let i = 0; i < 72; i++) {
            let part1Colliding = shipsOverlap(zShaped, three) || shipsOverlap(tShaped, three)
            let part2Colliding = shipsOverlap(five, three) || shipsOverlap(four, three)
            if(part1Colliding || part2Colliding) {
                three.style.left = `${getPossibleThreeX()}px`
                three.style.top = `${getPossibleThreeY()}px`
            } 
        }
    } 
}

arrangeThree()


function arrangeTwo() {
    two.style.left = `${getPossibleTwoX()}px`
    two.style.top = `${getPossibleTwoY()}px`
    // console.log(two.style.left, two.style.top)
    let part1Colliding = shipsOverlap(zShaped, two) || shipsOverlap(tShaped, two)
    let part2Colliding = shipsOverlap(five, two) || shipsOverlap(four, two)
    let count = 0
    if(part1Colliding || part2Colliding || shipsOverlap(three, two)) {
        for(let i = 0; i < 80; i++) {
            let part1Colliding = shipsOverlap(zShaped, two) || shipsOverlap(tShaped, two)
            let part2Colliding = shipsOverlap(five, two) || shipsOverlap(four, two)
            if(part1Colliding || part2Colliding || shipsOverlap(three, two)) {
                count += 1
                // console.log('collided');
                two.style.left = `${getPossibleTwoX()}px`
                two.style.top = `${getPossibleTwoY()}px`
                // console.log(two.style.left, two.style.top, count)
            } 
        }
    } 
}

arrangeTwo()



function getFiveCellAreas() {
    let fiveCellAreas = []
    for(let i = 0; i < getCellCoordinates(five.style.left, five.style.top, five.spanX, five.spanY).length; i++) {
        let cellCoordinate = getCellCoordinates(five.style.left, five.style.top, five.spanX, five.spanY)[i]
        for(let j = 0; j < tableCells.length; j++) {
            let tableCellX = tableCells[j].getBoundingClientRect().x
            let tableCellY = tableCells[j].getBoundingClientRect().y
            if((tableCellX === cellCoordinate.x) && (tableCellY === cellCoordinate.y)) {
                tableCells[j].contains = "five"
                fiveCellAreas.push(tableCells[j])
            }
        }
    }
    return fiveCellAreas
}


function getFourCellAreas() {
    let fourCellAreas = []
    for(let i = 0; i < getCellCoordinates(four.style.left, four.style.top, four.spanX, four.spanY).length; i++) {
        let cellCoordinate = getCellCoordinates(four.style.left, four.style.top, four.spanX, four.spanY)[i]
        for(let j = 0; j < tableCells.length; j++) {
            let tableCellX = tableCells[j].getBoundingClientRect().x
            let tableCellY = tableCells[j].getBoundingClientRect().y
            if((tableCellX === cellCoordinate.x) && (tableCellY === cellCoordinate.y)) {
                tableCells[j].contains = "four"
                fourCellAreas.push(tableCells[j])
            }
        }
    }
    return fourCellAreas
}


function getThreeCellAreas() {
    let threeCellAreas = []
    for(let i = 0; i < getCellCoordinates(three.style.left, three.style.top, three.spanX, three.spanY).length; i++) {
        let cellCoordinate = getCellCoordinates(three.style.left, three.style.top, three.spanX, three.spanY)[i]
        for(let j = 0; j < tableCells.length; j++) {
            let tableCellX = tableCells[j].getBoundingClientRect().x
            let tableCellY = tableCells[j].getBoundingClientRect().y
            if((tableCellX === cellCoordinate.x) && (tableCellY === cellCoordinate.y)) {
                tableCells[j].contains = "three"
                threeCellAreas.push(tableCells[j])
            } 
        }
    }
    return threeCellAreas
}



function getTwoCellAreas() {
    let twoCellAreas = []
    for(let i = 0; i < getCellCoordinates(two.style.left, two.style.top, two.spanX, two.spanY).length; i++) {
        let cellCoordinate = getCellCoordinates(two.style.left, two.style.top, two.spanX, two.spanY)[i]
        for(let j = 0; j < tableCells.length; j++) {
            let tableCellX = tableCells[j].getBoundingClientRect().x
            let tableCellY = tableCells[j].getBoundingClientRect().y
            if((tableCellX === cellCoordinate.x) && (tableCellY === cellCoordinate.y)) {
                tableCells[j].contains = "two"
                twoCellAreas.push(tableCells[j])
            }
        }
    }
    return twoCellAreas
}



function getZshapedCellAreas() {
    let zShapedCellAreas = []
    let cellCoordinates = getCellCoordinates(zShaped.style.left, zShaped.style.top, zShaped.spanX, zShaped.spanY)
    cellCoordinates.splice(1, 1)
    cellCoordinates.splice(5, 1)
    for(let i = 0; i < cellCoordinates.length; i++) {
        let cellCoordinate = cellCoordinates[i]
        for(let j = 0; j < tableCells.length; j++) {
            let tableCellX = tableCells[j].getBoundingClientRect().x
            let tableCellY = tableCells[j].getBoundingClientRect().y
            if((tableCellX === cellCoordinate.x) && (tableCellY === cellCoordinate.y)) {
                tableCells[j].contains = "zShaped"
                zShapedCellAreas.push(tableCells[j])
            }
        }
    }
    return zShapedCellAreas
}


function getTshapedCellAreas() {
    let tShapedCellAreas = []
    let cellCoordinates = getCellCoordinates(tShaped.style.left, tShaped.style.top, tShaped.spanX, tShaped.spanY)
    cellCoordinates.splice(1, 1)
    cellCoordinates.splice(4, 1)
    for(let i = 0; i < cellCoordinates.length; i++) {
        let cellCoordinate = cellCoordinates[i]
        for(let j = 0; j < tableCells.length; j++) {
            let tableCellX = tableCells[j].getBoundingClientRect().x
            let tableCellY = tableCells[j].getBoundingClientRect().y
            if((tableCellX === cellCoordinate.x) && (tableCellY === cellCoordinate.y)) {
                tableCells[j].contains = "tShaped"
                tShapedCellAreas.push(tableCells[j])
            }
        }
    }

    return tShapedCellAreas
}


five.style.display = 'none'
four.style.display = 'none'
three.style.display = 'none'
two.style.display = 'none'
tShaped.style.display = 'none'
zShaped.style.display = 'none'

let misses = 0
tableCells.forEach(cell => cell.addEventListener('click', () => {
    if(cell.contains.length > 2) {
        cell.textContent = "X"
        cell.style.backgroundColor = 'rgb(0, 255, 0)'
        cell.style.color = "white "
        notifier.style.display = 'grid'
        notifier.style.backgroundColor = "rgba(12, 190, 66, 0.753)"
        notifier.textContent = "HIT!"

        switch (cell.contains) {
            case "five":
                five.squares -= 1
                break;
            case "four":
                four.squares -= 1
                break;
            case "three":
                three.squares -= 1
                break;
            case "two":
                two.squares -= 1
                break;
            case "tShaped":
                tShaped.squares -= 1
                break;
            case "zShaped":
                zShaped.squares -= 1
                break;
        
            default:
                break;
        }
        console.log("1: ", five.squares);
        console.log("2: ", four.squares);
        console.log("3: ", three.squares);
        console.log("4: ", two.squares);
        console.log("5: ", tShaped.squares);
        console.log("6: ", zShaped.squares);
        if(five.squares === 0) {
            five.style.display = 'block'
            getFiveCellAreas().forEach(cell => {
                cell.style.background = "rgba(3, 128, 167, 0.575)"
                cell.textContent = ""
            })
        }
        if(four.squares === 0) {
            four.style.display = 'block'
            getFourCellAreas().forEach(cell => {
                cell.style.background = "rgba(3, 128, 167, 0.575)"
                cell.textContent = ""
            })
        }
        if(three.squares === 0) {
            three.style.display = 'block'
            getThreeCellAreas().forEach(cell => {
                cell.style.background = "rgba(3, 128, 167, 0.575)"
                cell.textContent = ""
            })
        }
        if(two.squares === 0) {
            two.style.display = 'block'
            getTwoCellAreas().forEach(cell => {
                cell.style.background = "rgba(3, 128, 167, 0.575)"
                cell.textContent = ""
            })
        }
        if(zShaped.squares === 0) {
            zShaped.style.display = 'block'
            getZshapedCellAreas().forEach(cell => {
                cell.style.background = "rgba(3, 128, 167, 0.575)"
                cell.textContent = ""
            })
        }
        if(tShaped.squares === 0) {
            tShaped.style.display = 'block'
            getTshapedCellAreas().forEach(cell => {
                cell.style.background = "rgba(3, 128, 167, 0.575)"
                cell.textContent = ""
            })
        }

        let hasWon = !five.squares && !four.squares && !three.squares && !two.squares && !tShaped.squares && !zShaped.squares
        if(hasWon) {
            notifier.textContent = "YOU WIN!"
        }

    } else {
        misses += 1
        cell.textContent = "o"
        cell.style.backgroundColor = 'red'
        cell.style.color = "black "
        notifier.style.display = 'grid'
        notifier.textContent = "MISS!"
        notifier.style.backgroundColor = "rgba(219, 30, 30, 0.753)"
        tries.style.display = "grid"
        tries.textContent = `${misses} ${misses < 2 ? 'Miss' : 'Misses'}`
    }

}))

console.log(getFiveCellAreas())
console.log(getFourCellAreas())
console.log(getThreeCellAreas())
console.log(getTwoCellAreas())
console.log(getZshapedCellAreas())
console.log(getTshapedCellAreas())
