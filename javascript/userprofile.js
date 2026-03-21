document.addEventListener("DOMContentLoaded", async () => {


    // ADD BACKEND FOR LOADING USER INFO WHEN LOADING USERPAGE
    // NAME, BANNER IMAGE, PFP IMAGE, BIO, LIKES, NUMBER OF POSTS, AND CHALLENGE STATS

    // Elements of User Profile that will be loaded via session
    const username = document.getElementsByClassName("name")[0].getElementsByClassName("username")[0];
    const currentLikes = document.getElementsByClassName("likes_counter")[0];
    const currentNumberOfPosts = document.getElementsByClassName("posts_counter")[0];
    const currentMainDisplayWins = document.getElementsByClassName("challenge_wins_counter")[0];
    const currentWins = document.getElementsByClassName("side_challenge_wins_counter")[0];
    const currentLosses = document.getElementsByClassName("side_challenge_losses_counter")[0];
    const currentTies = document.getElementsByClassName("side_challenge_ties_counter")[0];

    // Elements of User Profile that can be edited
    const userPfp = document.getElementsByClassName("pfp")[0]; // Pfp image
    const userBanner = document.getElementsByClassName("banner_image")[0]; // User banner image
    const userBio = document.getElementsByClassName("bio")[0]; // User bio

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
        userBanner.src = info.user.banner;
        currentMainDisplayWins.textContent = info.user.wins;
        currentWins.textContent = info.user.wins;
        currentLosses.textContent = info.user.losses;
        currentTies.textContent = info.user.ties;
    }

    //runs all the loading functions
    document.addEventListener("DOMContentLoaded", () => {

        loadPosts();
    })

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

        loadPosts();

    })


    // Add event listener in posts button to load reply display 
    replyButton.addEventListener("click", () => {

        if(allPostsContainer.classList.contains("display_visible"))
            allPostsContainer.classList.toggle("display_visible");

        if(!allRepliesContainer.classList.contains("display_visible"))
            allRepliesContainer.classList.toggle("display_visible");

        if(allNotificationsContainer.classList.contains("display_visible"))
            allNotificationsContainer.classList.toggle("display_visible");

        loadReplies();

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



    // Add event listener on all notification container for event delegating
    allNotificationsContainer.addEventListener("click", (event) => {

        // Targets the closest elements based on where you clicked
        const acceptChallengeButton = event.target.closest(".accept_challenge"); // Accept challenge button
        const denyChallengeButton = event.target.closest(".deny_challenge"); // Deny challenge button
        const acceptResultButton = event.target.closest(".accept_result");

        // If conditions check for which button was clicked and calls the function corresponding to that button
        if(acceptChallengeButton){

            console.log("EAFAEF");
            acceptUserChallenge(event);

        }

        else if(denyChallengeButton)
            rejectChallengeNotification(event.target.closest(".deny_challenge")); // Get the closest deny_challenge associated with the click
        else if(acceptResultButton)
            getChallengeResultAndClose(acceptResultButton);


        notificationButtonDisplay(); // Call function to display ! or not beside bell icon

    });


    // -- USERPROFILE LOADING FUNCTIONS -- //

    // Function loads the posts of the user to be displayed in the container
    async function loadPosts(){

        allPostsContainer.innerHTML="";

        let response = await fetch("/load-posts/"+info.user.username);
        posts = await response.json();

        posts.forEach(async (postload)=>{
            const response = await fetch(`http://localhost:3000/post/`+postload._id);
            const post = await response.json()


            const user_info = await fetch(`http://localhost:3000/user/`+postload.poster_id);
            const user = await user_info.json();
            
            const post_container = document.createElement('div')
            post_container.id = post._id
            post_container.classList.add("post")
            //Post information(Profile, date, username)

            const post_info = document.createElement('div')
            post_info.classList.add("icon_name_date_post")

            const profile_picture = document.createElement('img')
            profile_picture.src = user.profile


            
            const userh5 = document.createElement('h5')
            userh5.classList.add('name_post')
            userh5.innerText = post.username

            
            const date_post = document.createElement("p")
            date_post.classList.add("date_post")
            date_post.innerHTML = post.date
            post_info.append(profile_picture, userh5, date_post)

            //Post contents
            
            const post_title = document.createElement('h3')
            post_title.classList.add("title_post")
            post_title.innerText = post.post_title

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


            const post_body = document.createElement('p')
            post_body.classList.add("description_short_post")
            post_body.innerText = post.post_content
            //Check if it is edited
            if(post.is_edited === true) {
                post_body.innerText = post_body.innerText
                const strongEdited = document.createElement("strong")
                strongEdited.innerHTML = " (edited)"
                post_body.append(strongEdited)
            }
            
            //Interaction Container (likes, dislikes, reply)
            const interaction_container = document.createElement("div")
            interaction_container.classList.add("stats_post")

            const like = document.createElement('div')
            like.classList.add('counter_container')

            const i = document.createElement('i')
            i.classList.add('fa-regular')
            i.classList.add('fa-thumbs-up')

            if(info.userLoggedIn && info.user.liked_posts_id.includes(post_container.id)) {
                i.style = "color: coral;"
                i.dataset.clicked = "true"
                }


            const total_likes = document.createElement('p')
            total_likes.classList.add('like_counter')
            total_likes.innerText = post.total_likes
            like.append(i, total_likes)

            const dislike = document.createElement('div')
            dislike.classList.add('counter_container')

            const i2 = document.createElement('i')
            i2.classList.add('fa-regular')
            i2.classList.add('fa-thumbs-down')

            if(info.userLoggedIn && info.user.disliked_posts_id.includes(post_container.id)) {
                i2.style = "color: coral;"
                i2.dataset.clicked = "true"
            }


            const total_dislikes = document.createElement('p')
            total_dislikes.classList.add('like_counter')
            total_dislikes.innerText = post.total_dislikes
            dislike.append(i2, total_dislikes)

            const comment = document.createElement('div')
            comment.classList.add('reply_button')

            const i3 = document.createElement('i')
            i3.classList.add('fa-regular')
            i3.classList.add('fa-comment')

            const reply = document.createElement('p')
            reply.classList.add('comment_counter')
            reply.innerText = "Reply"
            comment.append(i3, reply)
            

            const challenge = document.createElement('div')
            challenge.classList.add('challenge_button')

            const i4 = document.createElement('i')
            i4.classList.add('fa-solid')
            i4.classList.add('fa-bullseye')

            const challenge_text = document.createElement('p')
            challenge_text.classList.add('challenge_text')
            challenge_text.innerText = "Challenge"

            
            challenge.append(i4, challenge_text)

            const delete_edit_container = document.createElement('div')
            delete_edit_container.classList.add('delete_edit_container')
            const delete_button = document.createElement('button')
            delete_button.classList.add("delete_button")

            const delete_text = document.createElement('h4')
            delete_text.innerText = "Delete"

            const delete_image = document.createElement('i')
            delete_image.classList.add('fa-regular', 'fa-trash-can')

            delete_button.append(delete_image, delete_text)
            delete_button.addEventListener("click", function(e) {
                    deletePost(post._id)
            })


            const edit_button = document.createElement('button')
            edit_button.classList.add("edit_button")
            const edit_text = document.createElement('h4')
            edit_text.innerText = "Edit"

            const edit_image = document.createElement('i')
            edit_image.classList.add('fa-solid', 'fa-pen-to-square')


            edit_button.append(edit_image, edit_text)
            delete_edit_container.append(delete_button, edit_button)

            
            if(info.userLoggedIn && post.username === info.user.username) {

                interaction_container.append(like,dislike, comment, delete_edit_container)
            }

            else {

                interaction_container.append(like,dislike, comment, challenge)
                
            }
                
            post_container.append(post_info, post_title, tags_post, post_body, interaction_container)

            allPostsContainer.append(post_container)
            
        });

        // Temp addition to show number of posts
        currentNumberOfPosts.textContent = posts.length;


    }

    // Function loads the replies of the user to be displayed in the container
    async function loadReplies(){

        allRepliesContainer.innerHTML=""

        let response = await fetch("/load-replies/"+info.user.username);
        replies = await response.json();

        replies.forEach(async reply => {
            const user_info = await fetch(`http://localhost:3000/user/${reply.poster_id}`);
            const user = await user_info.json();
            console.log(user)
            
            const userPost = document.createElement("div");
            userPost.classList.add("reply");
            const reply_id  = reply._id
            userPost.id = reply_id

            // Container
            const iconNameDate = document.createElement("div");
            iconNameDate.classList.add("icon_name_date_post");

            // Profile image
            const profile = document.createElement("img");
            profile.src = user.profile;

            // Username
            const name = document.createElement("p");
            name.classList.add("name_post");
            name.textContent = reply.username;

            // Date
            const datePost = document.createElement("p");
            datePost.classList.add("date_post");
            datePost.textContent = reply.date
            iconNameDate.append(profile,name,datePost)
            
            //Content
            const post_contents = document.createElement("div")
            post_contents.classList.add("post_contents")
            const replying_to_container = document.createElement("div")
            replying_to_container.classList.add("replying_to_container")
            const span_reply = document.createElement("span")
            span_reply.classList.add('user_repliedto')
            span_reply.innerHTML = `${reply.replying_to} said:`
            const br1 = document.createElement("br")
            const br2 = document.createElement("br")

        
        
            const replying_paragraph = document.createElement("p")
            replying_paragraph.innerHTML = reply.original_content
            if(replying_paragraph.innerText.includes("(edited)")) {
            
            replying_paragraph.innerHTML = replying_paragraph.innerText.replace("(edited)", "")
            const strongEdited = document.createElement("strong")
            strongEdited.innerHTML = " (edited)"
            replying_paragraph.append(strongEdited)
            }
            replying_to_container.append(span_reply, br1, br2, replying_paragraph)
            const user_reply = document.createElement("p") //The reply paragraph div
            user_reply.classList.add("description_short_post")
            user_reply.innerHTML = reply.reply_content


            //Check if it is edited
            if(reply.is_edited) {
            user_reply.innerHTML = user_reply.innerText.replace("(edited)", "")
            const strongEdited = document.createElement("strong")
            strongEdited.innerHTML = " (edited)"
            user_reply.append(strongEdited)

            }
            post_contents.append(replying_to_container)
            post_contents.append(user_reply)

            //Interaction
            const interaction_container = document.createElement("div")
            interaction_container.classList.add("stats_post")

            const like = document.createElement('div')
            like.classList.add('counter_container')

            const i = document.createElement('i')
            i.classList.add('fa-regular')
            i.classList.add('fa-thumbs-up')

            const total_likes = document.createElement('p')
            total_likes.classList.add('like_counter')
        
            total_likes.innerText = reply.total_likes
            like.append(i, total_likes)

            if(info.userLoggedIn && info.user.liked_replies_id.includes(userPost.id)) {
            i.style = "color: coral;"
            i.dataset.clicked = "true"
            }


            const dislike = document.createElement('div')
            dislike.classList.add('counter_container')

            const i2 = document.createElement('i')
            i2.classList.add('fa-regular')
            i2.classList.add('fa-thumbs-down')

            const total_dislikes = document.createElement('p')
            total_dislikes.classList.add('like_counter')
            total_dislikes.innerText = reply.total_dislikes
            dislike.append(i2, total_dislikes)


            if(info.userLoggedIn && info.user.disliked_replies_id.includes(userPost.id)) {
            i2.style = "color: coral;"
            i2.dataset.clicked = "true"
            }
        

            const comment = document.createElement('div')
            comment.classList.add('reply_button')

            const i3 = document.createElement('i')
            i3.classList.add('fa-regular')
            i3.classList.add('fa-comment')

            const replyLang = document.createElement('p')
            replyLang.classList.add('comment_counter')
            replyLang.innerText = "Reply"
            comment.append(i3, replyLang)

            const challenge = document.createElement('div')
            challenge.classList.add('challenge_button')

            const i4 = document.createElement('i')
            i4.classList.add('fa-solid')
            i4.classList.add('fa-bullseye')

            const challenge_text = document.createElement('p')
            challenge_text.classList.add('challenge_text')
            challenge_text.innerText = "Challenge"


            challenge.append(i4, challenge_text)

            const delete_edit_container = document.createElement('div')
            delete_edit_container.classList.add('delete_edit_container')
            const delete_button = document.createElement('button')
            delete_button.classList.add("delete_button")

            const delete_text = document.createElement('h4')
            delete_text.innerText = "Delete"

            const delete_image = document.createElement('i')
            delete_image.classList.add('fa-regular', 'fa-trash-can')
            delete_button.append(delete_image, delete_text)
            delete_button.addEventListener("click", function(){
                deleteReply(reply_id)
                
            })

            const edit_button = document.createElement('button')
            edit_button.classList.add("edit_button")
            const edit_text = document.createElement('h4')
            edit_text.innerText = "Edit"

            const edit_image = document.createElement('i')
            edit_image.classList.add('fa-solid', 'fa-pen-to-square')

            edit_button.append(edit_image, edit_text)
            delete_edit_container.append(delete_button, edit_button)
        
            if(info.userLoggedIn && reply.username === info.user.username) {
            interaction_container.append(like,dislike, comment, delete_edit_container)
            }

            else {
            interaction_container.append(like,dislike, comment, challenge)

            }
        
            userPost.append(iconNameDate,post_contents, interaction_container)
            allRepliesContainer.append(userPost)
            
        });


    }

    // Function loads the notifications of the user to be displayed in the container
    async function loadNotifications(container){

        // Obtain the container for the notifications in the header
        const notificationContentContainer = document.getElementsByClassName("notification_content_container")[0];

        // Update by copying the innerHTML of the container passed with notificationContentContainer
        container.innerHTML = notificationContentContainer.innerHTML;

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

    //Runs the loadPosts function upon page load
    window.addEventListener("load", loadPosts());
});