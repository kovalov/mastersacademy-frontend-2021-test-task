const pandemicStartMap = "XX0X10010X000X010X0";

const pandemicStart = document.querySelector(".start__map");
const pandemicEnd = document.querySelector(".end__map");

const statsTotal = document.querySelector(".stats__total");
const statsInfected = document.querySelector(".stats__infected");
const statsPercentage = document.querySelector(".stats__percentage");

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

function getInfected(pandemicMap) {
  return pandemicMap
    .match(/X+\d+/g)
    .map((element) => {
      if (element.includes("1")) return element.replaceAll("0", "1");
      return element;
    })
    .join("");
}

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
