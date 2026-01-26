const LikeButton = document.querySelectorAll('.like_button')
const DislikeButton = document.querySelectorAll('.dislike_button')
const post = document.getElementById('post_button');
const replyButton = document.querySelectorAll('.reply_button')
const reply = document.getElementById('reply_container');
const close = document.getElementById('closeReply');



post.addEventListener('click', function() {
  // Navigate to the new page
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

