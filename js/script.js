/* 
TODO:
- Add descriptive tags about the purpose of sites
- Fix the accuracy of domain sale checker


*/

import wordList from './words.js'


let siteGeneratorTen = document.getElementById("site-generator-ten");
let siteGenerator = document.getElementById("site-generator");
let siteList = document.getElementById("site-list");

let sites = [];


function generateNewSite() {
  let newSite = wordList[Math.floor(Math.random() * wordList.length)];
  let newSiteUrl = `https://${newSite}.com`;
  let newSiteDiv = document.createElement("div");
  newSiteDiv.innerHTML = `<a target="_blank" href="${newSiteUrl}">${newSite}.com</a>`;
  newSiteDiv.childNodes[0].classList.add("status-error");
  newSiteDiv.classList.add("link-backer-error");

  fetch(newSiteUrl).then(function(response) {
    return response.text();
  }).then(function(html) {

    let parser = new DOMParser();
    let doc = parser.parseFromString(html, 'text/html');

    let aTagGrabber = doc.querySelectorAll('a');

    // console.log(aTagGrabber.forEach(e => {
    //   console.log(e.innerText);
    // }));

    aTagGrabber.forEach(e => {
      let substr = 'domain'
      let substrTwo = 'Domain'
      if(e.innerText.includes(substr) || e.innerText.includes(substrTwo)) {
        newSiteDiv.childNodes[0].classList.add("status-for-sale");
      }
    });
  }).catch(function(err) {
    console.warn('Error', err);
  });


  fetch(newSiteUrl, {
    method: "GET",
  }).then((response) => {
    console.log(response.url);
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

    if (response.status == 200) {
      newSiteDiv.childNodes[0].classList.remove("status-error");
      newSiteDiv.classList.remove("link-backer-error");
      newSiteDiv.childNodes[0].classList.add("status-success");
      newSiteDiv.classList.add("link-backer-success")
    } else {
      newSiteDiv.childNodes[0].classList.add("status-error");
      newSiteDiv.classList.add("link-backer-error");
    }
  });

  siteList.appendChild(newSiteDiv);
  sites.push(newSiteUrl);
}

siteGenerator.addEventListener("click", () => {
  generateNewSite();
});

