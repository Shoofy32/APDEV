document.addEventListener('DOMContentLoaded', (event) => {


    const notificationContentContainer = document.getElementsByClassName("notification_content_container")[0];

    const notificationButton = document.getElementsByClassName("notification_button")[0];


    notificationButtonDisplay(); // Call function to display ! or not beside bell icon


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

        // If conditions check for which button was clicked and calls the function corresponding to that button
        if(acceptChallengeButton)
            acceptUserChallenge(event);
        else if(denyChallengeButton)
            closeUserChallenge(event.target.closest(".deny_challenge")); // Get the closest deny_challenge associated with the click


        notificationButtonDisplay(); // Call function to display ! or not beside bell icon

    });



    // -- NOTIFICATIONS CREATION FUNCTIONS -- //
    // ADD BACKEND FOR INFORMATION OF WHO CHALLENGED AND WHO THEY CHALLENGED

    function createChallengeNotification(rolledNumber, betLikes){

        const notificationContainer = document.getElementsByClassName("notification_content_container")[0];

        // OBTAIN FROM SESSION
        // CHANGE FOR BACKEND (ACCOUNT OF WHO CHALLENGED)
        let name = "CCS_GodXX";
        let image = "../resources/users/discordmod.jpg";

        // CHANGE BACKEND so that it only sends to the user it was challenged to


        const challengeContainer = 
        `<div class = "challenge_notification">


            <div class = "icon_name_challenge_container">

                <img src = ${image}>
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

        </div>`;

        notificationContainer.insertAdjacentHTML("beforeend", challengeContainer);
        
        notificationButtonDisplay(); // Call function to display ! or not beside bell icon
    }




    // -- NOTIFICATIONS INTERACTION FUNCTIONS -- //

    // Async function performs the actions for user challenge if user accepts it
    async function acceptUserChallenge(event){

        // Add temporary event listener for postBet to call the rollAndGetWinner function.
        const betChallengeButton = document.getElementsByClassName("postBet")[0]; // bet likes button

        const challengerContainer = event.target.closest(".challenge_notification"); // Challenge notification container


        // CHANGE FOR BACKEND (ACCOUNT OF WHO CHALLENGED) (NAME AND IMAGE OF USER)
        let name = "CCS_GodXX";
        let image = "../resources/users/discordmod.jpg";
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
                rollAndGetWinner(event.target.closest(".accept_challenge"), rollAndGetWinnerWrapper).then(resolve)

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
    async function rollAndGetWinner(buttonElement, wrapper){

        // FOR BACKEND STORE THE RESULTS TO THE DATABASE
        // STORE whoWon, whoLost, rollOfUser, LikesExchanged
        // Additionally, UPDATE USER'S LIKES AFTER WIN/LOSS


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
       

        // Since roll is successful, obtain the needed data such as user likes and challenger likes for the win results


        // Obtain the container for the amount of likes the user has
        var userCurrentLikes = document.getElementsByClassName("like_amount")[0];

        // Get the challenger and user number 
        const challengerNumber = parseInt(document.getElementsByClassName("challenger_rolled_number")[0].textContent);
        const userNumber = parseInt(document.getElementsByClassName("roll_20_number")[0].textContent);

        // If win, add current likes with the bet likes of the challenger. If lost, subtract likes with the amount the user betted with
        if(challengerNumber < userNumber)
            userCurrentLikes.textContent = parseInt(userCurrentLikes.textContent) + challengerNumber;
        else if(challengerNumber > userNumber)
            userCurrentLikes.textContent = parseInt(userCurrentLikes.textContent) - likesValue;


        // Remove temporary event listener
        betChallengeButton.removeEventListener("click", wrapper);

        // Call openChallenge to close the challenge page
        await timer(2000);
        openChallenge();


        // Delete dataset flag to avoid both event listeners in notification and posts js from running at once
        delete betChallengeButton.dataset.challengeFromNotification; // Delete for normal challenge

        // Call closeUserChallenge to close the challenge
        closeUserChallenge(buttonElement);

    }


    // Function closes the user challenge and removes the notification, and challenger in the roll D20 display
    function closeUserChallenge(buttonElement){

        // FOR BACKEND, DELETE FROM DB WHEN REMOVED


        // Check if buttonElement null, return if it is
        if(!buttonElement)
            return;

        // Find the challenge notification of the chosen accept challenge index
        const challengeContainer = buttonElement.closest(".challenge_notification");

        // Check if challengeContainer null, return if it is
        if(!challengeContainer)
            return;

        challengeContainer.remove(); // Remove said challenge notification from the notification list

        // Obtain the challenge stats container and make the stats container empty
        const challenger_stats_container = document.getElementsByClassName("challenger_stats_container")[0];
        challenger_stats_container.innerHTML = `<div class = "challenger_stats_container"></div>`


        // If current location is userprofile.html, then send a new custom event to the document to load notifications in userprofile
        if(window.location.pathname.endsWith("userprofile.html"))
            document.dispatchEvent(new CustomEvent("updateUserProfileNotifications"));

    }


    // Function updates the notificationButton whether to add alert text(!) or not depending if there are pending notifications
    function notificationButtonDisplay(){

        const currentNotifications = document.getElementsByClassName("challenge_notification"); // Challenge notifications

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

});