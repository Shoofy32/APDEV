window.updateTagSelection = updateTagSelection;
window.filterByTags = filterByTags;
window.clearFilterTags = clearFilterTags;

var searchResult; // Global variable for searchResult Which Stores Value Inputted in Search Bar

// Load showSearchResults on Page Load
window.onload = function(){

    localStorage.removeItem("filter_result");
    showSearchResults();

}


// Function that showsSearchResults Based on Search Result (Has Export so searchbar.js can utilize it)
export function showSearchResults(){

    // Get the value of search-content in localStorage
    searchResult = localStorage.getItem("search-content");

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
        var title_post = post[i].getElementsByClassName("title_post")[0];

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


// Function Updates localStorage to Include the Inputted Tag and Adds a Visual of It in the Sidebar
function updateTagSelection(inputElement, event){

    // Checks if Enter Key has been Pressed
    if(event.key == "Enter"){

        // Gets Value of Input from Tag Search Bar
        var inputValue = inputElement.value;

        // Gets the Input Tags Wrapper
        var tagsWrapper = document.getElementsByClassName("input_tags_wrapper")[0];

        // Create an empty existingFilterTags array to Store Current Tags in LocalStorage and Add the New inputValue one
        var exisitingFilterTags = []; 

        // Checks if filter_result is Not Null After Parsing the Value into an Array
        if(JSON.parse(localStorage.getItem("filter_result")) != null)
            exisitingFilterTags = JSON.parse(localStorage.getItem("filter_result")); // Store Tags in exisitingFilterTags

        // Checks if inputValue already exists within exisitingFilterTags
        if(!exisitingFilterTags.includes(inputValue)){

            exisitingFilterTags.push(inputValue); // Add the new Tag in Array

            // Create a new p Tag tag Stores inputValue for Display
            const tagDisplay = `<p class = "input_tag_display">${inputValue}</p>`;

            tagsWrapper.insertAdjacentHTML("beforeend", tagDisplay); // Add tagDisplay inside Wrapper

            // Open localStorage and Add search-content Item with Data of Result
            localStorage.setItem("filter_result", JSON.stringify(exisitingFilterTags));

        }
        else{

            alert("Filter already exists!"); // Alert error
        }
        

        inputElement.value = ""; // Empty Search Bar

    }


}


// Function Searches Posts with Inputted Tag/s and Shows Them. Also Highlights the Tag and Hides Post that don't have the Tag
function filterByTags(){
    
    // Obtain all Posts
    var post = document.getElementsByClassName("post");

    // Obtain All Inputted Filter Tags
    var filterTags = JSON.parse(localStorage.getItem("filter_result"));
    
    // Obtain Query Counter Display and Query Result
    var query_counter_display = document.getElementsByClassName("query_counter")[0];

    var query_counter = 0; // Counter that Contains Number of Post with Similar Search Result

    // Loop thorugh the post elements
    for(var i = 0; i < post.length; i++){

        // Get Post Title of Post
        var post_tags = post[i].getElementsByClassName("tag");

        var hasTag = false;

        for(var j = 0; j < post_tags.length; j++){

            // Get Post Title of Post
            var title_post = post[i].getElementsByClassName("title_post")[0];

            if(filterTags.includes(post_tags[j].textContent.trim()) && title_post.textContent.includes(searchResult)){


                post[i].style.display = "block"; // Display Post
                query_counter++; // Update Counter

                highlightText(post_tags[j], post_tags[j]); // Call Highlight Text Function

                hasTag = true;

            }

        }

        if(!hasTag)
            post[i].style.display = "none"; // Don't Display Post

    }

    query_counter_display.textContent = query_counter;

}


// Function Clears all Filter Tags From Local Storage and Resets the Search To Not Highlight Tags
function clearFilterTags(){

    // Checks if filter_result is Not Null After Parsing the Value into an Array
    if(JSON.parse(localStorage.getItem("filter_result")) != null){
        
        // Get the value of search-content in localStorage
        searchResult = localStorage.getItem("search-content");
    
        // Obtain all Posts
        var post = document.getElementsByClassName("post");
        
        // Obtain Query Counter Display and Query Result
        var query_counter_display = document.getElementsByClassName("query_counter")[0];

        var query_counter = 0; // Counter that Contains Number of Post with Similar Search Result

        // Loop thorugh the post elements
        for(var i = 0; i < post.length; i++){

            // Get Post Title of Post
            var title_post = post[i].getElementsByClassName("title_post")[0];


            // Section Removes highlight from Tags
            var tags = post[i].getElementsByClassName("tag");
            for(var j = 0; j < tags.length; j++)
                tags[j].innerHTML = tags[j].textContent;


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

        // Gets Tags Displayed in Side Bar
        var searchedTagFilters = document.getElementsByClassName("input_tag_display");

        // Removes all Tags in Side Bar
        for(var i = searchedTagFilters.length - 1; i >= 0; i--)
            searchedTagFilters[i].remove();

        query_counter_display.textContent = query_counter;

        // Remove filter_result from localStorage
        localStorage.removeItem("filter_result");
    }
    else{

        alert("Please provide input!"); // Show error

    }

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