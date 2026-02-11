document.addEventListener('DOMContentLoaded', (event) => {
    
    const button = document.getElementById("login")
    
    function login (){
        
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        if(email != "" && password !="" && email.includes("@gmail.com")){
            document.getElementById("email").innerHTML="";
            window.open('../home_page/homepage.html', '_self');
        }
            
        else{
            console.log(email.innerHTML);
            console.log(password.innerHTML);
            alert("Please enter all your credentials properly")
        }
            
    }

    button.addEventListener('click', login);
});