document.addEventListener('DOMContentLoaded', (event) => {

    const button = document.getElementById("register")
    
    function register (){

        let email = document.getElementById("email").value;
        let username = document.getElementById("user").value;
        let password = document.getElementById("pass").value;
        let password2 = document.getElementById("passconfirm").value;

        if(email != "" && password !="" && email.includes("@gmail.com") && username !="" && (password === password2)) {
            addUser(email,username,password)
        }
        else if(password != password2){
            alert("Passwords do not match")
        }
        else{
            alert("Please enter all your credentials properly")
        }
    }

    button.addEventListener('click', register);

    async function addUser(email, username, password) {
        const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, username, password })
        });

        const data = await response.json();

        if (data.success) {
            alert(data.message); // or update a UI element
        } else {
            alert(data.message); // show the error to the user
        }
    }
});
