window.updateTagSelection = updateTagSelection;
window.filterByTags = filterByTags;
window.clearFilterTags = clearFilterTags;

var searchResult; // Global variable for searchResult Which Stores Value Inputted in Search Bar

// Load showSearchResults on Page Load
window.onload = function(){

    localStorage.removeItem("filter_result");

    // If opened page is saerchresults.html, show the results of the searchbar
    if(window.location.pathname.includes("searchresults.html"))
        showSearchResults();

}
export async function tester() {
    alert("test")
}

// Function that showsSearchResults Based on Search Result (Has Export so searchbar.js can utilize it)
export async function showSearchResults(){

    searchResult = localStorage.getItem("search-content");
    var query_counter = 0;
    var query_counter_display = document.getElementsByClassName("query_counter")[0];
    var query_result = document.getElementsByClassName("search_query")[0];
    query_result.textContent = searchResult;
    



    const response = await fetch("http://localhost:3000/posts");
    const posts = await response.json();
    const authentication = await fetch("/user-login")
    const info = await authentication.json()

    const all_posts = document.getElementsByClassName('search_results_container')[0]
    //Clear it first
    const existingPosts = all_posts.getElementsByClassName("post");
    while(existingPosts.length > 0)
        existingPosts[0].remove();
    
    
    posts.forEach(async post => {
        
        //Get user information
        if(post.post_title.includes(searchResult)) {
        query_counter++;
        const user_info = await fetch(`http://localhost:3000/user/${post.poster_id}`);
        const user = await user_info.json();


        
        
        const userPost = document.createElement("div");
        userPost.id = post._id
        userPost.classList.add("post");

        const iconNameDate = document.createElement("div");
        iconNameDate.classList.add("icon_name_date_post");

        const profile = document.createElement("img");
        profile.src = user.profile;

        const namePost = document.createElement("p");
        namePost.classList.add("name_post");
        namePost.textContent = post.username;

        const datePost = document.createElement("p");
        datePost.classList.add("date_post");
        datePost.textContent = post.date

        const title = document.createElement("h3");
        title.classList.add("title_post");
        title.innerText = post.post_title;

        const tags_post = document.createElement('div')
        tags_post.classList.add("tags_post")
        let tags = post.tags
        for(let tag of tags) {
            const p_tag = document.createElement('p')
            p_tag.classList.add('tag')
            p_tag.add
            p_tag.innerText = tag
            tags_post.append(p_tag)
        }
    

        const description = document.createElement("p");
        description.classList.add("description_short_post");
        description.innerText = post.post_content;
        if(post.is_edited === true) {
            description.innerText = post.post_content.replace("(edited)", "")
            const strongEdited = document.createElement("strong")
            strongEdited.innerHTML = " (edited)"
            description.append(strongEdited)
        }

        iconNameDate.append(profile, namePost, datePost);

        //Interaction Containers
        const interaction_container = document.createElement("div")
        interaction_container.classList.add("stats_post")

        const like = document.createElement('div')
        like.classList.add('counter_container')

        const i = document.createElement('i')
        i.classList.add('fa-regular')
        i.classList.add('fa-thumbs-up')
      

        const total_likes = document.createElement('p')
        total_likes.classList.add('like_counter')
        total_likes.innerText = post.total_likes
        like.append(i, total_likes)


        if(info.userLoggedIn && info.user.liked_posts_id.includes(userPost.id)) {
          i.style = "color: coral;"
          i.dataset.clicked = "true"
        }

        const dislike = document.createElement('div')
        dislike.classList.add('counter_container')

        const i2 = document.createElement('i')
        i2.classList.add('fa-regular')
        i2.classList.add('fa-thumbs-down')

        if(info.userLoggedIn && info.user.disliked_posts_id.includes(userPost.id)) {
          i2.style = "color: coral;"
          i2.dataset.clicked = "true"
        }

        const total_dislikes = document.createElement('p')
        total_dislikes.classList.add('like_counter')
        total_dislikes.innerText = post.total_dislikes
        dislike.append(i2, total_dislikes)

        const comment = document.createElement('div')
        comment.classList.add('comment_container')

        const i3 = document.createElement('i')
        i3.classList.add('fa-regular')
        i3.classList.add('fa-comment')

        const reply = document.createElement('p')
        reply.classList.add('comment_counter')
        reply.innerText = post.total_comments
        comment.append(i3, reply)


        const challenge = document.createElement('div')
        challenge.classList.add('challenge_button')

        const i4 = document.createElement('i')
        i4.classList.add('fa-solid')
        i4.classList.add('fa-bullseye')

        const challenge_text = document.createElement('p')
        challenge_text.classList.add('challenge_text')
        challenge_text.innerText = "Challenge"

        
        challenge.append(i4, challenge_text)

        const delete_edit_container = document.createElement('div')
        delete_edit_container.classList.add('delete_edit_container')
        const delete_button = document.createElement('button')
        delete_button.classList.add("delete_button")
        delete_button.addEventListener("click", function(e) {
            deletePost(post._id)
        })

        const delete_text = document.createElement('h4')
        delete_text.innerText = "Delete"

        const delete_image = document.createElement('i')
        delete_image.classList.add('fa-regular', 'fa-trash-can')

        delete_button.append(delete_image, delete_text)

        const edit_button = document.createElement('button')
        edit_button.classList.add("edit_button")
        const edit_text = document.createElement('h4')
        edit_text.innerText = "Edit"

        const edit_image = document.createElement('i')
        edit_image.classList.add('fa-solid', 'fa-pen-to-square')


        edit_button.append(edit_image, edit_text)
       
        delete_edit_container.append(delete_button, edit_button)

        //Check if the user is logged in and give them edit
        if(info.userLoggedIn && post.username === info.user.username) {
          interaction_container.append(like,dislike, comment)
        }
        else {
          interaction_container.append(like,dislike, comment, challenge)
        }
        




        userPost.append(iconNameDate, title, tags_post, description, interaction_container);
        highlightText(title, searchResult);
        all_posts.append(userPost);
    }   
        
        
    query_counter_display.textContent = query_counter;
    });

    

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
async function filterByTags(){

    var query_counter = 0;
    var query_counter_display = document.getElementsByClassName("query_counter")[0];
    var query_result = document.getElementsByClassName("search_query")[0];
    query_result.innerHTML = ""

    



    const response = await fetch("http://localhost:3000/posts");
    const posts = await response.json();
    
    const authentication = await fetch("/user-login")
    const info = await authentication.json()


    
    var filterTags = JSON.parse(localStorage.getItem("filter_result"));
    
   


    const all_posts = document.getElementsByClassName('search_results_container')[0]
    //Clear it first
    const existingPosts = all_posts.getElementsByClassName("post");
    while(existingPosts.length > 0)
        existingPosts[0].remove();
    
    
    posts.forEach(async post => {
        var post_tags = post.tags;
        let matches;
        if(filterTags && filterTags.length > 0) {
            matches = filterTags.every(tag => post_tags.includes(tag))
        }
        //Get user information
        if(matches) {
        query_counter++;
        const user_info = await fetch(`http://localhost:3000/user/${post.poster_id}`);
        const user = await user_info.json();


        
        
        const userPost = document.createElement("div");
        userPost.id = post._id
        userPost.classList.add("post");

        const iconNameDate = document.createElement("div");
        iconNameDate.classList.add("icon_name_date_post");

        const profile = document.createElement("img");
        profile.src = user.profile;

        const namePost = document.createElement("p");
        namePost.classList.add("name_post");
        namePost.textContent = post.username;

        const datePost = document.createElement("p");
        datePost.classList.add("date_post");
        datePost.textContent = post.date

        const title = document.createElement("h3");
        title.classList.add("title_post");
        title.innerText = post.post_title;

        const tags_post = document.createElement('div')
        tags_post.classList.add("tags_post")
        let tags = post.tags
        for(let tag of tags) {
            const p_tag = document.createElement('p')
            p_tag.classList.add('tag')
            p_tag.add
            p_tag.innerText = tag
              if(filterTags.includes(tag))  
                    highlightText(p_tag, tag); 
            tags_post.append(p_tag)
        }
    

        const description = document.createElement("p");
        description.classList.add("description_short_post");
        description.innerText = post.post_content;
        if(post.is_edited === true) {
            description.innerText = post.post_content.replace("(edited)", "")
            const strongEdited = document.createElement("strong")
            strongEdited.innerHTML = " (edited)"
            description.append(strongEdited)
        }

        iconNameDate.append(profile, namePost, datePost);

        //Interaction Containers
        const interaction_container = document.createElement("div")
        interaction_container.classList.add("stats_post")

        const like = document.createElement('div')
        like.classList.add('counter_container')

        const i = document.createElement('i')
        i.classList.add('fa-regular')
        i.classList.add('fa-thumbs-up')
      

        const total_likes = document.createElement('p')
        total_likes.classList.add('like_counter')
        total_likes.innerText = post.total_likes
        like.append(i, total_likes)


        if(info.userLoggedIn && info.user.liked_posts_id.includes(userPost.id)) {
          i.style = "color: coral;"
          i.dataset.clicked = "true"
        }

        const dislike = document.createElement('div')
        dislike.classList.add('counter_container')

        const i2 = document.createElement('i')
        i2.classList.add('fa-regular')
        i2.classList.add('fa-thumbs-down')

        if(info.userLoggedIn && info.user.disliked_posts_id.includes(userPost.id)) {
          i2.style = "color: coral;"
          i2.dataset.clicked = "true"
        }

        const total_dislikes = document.createElement('p')
        total_dislikes.classList.add('like_counter')
        total_dislikes.innerText = post.total_dislikes
        dislike.append(i2, total_dislikes)

        const comment = document.createElement('div')
        comment.classList.add('comment_container')

        const i3 = document.createElement('i')
        i3.classList.add('fa-regular')
        i3.classList.add('fa-comment')

        const reply = document.createElement('p')
        reply.classList.add('comment_counter')
        reply.innerText = post.total_comments
        comment.append(i3, reply)


        const challenge = document.createElement('div')
        challenge.classList.add('challenge_button')

        const i4 = document.createElement('i')
        i4.classList.add('fa-solid')
        i4.classList.add('fa-bullseye')

        const challenge_text = document.createElement('p')
        challenge_text.classList.add('challenge_text')
        challenge_text.innerText = "Challenge"

        
        challenge.append(i4, challenge_text)

        const delete_edit_container = document.createElement('div')
        delete_edit_container.classList.add('delete_edit_container')
        const delete_button = document.createElement('button')
        delete_button.classList.add("delete_button")
        delete_button.addEventListener("click", function(e) {
            deletePost(post._id)
        })

        const delete_text = document.createElement('h4')
        delete_text.innerText = "Delete"

        const delete_image = document.createElement('i')
        delete_image.classList.add('fa-regular', 'fa-trash-can')

        delete_button.append(delete_image, delete_text)

        const edit_button = document.createElement('button')
        edit_button.classList.add("edit_button")
        const edit_text = document.createElement('h4')
        edit_text.innerText = "Edit"

        const edit_image = document.createElement('i')
        edit_image.classList.add('fa-solid', 'fa-pen-to-square')


        edit_button.append(edit_image, edit_text)
       
        delete_edit_container.append(delete_button, edit_button)

        //Check if the user is logged in and give them edit
        if(info.userLoggedIn && post.username === info.user.username) {
          interaction_container.append(like,dislike, comment)
        }
        else {
          interaction_container.append(like,dislike, comment, challenge)
        }
        




        userPost.append(iconNameDate, title, tags_post, description, interaction_container);
        highlightText(title, searchResult);
        all_posts.append(userPost);
    }   
        
        
    query_counter_display.textContent = query_counter;
    });
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