document.addEventListener('DOMContentLoaded', (event) => {
    
    const button = document.getElementById("register")
    
    function register (){

        let email = document.getElementById("email").value;
        let username = document.getElementById("user").value;
        let password = document.getElementById("pass").value;
        let password2 = document.getElementById("passconfirm").value;

        if(email != "" && password !="" && email.includes("@gmail.com") && username !="" && (password === password2)) {
            
            localStorage.setItem('username', username);
            window.location.href = '../home_page/homepage.html';

            window.open('../home_page/homepage.html', '_self');
        }
        else if(password != password2){
            alert("Passwords do not match")
            
        }
        else{
            alert("Please enter all your credentials properly")
        }
    }

    button.addEventListener('click', register);
});