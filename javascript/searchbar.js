import {showSearchResults} from "../javascript/searchresults.js"; // Import showSearchResults function
import {tester} from "../javascript/searchresults.js"; // Import showSearchResults function
// Make searchPost Global
window.searchPost = searchPost;

// Function Opens Search Results Page After Enter Key Press
function searchPost(searchElement, event){

    // Obtain Value in searchElement
    var searchContent = searchElement.value;

    // If Enter Key is Pressed and Either Length is Greater than 3 or Equal to 0, then Open Page
    if(event.key == "Enter" && (searchContent.length >= 3 || searchContent.length == 0)){

        // Open localStorage and Add search-content Item with Data of Result
        localStorage.setItem("search-content", searchContent);

        // If Current Path Location is not Search Results, then Send Data of LocalStorage to Search Results and Open It
        if(window.location.pathname != "/html/searchresults.html")
            window.location.href = "../html/searchresults.html";
        else{ // Already in Search Results and Instead Update Search Content and Search Results

            // Update localStorage and Refresh SearchResults
            localStorage.setItem("search-content", searchContent);
            showSearchResults();
            

        }


    }

}