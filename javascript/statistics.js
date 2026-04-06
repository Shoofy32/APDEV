document.addEventListener("DOMContentLoaded", async () => {

    const postsCount = document.getElementsByClassName("statistic_post")[0];
    const messagesCount = document.getElementsByClassName("statistic_messages")[0];
    const membersCount = document.getElementsByClassName("statistic_members")[0];
    const modsCount = document.getElementsByClassName("statistic_mods")[0];

    const postResponse = await fetch("https://blevvit.onrender.com/posts");
    const posts = await postResponse.json();

    const userResponse = await fetch("/users");
    const users = await userResponse.json();


    let totalComments = 0;
    let totalModerators = 0;
    

    for(let i = 0; i < posts.length; i++)
        totalComments += posts[i].total_comments;

    for(let i = 0; i < users.length; i++)
        if(users[i].isModerator)
            totalModerators++;
    
    postsCount.textContent = posts.length;
    messagesCount.textContent = totalComments;
    membersCount.textContent = users.length;
    modsCount.textContent = totalModerators;


});