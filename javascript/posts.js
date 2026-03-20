document.addEventListener("DOMContentLoaded", () => {

    var response;
    var info;

    (async () => {
        response = await fetch("/user-login"); // Fetch from route
        info = await response.json() // Convert to object
    })();

    const page_url = window.location.href;
    const index = page_url.indexOf("page=");
    const raw_page = index !== -1 ? page_url.substring(index + 5).split("&")[0] : "";
    const page_number = parseInt(raw_page);

    const params = new URLSearchParams(window.location.search);
    const forumTitle = decodeURIComponent(params.get("forum")).split("?")[0];
    const page = parseInt(params.get("page")) || 1;

    const invalidPage = !page_url.includes("page=") || !/^\d+$/.test(raw_page) || page_number < 1;
    
    if(invalidPage && page_url.includes("forum")) {
        window.location.href = `/forum?forum=${encodeURIComponent(forumTitle)}&page=1`;
    }

    if(invalidPage && page_url.includes("userpost")) {
        window.location.href = `/userpost.html?id=${id}&page=1`;
    }


    const all_posts = document.getElementsByClassName("all_posts")[0];
    const closeChallengeButton = document.getElementById("closeChallenge"); // Close challenge button
    const betChallengeButton = document.getElementsByClassName("postBet")[0]; //  Challenge bet button

    let challengedUser;
 
    // Check if userpost to avoid loading backend in forum page
    if((!window.location.pathname.endsWith("forum.html")) && (!window.location.pathname.endsWith("homepage.html") 
        && !window.location.pathname.endsWith("userprofile.html"))){

    
    (async () => {
      
        await loadPost(id,page);
        loadPosts(id, page);
    })();

    }

    // Add event listener on all posts for event delegating
    all_posts.addEventListener("click", function(event) {

        event.stopPropagation();

        // Targets the closest elements based on where you clicked
        const post_reply = event.target.closest(".post, .reply");
        const post_user = event.target.closest(".name_post"); //username
        const replyBtn = event.target.closest(".reply_button"); // Reply button
        const likeButton = event.target.closest(".fa-thumbs-up"); // Like button
        const dislikeButton = event.target.closest(".fa-thumbs-down"); // Dislike button
        const challengeButton = event.target.closest(".challenge_button"); // Challenge button
        const editButton = event.target.closest(".edit_button"); // Edit button
        const deleteButton = event.target.closest(".delete_button"); // Delete button
        const postNameLinks = event.target.closest(".name_post"); // Username posts

        
        // If conditions check for which button was clicked and calls the function corresponding to that button
        if(replyBtn)
            replyPost(replyBtn.closest(".post, .reply"));
        else if(likeButton)
            updateCounter(likeButton, likeButton.closest(".counter_container").parentElement);
        else if(dislikeButton)
            updateCounter(dislikeButton, dislikeButton.closest(".counter_container").parentElement);
        else if(challengeButton){

            challengedUser = post_reply.getElementsByClassName("name_post")[0].textContent;
            openChallenge();

        }

        else if(editButton)
           editDescription(editButton);
        else if(deleteButton)
            deleteButton.closest(".post, .reply").remove();
        else if(postNameLinks)
            window.location.href = "/userprofile/"+post_user.innerHTML; // Added path to userpost.html
        // If post reply is clicked, and user is not in userpost and clicked on an edit area, open the post and load userpost.html
        else if(post_reply && !(window.location.pathname.includes("userpost")) && !event.target.closest("#editArea") && !event.target.closest("#edit_container"))
            openPost(post_reply.id);


    });


    // If pressed, open challenge container
    closeChallengeButton.addEventListener("click", openChallenge);

    // If bet challenge button is pressed, call rollD20
    betChallengeButton.addEventListener("click", (event) => {

        event.stopPropagation();

        if(!betChallengeButton.dataset.challengeFromNotification)
            rollD20(betChallengeButton.closest(".challenge"), true);

    });





// ------------------ FUNCTIONS ------------------ //


    // Function updates the like and dislike counter when pressed (increment or decrement)
    async function updateCounter(buttonElement, divElement){
        const parentPost = divElement.parentElement
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
            //Check if it is a post
            if(parentPost.classList.contains("post")) {
                //When like is pressed add 1 like
                if(otherButton.classList.contains("fa-thumbs-down")) {
                    updateUserLikedPosts(info.user._id, parentPost.id)
                    updatePostLikes(parentPost.id, 1)
                    updateUserLikesPost(parentPost.id,1)
                    console.log(info.user.liked_posts_id)
                    
                }

            else {
                    updateUserDislikedPosts(info.user._id, parentPost.id)
                    updatePostDislikes(parentPost.id, 1)
                   

                }
            }
            //Check if it is a reply
            if(parentPost.classList.contains("reply")) {
                //When like is pressed add 1 like

                if(otherButton.classList.contains("fa-thumbs-down")) {
                    updateUserLikedReplies(info.user._id, parentPost.id)
                    updateReplyLikes(parentPost.id, 1)
                    updateUserLikesReply(parentPost.id,1)
                }

                else {
                    updateReplyDislikes(parentPost.id, 1)
                    updateUserDislikedReplies(info.user._id, parentPost.id)
                }
            }
           

        }
        else if(isClicked == true && otherButtonClicked == false){

            countValue--;
            buttonElement.dataset.clicked = "false"; // Switch clicked data- to false

            buttonElement.style.color = "white";
            //Check if post
            if(parentPost.classList.contains("post")) {
                //When like is pressed again subtract 1 like
                if(otherButton.classList.contains("fa-thumbs-down")) {
                    updatePostLikes(parentPost.id, -1)
                    removeUserLikedPosts(info.user._id, parentPost.id)
                    updateUserLikesPost(parentPost.id,-1)
                }
                else {
                    updatePostDislikes(parentPost.id, -1)
                    removeUserDislikedPosts(info.user._id, parentPost.id)
                }

            }

            //Check if reply
            if(parentPost.classList.contains("reply")) {
                //When like is pressed again subtract 1 like
                if(otherButton.classList.contains("fa-thumbs-down")) {
                   
                    updateReplyLikes(parentPost.id, -1)
                    removeUserLikedReplies(info.user._id, parentPost.id)
                }

                else {
                    updateReplyDislikes(parentPost.id, -1)
                    removeUserDislikedReplies(info.user._id, parentPost.id)
                }

            }
          

        }

        counterElement.innerHTML = countValue;

    }


    // Function opens User Post Page
    function openPost(id){

        window.location.href = `/userpost?id=${id}&page=1`;

    }


    // Function opens the challenge window
    function openChallenge(){

        // Obtain the Challenge Div Element
        var challengeElement = document.getElementsByClassName("challenge")[0];

        // Obtain the Roll 20 Number and the Result Text Elements
        var displayResultNumberElement = document.getElementsByClassName("roll_20_number")[0];
  
        var displayResultElement = document.getElementsByClassName("result")[0];

        // Empty the Roll 20 Number and Result Text Elements When Closing
        displayResultNumberElement.textContent = "";
        displayResultElement.textContent = "Result";

        
        challengeElement.classList.toggle("open");

    }


    // rollD20 Global Variables
    const loopDelay = 80; // Determines the delay per each iteration of for loop in rolling the D20
    const numOfLoops = 20; // Determine the number of iterations in rolling the D20


    // Asynch Function Rolls a Pseduo-D20 to Display a Number Between 0-20.
    async function rollD20(divElement, isRollForChallengingUser){

        // Obtain the amount of likes the user has
        var userCurrentLikesContainer = document.getElementsByClassName("like_amount")[0];
        var userCurrentLikes = parseInt(userCurrentLikesContainer.textContent);

        // Obtain the Value of the Number of Likes Input Box
        var likesValueContainer = divElement.getElementsByClassName("betLikes")[0];
        var likesValue = likesValueContainer.value;

        // Obtain the Roll 20 Number and the Result Text Elements
        var displayResultNumberElement = divElement.getElementsByClassName("roll_20_number")[0];
        var displayResultElement = divElement.getElementsByClassName("result")[0];



        // Checks if Input Box has a Positive Value and the bet likes does not exceed what the user already has
        if(likesValue >= 1 && likesValue <= userCurrentLikes){

            var roll = 0; // Stores the Result of the Roll


            // For loop, Iterates through numOfLoops with a loopDelay and Updates displayResultNumber's Text Content with a Number 0-20
            for(var i = 0; i < numOfLoops; i++){

                roll = Math.floor(Math.random() * 20) + 1; // Roll a number 1-20

                displayResultNumberElement.textContent = roll; // Update Text Content with roll Value

                await timer(loopDelay); // Delay Next for Loop iteration by loopDelay (ms)

            }


            // Add a Special Color in the Event User rolls a 20, 1, or neither.
            if(roll == 20)
                displayResultElement.style.color = "orange";
            else if(roll == 1)
                displayResultElement.style.color = "orangered";
            else
                displayResultElement.style.color = "#ff956e";


            // Subtract bet amount from user's current likes
            userCurrentLikesContainer.textContent = userCurrentLikes - likesValue;

            // Check if user is logged in, and if so, update their like counter in the session and database
            if(window.userLoggedIn)
                await updateLikes(userCurrentLikes - likesValue);


            // Checks if the roll was for challenging a user (false) or for being challenged (true)
            if(isRollForChallengingUser)
                createChallengeNotification(challengedUser, roll, likesValue) // Call function to create the challenge for the user who was challenged.


            // Update displayResultElement with Final Value
            displayResultElement.textContent = "You rolled a " + roll;
            likesValueContainer.value = ""; // Reset Input Box to Contain 0


            return roll; // Return number roll so that other functions may use it


        }
        else if(likesValue < 1 && likesValue <= userCurrentLikes){

            // Display Error when Non-Positive Number is Inputted
            displayResultElement.textContent = "Please provide a positive number!";
            displayResultElement.style.color = "orangered";

        }
        else{

            // Display Error when user bet an amount greater than what they have
            displayResultElement.textContent = "Bet can't exceed amount of likes user has!";
            displayResultElement.style.color = "orangered";

        }

        return 0; // Return empty roll

    }



    // Create a new anonymous Promise object that will create a timer based on parameter input
    function timer(ms){

        // Create a Promise Object, that will Timeout itself Based on the ms parameter
        var promise = new Promise(res => setTimeout(res, ms));

        return promise;

    }


    let previousPostReply;

    // Function controls whether to open the reply container or remove it based if the container already exists
    function replyPost(divElement,){



        let replyContainer = document.getElementsByClassName("create_reply_container"); // Reply container

        console.log(previousPostReply);

        // Check if the reply container exists by checking length
        if(replyContainer.length === 0){

            createReply(divElement);
            previousPostReply = divElement;
            console.log("1");

        }
        else if(previousPostReply != divElement && replyContainer.length > 0){

            replyContainer[0].remove(); // Remove the container
            createReply(divElement); // Call function to create the container
            previousPostReply = divElement;
            console.log("2");

        }
        else if(previousPostReply === divElement && replyContainer.length > 0){

            replyContainer[0].remove(); // Remove the container   
            console.log("3");

        }



    }

    
    // Store global variables for the name and description of the that was replied to 
    let userToReplyTo;
    let userReplyToDescription;
    let replyPostId //parent reply id
    // Function creates the reply container to be added in the posts container
    function createReply(divElement){
    
    userToReplyTo = divElement.getElementsByClassName("name_post")[0]; // Name of the user replying to
    userReplyToDescription = divElement.getElementsByClassName("description_short_post")[0]; // Description of the user replying to
    replyPostId = divElement.id;
    // Reply HTML
    const newReplyContainer = `<div class = "create_reply_container">

                                <div class = "closeReply" onclick = "document.getElementsByClassName('create_reply_container')[0].remove(); event.stopPropagation()"> 
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
                                    <button class = "confirm_post" onclick = "uploadReply(${replyPostId.id})">Post</button> 
                                </div>
                                

                            </div>`;


    // Insert reply below the post replying to
    divElement.insertAdjacentHTML("afterend", newReplyContainer);                     

    }


    // Function creates the reply after pressing the enter button on the reply container
    window.uploadReply = function uploadReply(divElement){
    console.log("replyPostId:", replyPostId)

    const postContainer = document.getElementsByClassName("all_posts")[0]; // Container for all posts
    
    const replyContent = document.getElementsByClassName("reply_content")[0]; // Reply content
    const replyContainer = document.getElementsByClassName("create_reply_container")[0]; // Reply container

    const replyError = document.getElementsByClassName("reply_error")[0]; // Reply error
    const date = new Date().toLocaleDateString();
    // Show error if input is empty
    if(replyContent.value === "")
        replyError.innerHTML = `<strong>Reply can't be empty!</strong>`;
    else{

        // Reply Post HTML
        replyError.innerHTML = ``;

        const postReplyContainer = 
        ` <div class="post">

            <div class="icon_name_date_post">

                <img src="${info.user.profile}">
                <h5 class="name_post">${info.user.username}</h5>
                <p class="date_post">${date}</p>

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
            info.user.username,
            userToReplyTo.textContent,
            userReplyToDescription.innerText,
            replyContent.value,
            id,           // unique_post_id
            replyPostId,  // parent_reply_id
            info.user._id // poster_id
            );


            updateTotalComments(id, 1)
                
       

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
        if(current_content.includes("(edited)"))
           current_content = current_content.replace("(edited)", "")
        contents.innerHTML = 
        `<textarea id="editArea"> ${current_content}</textarea>
        <div id="edit_container">
            <button id="Save">Save </button>
        </div>` ;

        var textarea = document.getElementById("editArea");
        var save = document.getElementById("Save");

       
        save.addEventListener("click", async function(e) {
        e.stopPropagation();
        e.preventDefault();

        //Update UI instantly
        contents.innerHTML = `<p>${textarea.value} <strong>(edited)</strong></p>`;

        //Save to backend in background
        if(parent_div.classList.contains("post")) {
            await updatePost(parent_id, textarea.value, true);
            location.reload(); // reload after update so all cascaded replies update too without need for refresh
            }
        else if(parent_div.classList.contains("reply")) {
            await updateReply(parent_id, textarea.value, true); 
            location.reload(); 
        }

        });

    }


    // Make function globally accessible
    window.openChallenge = openChallenge;
    window.rollD20 = rollD20;
    window.timer = timer;

})
