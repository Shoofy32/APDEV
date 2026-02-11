window.addEventListener('DOMContentLoaded', function() {

    loadForumData();   // creates post_button dynamically
    loadNewPost();     // inserts new post if exists
    setupButtons();    // attaches button events AFTER DOM is ready

    const post = document.getElementById('post_button');
    if (post) {
        post.addEventListener('click', function() {
            window.location.href = 'post.html';
        });
    }

});

const forumDataArray = [

    {

        name: "Technology",
        url: "../resources/images/technology.jpg",
        description: "Ask and talk about anything technology-related."

    },
    {

        name: "Announcements",
        url: "../resources/images/announcement.jpg",
        description: "Discover news about the forum."


    },
    {

        name: "Creative Writing",
        url: "../resources/images/creative_writing.jpg",
        description: "Discover and discuss works from other users in the platform."

    }


];

const postDataArray = [

    {

        name: "Charlie_Kirk",
        title: "DLSU PCs are the best!",
        tag1: "Programming",
        tag2: "Tag 2",
        tag3: "Tag 3",
        description: `Man DLSU pc's are the best!!! How could you not love the dlsu pcs? They have RTX 5090 in them. 
                        It is so good that my groupmates in INFOM used its CPU to generate AI code!!! Thank you Lasalle Gaming. I could even play with my waifu in 3d!`,
        pfp: "../resources/users/kirk.jfif",
        likes: 10,
        dislikes: 15,

        
    },
    {

        name: "Zed",
        title: "Is i67 21th generation CPU good",
        tag1: "Programming",
        tag2: "Tag 2",
        tag3: "Tag 3",
        description: `I was planning to upgrade to the new i67, I've been hearing that it only gives 20k FPS on flappy bird. Alternatively for 69 dollars, I can also get the new
                    Ryzen 78. Thanks!`,
        pfp: "../resources/users/zed.jpg",
        likes: 25,
        dislikes: 8,


    },
    {

        name: "CCS_GodXX",
        title: "CCS smart deodorant",
        tag1: "Tag 1",
        tag2: "Tag 2",
        tag3: "Tag 3",
        description: `I don't shower much for the CCS smell but lately I've noticed the girls avoiding me. I heard the CCS department recently created a smart deodorant that can make me smell good.
                            What smell would you guys recommend, I can't pick between Gokongwei Sensational and One Week CCS Smell.`,
        pfp: "../resources/users/discordmod.jpg",
        likes: 10,
        dislikes: 50,

    },
    {
        name: "LovelyNicoYazawa",
        title: "Maki Android",
        tag1: "Tag 1",
        tag2: "Tag 2",
        tag3: "Tag 3",
        description: `                          Everyone listen listen LISTEN!! 😤💥
                        Nico Yazawa, the cutest idol in the universe, has discovered something VERY dangerous…

                        🤖✨ THE NEW MAKI ANDROID ✨🤖

                        At first I thought, “Hehe~ another robot? Nico is still #1 💕”
                        BUT THEN—

                        💢 She calculates PERFECT PITCH in 0.0003 seconds
                        💢 She blushes on COMMAND
                        💢 She can play piano WHILE charging???

                        UM?? HELLO??? IS THAT EVEN FAIR??? 😭🎹

                        She literally said:

                        “Nico Yazawa’s cuteness level is… admirable.”

                        ADMIRABLE????? 😡😡😡
                        EXCUSE YOU, I AM ICONIC.

                        And don’t get me started on how everyone keeps going:
                        “Wow Maki-Android is so efficient”
                        “Wow Maki-Android doesn’t forget lyrics”

                        WELL NICO FORGETS LYRICS WITH STYLE, OKAY??? 💃💔

                        💗💗💗 HOWEVER 💗💗💗
                        As the senior idol with a BIG HEART (and even bigger cuteness 💕),
                        Nico will allow this android to exist…

                        AS LONG AS SHE REMEMBERS:

                        ✨ Nico is the cutest
                        ✨ Nico is the best
                        ✨ Nico is NOT replaceable by cold red-haired machinery

                        Failure to comply will result in:
                        👉 Nico-Nii Curse Mode 👿💢

                        That is all~!
                        NICO NII~!! 💕🎀💫`,
        pfp: "../resources/users/nico.jfif",
        likes: 50,
        dislikes: 2,

    },
    {
        name: "GojoSatoru",
        title: "Arturo Lord God",
        tag1: "Tag 1",
        tag2: "Tag 2",
        tag3: "Tag 3",
        description: ` Appreciation post for Sir Art the honored one of DLSU. The goat has once again created an AI that cured cancer and solved all world problems. I want to be like him one day,
                     let us all offer our souls to the greatest programmer to have ever lived. VIVA LA SIR ART!`,
        pfp: "../resources/users/images.jfif",
        likes: 99,
        dislikes: 0,

    },
    {
        name: "CCS_GodXX",
        title: "Forum Announcments - Starting Rules",
        tag1: "Announcements",
        tag2: "Tag 2",
        tag3: "Tag 3",
        description: ` 1. No racism or sexual posts in posts

                       2. Be respectful

                       3. Only posts topics where they should be posted in
                       
                       4. No Hate Speech `,
        pfp: "../resources/users/discordmod.jpg",
        likes: 125,
        dislikes: 0,

    },
    {

        name: "GojoSatoru",
        title: "Chapter 56 - Gojo vs Sukuna",
        tag1: "Tag 1",
        tag2: "Tag 2",
        tag3: "Tag 3",
        description: `Evenly matched. They form a pair within Gojo's barrier. The two sure-hits guarantees overlap and cancel each other out. 
        A battle with both sides expanding their Domains. 
        Should either one sustain immense damage causing the collapse of their Domain, the other's sure-hit technique 
        will immediately strike. [...] Evenly matched. Within the barrier, they are evenly matched.`,
        pfp: "../resources/users/images.jfif",
        likes: 57,
        dislikes: 17,

    },



];

function createPost(postData){

    const postDesign = ` <div class = "post" onclick = "openPost()">

                    <!-- Div Contains the PFP, Username, and Date of Post-->
                    <div class = "icon_name_date_post">

                        <img src = ${postData.pfp}>

                        <p class = "name_post"> ${postData.name} </p>

                        <p class = "date_post"> 2 days ago </p>


                    </div>

                    <!-- Post Title -->
                    <h3 class = "title_post" onclick = "openPost()"> ${postData.title} </h3>

                    <!-- Div Contains Different Tags of the Post -->
                    <div class = "tags_post">

                        <p class = "tag"> ${postData.tag1} </p>
                        <p class = "tag"> ${postData.tag2} </p>
                        <p class = "tag"> ${postData.tag3} </p>

                    </div>

                    <!-- Short Description of Post -->
                    <p class = "description_short_post"> 
                        ${postData.description}
                    </p>

                    <!-- Div contains likes and dislikes counter -->
                    <div class = "stats_post" onclick = "event.stopPropagation();"> <!-- Prevent onclick to open post -->

                        <!-- Div contains like counter and its value -->
                        <div class = "counter_container">

                            <!-- stopPropogation prevents button from opening up userpost forum -->
                            <i class = "fa-regular fa-thumbs-up" onclick = "updateCounter(this, this.parentElement.parentElement); event.stopPropagation();" data-clicked = "false"></i>
                            
                            <p class = "like_counter"> ${postData.likes} </p>

                        </div>

                        <!-- Div contains dislike counter and its value -->
                        <div class = "counter_container">

                            <!-- stopPropogation prevents button from opening up userpost forum -->
                            <i class="fa-regular fa-thumbs-down" onclick = "updateCounter(this, this.parentElement.parentElement); event.stopPropagation();" data-clicked = "false"></i>
                            
                            <p class = "dislike_counter"> ${postData.dislikes} </p>

                        </div>

                        <!-- Div contains comment counter and its value -->
                        <div class = "comment_container">

                            <i class="fa-regular fa-comment"></i>
                            
                            <p class = "comment_counter"> 0 </p>

                        </div>

                        <!-- Div contains challenge button and Links Through openChallenge When Pressed --> <!-- stopPropogation prevents button from opening up userpost forum -->
                        <div class = "challenge_button" onclick = "openChallenge(this.parentElement.parentElement); event.stopPropagation();">

                            <i class="fa-solid fa-bullseye"></i>
                            
                            <p class = "challenge_text"> Challenge </p>

                        </div>


                            <div class="Delete_container"> 
                            <button class="Delete">
                            <h4>Delete</h4>
                            </button>
                            <button class="Edit">
                            <h4>Edit</h4>
                            </button>
                        </div>

                    </div>


                    <!-- Div contains the challenge container -->
                    <div class = "challenge" id = "challenge_container">

                        <!-- Div Contains Close Challenge button and Links Through openChallenge When Pressed -->
                        <div> <!-- stopPropogation prevents button from opening up userpost forum -->
                            <button id = "closeChallenge" onclick = "openChallenge(this.parentElement.parentElement.parentElement); event.stopPropagation();"><i class="fa-regular fa-circle-xmark fa-large"></i></button>
                        </div>

                        <h2 class = "roll_20"> Roll D20 </h2>

                        <p class = "roll_20_number"></p>


                        <div class = "dicebg">
                            <img src="../../resources/images/d20.png">
                        </div>

                        <p class = "result"> Result </p>

                        <!-- Div contains Bet Container Likes Input and Button and Links rollD20 When Button is Pressed -->
                        <div class = "bet_container">

                            <p> Bet Likes </p>

                            <!-- stopPropogation prevents button from opening up userpost forum -->
                            <input class = "betLikes" type = "number" placeholder = "0" onclick = "event.stopPropagation();"></input>
                            <button id = "postBet" onclick = "rollD20(this.parentElement.parentElement); event.stopPropagation();">Bet</button> 

                        </div>

                    </div>


                </div>
    `;


    var postContainer = document.getElementById("all_posts");
    postContainer.insertAdjacentHTML("beforeend", postDesign);


}

function createForum(forumData){

    const forumDesign = `<div class="thread_head_container">
                    <div class="announcement_head_container">
                        <div class="thread_head_img">
                            <img src="${forumData.url}" width="800px" height="150px"/> <br>
                        </div>
                         
                         <div class="announcement_container">
                             <div class="announcement_head">
                                
                                <h5>Announcements</h5>
                                <div class="announcement">
                                    01/01/2025:<br>
                                    Hey guys we are charlie Kirk
                                </div>
                             </div>

                         </div>
                    </div>
                   
                    <div id="reply_head">
                        <h5> ${forumData.name} </h5>
                        <button id="post_button">Create Post</button>
                    </div>
                    <p>${forumData.description}</p>
                </div>`;

    var forumContainer = document.getElementsByClassName("thread_head")[0];
    forumContainer.insertAdjacentHTML("beforeend", forumDesign);

}
function loadForumData(){

    var forumDesign = localStorage.getItem("forum-data");
    var validPosts = JSON.parse(localStorage.getItem("valid-posts"));


    for(var i = 0; i < forumDataArray.length; i++)
        if(forumDataArray[i].name == forumDesign){

            createForum(forumDataArray[i]);
            break;

        }


    for(var i = 0; i < postDataArray.length; i++)
        if(validPosts[i] == true)
            createPost(postDataArray[i]);




}