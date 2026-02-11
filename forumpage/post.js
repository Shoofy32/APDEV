const post_button = document.getElementById("post");

post_button.addEventListener("click", function (e) {
    e.preventDefault(); 
    
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    if (!title || !content) {
        alert("Title and content required");
        return;
    }

    // Save post data to localStorage
    const postData = {
        title: title,
        content: content,
        username: "Charlie_Kirk", // You can make this dynamic later
        userImage: "kirk.jfif",
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('newPost', JSON.stringify(postData));
    
    window.location.href = "forum.html";
});