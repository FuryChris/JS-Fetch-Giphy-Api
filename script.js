var loaded = 0; // który element aktualnie ma być ładowany.
var APIKEY = "RoUdaXUDp0haMemheg9MFSn3NA92Ps3Y";  // klucz na razie testowy
var gifsperclick = 9;  //ile gifów na kliknięcie

const gifsSearchInput = document.getElementById('gifs-search');
const displayedGifs = document.querySelector('.displayed-gifs');

// Searching for specific gif's
document.getElementById("btnSearch").addEventListener("click", ev => {
  ev.preventDefault(); //prevent page reloading
  Array.from(document.querySelectorAll('div .gif-element')).forEach(el => el.remove());   // usuwanie reszty przed wstawieniem nowych
  loaded = 0;  // reset number of gif's shown
  var url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=${gifsperclick}&offset=l${loaded * gifsperclick}&q=`;  // dostęp do gifów z określoną liczbą elementów
  str = gifsSearchInput.value.trim();
  url = url.concat(str);
  fetch(url)
    .then(response => response.json())
    .then(console.log(response => response.json()))
    .then(content => {
      //  data, pagination, meta

      for (i = 0; i < gifsperclick; i++) {
        let fig = document.createElement("div");
        fig.className = "gif-element";
        let img = document.createElement("img");
        img.src = content.data[loaded].images.downsized.url;
        fig.appendChild(img);
        let out = document.querySelector(".out");
        out.insertAdjacentElement("afterbegin", fig);
        loaded += 1
      }
    })
    .catch(err => {
      loaded = 0;
      console.error(err);
    });

  displayedGifs.innerHTML = str;    // show which gifs are displayed

  gifsSearchInput.value = '';   // clear searchbar input
});

// Loading next GIF'S
document.getElementById("next").addEventListener("click", ev => {
  ev.preventDefault();
  var url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=${gifsperclick + loaded}&q=`;   // access to exactly numbers of gifs
  url = url.concat(str);
  fetch(url)
    .then(response => response.json())
    .then(content => {
      var parent = document.getElementsByClassName('out');
      for (i = 0; i < gifsperclick; i++) {
        // remove method not working fine with IE.
        parent[0].childNodes[0].remove();
      }
      for (i = 0; i < gifsperclick; i++) {
        let fig = document.createElement("div");
        fig.className = "gif-element";
        let img = document.createElement("img");
        img.src = content.data[loaded].images.downsized.url;
        fig.appendChild(img);
        let out = document.querySelector(".out");
        out.insertAdjacentElement("afterbegin", fig);
        loaded += 1;
        console.log(loaded);
      }
    })
    .catch(err => {
      loaded = 0;
      console.error(err);
    });
});

document.getElementById("previous").addEventListener("click", ev => {
  ev.preventDefault();
  var url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=${gifsperclick + loaded}&q=`;   // access to exactly numbers of gifs
  url = url.concat(str);
  fetch(url)
    .then(response => response.json())
    .then(content => {
      var parent = document.getElementsByClassName('out');
      // adjusting loaded variable to be at minimum value of 0
      loaded = (loaded >= gifsperclick * 2) ? (loaded - gifsperclick * 2) : 0;
      for (i = 0; i < gifsperclick; i++) {
        // remove method not working fine with IE.
        parent[0].childNodes[0].remove();
      }
      for (i = 0; i < gifsperclick; i++) {
        let fig = document.createElement("div");
        fig.className = "gif-element";
        let img = document.createElement("img");
        img.src = content.data[loaded].images.downsized.url;
        fig.appendChild(img);
        let out = document.querySelector(".out");
        out.insertAdjacentElement("afterbegin", fig);
        loaded += 1;
        console.log(loaded);
      }
    })
    .catch(err => {
      loaded = 0;
      console.error(err);
    });
});


// Navbar animation on scrolling
let scrollPosition = 0;

const elementToAnimate = document.querySelector('.element-to-animate');
const logo = elementToAnimate.querySelector('.logo');
const gifsSearchForm = elementToAnimate.querySelector('.gifs-search-form');

window.addEventListener('scroll', function () {
  scrollPosition = window.scrollY;

  if (scrollPosition >= 100) {
    elementToAnimate.classList.add('animated-element');
    logo.classList.add('animated-logo');
    gifsSearchForm.classList.add('animated-form');
  } else {
    elementToAnimate.classList.remove('animated-element');
    logo.classList.remove('animated-logo');
    gifsSearchForm.classList.remove('animated-form');
  }
});