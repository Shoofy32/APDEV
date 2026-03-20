document.addEventListener("DOMContentLoaded", async () => {

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

    // Profile Challenge bet button
    const profileBetChallengeButton = document.getElementsByClassName("challenge_profile_button")[0]; 

    // Buttons for switching display between posts, replies, and notifications
    const postsButton = document.getElementsByClassName("all_posts_button")[0]; // Post display button
    const replyButton = document.getElementsByClassName("all_reply_button")[0]; // Post reply button

    // Container for the posts, replies, and notifications of the user
    const allPostsContainer = document.getElementsByClassName("all_posts")[0]; // Container for posts
    const allRepliesContainer = document.getElementsByClassName("all_replies")[0]; // Container for replies
    const allNotificationsContainer = document.getElementsByClassName("all_notifications")[0]; // Container for notifications

    username.textContent = profileUser.username;
    currentLikes.textContent = profileUser.likes;
    userBio.textContent = profileUser.bio;
    userPfp.src = profileUser.profile;
    userBanner.src = profileUser.banner;
    currentMainDisplayWins.textContent = profileUser.wins;
    currentWins.textContent = profileUser.wins;
    currentLosses.textContent = profileUser.losses;
    currentTies.textContent = profileUser.ties;

    // Add classList to post container to show posts when userpage is first loaded
    allPostsContainer.classList.toggle("display_visible");

    //Add event listener to open challenge when clicked
    profileBetChallengeButton.addEventListener("click", async () => {

        // Obtain challenger name
        window.challengedUser = profileUser.username;

        openChallenge();

    });

    // Add event listener in posts button to load post display 
    postsButton.addEventListener("click", () => {

        if(!allPostsContainer.classList.contains("display_visible"))
            allPostsContainer.classList.toggle("display_visible");

        if(allRepliesContainer.classList.contains("display_visible"))
            allRepliesContainer.classList.toggle("display_visible");

        loadPosts();

    })

    // Add event listener in posts button to load reply display 
    replyButton.addEventListener("click", () => {

        if(allPostsContainer.classList.contains("display_visible"))
            allPostsContainer.classList.toggle("display_visible");

        if(!allRepliesContainer.classList.contains("display_visible"))
            allRepliesContainer.classList.toggle("display_visible");

        loadReplies(allRepliesContainer);

    })


    // Custon event listener for user profile to load notifications again, whenever challenge in header notifications were updates
    document.addEventListener("updateUserProfileNotifications", () => {

        // If notifications is displayed, update notifications list
        if(allNotificationsContainer.classList.contains("display_visible"))
            loadNotifications(allNotificationsContainer);

    });

    // -- USERPROFILE LOADING FUNCTIONS -- //

    // Function loads the posts of the user to be displayed in the container
    async function loadPosts(){

        // ADD FETCH FROM BACKEND
        // GET USERNAME, AND EACH POST THE USER MADE (WITH THE STATS INCLUDED)
        allPostsContainer.innerHTML="";


        let response = await fetch("/load-posts/" + profileUser.username);
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

        let response = await fetch("/load-replies/" + profileUser.username);
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