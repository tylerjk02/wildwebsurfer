/* 
TODO:
- Add descriptive tags about the purpose of sites
    --skim site and search for highly used words (eg. propane, cars)
    --generate random color tag

- Fix the accuracy of domain sale checker
- Add toggle to have broken URLs auto-deleted
- Better search with tags, prefixes or categories
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

  // domain-for-sale checker

  fetch(newSiteUrl)
    .then(function (response) {
      return response.text();
    })
    .then(function (html) {
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

      // begin tag handler ! WORK IN PROGRESS !

      let foundStrings = [];

      pTagGrabber.forEach((e) => {
        let newPString = e.innerText.toLowerCase().trim();
        foundStrings.push(newPString);
      });

      aTagGrabber.forEach((e) => {
        let newAString = e.innerText.toLowerCase().trim();
        foundStrings.push(newAString);
      });

      h1TagGrabber.forEach((e) => {
        let newH1String = e.innerText.toLowerCase().trim();
        foundStrings.push(newH1String);
      });

      h2TagGrabber.forEach((e) => {
        let newH2String = e.innerText.toLowerCase().trim();
        foundStrings.push(newH2String);
      });

      console.log(foundStrings);
    });

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
      if(deleteToggle.checked == true) {
        let errorLinks = document.querySelectorAll('.link-backer-error');
        errorLinks.forEach(e => {
          e.classList.add("link-removed");
        })

      }

    });

  siteList.appendChild(newSiteDiv);
  sites.push(newSiteUrl);
}

siteGenerator.addEventListener("click", () => {
  generateNewSite();
  let errorBox = document.getElementById("error-box");
  errorBox.style.display = "none";
});
