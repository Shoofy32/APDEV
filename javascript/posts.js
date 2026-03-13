document.addEventListener("DOMContentLoaded", () => {


    // Check if userpost to avoid loading backend in forum page
    if(window.location.pathname != "/html/forum.html"){

        loadPost(id)
  
        loadPosts(id);

    }

    // Add eventlistener to the post container
    const all_posts = document.getElementsByClassName("all_posts")[0];

    const closeChallengeButton = document.getElementById("closeChallenge"); // Close challenge button
    const betChallengeButton = document.getElementsByClassName("postBet")[0]; //  Challenge bet button

    // Add event listener on all posts
    all_posts.addEventListener("click", function(event) {

        event.stopPropagation();

        // Targets the closest elements based on where you clicked
        const post_reply = event.target.closest(".post, .reply");

        const replyBtn = event.target.closest(".reply_button"); // Reply button
        const likeButton = event.target.closest(".fa-thumbs-up"); // Like button
        const dislikeButton = event.target.closest(".fa-thumbs-down"); // Dislike button
        const challengeButton = event.target.closest(".challenge_button"); // Challenge button
        const editButton = event.target.closest(".edit_button"); // Edit button
        const deleteButton = event.target.closest(".delete_button"); // Delete button

        
        // If conditions check for which button was clicked and calls the function corresponding to that button
        if(replyBtn)
            replyPost(replyBtn.closest(".post, .reply"));
        else if(likeButton)
            updateCounter(likeButton, likeButton.closest(".counter_container").parentElement);
        else if(dislikeButton)
            updateCounter(dislikeButton, dislikeButton.closest(".counter_container").parentElement);
        else if(challengeButton)
            openChallenge();
        else if(editButton)
           editDescription(editButton);
        else if(deleteButton){

            deleteButton.closest(".post, .reply").remove();

        }
        // If post reply is clicked, and user is not in userpost and clicked on an edit area, open the post and load userpost.html
        else if(post_reply && window.location.pathname != "/html/userpost.html" && !event.target.closest("#editArea") && !event.target.closest("#edit_container"))
           
            openPost(post_reply.id);


    });



    // If pressed, open challenge container
    closeChallengeButton.addEventListener("click", openChallenge);

    // If bet challenge button is pressed, call rollD@0
    betChallengeButton.addEventListener("click", () => {

        rollD20(betChallengeButton.closest(".challenge"));

    });



// ------------------ FUNCTIONS ------------------ //


    // Function updates the like and dislike counter when pressed (increment or decrement)
    function updateCounter(buttonElement, divElement){

        var counterElement = buttonElement.nextElementSibling; // Get the counter element

        var countValue = parseInt(counterElement.textContent); // Get the integer value of the counter element

        
        // Boolean that checks whether button is true or false
        var isClicked = buttonElement.style.color === "coral"

        // If condition gets the other button Depending on which buttonElement is in th parameter
        if(buttonElement.classList.contains("fa-thumbs-up"))
            var otherButton = divElement.getElementsByClassName("fa-thumbs-down")[0]; // Get the thumbs down button
        else
            var otherButton = divElement.getElementsByClassName("fa-thumbs-up")[0]; // Get the thumbs up button

        // Boolean contains whether the other button was clicked or not
        var otherButtonClicked = otherButton.style.color === "coral"; 




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
    function openPost(id){

        window.location.href = `userpost.html?id=${id}`;

    }


    // Function opens the challenge window
    function openChallenge(){

        // Obtain the Challenge Div Element
        var challengeElement = document.getElementsByClassName("challenge")[0];

        // Obtain the Roll 20 Number and the Result Text Elements
        var displayResultNumberElement = document.getElementsByClassName("roll_20_number")[0];
        var displayResultElement = document.getElementsByClassName("result")[0];

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
    window.uploadReply = function uploadReply(divElement){
    alert("test")

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
        ` <div class="post">

            <div class="icon_name_date_post">

                <img src="../resources/users/kirk.jfif">
                <h5 class="name_post">StefanHates</h5>
                <p class="date_post">3/13/2026</p>

            </div>

            <!-- Description of post replied to -->
            <div class="replying_to_container"><span class = "user_repliedto">${userToReplyTo.innerText} said:</span><br><br>
                <p>
                    ${userReplyToDescription.innerText}
                </p>
            </div>

            <!-- Short Description of Post -->
            <p class = "description_short_post"> 
                ${replyContent.value}
            </p>


            <div class="stats_post">

                <div class="counter_container">

                    <i class="fa-regular fa-thumbs-up"></i>
                    <p class="like_counter">0</p>

                </div>

                <div class="counter_container">

                    <i class="fa-regular fa-thumbs-down"></i>
                    <p class="like_counter">0</p>

                </div>

                <div class="reply_button">

                    <i class="fa-regular fa-comment"></i>
                    <p class="comment_counter">Reply</p>
                    
                </div>
                
                <div class="challenge_button">

                    <i class="fa-solid fa-bullseye"></i>
                    <p class="challenge_text">Challenge</p>

                </div>
                
                <div class="delete_edit_container">

                    <button class="delete_button">

                        <i class="fa-regular fa-trash-can"></i>
                        <h4>Delete</h4>

                    </button>

                    <button class="edit_button">

                        <i class="fa-solid fa-pen-to-square">
                        </i><h4>Edit</h4>

                    </button>

                </div>

            </div>

        </div>`;

        //Add reply to backend
        addReply(
            "StefanHates",
            userToReplyTo.textContent,
            userReplyToDescription.innerText,
            replyContent.value,  
            id,
            0
        );

        // Insert post to the very end of the posts container
        postContainer.insertAdjacentHTML("beforeend", postReplyContainer);
        
        // Empty input box and remove reply
        replyContent.value = "";
        replyContainer.remove();



    }



    }


    function editDescription(editButton){

        var parent_div = editButton.closest(".post, .reply");
        var contents = parent_div.querySelector(".description_short_post")
        var current_content = contents.innerText;
        var parent_id = parent_div.id
        contents.innerHTML = 
        `<textarea id="editArea"> ${current_content}</textarea>
        <div id="edit_container">
            <button id="Save">Save </button>
        </div>` ;

        var textarea = document.getElementById("editArea");
        var save = document.getElementById("Save");

        save.addEventListener("click", function(e) {
            e.stopPropagation();
            e.preventDefault();
            contents.innerHTML = `<p>${textarea.value} <strong>(edited)</strong></p>`
            //If its a post use updatePost
           
            if(parent_div.classList.contains("post")) {
                updatePost(parent_id, textarea.value, true)
            }



            else if(parent_div.classList.contains("reply")) {
                updateReply(parent_id, textarea.value, true)
            }
        });


    }

});


