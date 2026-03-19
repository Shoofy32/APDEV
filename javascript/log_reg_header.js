document.addEventListener('DOMContentLoaded', async () => {

    // Get the 2 types of containers for login header
    const anonContainer = document.getElementById("anon"); // Not logged in container
     const userContainer = document.getElementById("user"); // Logged in container

    // Get the likes and notifications container
    const likesContainer = document.getElementsByClassName("likes_container")[0];
    const notificationsContainer = document.getElementsByClassName("notification_container")[0];

    // Get the logo and logout button elements
    const logo = document.getElementsByClassName("logo")[0];
    const logoutButton = document.getElementById("logout");

    // Fetches session information from /user-login route and converts it to be usuable JS object
    const response = await fetch("/user-login"); // Fetch from route
    const info = await response.json() // Convert to object


    // Check if logout exists in page, if so, add logout functionality via event listener 
    if(logoutButton)
        logoutButton.addEventListener("click", logout);


    // Add event listener to logo to go back to the homepage (uses route in server.js)
    logo.addEventListener("click", () => {

        window.location.href = "/";

    });


    // Checks info from session to see if user is logged in, if so, display user info
    if (info.userLoggedIn){

        window.userLoggedIn = true; // Set to true (will be called by post.js and notification.js to update user likes)

        // Get the username, pfp, and likes in header to be updated with the obtained session information
        const username = document.getElementsByClassName("username")[0]; 
        const pfp = document.getElementsByClassName("header_pfp")[0];
        const likes = likesContainer.getElementsByClassName("like_amount")[0];

        // Update shown user data in header from info variable
        username.textContent = info.user.username;
        pfp.src = info.user.profile;
        likes.textContent = info.user.likes;


        // Add event listener to username to move to userprofile when clicked
        username.addEventListener("click", () => {

            window.location.href = "/userprofile";

        });

        // Add event listener to pfp to move to userprofile when clicked
        pfp.addEventListener("click", () => {

            window.location.href = "/userprofile";

        });
        

        // Show user display and show the likes and notifications display
        userContainer.style.display = "flex";
        anonContainer.style.display = "none";
        likesContainer.style.display = "flex";
        notificationsContainer.style.display = "flex";

    }
    // Check if user is not logged in and not in login and resgister page
    else if(!info.userLoggedIn && window.location.pathname !== "/login" && window.location.pathname !== "/register"){

        window.userLoggedIn = false;

        // Show anonymous display and hide the likes and notifications display
        userContainer.style.display = "none";
        anonContainer.style.display = "flex";
        likesContainer.style.display = "none";
        notificationsContainer.style.display = "none";

    }

    // -- USER PROFILE INTERACTION FUNCTIONS -- //

    // Function logs the user out when called
    function logout() {
        
        // Get the username, pfp, and likes in header to be updated with for logout
        const username = document.getElementsByClassName("username")[0]; 
        const pfp = document.getElementsByClassName("header_pfp")[0];
        const likes = likesContainer.getElementsByClassName("like_amount")[0];

        // Make contents empty
        username.textContent = "";
        pfp.src = "";
        likes.textContent = "";
        
        // Show anonymous display and hide the likes and notifications display
        userContainer.style.display = "none";
        anonContainer.style.display = "flex";
        likesContainer.style.display = "none";
        notificationsContainer.style.display = "none";

        // Go to /logout route to remove session and cookies 
        window.location.href = "/logout";

    }



    // -- SESSION AND DATABASE USERPROFILE UPDATING -- //

    // Function makes network request to /user-update route and PUTS information of the updated likes into the route to update db and session
    async function updateLikes(likes) {

        await fetch("/user-update", {

            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ newLikes: likes })

        });

    }

    // Function makes network request to /user-update route and PUTS information of the updated bio into the route to update db and session
    async function updateBio(bio) {

        await fetch("/user-update", {

            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ newBio: bio })

        });

    }

    async function updateProfile(image){

        await fetch("/user-update",{

            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ newProfile: image })
        });
    }

    // Make functions globally accessible
    window.updateLikes = updateLikes;
    window.updateBio = updateBio;
    window.updateProfile = updateProfile;

});