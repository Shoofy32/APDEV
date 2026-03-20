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
            getChallengeResultAndClose(acceptResultButton);


        notificationButtonDisplay(); // Call function to display ! or not beside bell icon

    });



    // ------------- FUNCTIONS ------------- //




    // -- NOTIFICATIONS LOAD FUNCTIONS -- //

    async function loadChallengeNotifications(){

        // Don't continue if theres no user logged in
        if(!window.userLoggedIn)
            return;

        const response = await fetch("/challenge-notifications");
        const challenges = await response.json();
        


        for(let i = 0; i < challenges.length; i++){

            let currentChallenge = challenges[i];

            const userResponse = await fetch(`/user/${currentChallenge.challenger_id}`);
            const challenger = await userResponse.json();

            let createdChallengeContainer = challengeContainerLayout(
                challenger.profile, 
                currentChallenge.challenger_username, 
                currentChallenge.challenger_roll, 
                currentChallenge.challenger_betlikes,
                currentChallenge._id)

            notificationContentContainer.insertAdjacentHTML("beforeend", createdChallengeContainer);


        }
        
    }



    async function loadChallengeResultNotifications(){

        // Don't continue if theres no user logged in
        if(!window.userLoggedIn)
            return;

        const response = await fetch("/challenge-notifications-result");
        const results = await response.json();
        

        for(let i = 0; i < results.length; i++){

            let currentResult = results[i];

            const userResponse = await fetch(`/user/${currentResult.challenged_id}`);
            const challenged = await userResponse.json();

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

    function createChallengeNotification(challengedUser, rolledNumber, betLikes){

        addChallengeNotification(rolledNumber, betLikes, challengedUser);

        notificationButtonDisplay(); // Call function to display ! or not beside bell icon
    }


    function createChallengeNotification(challengedUser, rolledNumber, betLikes){

        addChallengeNotification(rolledNumber, betLikes, challengedUser);

        notificationButtonDisplay(); // Call function to display ! or not beside bell icon
    }

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


    function challengeContainerResultLayout(wasRejected, isTie, image, name, winner_username, 
        loser_username, winner_roll, loser_roll, challenged_bet_likes, id){

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
        else if(isTie === true){

            return `                            
                <div class = "challenge_results_notification" id = "${id}">

                    <div class = "icon_name_challenge_container">

                        <img src = "${image}">
                        <p><span class = "challenger_name">${name}</span> Challenge Result: </p>

                    </div>


                    <div class = "challenge_results_container">

                        <div class = "results_alert_container">

                            <p class = "results_name">${winner_username} roll resulted in a tie!</p>
                            <p class = "results_alert">Likes will be refunded if you accept notification.</p>

                        </div>

                    </div>

                    <div class = "accept_deny_container">

                        <button class = "accept_result"><i class="fa-solid fa-circle-check fa-lg"></i></button>

                    </div>

                </div>
                `;


        }
        else
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

        const challengerContainer = event.target.closest(".challenge_notification"); // Challenge notification container


        // Get information of the challenge notification
        let name = challengerContainer.getElementsByClassName("challenger_name")[0].textContent;
        let image = challengerContainer.querySelector(".icon_name_challenge_container img").src;
        let rollNumber = parseInt(challengerContainer.getElementsByClassName("notification_challenger_roll")[0].textContent); 
        let betLikes = parseInt(challengerContainer.getElementsByClassName("notification_challenger_likes")[0].textContent);


        // Call challenge user which opens challenge container with stats of the person challenging them
        challengeUser(name, image, rollNumber, betLikes);

        // Set dataset flag to true to avoid both event listeners in notification and posts js from running at once
        betChallengeButton.dataset.challengeFromNotification = "true"; // Notification challenge

        // Create a new Promise object, storing the results of rollAndGetWinner (resolved) when completed.
        let succesfulRoll = new Promise((resolve) => {

            // Function wrapper for event listener removal and to pass index
            function rollAndGetWinnerWrapper(){

                // Get the closest accept_challenge associated with the click and then get the eventual resolve of promise after function is done
                rollAndGetWinner(event.target.closest(".accept_challenge"), rollAndGetWinnerWrapper, betLikes).then(resolve)

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
    async function rollAndGetWinner(buttonElement, wrapper, betLikes){

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

            userCurrentLikes.textContent = parseInt(userCurrentLikes.textContent) + likesValue;
            isTie = true;

        }




        // Remove temporary event listener
        betChallengeButton.removeEventListener("click", wrapper);

        // Call openChallenge to close the challenge page
        await timer(2000);
        openChallenge();


        // Check if user is logged in, and if so, update their like counter in the session and database
        if(window.userLoggedIn)
            updateAndSendChallengeResult(loser, winner ,isTie, challengerNumber, userNumber, betLikes, likesValue, challengerName);



        // Delete dataset flag to avoid both event listeners in notification and posts js from running at once
        delete betChallengeButton.dataset.challengeFromNotification; // Delete for normal challenge

        // Call closeUserChallenge to close the challenge
        closeUserChallenge(buttonElement);

    }




    async function updateAndSendChallengeResult(loser, winner, isTie, challengerNumber, userNumber, challengerBetLikes, challengedBetLikes, 
        notificationReceiver){

        if(!window.userLoggedIn)
            return;


        // Obtain the container for the amount of likes the user has
        var userCurrentLikes = document.getElementsByClassName("like_amount")[0];
        const updatedLikes =  parseInt(userCurrentLikes.textContent);


        await updateLikes(updatedLikes);

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


    function rejectChallengeNotification(buttonElement){

        const challengerContainer = buttonElement.closest(".challenge_notification"); // Challenge notification container

        const challengerName = challengerContainer.getElementsByClassName("challenger_name")[0].textContent;
        const betLikes = parseInt(challengerContainer.getElementsByClassName("notification_challenger_likes")[0].textContent);
        
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
        challengeContainer.remove(); // Remove said challenge notification from the notification list


        // Obtain the challenge stats container and make the stats container empty
        const challenger_stats_container = document.getElementsByClassName("challenger_stats_container")[0];
        challenger_stats_container.innerHTML = `<div class = "challenger_stats_container"></div>`


        // If current location is userprofile.html, then send a new custom event to the document to load notifications in userprofile
        if(window.location.pathname.endsWith("userprofile.html"))
            document.dispatchEvent(new CustomEvent("updateUserProfileNotifications"));

        notificationButtonDisplay(); // Call function to display ! or not beside bell icon

    }




    async function getChallengeResultAndClose(acceptResultButton){

        // Obtain the container for the amount of likes the user has and the amount
        const userCurrentLikesContainer = document.getElementsByClassName("like_amount")[0];
        const userCurrentLikes = parseInt(userCurrentLikesContainer.textContent);

        // Obtain the contaienr for the challenger result
        const challengeResultContainer = acceptResultButton.closest(".challenge_results_notification");
        
        // Fetch user info from route and convert to object
        const response = await fetch("/user-login"); // Fetch from route
        const info = await response.json() // Convert to object

        // Fetch challenger notificationr result from route and convert to object
        const resultResponse = await fetch(`/challenge-notifications-result/${challengeResultContainer.id}`); // Fetch from route
        const resultInfo = await resultResponse.json() // Convert to object

        // Add these to check what's coming back
        console.log("resultInfo:", resultInfo);
        console.log("isTie:", resultInfo.isTie);
        console.log("wasRejected:", resultInfo.wasRejected);
        console.log("winner_username:", resultInfo.winner_username);
        console.log("info.user.username:", info.user.username);

        let updatedLikes = userCurrentLikes;

        if(resultInfo.isTie === true || resultInfo.wasRejected === true){

            console.log("REFUND");
            updatedLikes = userCurrentLikes + resultInfo.challenger_bet_likes;

        }
        else if(resultInfo.winner_username === info.user.username){

            console.log("NO!");
            updatedLikes = userCurrentLikes + resultInfo.challenged_bet_likes + resultInfo.challenger_bet_likes;

        }

        
        console.log("WTF!");    

        // Update like container in header to show result of accepting and update database likes aswell
        userCurrentLikesContainer.textContent = updatedLikes;
        await updateLikes(updatedLikes);


        // Call function to remove challenge result notificaation information from the database
        removeChallengeNotificationResult(challengeResultContainer.id)
        challengeResultContainer.remove(); // Remove said challenge result notification from the notification list

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
    window.closeUserChallenge = closeUserChallenge;
    window.loadChallengeNotifications = loadChallengeNotifications;
    window.loadChallengeResultNotifications = loadChallengeResultNotifications;
    window.notificationButtonDisplay = notificationButtonDisplay;

});