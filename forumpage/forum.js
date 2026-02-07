const LikeButton = document.querySelectorAll('.like_button')
const DislikeButton = document.querySelectorAll('.dislike_button')
const post = document.getElementById('post_button');

const ChallengeButton = document.querySelectorAll('.Challenge')
const challenge = document.getElementById('challenge_container');
const close = document.getElementById('closeChallenge');
const postBet = document.getElementById("postBet");

ChallengeButton.forEach(element => {
    element.addEventListener('click', (e) => {
        e.preventDefault(); 
        challenge.classList.add("open");
    })
})

close.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation(); 
    challenge.classList.remove("open");
    console.log(challenge.classList);
    alert("CLOSING")
})

post.addEventListener('click', function() {
 
  window.location.href = 'post.html';
});
LikeButton.forEach(element => {
var likeButton = element.children[0]
 

 element.addEventListener('click', (e) => {

    e.stopPropagation();     
    e.preventDefault();      
     if(likeButton.src.includes("hand-thumbs-up.svg")){
        likeButton.src = 'hand-thumbs-up-fill.svg';
    }
    else {
        likeButton.src = 'hand-thumbs-up.svg';
    }
   
 })
})

DislikeButton.forEach(element => {
 var DislikeButton = element.children[0]
 

 element.addEventListener('click', (e) => {

    e.stopPropagation();     
    e.preventDefault();
     if(DislikeButton.src.includes("hand-thumbs-down.svg")){
        DislikeButton.src = 'hand-thumbs-down-fill.svg';
    }
    else {
        DislikeButton.src = 'hand-thumbs-down.svg';
    }
   
 })
})

postBet.addEventListener("click", (e) => {
    let likes = document.getElementById("betLikes").value;
    if(likes > 1){
        e.preventDefault();
        e.stopPropagation(); 
        challenge.classList.remove("open");
        console.log(challenge.classList);
        let roll = Math.floor(Math.random() * 20);
        document.getElementById("betLikes").value=""
        alert(roll)
        console.log(typeof likes);
    }
    else {
        alert("Please enter a positive number")
        document.getElementById("betLikes").value=""
    }
})
