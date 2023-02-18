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
  fetch(newSiteUrl).then((response) => {

    console.log(response.url);
    let responseUrl = response.url;
    let sellerDomains = [
      "godaddy",
      "dan.com",
      "domain",
      "squadhelp",
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

siteGeneratorTen.addEventListener("click", () => {
  for (let i = 0; i < 10; i++) {
    generateNewSite();
  }
});
