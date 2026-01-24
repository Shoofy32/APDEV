const Button = document.querySelectorAll('.like_button')
function handleClick(like) {
    
}
Button.forEach(element => {
 var likeButton = element.children[0]
 

 element.addEventListener('click', () => {
     if(likeButton.src.includes("hand-thumbs-up.svg")){
        likeButton.src = 'hand-thumbs-up-fill.svg';
    }
    else {
        likeButton.src = 'hand-thumbs-up.svg';
    }
   
 })
})