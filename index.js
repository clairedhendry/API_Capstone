"use strict"


const searchUrl = `https://pixabay.com/api/?key=15386213-fd2b415b0403776dbc63e2f69`

// STATE

const state = {
    data: [],
}


// GENERATE ELEMENTS

function generateHomePage() {
  $(".homepage").append(
      `
        <div class="color-picker">
        <input id="red"></input>
        <input id="purple"></input>
        <input id="black"></input>
        <input id="orange"></input>
        <input id="white"></input>
        <input id="grey"></input>
        <input id="blue"></input>
        <input id="green"></input>
        <input id="yellow"></input>          
      </div>`);
      
}

function generateSlideShow(state) {
    
    $(".slideshow-section").removeClass("hidden");
    
    for (let i = 0; i < state.data[0].hits.length; i++) {
        $(".slideshow-section").append(
            `<div class="slides fade">
            <img src=${state.data[0].hits[i].largeImageURL} alt=${state.data[0].hits[i].tags} style="width:100%"/>
            <p>Images from <a href="https://pixabay.com"><img id="pixabayLogo" src="misc/logo.png" alt="Pixabay logo"/></a>
            </p>
            </div>`  
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
    timeoutVariable = setTimeout(showSlides, 3000); 
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

function getSlideshowImages(colorName, category) {

    const searchCategory = `${encodeURIComponent("q")}=${encodeURIComponent(category)}`
    const searchColor = `${encodeURIComponent("colors")}=${encodeURIComponent(colorName)}`

    const queryField = searchUrl + `&` + searchCategory + `&image_type=photo&category=nature&orientation=portrait&safesearch="true"` + `&` + searchColor;

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
        $("#error-message").text(`Something went wrong: ${err.message}`);
    });
 }



// HANDLERS

function watchInput() {

$(".color-picker input").on("click", function(event) {
    
    
    state.data.length = 0;
    
    event.preventDefault();
    $(".homepage").addClass("hidden");
    $("#footer").addClass("invisible");
    $("#header").addClass("invisible");
   
    let colorName = $(this).attr("ID");
       
    let category = getCategory(colorName);

    getSlideshowImages(colorName, category)
  
    })

}

function changeSlideshow() {

    $(".slideshow-section").on("click", function(event) {

        state.data.length = 0;
        clearTimeout(timeoutVariable);
        $(".slideshow-section").empty();
        $(".homepage").removeClass("hidden");
        $("#footer").removeClass("invisible");
        $("#header").removeClass("invisible");

        
    })
}



// IMPLEMENT

$(generateHomePage);

$(watchInput);
$(changeSlideshow)