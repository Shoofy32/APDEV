let add_tag
let tag_add
let closeTag 
let postTag
let tag_container
let addTags
let tags = []
document.addEventListener('DOMContentLoaded', function() {
  
    add_tag = document.getElementById("add_tag")
    tag_add = document.getElementById("tag_add")
    close_tag = document.getElementById("closeTag")
    tag_container = document.getElementById('tag_container');
    postTag = document.getElementById('postTag')
    addTags = document.getElementById('addTags')
  

    add_tag.addEventListener("click", function(e) {
      e.preventDefault()
      tag_add.classList.add("open")
    })
    close_tag.addEventListener("click", function(e) {
       e.preventDefault();
       e.stopPropagation(); 
       tag_add.classList.remove("open");
      
    })

    postTag.addEventListener("click", function() {
    const existingTags = tag_container.querySelectorAll(".tags");

    const value = addTags.value.trim();

    if (!value) {
        alert("Tag cannot be empty");
        return;
    }

    
    for (let tag of existingTags) {
        if (tag.innerText.toLowerCase() === value.toLowerCase()) {
            alert("Tag already exists");
            return;
        }
       
    }

    tag_container.innerHTML += `<div class="tags">${value}</div>`;
    tags.push(value)
    addTags.value = "";
    tag_add.classList.remove("open");
    
    });
    
    document.getElementById("post").addEventListener("click", addPost);
    
});
async function addPost() {
  const authentication = await fetch("/user-login")
  const info = await authentication.json()
  if(info.userLoggedIn) {
    const username = info.user.username
    const params = new URLSearchParams(window.location.search);
    const forum_name = params.get("forum");

    const post_title = document.getElementById('title').value
    const post_content = document.getElementById('content').value
    const total_likes = 0
    const is_edited = false
    const date = new Date().toLocaleDateString();
    const total_dislikes = 0
    const total_comments = 0
    const poster_id = info.user.id
    alert(poster_id)
    const response = await fetch("http://localhost:3000/add-post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, post_title, post_content, forum_name, tags,total_likes, is_edited, date, total_dislikes, total_comments,poster_id})
    
    });
    
    const data = await response.json();
    const postId = data.postId; 

    updatePosts(poster_id, postId)
   

    window.location.href = `forum?forum=${forum_name}&page=1`;
    }
  else {
    alert("LOGIN NIGGA!")
  }
  
 

}

async function updatePosts(userId, postId) {

  await fetch(`/user/addPost/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ posts: postId })
  });
}