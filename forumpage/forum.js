// ===== LOAD NEW POST FROM localStorage =====
window.addEventListener('DOMContentLoaded', function() {
    loadNewPost();
});

function loadNewPost() {
    const postData = localStorage.getItem('newPost');
    
    if (postData) {
        const post = JSON.parse(postData);
      
        const newPostHTML = `
            <div class="post_wrapper">
                <div class="post_container">
                    <div class="post_info">
                        <div>
                            <img src="kirk.jfif"/>
                        </div>
                        <div class="post_user">
                            <h5>Charlie_Kirk</h5>
                        </div>
                        <div class="timestamp">
                            <p>&nbsp; just now</p>
                        </div>
                    </div>

                    <div class="post_contents">
                        <h3>${post.title}</h3>
                        <p>${post.content}</p>
                    </div>
           
                    <div class="interaction_container">
                        <div> 
                            <button class="like_button">
                                <img class="thumbs_up" src="hand-thumbs-up.svg">
                                <p>0</p>
                            </button>
                        </div>
                        <div> 
                            <button class="dislike_button">
                                <img src="hand-thumbs-down.svg">
                                <p>0</p>
                            </button>
                        </div>
                        <div> 
                            <button class="Challenge">
                                <p>Challenge</p>
                            </button>
                        </div>
                    </div> 
                </div>
            </div>
        `;
        
       
        const firstPost = document.querySelector('.post_wrapper');
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

    // Challenge buttons
    document.querySelectorAll('.Challenge').forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault(); 
            challenge.classList.add("open");
        });
    });
}

const post = document.getElementById('post_button');
const challenge = document.getElementById('challenge_container');
const close = document.getElementById('closeChallenge');
const postBet = document.getElementById("postBet");
const d20 = document.getElementById("d20")
close.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation(); 
    challenge.classList.remove("open");
   
   
});

post.addEventListener('click', function() {
    window.location.href = 'post.html';
});

postBet.addEventListener("click", (e) => {
    let likes = document.getElementById("betLikes").value;
    if(likes > 1){
        e.preventDefault();
        e.stopPropagation(); 
        
        console.log(challenge.classList);
        let roll = Math.floor(Math.random() * 20);
      switch (roll) {
    case 1:
        d20.src = "images/1.png";
        break;
    case 2:
        d20.src = "images/2.png";
        break;
    case 3:
        d20.src = "images/3.png";
        break;
    case 4:
        d20.src = "images/4.png";
        break;
    case 5:
        d20.src = "images/5.png";
        break;
    case 6:
        d20.src = "images/6.png";
        break;
    case 7:
        d20.src = "images/7.png";
        break;
    case 8:
        d20.src = "images/8.png";
        break;
    case 9:
        d20.src = "images/9.png";
        break;
    case 10:
        d20.src = "images/10.png";
        break;
    case 11:
        d20.src = "images/11.png";
        break;
    case 12:
        d20.src = "images/12.png";
        break;
    case 13:
        d20.src = "images/13.png";
        break;
    case 14:
        d20.src = "images/14.png";
        break;
    case 15:
        d20.src = "images/15.png";
        break;
    case 16:
        d20.src = "images/16.png";
        break;
    case 17:
        d20.src = "images/17.png";
        break;
    case 18:
        d20.src = "images/18.png";
        break;
    case 19:
        d20.src = "images/19.png";
        break;
    case 20:
        d20.src = "images/20.png";
        break;
}

            
        
        document.getElementById("betLikes").value = "";
        alert(roll);
        console.log(typeof likes);
    } else {
        alert("Please enter a positive number");
        document.getElementById("betLikes").value = "";
    }
});