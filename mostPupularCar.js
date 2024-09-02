import {cars} from './carmanagement.js'
export const mostPopularCar = (carList) => {
    const makeCount = {};
    let mostPopularMake = "";
    let maxCount = 0;
  
    for (const car of carList) {
      if (makeCount[car.make]) {
        makeCount[car.make]++;
      } else {
        makeCount[car.make] = 1;
      }
  
      if (makeCount[car.make] > maxCount) {
        maxCount = makeCount[car.make];
        mostPopularMake = car.make;
      }
    }
  
    return mostPopularMake;
  }

  console.log(mostPopularCar(cars));