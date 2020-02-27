"use strict"


const searchUrl = ``

function generateHomePage() {
  $(".homepage").append(
      `<div class="color-picker">
      <input id="red"></input>
      <input id="purple"></input>
      <input id="black"></input>
      <input id="orange"></input>
      <input id="white"></input>
      <input id="grey"></input>
      <input id="blue"></input>
      <input id="green"></input>
      <input id="yellow"></input>
  </div>`
  )
}

function generateSlideShow(responseJson) {
    $(".second-color-picker").addClass("hidden");
    $(".slideshow-section").removeClass("hidden");
    

    for (let i = 0; i < responseJson.hits.length; i++) {
        $(".slideshow-container").append(
            `<div class="slides fade">
            <img src=${responseJson.hits[i].largeImageURL} alt=${responseJson.hits[i].tags} style="width:100%"/>
            </div>`
        )
    }
  }

  var slideIndex = 0;
  

  
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
    
    setTimeout(showSlides, 3000); 
  }


function getHomePageImage(url) {
 

}

function getImages(colorName, category) {

    const searchCategory = `${encodeURIComponent("q")}=${encodeURIComponent(category)}`
    const searchColor = `${encodeURIComponent("colors")}=${encodeURIComponent(colorName)}`

    const queryField = searchUrl + `&` + searchCategory + `&image_type=photo&category=nature&orientation=portrait` + `&` + searchColor;


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




function getRandomNumber(i) {
    let categoryNumber = imageCategories[i].category.length;
    let randomNumber = Math.floor((Math.random() * categoryNumber) + 0)
    return randomNumber;
}

function getCategory(colorName) {
    // gets random category using color input
   

    for (let i = 0; i < imageCategories.length; i++) {

        let string = imageCategories[i].color;

        if (string === colorName) {
            let randomNumber = getRandomNumber(i);
            let category = imageCategories[i].category[randomNumber];
            return category;
        } 
    } 
        
}


function watchInput() {

$(".color-picker input").on("click", function(event) {
    $(".homepage").addClass("hidden");
    $("#footer").addClass("invisible");
    $("#header").addClass("invisible");
   
    event.preventDefault();

    let colorName = $(this).attr("ID");
    
    
    const category = getCategory(colorName);

    getImages(colorName, category)

    
    
    })

}


$(generateHomePage);
$(watchInput)