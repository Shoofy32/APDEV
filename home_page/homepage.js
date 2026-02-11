
// Function opens or closes dropdown menu
function showDropdownContent(divElement){

    var contentID = divElement.nextElementSibling; // Gets the sibling div which holds the content

    var caretIcon = divElement.querySelector(".fa-caret-right, .fa-caret-down"); // Get the caret icon


    // If condition checks if current display is hidden or not, and flips display and caret icon
    if(contentID.style.display == "none"){

        contentID.style.display = "inline-block";

        // Change from right to down
        caretIcon.classList.toggle("fa-caret-right");
        caretIcon.classList.toggle("fa-caret-down"); 

    }

    else{

        contentID.style.display = "none";

        // Change from down to right
        caretIcon.classList.toggle("fa-caret-down");
        caretIcon.classList.toggle("fa-caret-right"); 

    }

    

}

