// ===== GLOBAL VARIABLES =====
let post;
let forum_name


// ===== MAIN INITIALIZATION =====
document.addEventListener("DOMContentLoaded", () => {

    const post = document.getElementById("post_button");
    const forumTitle = document.querySelector("#forum_head h5");
    forum_name = document.getElementById("forum_head").firstChild.innerText
    if (forumTitle && post) {
        const forum_name = forumTitle.innerText;
        post.addEventListener("click", () => openPostPage(forum_name));
    }

        loadPosts();   
    

});


// ===== NAVIGATION =====
function openPostPage(name) {
    window.location.href = `createpost.html?forum=${name}`;
}


// ===== LOAD POSTS =====
async function loadPosts() {

    const response = await fetch("http://localhost:3000/posts");
    const posts = await response.json();

    const all_posts = document.querySelector(".all_posts");

    posts.forEach(post => {

        const userPost = document.createElement("div");
        userPost.classList.add("post");

        const iconNameDate = document.createElement("div");
        iconNameDate.classList.add("icon_name_date_post");

        const profile = document.createElement("img");
        profile.src = "../resources/users/kirk.jfif";

        const namePost = document.createElement("p");
        namePost.classList.add("name_post");
        namePost.textContent = post.username;

        const datePost = document.createElement("p");
        datePost.classList.add("date_post");
        datePost.textContent = new Date().toLocaleDateString();

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

        iconNameDate.append(profile, namePost, datePost);
        userPost.append(iconNameDate, title, tags_post, description);

        userPost.addEventListener("click", () => {
            const post_id = post._id;
            window.location.href = `userpost.html?id=${post_id}`;
        });

        all_posts.append(userPost);

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