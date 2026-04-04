document.addEventListener("DOMContentLoaded", function(){

    const paginationNumbers = document.getElementsByClassName("pagination_number"); // Pagination number list

    const paginationImage = document.getElementsByClassName("pagination_image_about")[0]; // Image

    let displayedNumber = 0; // Store index of current displayed image



    
    for(let i = 0; i < paginationNumbers.length; i++){


         paginationNumbers[i].addEventListener("click", () => {

                changeActiveNumber(i);

        });

    }


    document.getElementsByClassName("fa-chevron-left")[0].addEventListener("click", () => {

        cyclePagination("back");

    });

    document.getElementsByClassName("fa-chevron-right")[0].addEventListener("click", () => {

        cyclePagination("forward");

    });


    // Function cycles through the projects when pressing left or right arrows
    function cyclePagination(action){

        // Remove active class on current dot
        paginationNumbers[displayedNumber].classList.toggle("pagination_active");

        // Left arrow cycles back
        if(action === "back"){

            if(displayedNumber === 0) // Cycle to the last project
                displayedNumber = links.length - 1;
            else
                displayedNumber--;

        }
        else if(action === "forward"){ // Right arrow cycles forward

            if(displayedNumber === links.length - 1) // Cycle to the first project
                displayedNumber = 0;
            else
                displayedNumber++

        }

        // Add active class on next dot
        paginationNumbers[displayedNumber].classList.toggle("pagination_active")

        changeImage(displayedNumber); // Call function to change project detailss
        
    }


    // Function changes active pagination when clicking the numbers instead of the arrows and loads associated page
    function changeActiveNumber(index){

        for(let i = 0; i < paginationNumbers.length; i++)
            if(paginationNumbers[i].classList.contains("pagination_active"))
                paginationNumbers[i].classList.toggle("pagination_active");

        paginationNumbers[index].classList.toggle("pagination_active");

        changeImage(index)

    }


    // Function changes the image linked to the pagination based on the passed index
    function changeImage(index){

        paginationImage.src = links[index].img;

    }


});


// Object array that stores link of images
const links = [

    {
        img: "../resources/images/Blevvit_About1.jpg"
    },
    {
        img: "../resources/images/Blevvit_About2.jpg"
    },
    {
        img: "../resources/images/Blevvit_About3.jpg"
    },
    {
        img: "../resources/images/Blevvit_About4.jpg"
    }

]