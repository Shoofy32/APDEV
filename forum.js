
        
       

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

     document.querySelectorAll('.Delete').forEach(element=> {
         element.addEventListener('click', (e) => {
            var parent_div = element.parentElement.parentElement.parentElement
            parent_div.remove();
            console.log(parent_div)
            e.preventDefault(); 
           
        });
    })

     document.querySelectorAll('.Edit').forEach(element=> {
         element.addEventListener('click', (e) => {
            var parent_div = element.parentElement.parentElement.parentElement
            var contents = parent_div.querySelector(".description_short_post")
            var current_content = contents.innerText;
            contents.innerHTML = `<textarea id="editArea"> ${current_content}</textarea><div id="edit_container">
            <button id="Save">Save </button>
            </div>
        
            ` ;
            var textarea = document.getElementById("editArea");
            var save = document.getElementById("Save");
            textarea.addEventListener("click", function(e) {
               
                e.stopPropagation();
                e.preventDefault();
            });
            save.addEventListener("click", function(e) {
                  e.stopPropagation();
                e.preventDefault();
                contents.innerHTML = `<p>${textarea.value} (edited)</p>`
            });
            console.log(current_content)
            e.preventDefault(); 
           
        });
    })




}



const post = document.getElementById('post_button');
const forum_name = document.getElementById('forum_head').children[0].innerText;
alert(forum_name)





post.addEventListener('click', function() {
    window.location.href = `post.html?forum=${forum_name}`;
});


async function loadPosts() {
  const response = await fetch("http://localhost:5000/posts");
  const posts = await response.json();

  const all_posts = document.getElementById('all_posts');
  

  posts.forEach(post => {
    const userPost = document.createElement("div");
    userPost.id = post._id
    userPost.classList.add("post");

    // Container
    const iconNameDate = document.createElement("div");
    iconNameDate.classList.add("icon_name_date_post");

    // Profile image
    const profile = document.createElement("img");
    profile.src = "../resources/users/kirk.jfif";

    // Username
    const namePost = document.createElement("p");
    namePost.classList.add("name_post");
    namePost.textContent = post.username;

    // Date
    const datePost = document.createElement("p");
    datePost.classList.add("date_post");
    datePost.textContent = new Date().toLocaleDateString();
    //Tags(to be implemented)

    //Title and Description
    const title = document.createElement("h3");
    title.classList.add("title_post")
 
    title.innerText = post.post_title
    const description = document.createElement("p")
    description.classList.add('description_short_post')
    description.innerText = post.post_content

    //Stats(likes, dislikes)
    const stats_container = document.createElement('div')
    stats_container.classList.add('stats_post')

    const like = document.createElement('div')
    like.classList.add('counter_container')

    const i = document.createElement('i')
    i.classList.add('fa-regular')
    i.classList.add('fa-thumbs-up')

    const total_likes = document.createElement('p')
    total_likes.classList.add('like_counter')
    total_likes.innerText = 0
    like.append(i, total_likes)

    const dislike = document.createElement('div')
    dislike.classList.add('counter_container')

    const i2 = document.createElement('i')
    i2.classList.add('fa-regular')
    i2.classList.add('fa-thumbs-down')

    const total_dislikes = document.createElement('p')
    total_dislikes.classList.add('like_counter')
    total_dislikes.innerText = 0
    dislike.append(i2, total_dislikes)

    const comment = document.createElement('div')
    comment.classList.add('comment_container')

    const i3 = document.createElement('i')
    i3.classList.add('fa-regular')
    i3.classList.add('fa-comment')

    
    const total_comments = document.createElement('p')
    total_comments.classList.add('comment_counter')
    total_comments.innerText = 0
    comment.append(i3, total_comments)


    const challenge = document.createElement('div')
    challenge.classList.add('challenge_button')

    const i4 = document.createElement('i')
    i4.classList.add('fa-solid')
    i4.classList.add('fa-bullseye')

    const challenge_text = document.createElement('p')
    challenge_text.classList.add('challenge_text')
    challenge_text.innerText = "Challenge"

    
    challenge.append(i4, challenge_text)


    const delete_edit_container = document.createElement('div')
    delete_edit_container.classList.add('Delete_container')
    const delete_button = document.createElement('button')
    delete_button.classList.add("Delete")
    const delete_text = document.createElement('h4')
    delete_text.innerText = "Delete"
    const edit_button = document.createElement('button')
    edit_button.classList.add("Edit")
    const edit_text = document.createElement('h4')
    edit_text.innerText = "Edit"
    delete_button.append(delete_text)
    edit_button.append(edit_text)
    delete_edit_container.append(delete_button, edit_button)
    stats_container.append(like, dislike,comment,challenge,delete_edit_container)
    // Build structure
    iconNameDate.append(profile, namePost, datePost);
  
  
    userPost.append(iconNameDate, title,description,stats_container);
    userPost.addEventListener("click", function(){
         const post_id = post._id
         window.location.href = `userpost.html?id=${post_id}`;

    });
    all_posts.append(userPost)

  
  });
}

document.addEventListener("DOMContentLoaded", () => {
    loadPosts();
    
   
});
