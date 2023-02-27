/* 
TODO:
- Better search with tags, prefixes or categories
- Improve accuracy of site tags
- Add more tags
- Improve HTTPS checker
*/

import wordList from "./words.js";
import stickyWords from "./stickyWords.js";
import { arrObj } from "./tagArrays.js";

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
    newSiteUrl += ranEndExtension;
    newSiteDiv.innerHTML = `<a target="_blank" href="${newSiteUrl}">${newSite}${ranEndExtension}</a>`;
  } else {
    newSiteUrl += ".com";
    newSiteDiv.innerHTML = `<a target="_blank" href="${newSiteUrl}">${newSite}.com</a>`;
  }

  newSiteDiv.childNodes[0].classList.add("status-unknown"); // New default.
  newSiteDiv.classList.add("link-backer-unknown"); // New default.

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
    });

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

        let tagContainer = document.createElement('div');
        tagContainer.classList.add('tag-container');
        newSiteDiv.appendChild(tagContainer);

        let str = foundStrings.join("");

        let occur = nthMostCommon(str, 85);

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
          var wordResultsLowercase = [];
          wordResultList.forEach((e) => {
            wordResultsLowercase.push(e.toLowerCase()
            .replace(",", "")
            .replace('"', "")
            .replace(".", ""));
          });

          // START TAGS
          //secondary back-up domain sale check
          if (wordResultsLowercase.includes("domain")) {
            newSiteDiv.childNodes[0].classList.add("status-for-sale");
          }
          
          // new tag handler

          Object.keys(arrObj).forEach(e => {
            arrObj[e].forEach(x => {
              if(wordResultsLowercase.includes(x)) {
                let newTag = document.createElement('div');
                if(newTag.classList.contains('tag-${e}') != true) {
                  newTag.classList.add(`tag-${e}`);
                }
                tagContainer.appendChild(newTag);
              } else {
              }
            })
          })

          // end tag setter

          let keywordList = [];
          let keywords = wordResultsLowercase.forEach((e) => {
            if (keywordList.length < 5 && e.length > 4 && e.length < 9) {
              keywordList.push(e);
            }
          });
          let keywordsDiv = document.createElement("div");
          keywordsDiv.classList.add('keywords');
          if(keywordList.length == 0) {
            keywordsDiv.classList.remove('keywords');
          }
          newSiteDiv.appendChild(keywordsDiv);
          keywordsDiv.innerText = keywordList.join(", ");

          return result;
        }

        // -- end word count calc --
      }

      // -- end main sale tester --
    );

  siteList.appendChild(newSiteDiv);
  sites.push(newSiteUrl);
}

siteGenerator.addEventListener("click", () => {
  generateNewSite();
  let errorBox = document.getElementById("error-box");
  let footer = document.getElementById("footer");
  footer.style.display = "none";
  errorBox.style.display = "none";
});

siteGeneratorTen.addEventListener("click", () => {
  for (let i = 0; i < 10; i++) {
    generateNewSite();
  }
  let footer = document.getElementById("footer");
  let errorBox = document.getElementById("error-box");
  errorBox.style.display = "none";
  footer.style.display = "none";
});
