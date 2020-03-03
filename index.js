"use strict";

const searchUrl = `https://pixabay.com/api/?key=15386213-fd2b415b0403776dbc63e2f69`;

// STATE

const state = {
  data: []
};

// GENERATE ELEMENTS

function generateHomePage() {
  $(".homepage").append(
    `<div class="color-picker">
            <button type="button" name="red button" aria-label="red" id="red"></button>
            <button type="button" name="purple button" aria-label="purple" id="purple"></button>
            <button type="button" name="black button" aria-label="black" id="black"></button>
            <button type="button" name="orange button" aria-label="orange" id="orange"></button>
            <button type="button" name="white button" aria-label="white" id="white"></button>
            <button type="button" name="grey button" aria-label="grey" id="grey"></button>
            <button type="button" name="blue button" aria-label="blue" id="blue"></button>
            <button type="button" name="green button" aria-label="green" id="green"></button>
            <button type="button" name="yellow button" aria-label="yellow" id="yellow"></button>          
        </div>`
  );
}

function generateSlideShow(state) {
  $(".slideshow-section").removeClass("hidden");
  $("#credit").removeClass("hidden");

  for (let i = 0; i < state.data[0].hits.length; i++) {
    let minWidth = window.matchMedia("(min-width: 1000px)");
    if (minWidth.matches) {
      $(".slideshow-section").append(
        `<button type="button" name="slideshow" class="slides fade">
            <img src=${state.data[0].hits[i].largeImageURL} alt=${state.data[0].hits[i].tags} style="width:100%"/>
            </button>`
      );
    } else {
      $(".slideshow-section").append(
        `<button type="button" name="slideshow" class="slides fade">
                <img src=${state.data[0].hits[i].webformatURL} alt=${state.data[0].hits[i].tags} style="width:100%"/>
                </button>`
      );
    }
  }
}

// MAIN FUNCTIONS

let slideIndex = 0;
let timeoutVariable;

function showSlides() {
  let slides = document.getElementsByClassName("slides");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  };
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  };
  slides[slideIndex - 1].style.display = "block";
  timeoutVariable = setTimeout(showSlides, 5000);
  return timeoutVariable;
}

function getRandomNumber(i) {
  let categoryNumber = imageCategories[i].category.length;
  let randomNumber = Math.floor(Math.random() * categoryNumber + 0);
  return randomNumber;
}

function getCategory(colorName) {
  for (let i = 0; i < imageCategories.length; i++) {
    let string = imageCategories[i].color;
    if (string === colorName) {
      let randomNumber = getRandomNumber(i);
      let category = imageCategories[i].category[randomNumber];
      return category;
    }
  }
}

// FETCH CALLS

function getSlideshowImages(colorName, category, orientation) {
  const searchCategory = `${encodeURIComponent("q")}=${encodeURIComponent(
    category
  )}`;
  const searchColor = `${encodeURIComponent("colors")}=${encodeURIComponent(
    colorName
  )}`;

  const queryField =
    searchUrl +
    `&` +
    searchCategory +
    `&image_type=photo&category=nature&orientation=${orientation}&safesearch="true"` +
    `&` +
    searchColor;

  fetch(queryField)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .then(function(responseJson) {
      state.data.push(responseJson);
      generateSlideShow(state);
    })

    .then(showSlides)

    .catch((err) => {
      $("#error-message")
        .text(`Something went wrong: ${err.message}`)
        .removeClass("hidden");
    });
}

// HANDLERS

function watchInput() {
  $(".color-picker button").on("click", function(event) {
    state.data.length = 0;
    event.preventDefault();

    $(".homepage").addClass("hidden");
    $("#footer").addClass("invisible");
    $("h1").addClass("hidden");
    $("#next-color").removeClass("hidden");
    $("#credit").removeClass("invisible");

    let colorName = $(this).attr("ID");
    let category = getCategory(colorName);
    let maxWidth = window.matchMedia("(max-width: 500px)");
    if (maxWidth.matches) {
      let orientation = "vertical";
      getSlideshowImages(colorName, category, orientation);
    } else {
      let orientation = "horizontal";
      getSlideshowImages(colorName, category, orientation);
    }
  });
}

function changeSlideshow() {
  $(".slideshow-section").on("click", function(event) {
    state.data.length = 0;
    clearTimeout(timeoutVariable);
    $(".slideshow-section").empty();
    $(".homepage").removeClass("hidden");
    $("h1").removeClass("hidden");
    $("#next-color").addClass("hidden");
    $("#footer").removeClass("invisible");
    $("#header").removeClass("hidden");
    $("#credit").addClass("invisible");
  });
}

// IMPLEMENT

$(generateHomePage);
$(watchInput);
$(changeSlideshow);
