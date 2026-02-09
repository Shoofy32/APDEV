// Load showSearchResults on Page Load
window.onload = function(){

    showSearchResults();

}

// Function that showsSearchResults Based on Search Result (Has Export so searchbar.js can utilize it)
export function showSearchResults(){

    // Get the value of search-content in localStorage
    const searchResult = localStorage.getItem("search-content");
    
    // Obtain all Posts
    var post = document.getElementsByClassName("post");
    
    // Obtain Query Counter Display and Query Result
    var query_counter_display = document.getElementsByClassName("query_counter")[0];
    var query_result = document.getElementsByClassName("search_query")[0];

    var query_counter = 0; // Counter that Contains Number of Post with Similar Search Result

    // Update search bar value to have searchResult
    document.getElementsByClassName("search_bar")[0].value = searchResult;

    // Change query result to the searchResult found in searchbar
    query_result.textContent = searchResult;

    // Loop thorugh the post elements
    for(var i = 0; i < post.length; i++){

        // Get Post Title of Post
        var title_post = post[i].getElementsByClassName("post_title")[0];

        // If title_post Contains the Text searchResults
        if(title_post.textContent.includes(searchResult)){

            post[i].style.display = "block"; // Display Post
            query_counter++; // Update Counter

            highlightText(title_post, searchResult); // Call Highlight Text Function

        }
        else{

            post[i].style.display = "none"; // Don't Display Post

        }

    }

    query_counter_display.textContent = query_counter;

}

// Function Highlights Text Made by the Search Bar via Regex
function highlightText(text, textToHighlight){

    // Create a Regex Object that Capture Texts for Highlighting that Finds ALL Matches of textToHighlight (Case-Insensitive) 
    // (${textToHighlight}) = Capture text that matches textToHighlight and Place it into a Variable Placeholder 
    var regex = new RegExp(`(${textToHighlight})`, "gi"); // g = global (All matches in title) | i = case-insensitive

    // Replace all text that are found in regex, and add a mark tag between it
    var highlightedText = text.textContent.replace(regex, "<mark>$1</mark>");

    // Replace innerHTML of text with the highlight version
    text.innerHTML = highlightedText;


}