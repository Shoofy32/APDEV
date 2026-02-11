const post_button = document.getElementById("post");
const add_tag = document.getElementById("add_tag");
const challenge = document.getElementById('challenge_container');
const close = document.getElementById('closeChallenge');
const tag_container = document.getElementById('tag_container');
const postTag = document.getElementById('postTag')
const addTags = document.getElementById('addTags')
var tagsReal
post_button.addEventListener("click", function (e) {
    e.preventDefault(); 
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    if (!title || !content) {
        alert("Title and content required");
        return;
    }

    // Collect all tags
    const tagElements = tag_container.querySelectorAll(".tags");
    const tags = Array.from(tagElements).map(tag => tag.innerText);
    alert(tags)
    // Save post data to localStorage (now including tags)
    const postData = {
        title: title,
        content: content,
        username: "Charlie_Kirk",
        userImage: "kirk.jfif",
        timestamp: new Date().toISOString(),
        tags: tags  // Add tags array
    };
    
    localStorage.setItem('newPost', JSON.stringify(postData));
    
    window.location.href = "forum.html";
});

add_tag.addEventListener('click', function(e){
    e.preventDefault();
    challenge.style.zIndex = "9999";
    challenge.classList.add("open")
});

close.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation(); 
    challenge.classList.remove("open");
    challenge.style.zIndex = "-9999";
});

postTag.addEventListener("click", function() {
    const value = addTags.value.trim();

    if (!value) {
        alert("Tag cannot be empty");
        return;
    }

    const existingTags = tag_container.querySelectorAll(".tags");

    for (let tag of existingTags) {
        if (tag.innerText.toLowerCase() === value.toLowerCase()) {
            alert("Tag already exists");
            return;
        }
    }

    tag_container.innerHTML += `<div class="tags">${value}</div>`;
    addTags.value = "";
    challenge.classList.remove("open");
    challenge.style.zIndex = "-9999";
   
});