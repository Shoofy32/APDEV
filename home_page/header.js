document.addEventListener('DOMContentLoaded', (event) => {
    
    let username = localStorage.getItem('username');
    const container = document.getElementById("topright");
    const anon = document.getElementById("anon");
    const user = document.getElementById("user");
    const button = document.getElementById("logout");
    let name = document.getElementById("username");
    const sib= user.nextSibling;


    if (username != ""){
        anon.style.opacity="0";
        
        const sib= user.nextSibling;

        container.insertBefore(user,anon);
        container.insertBefore(anon,sib);

        name.innerHTML=username;
    }
    else
        user.style.opacity="0";

    function logout() {
        localStorage.setItem('username',"");
        
        const sib2 = anon.nextSibling;

        container.insertBefore(anon,user);
        container.insertBefore(sib,anon);

        window.open('../log_regpage/login.html', '_self');
    }

    button.addEventListener('click', logout);
});