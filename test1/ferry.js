function numStopDoesTheFerryMake(personsWeightArray, targetIslandArray, numberOfIslandInArea, maxPeopleCanHandle, maxWeightCanHandle) {
    let boardingObj = {
        personsWeight: personsWeightArray.splice(0, maxPeopleCanHandle),
        targetIsLands: targetIslandArray.splice(0, maxPeopleCanHandle)
    };

    if(maxPeopleCanHandle === 0) {
        throw 'people can not be board to ferry as it\'s capacity is zero'
    }

    let noOfStopCount = 0;

    while(boardingObj.personsWeight.length)  {
        if(boardingObj.personsWeight[0] > maxWeightCanHandle) {
            throw 'person is so fat that ferry can not handle him';
        }
        
        let totalWeight = 0;
        let lastBoardingIndex;
        for(lastBoardingIndex=0; lastBoardingIndex < boardingObj.personsWeight.length; lastBoardingIndex++) {
            totalWeight += boardingObj.personsWeight[lastBoardingIndex];
            if(totalWeight > maxWeightCanHandle) {
                totalWeight -= boardingObj.personsWeight[lastBoardingIndex];
                lastBoardingIndex;
                break;
            }
        }
        
        boardingObj.personsWeight.splice(0, lastBoardingIndex);
        noOfStopCount += new Set(boardingObj.targetIsLands
            .splice(0, lastBoardingIndex))
            .size + 1;
        
        const noOfPeopleToBoardNext = 2*maxPeopleCanHandle- (lastBoardingIndex);
        [].push.apply(boardingObj.personsWeight, personsWeightArray.splice(0, noOfPeopleToBoardNext));
        [].push.apply(boardingObj.targetIsLands, targetIslandArray.splice(0, noOfPeopleToBoardNext));
    }
    return noOfStopCount;
}

module.exports.NumStopDoesTheFerryMake = numStopDoesTheFerryMake;

// for test locally uncomment the below code
// let result = numStopDoesTheFerryMake([60, 80, 40, 80], [2, 3, 5, 4], 5, 2, 200);
// console.log(result);