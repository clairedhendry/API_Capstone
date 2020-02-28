"use strict"


const searchUrl = `https://pixabay.com/api/?key=15386213-fd2b415b0403776dbc63e2f69`


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

// function generateHomePageImage(responseJson) {
//     let hitNumber = responseJson.hits.length;
//     let randomNumber = Math.floor((Math.random() * hitNumber) + 0);    
//     let image = `url(${responseJson.hits[randomNumber].largeImageURL})`;
//     let background = `${image} no-repeat center`
//     $(".main-container").css({"background": background, "background-color": "lightgrey"});
// }



function generateSlideShow(responseJson) {
    
    $(".slideshow-section").removeClass("hidden");
    

    for (let i = 0; i < responseJson.hits.length; i++) {
        $(".slideshow-section").append(
            `<div class="slides fade">
            <img src=${responseJson.hits[i].largeImageURL} alt=${responseJson.hits[i].tags} style="width:100%"/>
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


// function getHomePageImage() {
    
//     const queryField = searchUrl + `&q=nature&image_type=photo&category=animals&orientation=vertical&editors_choice="true"&safesearch="true"`;

//     fetch(queryField)
//     .then(response => {
//         if(response.ok) {
//             return response.json();
//         } else {
//             throw new Error(response.statusText);
//         }
//     })
//     .then(responseJson => generateHomePageImage(responseJson))
//     .catch(err => {
//         $("#error-message").text(`Something went wrong: ${err.message}`);
//     });

// }

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
    .then(responseJson => generateSlideShow(responseJson))
    .then(showSlides)
    .catch(err => {
        $("#error-message").text(`Something went wrong: ${err.message}`);
    });
 }



// HANDLERS

function watchInput() {

$(".color-picker input").on("click", function(event) {
    
    
    // event.preventDefault();
    $(".homepage").addClass("hidden");
    $("#footer").addClass("invisible");
    $("#header").addClass("invisible");
   
    let colorName = $(this).attr("ID");
       
    const category = getCategory(colorName);

    getSlideshowImages(colorName, category)
  
    })

}

function changeSlideshow() {

    $(".slideshow-section").on("click", function(event) {
        clearTimeout(timeoutVariable);
        $(".slides").remove();
        $(".homepage").removeClass("hidden");
        $("#footer").removeClass("invisible");
        $("#header").removeClass("invisible");

        watchInput();
    })
}


// IMPLEMENT

$(generateHomePage);
// $(getHomePageImage);
$(watchInput);
$(changeSlideshow)