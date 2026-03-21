// Add all functions thta need /user-login information inside of DOM
document.addEventListener('DOMContentLoaded', async () => {

    // Fetches session information from /user-login route and converts it to be usuable JS object
    const response = await fetch("/user-login"); // Fetch from route
    const info = await response.json() // Convert to object



    // Function makes network request to /add-challenge and POST information of the challenge notification into the route to update db and session
    async function addChallengeNotification(challenger_roll, challenger_betlikes, challenged_username){

        console.log(challenged_username);
        
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

    // Make functions globally accessible
    window.addChallengeNotification = addChallengeNotification;
    window.addChallengeNotificationResult = addChallengeNotificationResult;

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