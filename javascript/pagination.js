document.addEventListener("DOMContentLoaded", function(){

    // Constants to adjust pagination variables
    const minPaginationNumber = 0;
    const maxPaginationNumber = 2;
    const maxPageLimit = 30;

    const paginationNumbers = document.getElementsByClassName("pagination_number"); // Pagination number list
    const inputPage = document.getElementsByClassName("inputPage")[0]; // Input page element

    // Individual pagination numbers
    let paginationList; // Pagination list
    const paginationNumber1 = paginationNumbers[0];
    const paginationNumber2 = paginationNumbers[1];
    const paginationNumber3 = paginationNumbers[2];

    // displayed number and internal current page number
    let displayedNumber = 0;
    let currentNumber = 0;


    
    for(let i = 0; i < paginationNumbers.length; i++){

        if(i != paginationNumbers.length - 1)
            paginationNumbers[i].addEventListener("click", () => {

                changeActiveNumber(i);

            });
        else
            paginationNumbers[i].addEventListener("click", () => {

                paginationNumbers[i].closest(".pagination_container").classList.toggle("page_selector_container_show");

            });

    }


    document.getElementsByClassName("fa-chevron-left")[0].addEventListener("click", () => {

        cyclePagination("back");

    });

    document.getElementsByClassName("fa-chevron-right")[0].addEventListener("click", () => {

        cyclePagination("forward");

    });


    document.addEventListener("keydown", (event) => {

        if(event.key === "Enter" && parseInt(inputPage.value) >= 1 && parseInt(inputPage.value) <= maxPageLimit){


        // Update displayedNumber and currentNumber
        displayedNumber = 0;
        currentNumber = parseInt(inputPage.value);

        // Update paginationList
        paginationNumber1.textContent = parseInt(inputPage.value);
        paginationNumber2.textContent = parseInt(inputPage.value) + 1;
        paginationNumber3.textContent = parseInt(inputPage.value) + 2;

        // Save to session storage before moving to new page
        sessionStorage.setItem("currentNumber", currentNumber)
        sessionStorage.setItem("displayedNumber", displayedNumber)
        sessionStorage.setItem("paginationNumber", JSON.stringify([paginationNumber1.textContent, 
                                paginationNumber2.textContent, paginationNumber3.textContent]))


        // Change page and reset inputPage
        changePage(parseInt(inputPage.value));
        inputPage.value = "";


        }

    })


    loadPagination(); // Load pagination



    // ---------------- FUNCTION ---------------- // 


    // Function loads active pagination and numbers in pagination
    function loadPagination(){

        // Gets displayedNumber saved from sessionStorage. 0 if null.
        if(!sessionStorage.getItem("displayedNumber"))
            displayedNumber = 0;
        else
            displayedNumber = parseInt(sessionStorage.getItem("displayedNumber"));

        // Gets currentNumber saved from sessionStorage. 0 if null.
        if(!sessionStorage.getItem("currentNumber"))
            currentNumber = 0;
        else
            currentNumber = parseInt(sessionStorage.getItem("currentNumber"));

        // Gets paginationNumber saved from sessionStorage. 0 if null.
        if(!sessionStorage.getItem("paginationNumber"))
            paginationList = [1,2,3];
        else
            paginationList = JSON.parse(sessionStorage.getItem("paginationNumber"));


        // Toggle current active pagination
        paginationNumbers[displayedNumber].classList.toggle("pagination_active")

        // Load pagination numbers
        paginationNumber1.textContent = paginationList[0];
        paginationNumber2.textContent = paginationList[1];
        paginationNumber3.textContent = paginationList[2];


    }


    // Function cycles through the projects when pressing left or right arrows
    function cyclePagination(action){

        // Remove active class on current dot
        paginationNumbers[displayedNumber].classList.toggle("pagination_active")

        // Left arrow cycles back
        if(action === "back"){

            // Avoid going into negatives
            if(currentNumber > minPaginationNumber)
                currentNumber--;

            if(displayedNumber > minPaginationNumber)
                displayedNumber--;
           else if(displayedNumber == 0 && paginationNumber1.textContent != '1'){

                displayedNumber = minPaginationNumber;
                
                paginationNumber3.textContent = paginationNumber2.textContent;
                paginationNumber2.textContent = paginationNumber1.textContent;
                paginationNumber1.textContent = parseInt(paginationNumber1.textContent) - 1;


           }

        }
        else if(action === "forward"){ // Right arrow cycles forward

            // Limit max pages for pagination
            if(currentNumber <= maxPageLimit)
                currentNumber++;

            if(displayedNumber < maxPaginationNumber)
                displayedNumber++;
           else if(displayedNumber === maxPaginationNumber){

                displayedNumber = maxPaginationNumber;

                paginationNumber1.textContent = paginationNumber2.textContent;
                paginationNumber2.textContent = paginationNumber3.textContent;
                paginationNumber3.textContent = currentNumber + 1; 

           }

        }

        // Save to session storage before moving to new page
        sessionStorage.setItem("currentNumber", currentNumber)
        sessionStorage.setItem("displayedNumber", displayedNumber)
        sessionStorage.setItem("paginationNumber", JSON.stringify([paginationNumber1.textContent, 
                                paginationNumber2.textContent, paginationNumber3.textContent]))


        changePage(currentNumber + 1); // Call function to change project detailss
        
    }


    // Function changes active pagination when clicking the numbers instead of the arrows and loads associated page
    function changeActiveNumber(index){

        for(let i = 0; i < paginationNumbers.length; i++)
            if(paginationNumbers[i].classList.contains("pagination_active"))
                paginationNumbers[i].classList.toggle("pagination_active");

        paginationNumbers[index].classList.toggle("pagination_active");

        // Update displayedNumber and currentNumber
        displayedNumber = index;
        currentNumber = parseInt(paginationNumbers[index].textContent) - 1;


        // Save to session storage before moving to new page
        sessionStorage.setItem("currentNumber", currentNumber)
        sessionStorage.setItem("displayedNumber", displayedNumber)
        sessionStorage.setItem("paginationNumber", JSON.stringify([paginationNumber1.textContent, 
                                paginationNumber2.textContent, paginationNumber3.textContent]))


        changePage(currentNumber + 1); // Call function to change project detailss

    }


    // Function changes project details when clicking arrow or dot
    function changePage(index){
    
        let params = new URLSearchParams(window.location.search); // Get query string of URL 
        params.set("page", index) // Set page to passed index
        window.location.href = `${window.location.pathname}?${params.toString()}`; // Add updated page to URL 

    }


});

