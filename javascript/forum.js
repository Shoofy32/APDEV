// ===== GLOBAL VARIABLES =====
let post;
let forum_name


// ===== NAVIGATION =====
function openPostPage(name) {
    window.location.href = `createpost?forum=${name}`;
}


// ===== LOAD POSTS =====
async function loadPosts(name, page = 1) {
    const response = await fetch(`http://localhost:3000/posts/${page}`);
    const posts = await response.json();



    const all_posts = document.querySelector(".all_posts");
    
    posts.forEach(async post => {
        
        //Get user information
        const user_info = await fetch(`http://localhost:3000/user/${post.poster_id}`);
        const user = await user_info.json();


        if(post.forum_name === name) {
        
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

        const delete_edit_container = document.createElement('div')
        delete_edit_container.classList.add('delete_edit_container')
        const delete_button = document.createElement('button')
        delete_button.classList.add("delete_button")
        delete_button.addEventListener("click", function(e) {
            deletePost(post._id)
        })

        const delete_text = document.createElement('h4')
        delete_text.innerText = "Delete"

        const delete_image = document.createElement('i')
        delete_image.classList.add('fa-regular', 'fa-trash-can')

        delete_button.append(delete_image, delete_text)

        const edit_button = document.createElement('button')
        edit_button.classList.add("edit_button")
        const edit_text = document.createElement('h4')
        edit_text.innerText = "Edit"

        const edit_image = document.createElement('i')
        edit_image.classList.add('fa-solid', 'fa-pen-to-square')


        edit_button.append(edit_image, edit_text)
       
        delete_edit_container.append(delete_button, edit_button)

        //Check if the user is logged in and give them edit
        if(info.userLoggedIn && post.username === info.user.username) {
          interaction_container.append(like,dislike, comment, delete_edit_container)
        }
        else {
          interaction_container.append(like,dislike, comment, challenge)
        }
        




        userPost.append(iconNameDate, title, tags_post, description, interaction_container);

        all_posts.append(userPost);

        }
        

    });

    // Setup buttons AFTER posts exist
    setupButtons();
}


// ===== BUTTON INTERACTIONS =====
function setupButtons() {

    document.querySelectorAll('.like_button').forEach(element => {

        element.addEventListener('click', (e) => {

            e.stopPropagation();
            e.preventDefault();

            let likeButton = element.children[0];

            if (likeButton.src.includes("hand-thumbs-up.svg")) {
                likeButton.src = "hand-thumbs-up-fill.svg";
            } else {
                likeButton.src = "hand-thumbs-up.svg";
            }

        });

    });


    document.querySelectorAll('.dislike_button').forEach(element => {

        element.addEventListener('click', (e) => {

            e.stopPropagation();
            e.preventDefault();

            let dislikeButton = element.children[0];

            if (dislikeButton.src.includes("hand-thumbs-down.svg")) {
                dislikeButton.src = "hand-thumbs-down-fill.svg";
            } else {
                dislikeButton.src = "hand-thumbs-down.svg";
            }

        });

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


  
