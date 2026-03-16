document.addEventListener('DOMContentLoaded', (event) => {
    
    const button = document.getElementById("login")
    
    function login (){
        
        let user = document.getElementById("user").value;
        let password = document.getElementById("password").value;

        if(user != "" && password !=""){
            logUser(user, password);
        }
            
        else{
            alert("Please enter all your credentials properly")
        }
            
    }

    button.addEventListener('click', login);

    async function logUser(username, password) {
        const response = await fetch("http://localhost:3000/logUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (data.success) {
            window.location.href = "http://localhost:3000/profile"
        } 
        else{
            alert(data.message);
        }
    }
});