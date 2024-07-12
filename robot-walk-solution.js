const instructions1 = [1, 2, 4];
const instructions2 = [1, 2, 4, 1, 5];

function calculateFinalCoordinates(instructions) {
    // 0 for N, 1 for E, 2 for S, 3 for W
    let directionIndex = 0
    let currentCoordinates = [0, 0]

    // Storing visited coordinates in a x-coordinate-keyed Map to keep complexity low(er). Also - it's a Map! It must be the right thing to track movement.
    const visitedCoordinates = new Map([
        [0, [0]]
    ])

    for (instruction of instructions) {
        // vertical moves
        if ([0,2].includes(directionIndex)) {
            const xCoordinate = currentCoordinates[0]
            const setOfYPairingsOfAVisitedXCoordinate = visitedCoordinates.get(xCoordinate)
                // make set amount of steps in a desired directon
                for (i = 1; i <= instruction; ++i) {
                    if(directionIndex === 0) {
                        currentCoordinates[1] += 1
                    } else currentCoordinates[1] -= 1
                    // after each step determine coordinates and check if has visited (terminate process) or not (add coordinates to the Map)
                    const yCoordinate = currentCoordinates[1]
                    if(setOfYPairingsOfAVisitedXCoordinate) {
                        if(setOfYPairingsOfAVisitedXCoordinate.includes(yCoordinate)) {
                            return currentCoordinates
                        } else {
                            visitedCoordinates.set(xCoordinate, [...setOfYPairingsOfAVisitedXCoordinate, yCoordinate])
                        }
                    } else {
                        visitedCoordinates.set(xCoordinate, [yCoordinate]) 
                    }
                }
                // change direction 
                ++directionIndex
        // horizontal moves
        } else {
            const yCoordinate = currentCoordinates[1]
            for (i = 1; i <= instruction; ++i) {
                if(directionIndex === 1) {
                    currentCoordinates[0] += 1
                } else {
                    currentCoordinates[0] -= 1
                }
                const xCoordinate = currentCoordinates[0]
                const setOfYPairingsOfAVisitedXCoordinate = visitedCoordinates.get(xCoordinate)
                if(setOfYPairingsOfAVisitedXCoordinate) {
                    if(setOfYPairingsOfAVisitedXCoordinate.includes(yCoordinate)) {
                        return currentCoordinates
                    } else {
                        visitedCoordinates.set(xCoordinate, [...setOfYPairingsOfAVisitedXCoordinate, yCoordinate])
                    }
                } else {
                    visitedCoordinates.set(xCoordinate, [yCoordinate])
                }
            }
            // if last direction was W, reset to N (index 0)
            directionIndex = (directionIndex === 3) ? 0 : 2
        }
    }

    return currentCoordinates
}

console.log(calculateFinalCoordinates(instructions1))
console.log(calculateFinalCoordinates(instructions2))

