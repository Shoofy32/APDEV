document.addEventListener('DOMContentLoaded', (event) => {

    const button = document.getElementById("register")
    
    function register (){

        let email = document.getElementById("email").value;
        let username = document.getElementById("user").value;
        let password = document.getElementById("pass").value;
        let password2 = document.getElementById("passconfirm").value;

        if(email != "" && password !="" && email.includes("@gmail.com") && username !="" && (password === password2)) {
            
            console.log("adding user");
            addUser(email,username,password);
            console.log("this was successful");
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
    await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, username, password })
    });
}
});
