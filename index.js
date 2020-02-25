"use strict"


const searchUrl = ``

function generateHomePage() {
// generates HTML for home page
}

function generateSlideShow() {
// generates slideshow
// uses the getImages(color, category) function to populate slideshow
}

function getHomePageImage(url) {

}

// function formatQueryParams(params) {
//     return ``
// }

function getImages(colorName, category) {

    const searchCategory = `${encodeURIComponent("q")}=${encodeURIComponent(category)}`
    const searchColor = `${encodeURIComponent("colors")}=${encodeURIComponent(colorName)}`

    const queryField = searchUrl + `&` + searchCategory + `&image_type=photo&category=nature&orientation=portrait` + `&` + searchColor;

    // const params =

    // const queryString = formatQueryParams(params);

    fetch(queryField)
    .then(response => {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error(response.statusText);
        }
    })
    .then(responseJson => console.log(responeJson))
    .catch(err => {
        $("#error-message").text(`Something went wrong: ${err.message}`);
    });
 }


// uses input color from watchInput()
// uses randomly selected category based on color input


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

// eventlistener to see what input is pressed
// hide homepage elements, color-picker, and footer

$("input").on("click", function(event) {
    // $(".homepage").addClass("hidden");
    // $("#footer").addClass("invisible");
    // $("#header").addClass("invisible");
   
    event.preventDefault();

    let colorName = $(this).attr("ID");
    
    
    const category = getCategory(colorName);

    // console.log(colorName);
    // console.log(category);

    getImages(colorName, category);

    })

   
}



$(watchInput)