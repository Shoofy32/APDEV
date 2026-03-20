document.addEventListener('DOMContentLoaded', (event) => {


    const notificationContentContainer = document.getElementsByClassName("notification_content_container")[0];

    const notificationButton = document.getElementsByClassName("notification_button")[0];



    // Add event listener for notificationButton
    notificationButton.addEventListener("click", () => {

        let notificationDropdown = document.getElementsByClassName("notification_dropdown")[0]; // Dropdown container
        let notificationButton = document.getElementsByClassName("notification_button")[0]; // Notification button

        // Toggle classes for dropdown functionality
        notificationDropdown.classList.toggle("reveal_hidden");
        notificationButton.classList.toggle("notification_active");

    });


    // Add event listener on notification container for event delegating
    notificationContentContainer.addEventListener("click", (event) => {

        // Targets the closest elements based on where you clicked
        const acceptChallengeButton = event.target.closest(".accept_challenge"); // Accept challenge button
        const denyChallengeButton = event.target.closest(".deny_challenge"); // Deny challenge button
        const acceptResultButton = event.target.closest(".accept_result");

        // If conditions check for which button was clicked and calls the function corresponding to that button
        if(acceptChallengeButton)
            acceptUserChallenge(event);
        else if(denyChallengeButton)
            rejectChallengeNotification(event.target.closest(".deny_challenge")); // Get the closest deny_challenge associated with the click
        else if(acceptResultButton)
            getChallengeResultAndClose(acceptResultButton); // Call function to accept results notification and close it


        notificationButtonDisplay(); // Call function to display ! or not beside bell icon

    });



    // -- NOTIFICATIONS LOAD FUNCTIONS -- //


    // Function loads the challenge notifications by fetching from database
    async function loadChallengeNotifications(){

        // Don't continue if theres no user logged in
        if(!window.userLoggedIn)
            return;

        // Fetches challenge notifications information from /challenge-notifications route and converts it to be usuable JS object
        const response = await fetch("/challenge-notifications");
        const challenges = await response.json();
        

        // For each challenge notification, create a container for it and end it to display
        for(let i = 0; i < challenges.length; i++){

            let currentChallenge = challenges[i];

            // Fetches challenger information from /user/:id route by using the currentChallenge.challenger_id
            const userResponse = await fetch(`/user/${currentChallenge.challenger_id}`);
            const challenger = await userResponse.json();

            // Create the challenge container
            let createdChallengeContainer = challengeContainerLayout(
                challenger.profile, 
                currentChallenge.challenger_username, 
                currentChallenge.challenger_roll, 
                currentChallenge.challenger_betlikes,
                currentChallenge._id)

            notificationContentContainer.insertAdjacentHTML("beforeend", createdChallengeContainer);


        }
        
    }


    // Function loads the challenge notifications results by fetching from database
    async function loadChallengeResultNotifications(){

        // Don't continue if theres no user logged in
        if(!window.userLoggedIn)
            return;

        // Fetches challenge notifications result information from /challenge-notifications-result route and converts it to be usuable JS object
        const response = await fetch("/challenge-notifications-result");
        const results = await response.json();
        

        // For each challenge notification result, create a container for it and end it to display
        for(let i = 0; i < results.length; i++){

            let currentResult = results[i];

            // Fetches challenger information from /user/:id route by using the currentResult.challenger_id
            const userResponse = await fetch(`/user/${currentResult.challenged_id}`);
            const challenged = await userResponse.json();

            // Create the challenge result container
            let createdChallengeResultContainer = challengeContainerResultLayout(
                currentResult.wasRejected,
                currentResult.isTie,
                challenged.profile, 
                challenged.username,
                currentResult.winner_username,
                currentResult.loser_username,
                currentResult.winner_roll,
                currentResult.loser_roll, 
                currentResult.challenged_bet_likes, 
                currentResult._id);

            notificationContentContainer.insertAdjacentHTML("beforeend", createdChallengeResultContainer);


        }
        
    }



    // -- NOTIFICATIONS CREATION FUNCTIONS -- //

    // Function creates the challenge container and updates notification button display
    function createChallengeNotification(challengedUser, rolledNumber, betLikes){

        addChallengeNotification(rolledNumber, betLikes, challengedUser);

        notificationButtonDisplay(); // Call function to display ! or not beside bell icon
    }


    // Function creates and returns the challenge container
    function challengeContainerLayout(image, name, rolledNumber, betLikes, id){

        return `
            <div class = "challenge_notification" id = "${id}">

                <div class = "icon_name_challenge_container">

                    <img src = "${image}">
                    <p><span class = "challenger_name">${name}</span> has challenged you! </p>

                </div>


                <div class = "roll_likes_container">

                    <p class = "notification_challenger_roll"><i class="fa-solid fa-dice-d20 fa-lg"></i> ${rolledNumber}</p>
                    <p class = "notification_challenger_likes"><i class="fa-solid fa-thumbs-up fa-lg"></i> ${betLikes} </p>

                </div>

                <div class = "accept_deny_container">

                    <button class = "accept_challenge"><i class="fa-solid fa-circle-check fa-lg"></i></button>
                    <button class = "deny_challenge"><i class="fa-solid fa-circle-xmark fa-lg"></i></button>

                </div>

            </div>
            `;

    }


    // Function creates and returns the challenge container result based on different conditions
    function challengeContainerResultLayout(wasRejected, isTie, image, name, winner_username, 
        loser_username, winner_roll, loser_roll, challenged_bet_likes, id){

        // Create rejected result version if challenge was rejected
        if(wasRejected === true){

            return `                            
                <div class = "challenge_results_notification" id = "${id}">

                    <div class = "icon_name_challenge_container">

                        <img src = "${image}">
                        <p><span class = "challenger_name">${name}</span> Challenge Result: </p>

                    </div>


                    <div class = "challenge_results_container">

                        <div class = "results_alert_container">

                            <p class = "results_name">${winner_username} rejected the challenge!</p>
                            <p class = "results_alert">Likes will be refunded if you accept notification.</p>

                        </div>

                    </div>

                    <div class = "accept_deny_container">

                        <button class = "accept_result"><i class="fa-solid fa-circle-check fa-lg"></i></button>

                    </div>

                </div>
                `;


        }
        else if(isTie === true){ // Create tied result version if challenge was rejected

            return `                            
                <div class = "challenge_results_notification" id = "${id}">

                    <div class = "icon_name_challenge_container">

                        <img src = "${image}">
                        <p><span class = "challenger_name">${name}</span> Challenge Result: </p>

                    </div>


                    <div class = "challenge_results_container">

                        <div class = "results_alert_container">

                            <p class = "results_name"> The roll resulted in a tie!</p>
                            <p class = "results_alert">Likes will be refunded if you accept notification.</p>

                        </div>

                    </div>

                    <div class = "accept_deny_container">

                        <button class = "accept_result"><i class="fa-solid fa-circle-check fa-lg"></i></button>

                    </div>

                </div>
                `;


        }
        else // Create normal result version if no rejection or tie
            return `                            
                <div class = "challenge_results_notification" id = "${id}">

                    <div class = "icon_name_challenge_container">

                        <img src = "${image}">
                        <p><span class = "challenger_name">${name}</span> Challenge Result: </p>

                    </div>


                    <div class = "challenge_results_container">

                        <div class = "results_display_container">

                            <p class = "results_name">Winner: ${winner_username}</p>
                            <p class = "number_result"><i class="fa-solid fa-dice-d20 fa-lg"></i>${winner_roll}</p>

                        </div>

                        <div class = "results_display_container">

                            <p class = "results_name">Loser: ${loser_username}</p>
                            <p class = "number_result"><i class="fa-solid fa-dice-d20 fa-lg"></i>${loser_roll}</p>

                        </div>

                        <div class = "results_display_container">

                            <p class = "results_name">Challenged Bet:</p>
                            <p class = "number_result_betlikes"><i class="fa-solid fa-thumbs-up fa-lg"></i>${challenged_bet_likes}</p>

                        </div>

                    </div>

                    <div class = "accept_deny_container">

                        <button class = "accept_result"><i class="fa-solid fa-circle-check fa-lg"></i></button>

                    </div>

                </div>
                `;

    }


    // -- NOTIFICATIONS INTERACTION FUNCTIONS -- //

    // Async function performs the actions for user challenge if user accepts it
    async function acceptUserChallenge(event){

        // Add temporary event listener for postBet to call the rollAndGetWinner function.
        const betChallengeButton = document.getElementsByClassName("postBet")[0]; // bet likes button

        const challengeContainer = event.target.closest(".challenge_notification"); // Challenge notification container


        // Get information of the challenge notification
        let name = challengeContainer.getElementsByClassName("challenger_name")[0].textContent;
        let image = challengeContainer.querySelector(".icon_name_challenge_container img").src;
        let rollNumber = parseInt(challengeContainer.getElementsByClassName("notification_challenger_roll")[0].textContent); 
        let betLikes = parseInt(challengeContainer.getElementsByClassName("notification_challenger_likes")[0].textContent);


        // Call challenge user which opens challenge container with stats of the person challenging them
        challengeUser(name, image, rollNumber, betLikes);

        // Set dataset flag to true to avoid both event listeners in notification and posts js from running at once
        betChallengeButton.dataset.challengeFromNotification = "true"; // Notification challenge

        // Create a new Promise object, storing the results of rollAndGetWinner (resolved) when completed.
        let succesfulRoll = new Promise((resolve) => {

            // Function wrapper for event listener removal and to pass index
            function rollAndGetWinnerWrapper(){

                // Get the closest accept_challenge associated with the click and then get the eventual resolve of promise after function is done
                rollAndGetWinner(event.target.closest(".accept_challenge"), rollAndGetWinnerWrapper, betLikes, challengeContainer).then(resolve)

            }

            // Call function wrapper for rollAndGetWinner
            betChallengeButton.addEventListener("click", rollAndGetWinnerWrapper);

        });

        return succesfulRoll; // Return Promise

    }

    // Function opens the challenge container with the challenger stats
    function challengeUser(name, image, rollNumber, betLikes){


        const challenger_stats_container = document.getElementsByClassName("challenger_stats_container")[0];

        challenger_stats_container.innerHTML = 
        `<div class = "challenger_stats_container">

            <img src = ${image} class = "challenger_icon">
            <p><span class = "challenger_name"><strong>${name}</strong></span></p>
            
            <div class = "challenger_rolls_likes_container">

                <i class="fa-solid fa-dice-d20 fa-lg"></i>
                <p class = "challenger_rolled_number">${rollNumber}</p>
                <i class="fa-regular fa-thumbs-up fa-xl"></i>
                <p class = "challenger_bet_likes">${betLikes}</p>

            </div>

        </div>`


        // Call openChallenge function with stats
        openChallenge();

    }


    // Function rolls D20 and updates the user's likes depending on result
    async function rollAndGetWinner(buttonElement, wrapper, betLikes, challengeContainer){

        // Bet challenge button
        const betChallengeButton = document.getElementsByClassName("postBet")[0];

        // Obtain the Value of the Number of Likes Input Box
        var likesValue = parseInt(document.getElementsByClassName("betLikes")[0].value);

        // Perform the roll and get the returned roll result to check if the roll was successful
        let rollResult = 0;
        rollResult = await rollD20(betChallengeButton.closest(".challenge"), false);

        // If roll was not successful, return and don't proceed
        if(rollResult === 0)
            return;
       


        // Obtain the container for the amount of likes the user has
        var userCurrentLikes = document.getElementsByClassName("like_amount")[0];

        // Get the challenger and user number 
        const challengerNumber = parseInt(document.getElementsByClassName("challenger_rolled_number")[0].textContent);
        const userNumber = parseInt(document.getElementsByClassName("roll_20_number")[0].textContent);

        // Get the challenger name and username
        const challengerName = document.getElementsByClassName("challenger_name")[0].textContent;
        const username = document.getElementsByClassName("username")[0].textContent;

        // Variables store who won, lost, of if there was a tie
        let loser;
        let winner;
        let isTie = false;
        

        // If win, add current likes with the bet likes of the challenger. If lost, subtract likes with the amount the user betted with
        if(challengerNumber < userNumber){

            userCurrentLikes.textContent = parseInt(userCurrentLikes.textContent) + likesValue + betLikes;

            loser = challengerName;
            winner = username;

        }
        else if(challengerNumber > userNumber){

            loser = username;
            winner = challengerName;

        }
        else{

            // If neither won or lost, then it was a tie, and refund likes and set isTie to true
            userCurrentLikes.textContent = parseInt(userCurrentLikes.textContent) + likesValue;
            isTie = true;

        }


        // Remove temporary event listener
        betChallengeButton.removeEventListener("click", wrapper);

        // Call openChallenge to close the challenge page
        await timer(2000);
        openChallenge();

        // Check if user is logged in, and if so, update the results and send the challenge results to challenger
        if(window.userLoggedIn)
            await updateAndSendChallengeResult(loser, winner ,isTie, challengerNumber, userNumber, betLikes, likesValue, challengerName, challengeContainer);



        // Delete dataset flag to avoid both event listeners in notification and posts js from running at once
        delete betChallengeButton.dataset.challengeFromNotification; // Delete for normal challenge

        // Call closeUserChallenge to close the challenge
        closeUserChallenge(buttonElement);

    }


    // Function updates the likes and challenge statistics of user and challenger based on roll result.
    // Also makes a challenge notification result to database
    async function updateAndSendChallengeResult(loser, winner, isTie, challengerNumber, userNumber, challengerBetLikes, challengedBetLikes, 
        notificationReceiver, challengeContainer){

        if(!window.userLoggedIn)
            return;


        // Get current likes
        const currentLikesContainer = document.getElementsByClassName("like_amount")[0];
        const currentLikes = parseInt(currentLikesContainer.textContent);
        
        // Fetches session information from /user-login route and converts it to be usuable JS object
        const response = await fetch("/user-login"); // Fetch from route
        const info = await response.json() // Convert to object

        // Fetches challenge notification information from /challenge-notifications/:id route and converts it to be usuable JS object
        const challengerNotifResponse = await fetch(`/challenge-notifications/${challengeContainer.id}`); // Fetch from route
        const challengerNotifInfo = await challengerNotifResponse.json() // Convert to object

        // Fetches challenger  information from /user/:id route by getting challenger_id from challengerNotifInfo
        const challengerResponse = await fetch(`/user/${challengerNotifInfo.challenger_id}`); // Fetch from route
        const challengerInfo = await challengerResponse.json() // Convert to object


        // Updates counter of both user and enemy depending on win and loss conditions
        if(isTie){ 

            // If tie, call functions to increment both user and challengers ties count by 1
            await updateTies(info.user.ties + 1);
            await updateAnotherUserByID(challengerInfo._id, {newTies: challengerInfo.ties + 1})

        }
        else if(info.user.username === winner){ 

            // If win, call functions to increment win of user and loss of challenger by 1
            await updateWins(info.user.wins + 1);
            await updateAnotherUserByID(challengerInfo._id, {newLosses: challengerInfo.losses + 1})

        }
        else{

            // If win, call functions to increment loss of user and win of challenger by 1
            await updateLosses(info.user.losses + 1);
            await updateAnotherUserByID(challengerInfo._id, {newWins: challengerInfo.wins + 1})

        }


        // Call function to update likes in database
        await updateLikes(currentLikes);

        // Add to database a new challenge notification result 
        addChallengeNotificationResult(

            false, 
            isTie,
            winner, 
            loser, 
            Math.max(challengerNumber, userNumber),
            Math.min(challengerNumber, userNumber),
            challengerBetLikes,
            challengedBetLikes,
            notificationReceiver
            
        );

    }


    // Function rejects the challenge notification and creates a variant of notification result of the rejection
    function rejectChallengeNotification(buttonElement){

        const challengeContainer = buttonElement.closest(".challenge_notification"); // Challenge notification container

        // Obtain challenger names and the bet likes
        const challengerName = challengeContainer.getElementsByClassName("challenger_name")[0].textContent;
        const betLikes = parseInt(challengeContainer.getElementsByClassName("notification_challenger_likes")[0].textContent);


        // Add to database a new challenge notification result (isRejected is set to true)
        addChallengeNotificationResult(

            true, 
            false,
            "", 
            "", 
            0,
            0,
            betLikes,
            0,
            challengerName
            
        );


        // Call closeUserChallenge to close the challenge
        closeUserChallenge(buttonElement);

        notificationButtonDisplay(); // Call function to display ! or not beside bell icon

    }



    // Function closes the user challenge and removes the notification, and challenger in the roll D20 display
    function closeUserChallenge(buttonElement){

        // Check if buttonElement null, return if it is
        if(!buttonElement)
            return;

        // Find the challenge notification of the chosen accept challenge index
        const challengeContainer = buttonElement.closest(".challenge_notification");

        // Check if challengeContainer null, return if it is
        if(!challengeContainer)
            return;

        // Call function to remove challenge notificaation information from the database
        removeChallengeNotification(challengeContainer.id)


        // Get the list of challenge containers by passing the id
        const listOfChallengeContainer = document.querySelectorAll(`[id="${challengeContainer.id}"`);

        // Remove each instance of that id
        for(let i = 0; i < listOfChallengeContainer.length; i++){

            listOfChallengeContainer[i].remove();
        }

        // Obtain the challenge stats container and make the stats container empty
        const challenger_stats_container = document.getElementsByClassName("challenger_stats_container")[0];
        challenger_stats_container.innerHTML = `<div class = "challenger_stats_container"></div>`


        // If current location is userprofile.html, then send a new custom event to the document to load notifications in userprofile
        if(window.location.pathname.endsWith("userprofile.html"))
            document.dispatchEvent(new CustomEvent("updateUserProfileNotifications"));

        notificationButtonDisplay(); // Call function to display ! or not beside bell icon

    }



    // Function gets the result from the result notification after a challenge is complete, and closes it
    async function getChallengeResultAndClose(acceptResultButton){

        // Obtain the container for the amount of likes the user has and the amount
        const userCurrentLikesContainer = document.getElementsByClassName("like_amount")[0];
        const userCurrentLikes = parseInt(userCurrentLikesContainer.textContent);

        // Obtain the contaienr for the challenger result
        const challengeResultContainer = acceptResultButton.closest(".challenge_results_notification");
        
        // Fetch user info from route and convert to object
        const response = await fetch("/user-login"); // Fetch from route
        const info = await response.json() // Convert to object

        // Fetch challenger notification result information from database via route by using id
        const resultResponse = await fetch(`/challenge-notifications-result/${challengeResultContainer.id}`); // Fetch from route
        const resultInfo = await resultResponse.json() // Convert to object


        // Make a variable that will store the updated likes (Default is the current amount of likes)
        let updatedLikes = userCurrentLikes;

        // Checks if result is tie or challenge was rejected, if so, change updateLikes so that it refunds the challenger's bet
        if(resultInfo.isTie === true || resultInfo.wasRejected === true)
            updatedLikes = userCurrentLikes + resultInfo.challenger_bet_likes;
        else if(resultInfo.winner_username === info.user.username) // If win, refund bet and add challenged likes
            updatedLikes = userCurrentLikes + resultInfo.challenged_bet_likes + resultInfo.challenger_bet_likes;


        // Update like container in header to show result of accepting and update database likes aswell
        userCurrentLikesContainer.textContent = updatedLikes;
        await updateLikes(updatedLikes);


        // Call function to remove challenge result notificaation information from the database
        removeChallengeNotificationResult(challengeResultContainer.id)


        // Get the list of challenge result containers by passing the id
        const listOfChallengeResultContainer = document.querySelectorAll(`[id="${challengeResultContainer.id}"`);

        // Remove each instance of that id
        for(let i = 0; i < listOfChallengeResultContainer.length; i++){

            listOfChallengeResultContainer[i].remove();
        }

        notificationButtonDisplay(); // Call function to display ! or not beside bell icon

    }



    // Function updates the notificationButton whether to add alert text(!) or not depending if there are pending notifications
    function notificationButtonDisplay(){

        const currentNotifications = document.querySelectorAll(".challenge_notification , .challenge_results_notification"); // Challenge notifications

        const notificationAlert = notificationButton.getElementsByClassName("notification_alert")[0]; // Notification Alert (!)


        // Check if there are current notifications and alert is null, if so insertHTML for adding the alert
        if(currentNotifications.length > 0 && !notificationAlert)
            notificationButton.insertAdjacentHTML("beforeend", '<span class="notification_alert">!</span>');

        // Else if there are no notifications and alert is not null, remove notification alert
        else if(currentNotifications.length === 0 && notificationAlert != null)
            notificationAlert.remove();


    }
 

    // Make functions globally accessible
    window.createChallengeNotification = createChallengeNotification;
    window.acceptUserChallenge = acceptUserChallenge;
    window.rejectChallengeNotification = rejectChallengeNotification;
    window.closeUserChallenge = closeUserChallenge;
    window.getChallengeResultAndClose = getChallengeResultAndClose;
    window.loadChallengeNotifications = loadChallengeNotifications;
    window.loadChallengeResultNotifications = loadChallengeResultNotifications;
    window.notificationButtonDisplay = notificationButtonDisplay;


});
