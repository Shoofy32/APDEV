document.addEventListener("DOMContentLoaded", () => {

    const sideBarButtons = document.getElementsByClassName("sidebar_topic_button"); // Sidebar topic buttons

    // If current html is forum.html, load the forum information
   if(window.location.pathname.endsWith("/forum.html")){

        loadForum();
        sessionStorage.setItem("lastLoadedForum", window.location.href); // Add href of current window.location

   }

    // If current path is at either forum.html or userpost.html, add event listener to return forum links
    if(window.location.pathname.endsWith("/forum.html") || window.location.pathname == "/html/userpost.html"){


        const returnForumLink = document.getElementsByClassName("return_forum_link"); // Reeturn forum links

        // Add event listener to each return forum link so that when clicked, it will load the last loaded forum page
        for(let i = 0; i < returnForumLink.length; i++)
            returnForumLink[i].addEventListener("click", () => {

                // Obtain from sessionStorage the stored href
                window.location.href = sessionStorage.getItem("lastLoadedForum");

            });

    }
        
        

    // If current html is homepage.html, obtain the dropdownTitles and add event listeners to them to moveToForum
    if(window.location.pathname.endsWith("/homepage.html")){

        const dropdownTitles = document.getElementsByClassName("forum_title"); // Dropdown titles


        for(let i = 0; i < dropdownTitles.length; i++)
            dropdownTitles[i].addEventListener("click", () => {
                
                moveToForum(dropdownTitles[i].textContent.trim());
        
            });

    }


    // Add eventlistener to each sidebar button to call moveToForum() when clicked
    for(let i = 0; i < sideBarButtons.length; i++)
        sideBarButtons[i].addEventListener("click", () => {
    
            moveToForum(sideBarButtons[i].textContent.trim());
    
        });


// ------------------ FUNCTIONS ------------------ //


    
    // Used by forum.html to load the needed information based on the title
    function moveToForum(forumTitle){
        window.location.href = `forum.html?forum=${encodeURIComponent(forumTitle)}`;
    }


    // Function loads the forum type if inside forum.html. Check the URL to determine title
    function loadForum(){
        const forumTitle = decodeURIComponent(new URLSearchParams(window.location.search).get("forum"));
        const [forumImage, forumDescription] = forumInformation(forumTitle);
        //Static components
        document.getElementsByClassName("forum_title")[0].textContent = forumTitle;
        document.getElementsByClassName("forum_image")[0].src = forumImage;
        document.getElementsByClassName("forum_description")[0].textContent = forumDescription;

        loadPosts(forumTitle);
        //Event listener for post button
        const post = document.getElementById("post_button");
        if (post) post.addEventListener("click", () => openPostPage(forumTitle));
    }


    // Function loads the forum type if inside forum.html. Information is URL
    function forumInformation(type){

        var forumImage, forumDescription; // Stores image and description of forum

        // Switch statement obtains the needed information depending on the type parameter
        switch (type){

            case "Announcements":
            case "Forum Announcements":
                forumImage = "../resources/images/announcements.jpg";
                forumDescription = "Learn important information about Blevvit.";
                break;

            case "Rules": 
            case "Rules and Regulations": 
                forumImage = "../resources/images/rules_and_regulations.jpg";
                forumDescription = "Learn how to be a respectful member in Blevvit.";
                break;

            case "Creative Writing":
                forumImage = "../resources/images/creative_writing.jpg";
                forumDescription = "Write anything. The world is your story.";
                break;
                
            case "Questing": 
                forumImage = "../resources/images/questing.jpg";
                forumDescription = "Vote on how a story progresses. Create your own path.";
                break;

            case "Fiction": 
                forumImage = "../resources/images/fiction.jpg";
                forumDescription = "Discuss anything fiction. Let your imagination run wild";
                break;

            case "Books & Novels": 
                forumImage = "../resources/images/books_and_novels.jpg";
                forumDescription = "Discuss about different books and novels. \"Books are a uniquely portable magic\" - Stephen King.";
                break;

            case "Movies & Shows": 
                forumImage = "../resources/images/movies_and_shows.jpg";
                forumDescription = "Talk about different movies and shows. The world is your stage and you're the actor.";
                break;

            case "General Nonfiction": 
                forumImage = "../resources/images/general_nonfiction.jpg";
                forumDescription = "Discuss anything generally nonfiction. Talk about the world as we know it.";
                break;

            case "Current News":
                forumImage = "../resources/images/current_news.jpg";
                forumDescription = "Learn breaking news today. Knowledge is power.";
                break;

            case "Politics":
                forumImage = "../resources/images/politics.jpg";
                forumDescription = "Talk about politics. Let the world know where you stand.";
                break;

            case "Technology":
                forumImage = "../resources/images/technology.jpg";
                forumDescription = "Anything tech related. You are Iron Man.";
                break;

            case "Entertainment":
                forumImage = "../resources/images/entertainment.jpg";
                forumDescription = "\"Entertainment is one of the most important things in people's lives. without it, they might of off the deep end.\" - Stan Lee";
                break;

            case "Q&A":
                forumImage = "../resources/images/q_and_a.jpg";
                forumDescription = "Ask anything. Let your questions be answered.";
                break;

                
        }


        return [forumImage, forumDescription]; // Return array of image and description of forum

    }   

});


