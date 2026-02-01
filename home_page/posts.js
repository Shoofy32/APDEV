
// Function updates the like and dislike counter when pressed (increment or decrement)
function updateCounter(buttonElement, divElement){

    var counterElement = buttonElement.nextElementSibling; // Get the counter element

    var countValue = parseInt(counterElement.textContent); // Get the integer value of the counter element
    var isClicked = (buttonElement.dataset.clicked === "true") // Boolean that checks whether clicked data- is true or false

    var like_dislike_button; // Contains the other button in the div element
    var otherButtonClicked; // Boolean contains whether the other button clicked data- is true or false


    // If condition gets the other button Depending on which buttonElement is the parameters and the clicked data-
    if(buttonElement.classList.contains("fa-thumbs-up"))
        like_dislike_button = divElement.getElementsByClassName("fa-thumbs-down")[0]; // Get the thumbs down button
    else
        like_dislike_button = divElement.getElementsByClassName("fa-thumbs-up")[0]; // Get the thumbs up button

    otherButtonClicked = (like_dislike_button.dataset.clicked === "true")


    /*
    If condition checks whether button has been clicked or not (One person can only increment or decrement once)
    If isClicked is false = Increment counter and update color of button to coral
    If isClicked is true = Decrement counter and update color of button to white
    Also checks if the other button has been clicked to prevent both like and dislike being active
    */
    if(isClicked == false && otherButtonClicked == false){

        countValue++;
        buttonElement.dataset.clicked = "true"; // Switch clicked data- to true
        
        buttonElement.style.color = "coral";

    }
    else if(isClicked == true && otherButtonClicked == false){

        countValue--;
        buttonElement.dataset.clicked = "false"; // Switch clicked data- to false

        buttonElement.style.color = "white";

    }

    counterElement.innerHTML = countValue;

}


function openPost(){




}