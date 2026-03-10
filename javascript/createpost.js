document.addEventListener('DOMContentLoaded', function() {

    async function addUser() {

        const username = "TheNinjaDude"
        const params = new URLSearchParams(window.location.search);
        const forum_name = params.get("forum");
        const post_title = document.getElementById('title').value
        const post_content = document.getElementById('content').value

        await fetch("http://localhost:5000/add-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, post_title, post_content, forum_name })
        });

    

    }



});

