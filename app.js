// let continent = [];

// const arr = [...pandemicStartMap];

// arr.forEach((l) => {
//   if (l === "X") {
//     continent.push(l);
//   }
// });

// https://stackoverflow.com/questions/6259515/how-can-i-split-a-string-into-segments-of-n-characters
// https://stackoverflow.com/questions/21997437/javascript-split-string-by-multiple-occurrences-of-letters

// 'XX0X10010X000X010X0'.match(/X+\d+/g)

// const arr = pandemicStartMap.match(/(X+\d+)/g);

// arr.forEach((elem) => {
//   if (elem.includes(1)) console.log(`Infected: ${arr.indexOf(elem)}`);
// });

// '100'.replaceAll('0', '1');

// const arr = [...pandemicStartMap];

// const result = arr.map((elem) => {
//   if (elem.includes("1")) {
//     console.log(elem);
//   }
//   return;
// });

// console.log(result);

// const result = "XX0X10010X000X010X0".match(/(X+\d+)/g).map((elem) => {
//   if (elem.includes("1")) return elem.replaceAll("0", "1");
//   return elem;
// });

// console.log(result);

// "adasdas12312412".match(/[^a-zA-Z]/g).join("");

// const people = result
//   .join("")
//   .match(/[^a-zA-Z]/g)
//   .join("");

// console.log([...people]);

// const calculated = [...people].reduce((obj, item) => {
//   if (!obj[item]) obj[item] = 0;
//   obj[item]++;
//   return obj;
// }, {});

// const total = [...people]
//   .map((elem) => {
//     return elem.replace("0", "1");
//   })
//   .map((elem) => +elem)
//   .reduce((a, b) => a + b);

// console.log(calculated);

// const { 0: healthy, 1: infected } = calculated;

// console.log(healthy, infected);

// 0 - uninfected
// 1 - infected
// Х - ocean

// function excludeOcean(pandemicMap) {
//   return pandemicMap.match(/[^a-zA-Z]/g);
// }

// function divideContinents(pandemicMap) {
//   return map.match(/(X+\d+)/g);
// }

// function getTotal(pandemicMap) {
//   return pandemicMap.match(/[^a-zA-Z]/g).length;
// }

const pandemicStartMap = "XX0X10010X000X010X0";

const pandemicStart = document.querySelector(".start__map");
const pandemicEnd = document.querySelector(".end__map");

const statsTotal = document.querySelector(".stats__total");
const statsInfected = document.querySelector(".stats__infected");
const statsPercentage = document.querySelector(".stats__percentage");

// Map before infection;
function createMap(elements, map) {
  const array = [...elements];
  return array.map((element) => {
    const mapElement = createMapElement(element);
    map.appendChild(mapElement);
  });
}

function createMapElement(element) {
  const mapElement = document.createElement("div");
  mapElement.classList.add(
    "map__element",
    `map__element--${getMapElementName(element)}`
  );
  return mapElement;
}

function getMapElementName(element) {
  switch (element) {
    case "X":
      return "ocean";
      break;
    case "0":
      return "uninfected";
      break;
    case "1":
      return "infected";
      break;
    default:
      return;
  }
}

// Map after infection;
function getInfected(pandemicMap) {
  return pandemicMap
    .match(/X+\d+/g)
    .map((element) => {
      if (element.includes("1")) return element.replaceAll("0", "1");
      return element;
    })
    .join("");
}

// The total number of infected areas on the map (excluding the ocean);

function getTotalInfected(infectedMap) {
  const infected = infectedMap.match(/[^a-zA-Z-0]/g).length;
  updateUI(statsInfected, "Infected", infected);
  return infected;
}

function getTotal(pandemicMap) {
  const total = pandemicMap.match(/[^a-zA-Z]/g).length;
  updateUI(statsTotal, "Total", total);
  return total;
}

// Percentage of infection.

function getPercentageOfInfection(uninfectedMap, infectedMap) {
  const percentage = ((infectedMap * 100) / uninfectedMap).toFixed(1);
  updateUI(statsPercentage, "Percentage", percentage + "%");
  return percentage;
}

function updateUI(pageElement, text, value) {
  pageElement.textContent = `${text}:${value}`;
}

function init() {
  const infectedMap = getInfected(pandemicStartMap);

  createMap(pandemicStartMap, pandemicStart);
  createMap(infectedMap, pandemicEnd);

  getTotal(pandemicStartMap);
  getTotalInfected(infectedMap);
  getPercentageOfInfection(
    getTotal(pandemicStartMap),
    getTotalInfected(infectedMap)
  );
}

init();
