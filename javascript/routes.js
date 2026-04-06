// Add all functions thta need /user-login information inside of DOM
document.addEventListener('DOMContentLoaded', async () => {

    // Fetches session information from /user-login route and converts it to be usuable JS object
    const response = await fetch("/user-login"); // Fetch from route
    const info = await response.json() // Convert to object



    // Function makes network request to /add-challenge and POST information of the challenge notification into the route to update db and session
    async function addChallengeNotification(challenger_roll, challenger_betlikes, challenged_username){
        
        await fetch("/add-challenge", {

            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                challenger_username: info.user.username, 
                challenger_id: info.user._id,
                challenger_roll: challenger_roll, 
                challenger_betlikes: challenger_betlikes, 
                challenged_username: challenged_username})
        
        });

    }


    // Function makes network request to /add-challenge-result and POST information of the challenge result info into the route to update db and session
    async function addChallengeNotificationResult(wasRejected, isTie, winner_username, loser_username, winner_roll, loser_roll,
        challenger_bet_likes, challenged_bet_likes, notification_receiver){

        await fetch("/add-challenge-result", {

            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 

                wasRejected: wasRejected, 
                isTie: isTie,
                winner_username: winner_username,
                loser_username: loser_username, 
                winner_roll: winner_roll, 
                loser_roll: loser_roll,
                challenger_bet_likes: challenger_bet_likes,
                challenged_bet_likes: challenged_bet_likes,
                challenged_id: info.user._id,
                notification_receiver: notification_receiver

            })
        
        });

    }

    // Function makes network request to /user-update and ADDS information of what the user bought to the backend
    async function addShopItem(updatedLikes, addedItem){

        await fetch("/user-update", {

            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ newLikes: updatedLikes , newItems: [...info.user.itemsBought ,addedItem] })

        });

    }


    // Function makes network request to /user-update and UPDATE information of what the user wishes to equip
    async function updateEquippedItems(updatedItem, updatedValue){

        let currentEquippedItems = {...info.user.equippedItems, [updatedItem]: updatedValue}

        await fetch("/user-update", {

            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ newEquippedItems: currentEquippedItems})

        });

    }

    // Make functions globally accessible
    window.addChallengeNotification = addChallengeNotification;
    window.addChallengeNotificationResult = addChallengeNotificationResult;
    window.addShopItem = addShopItem;
    window.updateEquippedItems = updateEquippedItems;

});



// Function makes network request to /user-update route and PUTS information of the UPDATED LIKES into the route to update db and session
async function updateLikes(likes) {

    await fetch("/user-update", {

        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newLikes: likes })

    });

}

// Function makes network request to /user-update route and PUTS information of the UPDATED BIO into the route to update db and session
async function updateBio(bio) {

    await fetch("/user-update", {

        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newBio: bio })

    });

}

// Function makes network request to /user-update route and PUTS information of the UPDATED PROFILE PIC into the route to update db and session
async function updateProfile(image){

    await fetch("/user-update",{

        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newProfile: image })

    });
}

// Function makes network request to /user-update route and PUTS information of the UPDATED BIO into the route to update db and session
async function updateBanner(image){

    await fetch("/user-update",{

        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newBanner: image })
    });
}

// Function makes network request to /user-update route and PUTS information of the UPDATED WINS into the route to update db and session
async function updateWins(wins){

    await fetch("/user-update",{

        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newWins: wins })
    });
}

// Function makes network request to /user-update route and PUTS information of the UPDATED LOSSES into the route to update db and session
async function updateLosses(loss){

    await fetch("/user-update",{

        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newLosses: loss })
    });
}

// Function makes network request to /user-update route and PUTS information of the UPDATED TIES into the route to update db and session
async function updateTies(ties){

    await fetch("/user-update",{

        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newTies: ties })
    });
}


// Function makes network request to /user-update/:id route and PUTS information of the UPDATED INFO into the route to update db and session
async function updateAnotherUserByID(userID, information){

    await fetch(`/user-update/${userID}`,{

        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(information)
        
    });
}




// Function makes network request to /challenge-notifications/id and DELETE information of the challenge notification into the route to update db and session
async function removeChallengeNotification(challengeId){

    await fetch(`/challenge-notifications/${challengeId}`, {

        method: "DELETE",

    });

}




// Function makes network request to /challenge-notifications-result/id and DELETE information of the challenge result info into the route to update db and session
async function removeChallengeNotificationResult(challengeResultId){

    await fetch(`/challenge-notifications-result/${challengeResultId}`, {

        method: "DELETE",

    });

}




async function deletePost(id) {

    await fetch(`https://blevvit.onrender.com/post/${id}`, {
        method: "DELETE"
    });

}

async function updatePost(id, post_content, is_edited) {

    await fetch(`https://blevvit.onrender.com/post/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post_content, is_edited})
    });

}

async function updatePostLikes(id, increment) {

    await fetch(`https://blevvit.onrender.com/post/${id}/likes`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ increment })
    });

}

async function updatePostDislikes(id, increment) {
        
    await fetch(`https://blevvit.onrender.com/post/${id}/dislikes`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ increment })
    });

}

async function updateTotalComments(id, increment) {

    await fetch(`https://blevvit.onrender.com/post/${id}/total_comments`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ increment })
    });

}

async function updateUserLikedPosts(userId, postId) {

    await fetch(`/user/likedPosts/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ liked_posts_id: postId })
    });

}

async function removeUserLikedPosts(userId, postId) {

    await fetch(`/user/removeLikedPosts/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ liked_posts_id: postId })
    });

}


async function updateUserDislikedPosts(userId, postId) {

    await fetch(`/user/dislikedPosts/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ disliked_posts_id: postId })
    });

}

async function removeUserDislikedPosts(userId, postId) {

    await fetch(`/user/removeDislikedPosts/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ disliked_posts_id: postId })
    });

}

async function updateUserLikesPost(id, increment) {

    const response = await fetch(`https://blevvit.onrender.com/post/${id}`);
    const post = await response.json()
    const user_id = post.poster_id

    await fetch(`/user/likes/${user_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ increment })
    });

}



async function deleteReply(id) {
 
    await fetch(`https://blevvit.onrender.com/reply/${id}`, {

        method: "DELETE"

    });

}

async function addReply(username, replying_to, original_content, reply_content, unique_post_id, parent_reply_id, poster_id) {

  const date = new Date().toLocaleDateString();

    await fetch("https://blevvit.onrender.com/add-reply", {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
        username, 
        replying_to, 
        original_content, 
        reply_content, 
        unique_post_id, 
        total_likes: 0,         
        is_edited: false, 
        parent_reply_id,
        date,
        total_dislikes: 0,
        poster_id: poster_id

        })

    });
}


async function updateReply(id, reply_content, is_edited, original_content) {
   
    await fetch(`https://blevvit.onrender.com/reply/${id}`, {

        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reply_content, is_edited, original_content})

    });
 
}

async function updateReplyLikes(id, increment) {

    await fetch(`https://blevvit.onrender.com/reply/${id}/likes`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ increment })
    });

}

async function updateReplyDislikes(id, increment) {

    await fetch(`https://blevvit.onrender.com/reply/${id}/dislikes`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ increment })
    });

}

async function updateUserReplies(userId, postId) {

    await fetch(`/user/addPost/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ replies: postId })
    });

}



async function updateUserLikedReplies(userId, postId) {

    await fetch(`/user/likedReplies/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ liked_replies_id: postId })
    });

}

async function updateUserLikesReply(id, increment) {

    const response = await fetch(`/reply/${id}`);
    const reply = await response.json()
    const user_id = reply.poster_id

    await fetch(`/user/likes/${user_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ increment })
    });

}

async function removeUserLikedReplies(userId, postId) {

    await fetch(`/user/removeLikedReplies/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ liked_replies_id: postId })
    });

}


async function updateUserDislikedReplies(userId, postId) {

    await fetch(`/user/dislikedReplies/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ disliked_replies_id: postId })
    });

}


async function removeUserDislikedReplies(userId, postId) {

    await fetch(`/user/removeDislikedReplies/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ disliked_replies_id: postId })
    });

}


async function updatePosts(userId, postId) {

  await fetch(`/user/addReply/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ posts: postId })
  });
}




// Make functions globally accessible
window.updateLikes = updateLikes;
window.updateBio = updateBio;
window.updateProfile = updateProfile;
window.updateBanner = updateBanner;
window.removeChallengeNotification = removeChallengeNotification;
window.removeChallengeNotificationResult = removeChallengeNotificationResult;
window.updateWins = updateWins;
window.updateLosses = updateLosses;
window.updateTies = updateTies;
window.updateAnotherUserByID = updateAnotherUserByID;
window.deletePost = deletePost;
window.updatePost = updatePost;
window.updatePostLikes = updatePostLikes;
window.updatePostDislikes = updatePostDislikes;
window.updateTotalComments = updateTotalComments;
window.updateUserLikedPosts = updateUserLikedPosts;
window.removeUserLikedPosts = removeUserLikedPosts;
window.updateUserDislikedPosts = updateUserDislikedPosts;
window.removeUserDislikedPosts = removeUserDislikedPosts;
window.updateUserLikesPost = updateUserLikesPost;
window.deleteReply = deleteReply;
window.addReply = addReply;
window.updateReply = updateReply;
window.updateReplyLikes = updateReplyLikes;
window.updateReplyDislikes = updateReplyDislikes;
window.updateUserLikedReplies = updateUserLikedReplies;
window.removeUserLikedReplies = removeUserLikedReplies;
window.updateUserDislikedReplies = updateUserDislikedReplies;
window.removeUserDislikedReplies = removeUserDislikedReplies;
window.updateUserLikesReply = updateUserLikesReply;
window.updatePosts = updatePosts;