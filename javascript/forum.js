document.addEventListener('DOMContentLoaded', function() {

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

    document.querySelectorAll('.delete_button').forEach(element=> {
        element.addEventListener('click', (e) => {

            console.log("DELETE");
            var parent_div = element.parentElement.parentElement.parentElement
            parent_div.remove();
            console.log(parent_div)
            e.preventDefault(); 
        
        });
    })

    document.querySelectorAll('.edit_button').forEach(element=> {
        element.addEventListener('click', (e) => {

            console.log("EDIT");
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
                contents.innerHTML = `<p>${textarea.value} <strong>(edited)</strong></p>`
            });
            console.log(current_content)
            e.preventDefault(); 
        
        });
    })


    const post = document.getElementById('post_button');
    const forum_name = document.getElementById('forum_head').children[0].innerText;
    alert(forum_name)

    post.addEventListener('click', function() {
        window.location.href = `createpost.html?forum=${forum_name}`;
    });

    async function loadPosts() {
    const response = await fetch("http://localhost:5000/users");
    const users = await response.json();

    const all_posts = document.getElementById('all_posts');
    

    users.forEach(user => {
        const userPost = document.createElement("div");
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
        namePost.textContent = user.username;

        // Date
        const datePost = document.createElement("p");
        datePost.classList.add("date_post");
        datePost.textContent = new Date().toLocaleDateString();
        //Tags(to be implemented)

        //Title and Description
        const title = document.createElement("h3");
        title.classList.add("title_post")
        title.onclick = openPost
        title.innerText = user.post_title
        const description = document.createElement("p")
        description.classList.add('description_short_post')
        description.innerText = user.post_content

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
        like.append(i, total_likes)
        stats_container.append(like)
        // Build structure
        iconNameDate.append(profile, namePost, datePost);
    
    
        userPost.append(iconNameDate, title,description,stats_container);
        alert("WE MADE IT")
        all_posts.append(userPost)
    
    });
    }

    document.addEventListener("DOMContentLoaded", () => {
        loadPosts();
    });


});
