// ===== LOAD NEW POST FROM localStorage =====
window.addEventListener('DOMContentLoaded', function() {
    loadNewPost();
});

function loadNewPost() {
    const postData = localStorage.getItem('newPost');
    
    if (postData) {
        const post = JSON.parse(postData);
      
        const newPostHTML = `
        <div class = "post" onclick = "openPost()">

            <!-- Div Contains the PFP, Username, and Date of Post-->
            <div class = "icon_name_date_post">

                <img src = "images/Placeholder.jpg">

                <p class = "name_post"> Placeholder </p>

                <p class = "date_post"> 01/02/2025 </p>


            </div>

            <!-- Post Title -->
            <h3 class = "title_post"> ${post.title} </h3>

            <!-- Div Contains Different Tags of the Post -->
            <div class = "tags_post">

                <p> Tag 1 </p>
                <p> Tag 2 </p>
                <p> Tag 3 </p>

            </div>

            <!-- Short Description of Post -->
            <p class = "description_short_post"> ${post.content} </p>

            <!-- Div contains likes and dislikes counter -->
            <div class = "stats_post" onclick = "event.stopPropagation();"> <!-- Prevent onclick to open post -->

                <!-- Div contains like counter and its value -->
                <div class = "counter_container">

                    <!-- stopPropogation prevents button from opening up userpost forum -->
                    <i class = "fa-regular fa-thumbs-up" onclick = "updateCounter(this, this.parentElement.parentElement); event.stopPropagation();" data-clicked = "false"></i>
                    
                    <p class = "like_counter"> 0 </p>

                </div>

                <!-- Div contains dislike counter and its value -->
                <div class = "counter_container">

                    <!-- stopPropogation prevents button from opening up userpost forum -->
                    <i class="fa-regular fa-thumbs-down" onclick = "updateCounter(this, this.parentElement.parentElement); event.stopPropagation();" data-clicked = "false"></i>
                    
                    <p class = "dislike_counter"> 0 </p>

                </div>

                <!-- Div contains comment counter and its value -->
                <div class = "comment_container">

                    <i class="fa-regular fa-comment"></i>
                    
                    <p class = "comment_counter"> 0 </p>

                </div>

                <!-- Div contains challenge button and Links Through openChallenge When Pressed --> <!-- stopPropogation prevents button from opening up userpost forum -->
                <div class = "challenge_button" onclick = "openChallenge(this.parentElement.parentElement); event.stopPropagation();">

                    <i class="fa-solid fa-bullseye"></i>
                    
                    <p class = "challenge_text"> Challenge </p>

                </div>

            </div>


            <!-- Div contains the challenge container -->
            <div class = "challenge" id = "challenge_container" onclick = "event.stopPropagation()">

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

        </div>
        `;
        
       
        const firstPost = document.querySelector('.post');
        if (firstPost) {
            firstPost.insertAdjacentHTML('beforebegin', newPostHTML);
        }
        
        // Clear localStorage
        localStorage.removeItem('newPost');
        
        // Reinitialize buttons for ALL posts
        setupButtons();
    } else {
        // Just setup existing buttons
        setupButtons();
    }
}


function setupButtons() {

    document.querySelectorAll('.like_button').forEach(element => {
        element.addEventListener('click', (e) => {
            e.stopPropagation();     
            e.preventDefault();
            var likeButton = element.children[0];
            if(likeButton.src.includes("hand-thumbs-up.svg")){
                likeButton.src = 'hand-thumbs-up-fill.svg';
            } else {
                likeButton.src = 'hand-thumbs-up.svg';
            }
        });
    });


    document.querySelectorAll('.dislike_button').forEach(element => {
        element.addEventListener('click', (e) => {
            e.stopPropagation();     
            e.preventDefault();
            var DislikeButton = element.children[0];
            if(DislikeButton.src.includes("hand-thumbs-down.svg")){
                DislikeButton.src = 'hand-thumbs-down-fill.svg';
            } else {
                DislikeButton.src = 'hand-thumbs-down.svg';
            }
        });
    });


    // Challenge Button Disabled Here (REMOVE BEFORE SUBMISSION)

    /*

    // Challenge buttons
    document.querySelectorAll('.Challenge').forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault(); 
            challenge.classList.add("open");
        });
    });

    */


}


// Challenge Button Behavior Disabled Here (REMOVE BEFORE SUBMISSION)


const post = document.getElementById('post_button');
const challenge = document.getElementById('challenge_container');
const close = document.getElementById('closeChallenge');
const postBet = document.getElementById("postBet");

/*
close.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation(); 
    challenge.classList.remove("open");
    console.log(challenge.classList);
    alert("CLOSING");
});

*/
post.addEventListener('click', function() {
    window.location.href = 'post.html';
});

postBet.addEventListener("click", (e) => {
    let likes = document.getElementById("betLikes").value;
    if(likes > 1){
        e.preventDefault();
        e.stopPropagation(); 
        challenge.classList.remove("open");
        console.log(challenge.classList);
        let roll = Math.floor(Math.random() * 20);
        document.getElementById("betLikes").value = "";
        alert(roll);
        console.log(typeof likes);
    } else {
        alert("Please enter a positive number");
        document.getElementById("betLikes").value = "";
    }
});

