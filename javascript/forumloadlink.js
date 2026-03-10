function goToForum(type){


    var validPosts;

    switch (type){


        case "Technology":
            forumData = "Technology";
            validPosts = [true,true,true,true,true,false,false];
            break;

        case "Announcements":
            forumData = "Announcements";
            validPosts = [false,false,false,false,false,true];
            break;


        case "Creative Writing":
            forumData = "Creative Writing";
            validPosts = [false,false,false,false,false,false,true];
            break;
            
            
    }

    // Open localStorage and Add search-content Item with Data of Result
    localStorage.setItem("forum-data", forumData);
    localStorage.setItem("valid-posts", JSON.stringify(validPosts));

    window.location.href = "forum.html";

}