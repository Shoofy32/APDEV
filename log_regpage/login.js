document.addEventListener('DOMContentLoaded', (event) => {
    
    const button = document.getElementById("login")
    
    function login (){
        
        let user = document.getElementById("user").value;
        let password = document.getElementById("password").value;

        if(user != "" && password !=""){
            document.getElementById("user").innerHTML="";

            localStorage.setItem('username', user);
            window.location.href = '../home_page/homepage.html';

            window.open('../home_page/homepage.html', '_self');
        }
            
        else{
            alert("Please enter all your credentials properly")
        }
            
    }

    button.addEventListener('click', login);
});