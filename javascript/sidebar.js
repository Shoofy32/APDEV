document.addEventListener("DOMContentLoaded", () => {


    const caretIcon = document.getElementsByClassName("clickable_container")[0]; // Get the caret icon
    const sideBarHome = document.getElementsByClassName("sidebar_home_button")[0]; // Side bar home button

    const sideBarDropdowns = document.getElementsByClassName("side_bar_title_container"); // Dropdown titles


    // Add eventlistener to the sidebar button to call showSideBar()
    caretIcon.addEventListener("click" , showSideBar);

    // Add eventlistener to sidebar home button to open homepage.html
    sideBarHome.addEventListener("click" , () => {
        
        window.location.pathname = "./html/homepage.html";

    });

    // Add eventlistener to each sidebar dropdown to expand when clicked
    for(let i = 0; i < sideBarDropdowns.length; i ++)
        sideBarDropdowns[i].addEventListener("click", () => {
    
            showSideBarContent(sideBarDropdowns[i]);
    
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
            sidebar.style.width = "250px"
            sidebar_button.style.left = "235px";

            // Show sidebar content
            sidebar_content.style.visibility = "visible";

            // Change from right to left
            caretIcon.classList.toggle("fa-circle-chevron-right");
            caretIcon.classList.toggle("fa-circle-chevron-left"); 

        }
        else{

            // Minimize sidebar
            sidebar.style.width = "30px"
            sidebar_button.style.left = "15px";

            // Hide sidebar content
            sidebar_content.style.visibility = "hidden";

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



