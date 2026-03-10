
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


// Function opens User Post Page
function openPost(){

    window.location.href = "userpost.html";

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


// Function controls whether to open the reply container or remove it based if the container already exists
function replyPost(divElement){

    let replyContainer = document.getElementsByClassName("create_reply_container"); // Reply container

    // Check if the reply container exists by checking length
    if(replyContainer.length === 0)
        createReply(divElement); // Call function to create the container
    else
        replyContainer[0].remove(); // Remove the container

}

// Store global variables for the name and description of the that was replied to 
let userToReplyTo;
let userReplyToDescription;

// Function creates the reply container to be added in the posts container
function createReply(divElement){

    userToReplyTo = divElement.getElementsByClassName("name_post")[0]; // Name of the user replying to
    userReplyToDescription = divElement.getElementsByClassName("description_short_post")[0]; // Description of the user replying to

    // Reply HTML
    const newReplyContainer = `<div class = "create_reply_container">

                                <div class = "closeReply" onclick = " replyPost(this.parentElement.parentElement); event.stopPropagation()">
                                    <i class = "fa-regular fa-circle-xmark fa-2xl"></i>
                                </div> 

                                <div class = "reply_to">
                                    Replying to <strong>${userToReplyTo.textContent}</strong>
                                </div>

                                <textarea class = "reply_content" name="content" placeholder = "Reply"></textarea>

                                <div>
                                    <p class = "reply_error"><p>
                                <div>

                                <div class = "confirm_post_container">
                                    <button class = "confirm_post" onclick = "uploadReply()">Post</button> 
                                </div>
                                

                            </div>`;


    // Insert reply below the post replying to
    divElement.insertAdjacentHTML("afterend", newReplyContainer);                     
    
}


// Function creates the reply after pressing the enter button on the reply container
function uploadReply(divElement){

    const postContainer = document.getElementsByClassName("all_posts")[0]; // Container for all posts
    
    const replyContent = document.getElementsByClassName("reply_content")[0]; // Reply content
    const replyContainer = document.getElementsByClassName("create_reply_container")[0]; // Reply container

    const replyError = document.getElementsByClassName("reply_error")[0]; // Reply error

    // Show error if input is empty
    if(replyContent.value === "")
        replyError.innerHTML = `<strong>Reply can't be empty!</strong>`;
    else{

        // Reply Post HTML
        replyError.innerHTML = ``;

        const postReplyContainer = 
        ` <div class = "reply">

            <!-- Div Contains the PFP, Username, and Date of Post-->
            <div class = "icon_name_date_post">

                <img src = "../resources/users/zed.jpg">

                <a href = "userpages/zed.html"><p class = "name_post"> TheNinjaDude </p></a>

                <a href = "userpages/zed.html"><p class = "date_post"> 2 days ago </p></a>


            </div>

            <!-- Description of post replied to -->
            <div class="replying_to_container"><span class = "user_repliedto">${userToReplyTo.textContent} said:</span><br><br>
                <p>
                    ${userReplyToDescription.textContent}
                </p>
            </div>

            <!-- Short Description of Post -->
            <p class = "description_short_post"> 
                ${replyContent.value}
            </p>

            <!-- Div contains likes and dislikes counter -->
            <div class = "stats_post" onclick = "event.stopPropagation();"> <!-- Prevent onclick to open post -->

                <!-- Div contains like counter and its value -->
                <div class = "counter_container">

                    <!-- stopPropogation prevents button from opening up userpost forum -->
                    <i class = "fa-regular fa-thumbs-up" onclick = "updateCounter(this, this.parentElement.parentElement); event.stopPropagation();" data-clicked = "false"></i>
                    
                    <p class = "like_counter"> 10 </p>

                </div>

                <!-- Div contains dislike counter and its value -->
                <div class = "counter_container">

                    <!-- stopPropogation prevents button from opening up userpost forum -->
                    <i class="fa-regular fa-thumbs-down" onclick = "updateCounter(this, this.parentElement.parentElement); event.stopPropagation();" data-clicked = "false"></i>
                    
                    <p class = "dislike_counter"> 15 </p>

                </div>

                <!-- Div contains dislike counter and its value -->
                <div class = "reply_button" onclick = " replyPost(this.parentElement.parentElement); event.stopPropagation()">

                    <!-- stopPropogation prevents button from opening up userpost forum -->
                    <i class="fa-regular fa-comment"></i>
                    
                    <p class = "reply_text"> Reply </p>

                </div>

                <!-- Div contains challenge button and Links Through openChallenge When Pressed --> <!-- stopPropogation prevents button from opening up userpost forum -->
                <div class = "challenge_button" onclick = "openChallenge(this.parentElement.parentElement); event.stopPropagation();">

                    <i class="fa-solid fa-bullseye"></i>
                    
                    <p class = "challenge_text"> Challenge </p>

                </div>

                <div class="delete_edit_container">

                    <button class = "delete_button">
                    <i class="fa-regular fa-trash-can"></i> <h4>Delete</h4>
                    </button>
                    <button class = "edit_button">
                    <i class="fa-solid fa-pen-to-square"></i> <h4>Edit</h4>
                    </button>

                </div>

            </div>


            <!-- Div contains the challenge container -->
            <div class = "challenge" id = "challenge_container">

                <!-- Div Contains Close Challenge button and Links Through openChallenge When Pressed -->
                <div> <!-- stopPropogation prevents button from opening up userpost forum -->
                    <button id = "closeChallenge" onclick = "openChallenge(this.parentElement.parentElement.parentElement); event.stopPropagation();"><i class="fa-regular fa-circle-xmark fa-large"></i></button>
                </div>

                <h2 class = "roll_20"> Roll D20 </h2>

                <p class = "roll_20_number"></p>


                <div class = "dicebg">
                    <img src="../../resources/images/d20.png">
                </div>

                <p class = "result"> Result </p>

                <!-- Div contains Bet Container Likes Input and Button and Links rollD20 When Button is Pressed -->
                <div class = "bet_container">

                    <p> Bet Likes </p>

                    <!-- stopPropogation prevents button from opening up userpost forum -->
                    <input class = "betLikes" type = "number" placeholder = "0" onclick = "event.stopPropagation();"></input>
                    <button id = "postBet" onclick = "rollD20(this.parentElement.parentElement); event.stopPropagation();">Bet</button> 

                </div>

            </div>


        </div>`;

        // Insert post to the very end of the posts container
        postContainer.insertAdjacentHTML("beforeend", postReplyContainer);

        // Empty input box and remove reply
        replyContent.value = "";
        replyContainer.remove();



    }



}
