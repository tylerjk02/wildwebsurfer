/* 
TODO:
- Better search with tags, prefixes or categories
- Improve accuracy of site tags
- Add more tags
- Improve HTTPS checker
*/

import wordList from "./words.js";
import stickyWords from "./stickyWords.js";
import { arrObb } from "./tagArrays.js";

let siteGeneratorTen = document.getElementById("site-generator-ten");
let siteGenerator = document.getElementById("site-generator");
let siteList = document.getElementById("site-list");
let sites = [];

function generateNewSite() {
  // Word picker, create URL & make link on page
  let newSite = wordList[Math.floor(Math.random() * wordList.length)];
  let extensionToggle = document.getElementById("extension-toggle");
  let extensionList = [
    "com",
    "net",
    "net",
    "org",
    "org",
    "co",
    "co",
    "us",
    "us",
  ];
  let ranExtension = Math.floor(Math.random() * extensionList.length);
  let newSiteUrl = `https://${newSite}`;
  let newSiteDiv = document.createElement("div");
  newSiteDiv.classList.add("site-div");

  if (extensionToggle.checked == true) {
    let ranEndExtension = `.${extensionList[ranExtension]}`;
    newSiteDiv.innerHTML = `<a target="_blank" href="${newSiteUrl}">${newSite}${ranEndExtension}</a>`;
    newSiteUrl += ranEndExtension;
  } else {
    newSiteUrl += ".com";
    newSiteDiv.innerHTML = `<a target="_blank" href="${newSiteUrl}">${newSite}.com</a>`;
  }

  newSiteDiv.childNodes[0].classList.add("status-unknown"); // New default.
  newSiteDiv.classList.add("link-backer-unknown"); // New default.

  fetch(newSiteUrl)
    .then(function (response) {
      return response.text();
    })
    .then(
      function (html) {
        let parser = new DOMParser();
        let doc = parser.parseFromString(html, "text/html");

        let aTagGrabber = doc.querySelectorAll("a");
        let pTagGrabber = doc.querySelectorAll("p");
        let h1TagGrabber = doc.querySelectorAll("h1");
        let h2TagGrabber = doc.querySelectorAll("h2");
        let h3TagGrabber = doc.querySelectorAll("h3");

        h1TagGrabber.forEach((e) => {
          let substr = "domain";
          let lowerCaseE = e.innerText.toLowerCase();
          if (lowerCaseE.includes(substr)) {
            newSiteDiv.childNodes[0].classList.add("status-for-sale");
          }
        });

        h2TagGrabber.forEach((e) => {
          let substr = "domain";
          let lowerCaseE = e.innerText.toLowerCase();
          if (lowerCaseE.includes(substr)) {
            newSiteDiv.childNodes[0].classList.add("status-for-sale");
          }
        });

        pTagGrabber.forEach((e) => {
          let substr = "domain";
          let lowerCaseE = e.innerText.toLowerCase();
          if (lowerCaseE.includes(substr)) {
            newSiteDiv.childNodes[0].classList.add("status-for-sale");
          }
        });

        aTagGrabber.forEach((e) => {
          let substr = "domain";
          let lowerCaseE = e.innerText.toLowerCase();
          if (lowerCaseE.includes(substr)) {
            newSiteDiv.childNodes[0].classList.add("status-for-sale");
          }
        });

        // begin tag handler

        let foundStrings = [];

        pTagGrabber.forEach((e) => {
          let newPString = e.innerText.toLowerCase().trim();
          foundStrings.push(newPString);
        });

        // aTagGrabber.forEach((e) => {
        //   let newAString = e.innerText.toLowerCase().trim();
        //   foundStrings.push(newAString);
        // });

        h1TagGrabber.forEach((e) => {
          let newH1String = e.innerText.toLowerCase().trim();
          foundStrings.push(newH1String);
        });

        h2TagGrabber.forEach((e) => {
          let newH2String = e.innerText.toLowerCase().trim();
          foundStrings.push(newH2String);
        });

        h3TagGrabber.forEach((e) => {
          let newH3String = e.innerText.toLowerCase().trim();
          foundStrings.push(newH3String);
        });

        // word count calc

        let str = foundStrings.join("");

        let occur = nthMostCommon(str, 75);

        function nthMostCommon(str, amount) {
          str = str.toLowerCase();
          var splitUp = str.split(/\s/);
          const wordsArray = splitUp.filter(function (x) {
            return !stickyWords.includes(x);
          });
          var wordOccurrences = {};
          for (var i = 0; i < wordsArray.length; i++) {
            wordOccurrences["_" + wordsArray[i]] =
              (wordOccurrences["_" + wordsArray[i]] || 0) + 1;
          }
          var result = Object.keys(wordOccurrences).reduce(function (
            acc,
            currentKey
          ) {
            for (var i = 0; i < amount; i++) {
              if (!acc[i]) {
                acc[i] = {
                  word: currentKey.slice(1, currentKey.length),
                  occurrences: wordOccurrences[currentKey],
                };
                break;
              } else if (acc[i].occurrences < wordOccurrences[currentKey]) {
                acc.splice(i, 0, {
                  word: currentKey.slice(1, currentKey.length),
                  occurrences: wordOccurrences[currentKey],
                });
                if (acc.length > amount) acc.pop();
                break;
              }
            }
            return acc;
          },
          []);

          if (result.length <= 1) {
            let emptyTag = document.createElement("div");
            emptyTag.classList.add("tag-empty");
            newSiteDiv.appendChild(emptyTag);
          }
          let wordResultList = [];
          result.forEach((e) => {
            wordResultList.push(e.word);
          });
          let wordResultsLowercase = [];
          wordResultList.forEach((e) => {
            wordResultsLowercase.push(e.toLowerCase());
          });

          // START TAGS

          //secondary back-up domain sale check
          if (wordResultsLowercase.includes("domain")) {
            newSiteDiv.childNodes[0].classList.add("status-for-sale");
          }

          //food tag
          if (
            wordResultsLowercase.some((r) => arrObb.food.includes(r)) == true
          ) {
            let foodTag = document.createElement("div");
            foodTag.classList.add("tag-food");
            newSiteDiv.appendChild(foodTag);
          }
          //software tag
          if (
            wordResultsLowercase.some((r) => arrObb.software.includes(r)) ==
            true
          ) {
            let softwareTag = document.createElement("div");
            softwareTag.classList.add("tag-software");
            newSiteDiv.appendChild(softwareTag);
          }
          //construction tag
          if (
            wordResultsLowercase.some((r) => arrObb.construction.includes(r)) ==
            true
          ) {
            let constructionTag = document.createElement("div");
            constructionTag.classList.add("tag-construction");
            newSiteDiv.appendChild(constructionTag);
          }
          //finance tag
          if (
            wordResultsLowercase.some((r) => arrObb.finance.includes(r)) == true
          ) {
            let financeTag = document.createElement("div");
            financeTag.classList.add("tag-finance");
            newSiteDiv.appendChild(financeTag);
          }
          //marketing tag
          if (
            wordResultsLowercase.some((r) => arrObb.marketing.includes(r)) ==
            true
          ) {
            let marketingTag = document.createElement("div");
            marketingTag.classList.add("tag-marketing");
            newSiteDiv.appendChild(marketingTag);
          }
          //modeling tag
          if (
            wordResultsLowercase.some((r) => arrObb.model.includes(r)) == true
          ) {
            let modelingTag = document.createElement("div");
            modelingTag.classList.add("tag-model");
            newSiteDiv.appendChild(modelingTag);
          }
          //health tag
          if (
            wordResultsLowercase.some((r) => arrObb.health.includes(r)) == true
          ) {
            let healthTag = document.createElement("div");
            healthTag.classList.add("tag-health");
            newSiteDiv.appendChild(healthTag);
          }
          //music tag
          if (
            wordResultsLowercase.some((r) => arrObb.music.includes(r)) == true
          ) {
            let musicTag = document.createElement("div");
            musicTag.classList.add("tag-music");
            newSiteDiv.appendChild(musicTag);
          }
          //vehicle tag
          if (
            wordResultsLowercase.some((r) => arrObb.vehicle.includes(r)) == true
          ) {
            let vehicleTag = document.createElement("div");
            vehicleTag.classList.add("tag-vehicle");
            newSiteDiv.appendChild(vehicleTag);
          }
          //game tag
          if (
            wordResultsLowercase.some((r) => arrObb.game.includes(r)) == true
          ) {
            let gameTag = document.createElement('div');
            gameTag.classList.add("tag-game");
            newSiteDiv.appendChild(gameTag);
          }
          //furniture tag
          if (
            wordResultsLowercase.some((r) => arrObb.furniture.includes(r)) ==
            true
          ) {
            let furnitureTag = document.createElement('div');
            furnitureTag.classList.add("tag-furniture");
            newSiteDiv.appendChild(furnitureTag);
          }
          //news tag
          if (
            wordResultsLowercase.some((r) => arrObb.news.includes(r)) == true
          ) {
            let newsTag = document.createElement('div');
            newsTag.classList.add("tag-news");
            newSiteDiv.appendChild(newsTag);          }
          //sports tag
          if (
            wordResultsLowercase.some((r) => arrObb.sports.includes(r)) == true
          ) {
            let sportsTag = document.createElement('div');
            sportsTag.classList.add("tag-sports");
            newSiteDiv.appendChild(sportsTag);          }
          //clothing tag
          if (
            wordResultsLowercase.some((r) => arrObb.clothing.includes(r)) ==
            true
          ) {
            let clothingTag = document.createElement('div');
            clothingTag.classList.add("tag-clothing");
            newSiteDiv.appendChild(clothingTag);          }
          // END TAGS

          console.log(wordResultsLowercase);
          return result;
        }

        // -- end word count calc --
      },

      // -- end main sale tester --

      fetch(newSiteUrl, {
        method: "GET",
      })
        .then((response) => {
          // backup sale tester

          let responseUrl = response.url;
          // let prefixSlice = responseUrl.slice(0, 5);

          let sellerDomains = [
            "domain",
            "dan.com",
            "squadhelp",
            "godaddy",
            "uniregistry",
          ];
          if (sellerDomains.some((v) => responseUrl.includes(v))) {
            newSiteDiv.childNodes[0].classList.add("status-for-sale");
          }

          // if (prefixSlice != "https") {
          //   newSiteDiv.childNodes[0].classList.remove("status-for-sale");
          //   newSiteDiv.childNodes[0].classList.add("https-not-present");
          // }

          // console.log(prefixSlice);

          // status test

          if (response.status == 200) {
            newSiteDiv.childNodes[0].classList.remove("status-unknown");
            newSiteDiv.classList.remove("link-backer-unknown");
            newSiteDiv.childNodes[0].classList.add("status-success");
            newSiteDiv.classList.add("link-backer-success");
          } else {
            newSiteDiv.childNodes[0].classList.remove("status-unknown");
            newSiteDiv.classList.remove("link-backer-unknown");
            newSiteDiv.childNodes[0].classList.add("status-error");
            newSiteDiv.classList.add("link-backer-error");
          }
        })
        .catch((err) => {
          newSiteDiv.childNodes[0].classList.remove("status-unknown");
          newSiteDiv.classList.remove("link-backer-unknown");
          newSiteDiv.childNodes[0].classList.add("status-error");
          newSiteDiv.classList.add("link-backer-error");

          let deleteToggle = document.getElementById("delete-toggle");
          if (deleteToggle.checked == true) {
            let errorLinks = document.querySelectorAll(".link-backer-error");
            errorLinks.forEach((e) => {
              e.classList.add("link-removed");
            });
          }
        })
    );
  siteList.appendChild(newSiteDiv);
  sites.push(newSiteUrl);
}

siteGenerator.addEventListener("click", () => {
  generateNewSite();
  let errorBox = document.getElementById("error-box");
  errorBox.style.display = "none";
});

siteGeneratorTen.addEventListener("click", () => {
  for (let i = 0; i < 10; i++) {
    generateNewSite();
  }

  let errorBox = document.getElementById("error-box");
  errorBox.style.display = "none";
});
