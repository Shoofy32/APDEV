document.addEventListener("DOMContentLoaded", () => {
    
    const url = window.location.href
    const index = url.indexOf("page=")
    const raw_page = index !== -1 ? url.substring(index + 5).split("&")[0] : "";
    const page_number = parseInt(url.substring(index + 5))
    const invalidPage = !url.includes("page=") || !/^\d+$/.test(raw_page) || page_number < 1;
    //Checks if page is greater than zero, defaults otherwise   
    if(invalidPage) {
        window.onload = function() {
    
        window.location.href = '/?page=1'
        };
    }

    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get("page")) || 1
   
    loadPosts(page)

})
// Function opens or closes dropdown menu
function showDropdownContent(divElement){

    var contentID = divElement.nextElementSibling; // Gets the sibling div which holds the content

    var caretIcon = divElement.querySelector(".fa-caret-right, .fa-caret-down"); // Get the caret icon


    // If condition checks if current display is hidden or not, and flips display and caret icon
    if(contentID.style.display == "none"){

        contentID.style.display = "inline-block";

        // Change from right to down
        caretIcon.classList.toggle("fa-caret-right");
        caretIcon.classList.toggle("fa-caret-down"); 

    }

    else{

        contentID.style.display = "none";

        // Change from down to right
        caretIcon.classList.toggle("fa-caret-down");
        caretIcon.classList.toggle("fa-caret-right"); 

    }

    

}

async function loadPosts(page = 1) {


    const response = await fetch(`http://localhost:3000/posts/${page}`);
    const posts = await response.json();

    const authentication = await fetch("/user-login")
    const info = await authentication.json()
    


    const all_posts = document.querySelector(".all_posts");
    
    posts.forEach(async post => {
        
        //Get user information
        const user_info = await fetch(`http://localhost:3000/user/${post.poster_id}`);
        const user = await user_info.json();
        
        const userPost = document.createElement("div");
        userPost.id = post._id
        userPost.classList.add("post");

        const iconNameDate = document.createElement("div");
        iconNameDate.classList.add("icon_name_date_post");

        const profile = document.createElement("img");
        profile.src = user.profile;

        const namePost = document.createElement("p");
        namePost.classList.add("name_post");
        namePost.textContent = post.username;

        const datePost = document.createElement("p");
        datePost.classList.add("date_post");
        datePost.textContent = post.date

        const title = document.createElement("h3");
        title.classList.add("title_post");
        title.innerText = post.post_title;

        const tags_post = document.createElement('div')
        tags_post.classList.add("tags_post")
        let tags = post.tags
        for(let tag of tags) {
            const p_tag = document.createElement('p')
            p_tag.classList.add('tag')
            p_tag.add
            p_tag.innerText = tag
            tags_post.append(p_tag)
        }
    

        const description = document.createElement("p");
        description.classList.add("description_short_post");
        description.innerText = post.post_content;
        if(post.is_edited === true) {
            description.innerText = post.post_content.replace("(edited)", "")
            const strongEdited = document.createElement("strong")
            strongEdited.innerHTML = " (edited)"
            description.append(strongEdited)
        }

        iconNameDate.append(profile, namePost, datePost);

        //Interaction Containers
        const interaction_container = document.createElement("div")
        interaction_container.classList.add("stats_post")

        const like = document.createElement('div')
        like.classList.add('counter_container')

        const i = document.createElement('i')
        i.classList.add('fa-regular')
        i.classList.add('fa-thumbs-up')
      

        const total_likes = document.createElement('p')
        total_likes.classList.add('like_counter')
        total_likes.innerText = post.total_likes
        like.append(i, total_likes)


        if(info.userLoggedIn && info.user.liked_posts_id.includes(userPost.id)) {
          i.style = "color: coral;"
          i.dataset.clicked = "true"
        }

        const dislike = document.createElement('div')
        dislike.classList.add('counter_container')

        const i2 = document.createElement('i')
        i2.classList.add('fa-regular')
        i2.classList.add('fa-thumbs-down')

        if(info.userLoggedIn && info.user.disliked_posts_id.includes(userPost.id)) {
          i2.style = "color: coral;"
          i2.dataset.clicked = "true"
        }

        const total_dislikes = document.createElement('p')
        total_dislikes.classList.add('like_counter')
        total_dislikes.innerText = post.total_dislikes
        dislike.append(i2, total_dislikes)

        const comment = document.createElement('div')
        comment.classList.add('comment_container')

        const i3 = document.createElement('i')
        i3.classList.add('fa-regular')
        i3.classList.add('fa-comment')

        const reply = document.createElement('p')
        reply.classList.add('comment_counter')
        reply.innerText = post.total_comments
        comment.append(i3, reply)


        const challenge = document.createElement('div')
        challenge.classList.add('challenge_button')

        const i4 = document.createElement('i')
        i4.classList.add('fa-solid')
        i4.classList.add('fa-bullseye')

        const challenge_text = document.createElement('p')
        challenge_text.classList.add('challenge_text')
        challenge_text.innerText = "Challenge"

        
        challenge.append(i4, challenge_text)



        //Check if the user is logged in and give them edit
        if(info.userLoggedIn && post.username === info.user.username) {
           interaction_container.append(like,dislike, comment)
        }

        else {
           interaction_container.append(like,dislike, comment, challenge)
        }
       
        
        




        userPost.append(iconNameDate, title, tags_post, description, interaction_container);

        all_posts.append(userPost);

        
        
        

    });

  
}

async function deletePost(id) {

  await fetch(`http://localhost:3000/post/${id}`, {
    method: "DELETE"
  });

}

async function updatePost(id, post_content, is_edited) {
  await fetch(`http://localhost:3000/post/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ post_content, is_edited})
  });
}

async function updatePostLikes(id, increment) {
  await fetch(`http://localhost:3000/post/${id}/likes`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ increment })
  });
}

async function updatePostDislikes(id, increment) {
  await fetch(`http://localhost:3000/post/${id}/dislikes`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ increment })
  });
}

async function updateTotalComments(id, increment) {
  await fetch(`http://localhost:3000/post/${id}/total_comments`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ increment })
  });
}

async function updateUserLikedPosts(userId, postId) {

  await fetch(`/user/likedPosts/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ liked_posts_id: postId })
  });
}

async function removeUserLikedPosts(userId, postId) {

  await fetch(`/user/removeLikedPosts/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ liked_posts_id: postId })
  });
}


async function updateUserDislikedPosts(userId, postId) {

  await fetch(`/user/dislikedPosts/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ disliked_posts_id: postId })
  });
}

async function removeUserDislikedPosts(userId, postId) {

  await fetch(`/user/removeDislikedPosts/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ disliked_posts_id: postId })
  });
}

async function updateUserLikesPost(id, increment) {

  const response = await fetch(`http://localhost:3000/post/${id}`);
  const post = await response.json()
  const user_id = post.poster_id

  await fetch(`/user/likes/${user_id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ increment })
  });
}


  
