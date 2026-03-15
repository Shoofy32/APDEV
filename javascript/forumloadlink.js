document.addEventListener("DOMContentLoaded", () => {

    const sideBarButtons = document.getElementsByClassName("sidebar_topic_button"); // Sidebar topic buttons


    // If current html is forum.html, load the forum information
    if(window.location.pathname === "/html/forum.html")
        loadForum();

    // If current html is homepage.html, obtain the dropdownTitles and add event listeners to them to moveToForum
    if(window.location.pathname === "/html/homepage.html"){

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


    // Function gets information from forumTitle and loadForum() and stores it to sessionStorage before opening forum.html
    // Used by forum.html to load the needed information
    function moveToForum(forumTitle){

        // Obtain image and description of forum by calling forumInformation
        const [forumImage, forumDescription] = forumInformation(forumTitle);

        // Add title, image, and description information to session storage
        sessionStorage.setItem("forumTitle", forumTitle);
        sessionStorage.setItem("forumImage", forumImage);
        sessionStorage.setItem("forumDescription", forumDescription);

        window.location.href = "forum.html";

    }


    // Function loads the forum type if inside forum.html. Information is obtained from sessionStorage
    function loadForum(){

        // Get the forum information
        const forumTitle = sessionStorage.getItem("forumTitle");
        const forumImage = sessionStorage.getItem("forumImage");
        const forumDescription = sessionStorage.getItem("forumDescription");

        // Get corresponding elements to update for the forum
        const forumTitleContainer = document.getElementsByClassName("forum_title")[0];
        const forumImageContainer = document.getElementsByClassName("forum_image")[0];
        const forumDescriptionContainer = document.getElementsByClassName("forum_description")[0];

        // Update containers with the obtained forumInformation from sessionStorage
        forumTitleContainer.textContent = forumTitle;
        forumImageContainer.src = forumImage;
        forumDescriptionContainer.textContent = forumDescription;

    }


    // Function loads the forum type if inside forum.html. Information is obtained from sessionStorage
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


