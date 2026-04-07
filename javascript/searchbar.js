document.addEventListener("DOMContentLoaded", () => {

    // Get search bar input from header
    const searchBarInput = document.getElementsByClassName("search_bar_input")[0];
    

    document.addEventListener("keydown", (event) => {

        if(event.key === "Enter" && document.activeElement === searchBarInput)
            searchPost(searchBarInput);

    })



    // Function Opens Search Results Page After Enter Key Press
    function searchPost(searchElement){

        // Obtain Value in searchElement
        var searchContent = searchElement.value;


            // Open localStorage and Add search-content Item with Data of Result
            localStorage.setItem("search-content", searchContent);
            
            // If Current Path Location is not Search Results, then Send Data of LocalStorage to Search Results and Open It
            if(window.location.pathname != "/searchresults")
                window.location.href = "/searchresults";
            else{ // Already in Search Results and Instead Update Search Content and Search Results

                // Update localStorage and Refresh SearchResults
                localStorage.setItem("search-content", searchContent);
                showSearchResults();
                

            }



    }


    


    // Make searchPost Global
    window.searchPost = searchPost;


});

