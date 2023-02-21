/* 
TODO:
- Better search with tags, prefixes or categories
- Improve accuracy of site tags
- Add more tags
*/

import wordList from "./words.js";

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

        // word count calc

        let str = foundStrings.join("");

        let occur = nthMostCommon(str, 25);

        // console.log(occur);

        function nthMostCommon(str, amount) {
          const stickyWords = [
            "the",
            "each",
            "my",
            "your",
            "more",
            "have",
            "this",
            "there",
            "his",
            "",
            "has",
            "is",
            "by",
            "at",
            "and",
            "so",
            "if",
            "than",
            "but",
            "about",
            "in",
            "on",
            "the",
            "was",
            "for",
            "that",
            "with",
            "not",
            "can",
            "we",
            "said",
            "a",
            "or",
            "of",
            "to",
            "there",
            "will",
            "be",
            "what",
            "get",
            "go",
            "think",
            "just",
            "every",
            "are",
            "it",
            "were",
            "had",
            "i",
            "very",
            "you",
            "our",
            "all",
            "an",
          ];
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
            /* you may want to include a binary search here */
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

          //secondary back-up domain sale check
          if (wordResultsLowercase.includes("domain")) {
            newSiteDiv.childNodes[0].classList.add("status-for-sale");
          }
          //food tag
          if (
            wordResultsLowercase.includes("food") ||
            wordResultsLowercase.includes("restaurant")
          ) {
            newSiteDiv.childNodes[0].classList.add("tag-food");
          }

          //construction tag
          if (
            wordResultsLowercase.includes("construction")
          ) {
            newSiteDiv.childNodes[0].classList.add("tag-construction");
          }
          //finance tag
          if (
            wordResultsLowercase.includes("finance") ||
            wordResultsLowercase.includes("invest") ||
            wordResultsLowercase.includes("investing") ||
            wordResultsLowercase.includes("financial")
          ) {
            newSiteDiv.childNodes[0].classList.add("tag-finance");
          }
          //software tag
          if (
            wordResultsLowercase.includes("software") ||
            wordResultsLowercase.includes("development") ||
            wordResultsLowercase.includes("computer") ||
            wordResultsLowercase.includes("framework")
          ) {
            newSiteDiv.childNodes[0].classList.add("tag-software");
          }

          if (
            wordResultsLowercase.includes("marketing") ||
            wordResultsLowercase.includes("promotion")
          ) {
            newSiteDiv.childNodes[0].classList.add("tag-marketing");
          }

          if (
            wordResultsLowercase.includes("model") ||
            wordResultsLowercase.includes("models") ||
            wordResultsLowercase.includes("modeling")
          ) {
            newSiteDiv.childNodes[0].classList.add("tag-modeling");
          }
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
