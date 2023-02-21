/* 
TODO:
- Better search with tags, prefixes or categories
- Improve accuracy of site tags
- Add more tags
*/

import wordList from "./words.js";
import stickyWords from "./stickyWords.js";
import {
  foodArr,
  softwareArr,
  constructionArr,
  financeArr,
  marketingArr,
  modelArr,
  healthArr,
  musicArr,
  vehicleArr,
  gameArr,
  furnitureArr,
  newsArr,
  sportsArr,
  clothingArr,
} from "./tagArrays.js";

// let siteGeneratorTen = document.getElementById("site-generator-ten");
let siteGenerator = document.getElementById("site-generator");
let siteList = document.getElementById("site-list");

let sites = [];

function generateNewSite() {
  // Word picker, create URL & make link on page

  let newSite = wordList[Math.floor(Math.random() * wordList.length)];
  let newSiteUrl = `https://${newSite}.com`;
  let newSiteDiv = document.createElement("div");
  newSiteDiv.innerHTML = `<a target="_blank" href="${newSiteUrl}">${newSite}.com</a>`;

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

        let occur = nthMostCommon(str, 50);

        // console.log(occur);

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
            newSiteDiv.childNodes[0].classList.add("tag-empty");
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
          if (wordResultsLowercase.some((r) => foodArr.includes(r)) == true) {
            newSiteDiv.childNodes[0].classList.add("tag-food");
          }
          //software tag
          if (
            wordResultsLowercase.some((r) => softwareArr.includes(r)) == true
          ) {
            newSiteDiv.childNodes[0].classList.add("tag-software");
          }
          //construction tag
          if (
            wordResultsLowercase.some((r) => constructionArr.includes(r)) ==
            true
          ) {
            newSiteDiv.childNodes[0].classList.add("tag-construction");
          }
          //finance tag
          if (
            wordResultsLowercase.some((r) => financeArr.includes(r)) == true
          ) {
            newSiteDiv.childNodes[0].classList.add("tag-finance");
          }
          //marketing tag
          if (
            wordResultsLowercase.some((r) => marketingArr.includes(r)) == true
          ) {
            newSiteDiv.childNodes[0].classList.add("tag-marketing");
          }
          //modeling tag
          if (wordResultsLowercase.some((r) => modelArr.includes(r)) == true) {
            newSiteDiv.childNodes[0].classList.add("tag-modeling");
          }
          //health tag
          if (wordResultsLowercase.some((r) => healthArr.includes(r)) == true) {
            newSiteDiv.childNodes[0].classList.add("tag-health");
          }
          //music tag
          if (wordResultsLowercase.some((r) => musicArr.includes(r)) == true) {
            newSiteDiv.childNodes[0].classList.add("tag-music");
          }
          //vehicle tag
          if (
            wordResultsLowercase.some((r) => vehicleArr.includes(r)) == true
          ) {
            newSiteDiv.childNodes[0].classList.add("tag-vehicle");
          }
          //game tag
          if (wordResultsLowercase.some((r) => gameArr.includes(r)) == true) {
            newSiteDiv.childNodes[0].classList.add("tag-game");
          }
          //furniture tag
          if (
            wordResultsLowercase.some((r) => furnitureArr.includes(r)) == true
          ) {
            newSiteDiv.childNodes[0].classList.add("tag-furniture");
          }
          //news tag
          if (wordResultsLowercase.some((r) => newsArr.includes(r)) == true) {
            newSiteDiv.childNodes[0].classList.add("tag-news");
          }
          //sports tag
          if (wordResultsLowercase.some((r) => sportsArr.includes(r)) == true) {
            newSiteDiv.childNodes[0].classList.add("tag-sports");
          }
          //clothing tag
          if (wordResultsLowercase.some((r) => clothingArr.includes(r)) == true) {
            newSiteDiv.childNodes[0].classList.add("tag-clothes");
          }
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
          console.log(err);
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
