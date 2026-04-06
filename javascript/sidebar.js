document.addEventListener("DOMContentLoaded", () => {


    const caretIcon = document.getElementsByClassName("clickable_container")[0]; // Get the caret icon
    const sideBarHome = document.getElementsByClassName("sidebar_home_button")[0]; // Side bar home button
    const sideBarProfile = document.getElementsByClassName("sidebar_profile_button")[0]; // Side bar home button
    const sideBarShop = document.getElementsByClassName("sidebar_shop_button")[0]; // Side bar home button

    const sideBarDropdowns = document.getElementsByClassName("side_bar_title_container"); // Dropdown titles

    const aboutButton = document.getElementsByClassName("about_topic_button")[0];


    // Add eventlistener to the sidebar button to call showSideBar()
    caretIcon.addEventListener("click" , showSideBar);

    // Add eventlistener to sidebar home button to open homepage.html
    sideBarHome.addEventListener("click" , () => {
        
        window.location.href = "/";

    });

    // Add eventlistener to each sidebar dropdown to expand when clicked
    for(let i = 0; i < sideBarDropdowns.length; i ++)
        sideBarDropdowns[i].addEventListener("click", () => {
    
            showSideBarContent(sideBarDropdowns[i]);
    
        });

    // Add event listener to sidebar home button to move to the homepage when clicked
    aboutButton.addEventListener("click", () => {

        window.location.href = "/about";

    });

    // Add event listener to sidebar shop button to move to shop when clicked
    sideBarProfile.addEventListener("click", () => {

        window.location.href = "/userprofile";

    });

    // Add event listener to sidebar shop button to move to userprofile when clicked
    sideBarShop.addEventListener("click", () => {

        window.location.href = "/shop";

    });


// ------------------ FUNCTIONS ------------------ //


    // Functions expands the side bar to make it visible to the user when cliking the sidebar button and closes it when clicked again
    function showSideBar(){

        var sidebar = document.getElementById("side_bar"); // Get the side bar div
        var sidebar_button = document.getElementById("sidebar_button_container"); // Get the side bar button div
        
        var sidebar_content = document.getElementById("side_bar_content"); // Get the side bar content to hide or show

        var caretIcon = document.getElementById("sidebar_button"); // Get caret icon

        
        // If condition checks class list of caret icon, to see if it's right (sidebar hidden) or left (sidebar shown)
        // Expand if right, Minimize if left
        if(caretIcon.classList.contains("fa-circle-chevron-right")){

            // Expand sidebar
            sidebar.classList.toggle("side_bar_open");
            sidebar_button.classList.toggle("clickable_container_open");

            // Show sidebar content
            sidebar_content.classList.toggle("side_bar_content_show");

            // Change from right to left
            caretIcon.classList.toggle("fa-circle-chevron-right");
            caretIcon.classList.toggle("fa-circle-chevron-left"); 

        }
        else{

            // Minimize sidebar
            sidebar.classList.toggle("side_bar_open");
            sidebar_button.classList.toggle("clickable_container_open");

            // Show sidebar content
            sidebar_content.classList.toggle("side_bar_content_show");

            // Change from left to right
            caretIcon.classList.toggle("fa-circle-chevron-left"); 
            caretIcon.classList.toggle("fa-circle-chevron-right");


        }


        
    }


    // Function opens or closes dropdown menus found in the sidebar
    function showSideBarContent(divElement){

        var contentElement = divElement.nextElementSibling; // Gets the sibling div which holds the content

        var caretIcon = divElement.querySelector(".fa-caret-right, .fa-caret-down"); // Get the caret icon which is the divElement


        // If condition checks if current display is hidden or not, and flips display and caret icon
        if(contentElement.style.display == "none"){

            contentElement.style.display = "inline-block";

            // Change from right to down
            caretIcon.classList.toggle("fa-caret-right");
            caretIcon.classList.toggle("fa-caret-down"); 

        }
        else{

            contentElement.style.display = "none";

            // Change from down to right
            caretIcon.classList.toggle("fa-caret-down");
            caretIcon.classList.toggle("fa-caret-right"); 

        }


    }


});



