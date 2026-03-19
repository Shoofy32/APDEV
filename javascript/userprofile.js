document.addEventListener("DOMContentLoaded", async () => {


    // ADD BACKEND FOR LOADING USER INFO WHEN LOADING USERPAGE
    // NAME, BANNER IMAGE, PFP IMAGE, BIO, LIKES, NUMBER OF POSTS, AND CHALLENGE STATS
    const response = await fetch("/user-login");
    const info = await response.json()


    // Elements of User Profile that will be loaded via session
    const username = document.getElementsByClassName("name")[0].getElementsByClassName("username")[0];
    const currentLikes = document.getElementsByClassName("likes_counter")[0];


    // Elements of User Profile that can be edited
    const userPfp = document.getElementsByClassName("pfp")[0]; // Pfp image
    const userBanner = document.getElementsByClassName("banner_image")[0]; // User banner image
    const userBio = document.getElementsByClassName("bio")[0]; // User bio

    // Profile Challenge bet button
    const profileBetChallengeButton = document.getElementsByClassName("challenge_profile_button")[0]; 

    // Elements for editing profile
    const editProfileButton = document.getElementsByClassName("edit_profile_button")[0]; // Open edit profile button
    const editProfileContainer = document.getElementsByClassName("edit_profile_container")[0]; // Edit profile container
    const closeEditProfileButton = document.getElementsByClassName("close_edit_profile")[0]; // Close edit profile button

    // Previews of current status of elements that can be edited
    const editBannerImage = document.getElementsByClassName("banner_image_edit")[0]; // User banner inside of edit container
    const editPfpImage = document.getElementsByClassName("pfp_edit")[0]; // User pfp image inside of edit container
    const editBioArea =  document.getElementsByClassName("edit_bio_area")[0]; // User bio inside of edit container

    // File uploads and buttons for editing the profile elements
    const bannerFileUplaod = document.getElementById("banner_upload"); // Banner file upload
    const pfpFileUplaod = document.getElementById("pfp_upload");  // Pfp file upload
    const bioEditButton = document.getElementsByClassName("edit_bio_button")[0]; // Bio confirm edit button

    // Buttons for switching display between posts, replies, and notifications
    const postsButton = document.getElementsByClassName("all_posts_button")[0]; // Post display button
    const replyButton = document.getElementsByClassName("all_reply_button")[0]; // Post reply button
    const notificationsButton = document.getElementsByClassName("all_notifications_button")[0]; // Post notifications button

    // Container for the posts, replies, and notifications of the user
    const allPostsContainer = document.getElementsByClassName("all_posts")[0]; // Container for posts
    const allRepliesContainer = document.getElementsByClassName("all_replies")[0]; // Container for replies
    const allNotificationsContainer = document.getElementsByClassName("all_notifications")[0]; // Container for notifications


    // If user clicked their pfp or name with a active session, show the contents of their pfp.
    if (info.userLoggedIn){

        username.textContent = info.user.username;
        currentLikes.textContent = info.user.likes;
        userBio.textContent = info.user.bio;
        userPfp.src = info.user.profile;

    }



    // Add classList to post container to show posts when userpage is first loaded
    allPostsContainer.classList.toggle("display_visible");

    // Add eventlistner to open bio edit container and load the elements inside of the container with the latest info
    editProfileButton.addEventListener("click", () => {

        editProfileContainer.classList.toggle("edit_profile_show");

        loadEditBio(); // Call function to load the elements

    });


    //Add event listener to close bio edit container
    closeEditProfileButton.addEventListener("click", () => {

        editProfileContainer.classList.toggle("edit_profile_show");

    });

    //Add event listener to open challenge when clicked
    profileBetChallengeButton.addEventListener("click", openChallenge);


    // Add event listener when a file is uploaded, changing the user banner to the uploaded image
    bannerFileUplaod.addEventListener("change", (event) => {

        // Obtain the uploaded image
        const uploadedImage = event.target.files[0];

        // Check if image exists, if it does replace current banner with new image
        if(uploadedImage){

            const reader = new FileReader(); // Create a new file reader to read the uploaded image

            // Convert read file to a Base-64 encoded string to use for src
            reader.readAsDataURL(uploadedImage);

            // Event handler when reader finishes reading the file to reaplce banner with the read file
            reader.onload = (function(e){

                // Replace src with the result of the reading (src of image)
                editBannerImage.src = reader.result;
                userBanner.src = reader.result;

            })

        }

    });


    // Add event listener when a file is uploaded, changing the user pfp to the uploaded image
    pfpFileUplaod.addEventListener("change", async (event) => {
        // Obtain the uploaded image
        const uploadedImage = event.target.files[0];

        //constant representing 12mb image file size limit
        const maxSize = 12 * 1024 * 1024;

        // Check if image exists and is less than 12mb then convert it to base64 String and update the db entry
        if(uploadedImage && uploadedImage.size < maxSize){

            const reader = new FileReader(); // Create a new file reader to read the uploaded image

            // Convert read file to a Base-64 encoded string to use for src
            reader.readAsDataURL(uploadedImage);

            console.log(reader.result);

            // Event handler when reader finishes reading the file to reaplce pfp image with the read file
            reader.onload = (async function(e){

                // Update db with new profile picture
                await updateProfile(reader.result);

            })
            location.reload();
        }
        else{
            alert("Image should be less than 12mb!");
        }

    });


    // Add event listener to bio edit butten to change the bio to the one in the text area
    bioEditButton.addEventListener("click", async () =>{

        userBio.textContent = editBioArea.value.trim();
        await updateBio(editBioArea.value.trim());

    })


    // Add event listener in posts button to load post display 
    postsButton.addEventListener("click", () => {

        if(!allPostsContainer.classList.contains("display_visible"))
            allPostsContainer.classList.toggle("display_visible");

        if(allRepliesContainer.classList.contains("display_visible"))
            allRepliesContainer.classList.toggle("display_visible");

        if(allNotificationsContainer.classList.contains("display_visible"))
            allNotificationsContainer.classList.toggle("display_visible");

        loadPosts(allPostsContainer);

    })


    // Add event listener in posts button to load reply display 
    replyButton.addEventListener("click", () => {

        if(allPostsContainer.classList.contains("display_visible"))
            allPostsContainer.classList.toggle("display_visible");

        if(!allRepliesContainer.classList.contains("display_visible"))
            allRepliesContainer.classList.toggle("display_visible");

        if(allNotificationsContainer.classList.contains("display_visible"))
            allNotificationsContainer.classList.toggle("display_visible");

        loadReplies(allRepliesContainer);

    })


    // Add event listener in posts button to load notifications display 
    notificationsButton.addEventListener("click", (event) => {

        if(allPostsContainer.classList.contains("display_visible"))
            allPostsContainer.classList.toggle("display_visible");

        if(allRepliesContainer.classList.contains("display_visible"))
            allRepliesContainer.classList.toggle("display_visible");

        if(!allNotificationsContainer.classList.contains("display_visible"))
            allNotificationsContainer.classList.toggle("display_visible");

        loadNotifications(allNotificationsContainer);

    })


    // Custon event listener for user profile to load notifications again, whenever challenge in header notifications were updates
    document.addEventListener("updateUserProfileNotifications", () => {

        // If notifications is displayed, update notifications list
        if(allNotificationsContainer.classList.contains("display_visible"))
            loadNotifications(allNotificationsContainer);

    });




    // -- USERPROFILE LOADING FUNCTIONS -- //

    // Function loads the posts of the user to be displayed in the container
    async function loadPosts(container){

        // ADD FETCH FROM BACKEND
        // GET USERNAME, AND EACH POST THE USER MADE (WITH THE STATS INCLUDED)

    }

    // Function loads the replies of the user to be displayed in the container
    async function loadReplies(container){

        // ADD FETCH FROM BACKEND
        // GET USERNAME, AND EACH REPLY THE USER MADE (WITH THE STATS INCLUDED)

    }

    // Function loads the notifications of the user to be displayed in the container
    async function loadNotifications(container){

        // Obtain the container for the notifications in the header
        const notificationContentContainer = document.getElementsByClassName("notification_content_container")[0];

        // Update by copying the innerHTML of the container passed with notificationContentContainer
        container.innerHTML = notificationContentContainer.innerHTML;

        // Add event listener on container for event delegating
        container.addEventListener("click", async (event) => {

            // Targets the closest elements based on where you clicked
            const acceptChallengeButton = event.target.closest(".accept_challenge"); // Accept challenge button
            const denyChallengeButton = event.target.closest(".deny_challenge"); // Deny challenge button


            // If conditions check for which button was clicked. Afterwards, update the header notifications
            if(acceptChallengeButton)
                await acceptUserChallenge(event); // Use await to complete the challenge before proceeding to updating 
            else if(denyChallengeButton){}
                closeUserChallenge(event.target.closest(".deny_challenge")); // Get the closest deny_challenge associated with the click

            // Update header notifications once process is complete
            updateHeaderNotifications(event.target.closest(".challenge_notification"))

        });

    }

    // Function loads and updates the contents of the edit bio container
    function loadEditBio(){

        editBannerImage.src = userBanner.src;
        editPfpImage.src = userPfp.src;
        editBioArea.value =  userBio.textContent.trim();
        
    }

    


    // -- NOTIFICATIONS INTERACTION FUNCTIONS -- //

    // Function updates the list of notifications shown in the header when the notifications in the notifications list were updated
    function updateHeaderNotifications(userpostNotificationContainer){

        // Obtain header notifications
        const headerNotifications = document.getElementsByClassName("notification_content_container")[0].getElementsByClassName("challenge_notification");

        // Check each notification, if it matches with the container parameter, remove that notification from the header list
        for(let i = 0; i < headerNotifications.length; i++)
            if(userpostNotificationContainer.innerHTML === headerNotifications[i].innerHTML)
                closeUserChallenge(headerNotifications[i].getElementsByClassName("deny_challenge")[0])

    }





    // Make functions and requests globally accessible
    window.updateHeaderNotifications = updateHeaderNotifications;


});