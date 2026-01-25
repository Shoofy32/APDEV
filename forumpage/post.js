const post_button = document.getElementById("post");

post_button.addEventListener("click", function (e) {
    e.preventDefault(); // ⛔ stop form reload

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    if (!title || !content) {
        alert("Title and content required");
        return;
    }


    window.location.href = "forum.html";
});