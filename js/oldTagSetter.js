// old tag setter, do not use.

//food tag
if (wordResultsLowercase.some((r) => arrObj.food.includes(r)) == true) {
  let foodTag = document.createElement("div");
  foodTag.classList.add("tag-food");
  newSiteDiv.appendChild(foodTag);
}
//software tag
if (wordResultsLowercase.some((r) => arrObj.software.includes(r)) == true) {
  let softwareTag = document.createElement("div");
  softwareTag.classList.add("tag-software");
  newSiteDiv.appendChild(softwareTag);
}
//construction tag
if (wordResultsLowercase.some((r) => arrObj.construction.includes(r)) == true) {
  let constructionTag = document.createElement("div");
  constructionTag.classList.add("tag-construction");
  newSiteDiv.appendChild(constructionTag);
}
//finance tag
if (wordResultsLowercase.some((r) => arrObj.finance.includes(r)) == true) {
  let financeTag = document.createElement("div");
  financeTag.classList.add("tag-finance");
  newSiteDiv.appendChild(financeTag);
}
//marketing tag
if (wordResultsLowercase.some((r) => arrObj.marketing.includes(r)) == true) {
  let marketingTag = document.createElement("div");
  marketingTag.classList.add("tag-marketing");
  newSiteDiv.appendChild(marketingTag);
}
//modeling tag
if (wordResultsLowercase.some((r) => arrObj.model.includes(r)) == true) {
  let modelingTag = document.createElement("div");
  modelingTag.classList.add("tag-model");
  newSiteDiv.appendChild(modelingTag);
}
//health tag
if (wordResultsLowercase.some((r) => arrObj.health.includes(r)) == true) {
  let healthTag = document.createElement("div");
  healthTag.classList.add("tag-health");
  newSiteDiv.appendChild(healthTag);
}
//music tag
if (wordResultsLowercase.some((r) => arrObj.music.includes(r)) == true) {
  let musicTag = document.createElement("div");
  musicTag.classList.add("tag-music");
  newSiteDiv.appendChild(musicTag);
}
//vehicle tag
if (wordResultsLowercase.some((r) => arrObj.vehicle.includes(r)) == true) {
  let vehicleTag = document.createElement("div");
  vehicleTag.classList.add("tag-vehicle");
  newSiteDiv.appendChild(vehicleTag);
}
//game tag
if (wordResultsLowercase.some((r) => arrObj.game.includes(r)) == true) {
  let gameTag = document.createElement("div");
  gameTag.classList.add("tag-game");
  newSiteDiv.appendChild(gameTag);
}
//furniture tag
if (wordResultsLowercase.some((r) => arrObj.furniture.includes(r)) == true) {
  let furnitureTag = document.createElement("div");
  furnitureTag.classList.add("tag-furniture");
  newSiteDiv.appendChild(furnitureTag);
}
//sports tag
if (wordResultsLowercase.some((r) => arrObj.sports.includes(r)) == true) {
  let sportsTag = document.createElement("div");
  sportsTag.classList.add("tag-sports");
  newSiteDiv.appendChild(sportsTag);
}
//clothing tag
if (wordResultsLowercase.some((r) => arrObj.clothing.includes(r)) == true) {
  let clothingTag = document.createElement("div");
  clothingTag.classList.add("tag-clothing");
  newSiteDiv.appendChild(clothingTag);
}
//pet tag
if (wordResultsLowercase.some((r) => arrObj.pets.includes(r)) == true) {
  let petTag = document.createElement("div");
  petTag.classList.add("tag-pets");
  newSiteDiv.appendChild(petTag);
}

let newBreak = document.createElement("br");
newSiteDiv.appendChild(newBreak);
// END TAGS
