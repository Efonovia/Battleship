const x = [110, 174, 238, 302, 366, 430, 494, 558, 622, 686]
const y = [10, 74, 138, 202, 266, 330, 394, 458, 522, 586]
const pxToInt = px => parseInt(px.substring(0, px.length - 2))
const getPossibleFiveX = () => x[Math.floor(Math.random() * 10)]
const getPossibleFiveY = () => y[Math.floor(Math.random() * 6)]
const getPossibleFourX = () => x[Math.floor(Math.random() * 10)]
const getPossibleFourY = () => y[Math.floor(Math.random() * 7)]
const getPossibleThreeX = () => x[Math.floor(Math.random() * 10)]
const getPossibleThreeY = () => y[Math.floor(Math.random() * 8)]
const getPossibleTwoX = () => x[Math.floor(Math.random() * 10)]
const getPossibleTwoY = () => y[Math.floor(Math.random() * 9)]
const getPossibleTShapedX = () => x[Math.floor(Math.random() * 9)]
const getPossibleTShapedY = () => y[Math.floor(Math.random() * 8)]
const getPossibleZShapedX = () => x[Math.floor(Math.random() * 9)]
const getPossibleZShapedY = () => y[Math.floor(Math.random() * 7)]

let tableRows = document.querySelectorAll('tr')
let tableCells = document.querySelectorAll('td')
let five = document.querySelector('.five')
let four = document.querySelector('.four')
let three = document.querySelector('.three')
let two = document.querySelector('.two')
let tShaped = document.querySelector('.t-shaped')
let zShaped = document.querySelector('.z-shaped')

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

five.spanY = [1, 2, 3, 4, 5]
five.spanX = [1]

four.spanY = [1, 2, 3, 4]
four.spanX = [1]

three.spanY = [1, 2, 3]
three.spanX = [1]

two.spanY = [1, 2]
two.spanX = [1]

zShaped.spanY = [1, 2, 3, 4]
zShaped.spanX = [1, 2]

tShaped.spanY = [1, 2, 3]
tShaped.spanX = [1, 2]

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
                fiveCellAreas.push(tableCells[j])
            }
        }
    }
    return fiveCellAreas
}

console.log(getFiveCellAreas())

function getFourCellAreas() {
    let fourCellAreas = []
    for(let i = 0; i < getCellCoordinates(four.style.left, four.style.top, four.spanX, four.spanY).length; i++) {
        let cellCoordinate = getCellCoordinates(four.style.left, four.style.top, four.spanX, four.spanY)[i]
        for(let j = 0; j < tableCells.length; j++) {
            let tableCellX = tableCells[j].getBoundingClientRect().x
            let tableCellY = tableCells[j].getBoundingClientRect().y
            if((tableCellX === cellCoordinate.x) && (tableCellY === cellCoordinate.y)) {
                fourCellAreas.push(tableCells[j])
            }
        }
    }
    return fourCellAreas
}

console.log(getFourCellAreas())

function getThreeCellAreas() {
    let threeCellAreas = []
    for(let i = 0; i < getCellCoordinates(three.style.left, three.style.top, three.spanX, three.spanY).length; i++) {
        let cellCoordinate = getCellCoordinates(three.style.left, three.style.top, three.spanX, three.spanY)[i]
        for(let j = 0; j < tableCells.length; j++) {
            let tableCellX = tableCells[j].getBoundingClientRect().x
            let tableCellY = tableCells[j].getBoundingClientRect().y
            if((tableCellX === cellCoordinate.x) && (tableCellY === cellCoordinate.y)) {
                threeCellAreas.push(tableCells[j])
            }
        }
    }
    return threeCellAreas
}

console.log(getThreeCellAreas())


function getTwoCellAreas() {
    let twoCellAreas = []
    for(let i = 0; i < getCellCoordinates(two.style.left, two.style.top, two.spanX, two.spanY).length; i++) {
        let cellCoordinate = getCellCoordinates(two.style.left, two.style.top, two.spanX, two.spanY)[i]
        for(let j = 0; j < tableCells.length; j++) {
            let tableCellX = tableCells[j].getBoundingClientRect().x
            let tableCellY = tableCells[j].getBoundingClientRect().y
            if((tableCellX === cellCoordinate.x) && (tableCellY === cellCoordinate.y)) {
                twoCellAreas.push(tableCells[j])
            }
        }
    }
    return twoCellAreas
}

console.log(getTwoCellAreas())


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
                zShapedCellAreas.push(tableCells[j])
            }
        }
    }

    return zShapedCellAreas
}

console.log(getZshapedCellAreas())


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
                tShapedCellAreas.push(tableCells[j])
            }
        }
    }

    return tShapedCellAreas
}

console.log(getTshapedCellAreas())

