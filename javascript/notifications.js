document.addEventListener('DOMContentLoaded', (event) => {


    document.getElementsByClassName("notification_button")[0].addEventListener("click", () => {


        let notificationDropdown = document.getElementsByClassName("notification_dropdown")[0];

        notificationDropdown.classList.toggle("reveal_hidden");

    });


});