"use strict"


const searchUrl = `https://pixabay.com/api/?key=15386213-fd2b415b0403776dbc63e2f69`

// STATE

const state = {
    data: [],
}


// GENERATE ELEMENTS

// function generateHomePage() {
//   $(".homepage").append(
//       `
//         <div class="color-picker">
//         <input id="red"></input>
//         <input id="purple"></input>
//         <input id="black"></input>
//         <input id="orange"></input>
//         <input id="white"></input>
//         <input id="grey"></input>
//         <input id="blue"></input>
//         <input id="green"></input>
//         <input id="yellow"></input>          
//       </div>`);
      
// }

function generateHomePage() {
    $(".homepage").append(
        `<div class="color-picker">
            <button type="button" name="red button" value="red" id="red"></button>
            <button type="button" name="purple button" value="purple" id="purple"></button>
            <button type="button" name="black button" value="black" id="black"></button>
            <button type="button" name="orange button" value="orange" id="orange"></button>
            <button type="button" name="white button" value="white" id="white"></button>
            <button type="button" name="grey button" value="grey" id="grey"></button>
            <button type="button" name="blue button" value="blue" id="blue"></button>
            <button type="button" name="green button" value="green" id="green"></button>
            <button type="button" name="yellow button" value="yellow" id="yellow"></button>          
        </div>`);
        
  }

function generateSlideShow(state) {
    
    $(".slideshow-section").removeClass("hidden");
    $("#credit").removeClass("hidden");
    
    for (let i = 0; i < state.data[0].hits.length; i++) {
        $(".slideshow-section").append(
            `<button type="button" name="slideshow" class="slides fade">
            <img src=${state.data[0].hits[i].webformatURL} alt=${state.data[0].hits[i].tags} style="width:100%"/>
            </button>`  
         )
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
        slideIndex = 1
    };
    slides[slideIndex - 1].style.display = "block";
    timeoutVariable = setTimeout(showSlides, 8000); 
    return timeoutVariable;
}


function getRandomNumber(i) {
    let categoryNumber = imageCategories[i].category.length;
    let randomNumber = Math.floor((Math.random() * categoryNumber) + 0)
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

    const searchCategory = `${encodeURIComponent("q")}=${encodeURIComponent(category)}`
    const searchColor = `${encodeURIComponent("colors")}=${encodeURIComponent(colorName)}`

    const queryField = searchUrl + `&` + searchCategory + `&image_type=photo&category=nature&orientation=${orientation}&safesearch="true"` + `&` + searchColor;

    fetch(queryField)
    .then(response => {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error(response.statusText);
        }
    })
    
    .then(function(responseJson) {
         state.data.push(responseJson);
         generateSlideShow(state)
    })
    
    .then(showSlides)

    .catch(err => {
        $("#error-message").text(`Something went wrong: ${err.message}`).removeClass("hidden");
    });
 }


// HANDLERS

function watchInput() {

$(".color-picker button").on("click", function(event) {
    
    state.data.length = 0;
    
    event.preventDefault();
    $(".homepage").addClass("hidden");
    $("#footer").addClass("invisible");
    $("#header").addClass("hidden");
    $("#credit").removeClass("invisible");
   
    let colorName = $(this).attr("ID"); 
    let category = getCategory(colorName);
    let maxWidth = window.matchMedia("(max-width: 500px)")
    if (maxWidth.matches) {
        let orientation = "vertical";
        getSlideshowImages(colorName, category, orientation)
    } else {
        let orientation = "horizontal";
        getSlideshowImages(colorName, category, orientation)
    }
    })

}

function changeSlideshow() {

    $(".slideshow-section").on("click", function(event) {

        state.data.length = 0;
        clearTimeout(timeoutVariable);
        $(".slideshow-section").empty();
        $(".homepage").removeClass("hidden");
        $("#footer").removeClass("invisible");
        $("#header").removeClass("hidden");
        $("#credit").addClass("invisible")

        
    })
}


// IMPLEMENT

$(generateHomePage);

$(watchInput);
$(changeSlideshow)