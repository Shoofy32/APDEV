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

// Function opens the post and moves user to the userpost html file
function openPost(){

    window.open("../forumpage/userpost.html", "_self");

}



// Function opens the challenge window
function openChallenge(divElement){
    
    // Obtain the Challenge Div Element
    var challengeElement = divElement.getElementsByClassName("challenge")[0];

    // Obtain the Roll 20 Number and the Result Text Elements
    var displayResultNumberElement = divElement.getElementsByClassName("roll_20_number")[0];
    var displayResultElement = divElement.getElementsByClassName("result")[0];

    // Obtain ClassList, and Toggle or Untoggle if it Contains "open" or not.
    if(!challengeElement.classList.contains("open"))
        challengeElement.classList.add("open");
    else{

        challengeElement.classList.remove("open");

        // Empty the Roll 20 Number and Result Text Elements When Closing
        displayResultNumberElement.textContent = "";
        displayResultElement.textContent = "Result";

    }

}


// rollD20 Global Variables
const loopDelay = 80; // Determines the delay per each iteration of for loop in rolling the D20
const numOfLoops = 20; // Determine the number of iterations in rolling the D20


// Asynch Function Rolls a Pseduo-D20 to Display a Number Between 0-20.
async function rollD20(divElement){

    // Obtain the Value of the Number of Likes Input Box
    var likesElement = divElement.getElementsByClassName("betLikes")[0];

    // Obtain the Roll 20 Number and the Result Text Elements
    var displayResultNumberElement = divElement.getElementsByClassName("roll_20_number")[0];
    var displayResultElement = divElement.getElementsByClassName("result")[0];


    // Checks if Input Box has a Positive Value
    if(likesElement.value >= 1){

        var roll = 0; // Stores the Result of the Roll


        // For loop, Iterates through numOfLoops with a loopDelay and Updates displayResultNumber's Text Content with a Number 0-20
        for(var i = 0; i < numOfLoops; i++){

            roll = Math.floor(Math.random() * 20); // Roll a number 0-20

            displayResultNumberElement.textContent = roll; // Update Text Content with roll Value

            await timer(loopDelay); // Delay Next for Loop iteration by loopDelay (ms)

        }

        // Add a Special Color in the Event User rolls a 20 or 1.
        if(roll == 20)
            displayResultElement.style.color = "orange";
        else if(roll == 1)
            displayResultElement.style.color = "orangered";

        // Update displayResultElement with Final Value
        displayResultElement.textContent = "You rolled a " + roll;

        likesElement.value = 0; // Reset Input Box to Contain 0

    }
    else{

        // Display Error when Non-Positive Number is Inputted
        displayResultElement.textContent = "Please provide a positive number!";
        displayResultElement.style.color = "orangered";

    }

}

// Create a new anonymous Promise object that will create a timer based on parameter input
function timer(ms){

    // Create a Promise Object, that will Timeout itself Based on the ms parameter
    var promise = new Promise(res => setTimeout(res, ms));

    return promise;

}