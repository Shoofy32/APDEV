document.addEventListener("DOMContentLoaded", async () => {
    

    // Dropdown topic containers
    const dropdownTopics = document.getElementsByClassName("dropdown_topic");

    const url = window.location.href
    const index = url.indexOf("page=")
    const raw_page = index !== -1 ? url.substring(index + 5).split("&")[0] : "";
    const page_number = parseInt(url.substring(index + 5))
    const invalidPage = !url.includes("page=") || !/^\d+$/.test(raw_page) || page_number < 1;
    //Checks if page is greater than zero, defaults otherwise   
    if (invalidPage) {
    window.onload = function () {
        const hash = window.location.hash; // captures "#trending" if present
        window.location.href = '/?page=1' + hash;
    };
  }

    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get("page")) || 1


    // Add event listener for each dropdown topic to call showDropdownContent
    for(let i = 0; i < dropdownTopics.length; i++)
        dropdownTopics[i].addEventListener("click", () => {
      
            showDropdownContent(dropdownTopics[i]);
      
        });


    
    loadPosts(page)
    await loadPopularPosts()  
    loadRecentAnnouncements()

  if (window.location.hash === "#trending") {
    setTimeout(() => {
        document.getElementsByClassName("all_posts_popular")[0].scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

})


// Function opens or closes dropdown menu
function showDropdownContent(divElement){

    var contentID = divElement.nextElementSibling; // Gets the sibling div which holds the content

    var caretIcon = divElement.querySelector(".fa-caret-right, .fa-caret-down"); // Get the caret icon


    // If condition checks if current display is hidden or not, and flips display and caret icon
    if(contentID.style.display == "none"){

        contentID.style.display = "flex";

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


    const response = await fetch(`https://blevvit.onrender.com/posts/${page}`);
    const posts = await response.json();

    const all_posts = document.getElementsByClassName("all_posts")[0];
    
    for (const post of posts) {
        
        //Get user information
        const user_info = await fetch(`https://blevvit.onrender.com/user/${post.poster_id}`);
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
       
        
        // Load styles  
        if(user.equippedItems.equippedUsername)
            namePost.style.color = user.equippedItems.equippedUsername;
        if(user.equippedItems.equippedPfp)
            profile.style.border = `4px solid ${user.equippedItems.equippedPfp}`;


        userPost.append(iconNameDate, title, tags_post, description, interaction_container);

        userPost.classList.add("group");

        all_posts.append(userPost);

        
        
        

    };

  
}



async function loadPopularPosts() {


    const response = await fetch(`https://blevvit.onrender.com/posts/Top3`);
    const posts = await response.json();
    
    const all_posts_popular = document.getElementsByClassName("all_posts_popular")[0];
    
     for (const post of posts) {
        
        //Get user information
        const user_info = await fetch(`https://blevvit.onrender.com/user/${post.poster_id}`);
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
       

        // Load styles  
        if(user.equippedItems.equippedUsername)
            namePost.style.color = user.equippedItems.equippedUsername;
        if(user.equippedItems.equippedPfp)
            profile.style.border = `2px solid ${user.equippedItems.equippedPfp}`;


        userPost.append(iconNameDate, title, tags_post, description, interaction_container);

        userPost.classList.add("group");

        all_posts_popular.append(userPost);

        


    };

  
}

async function loadRecentAnnouncements() {
    const response = await fetch(`https://blevvit.onrender.com/posts/recentAnnouncements`);
    const posts = await response.json();
    const recent_announcements = document.getElementsByClassName("recent_announcements")[0];
    
    for (const post of posts) {

      const announcement = document.createElement("p")
      announcement.innerText = post.post_title
      announcement.addEventListener('click', function(){
         window.location.href = `forum?forum=Forum%20Announcements`;
      })
      recent_announcements.append(announcement)
    }

}


