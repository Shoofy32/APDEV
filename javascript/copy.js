const replyButton = document.querySelectorAll('.reply_button')
const reply = document.getElementById('reply_container');
const close = document.getElementById('closeReply');
const postReply = document.getElementById('postReply');
const textArea = document.getElementById('content');
const all_posts = document.getElementById('all_posts');
const challenge = document.getElementById('challenge_container');
const closeChallenge = document.getElementById('closeChallenge');
const postBet = document.getElementById("postBet");
const d20 = document.getElementById("d20")

var original_post="";
var current_post = "";
var user = "";
postReply.addEventListener("click", () => {
  const content = textArea.value.trim();
  if (!content) return;

  reply.classList.remove("open");
if(original_post.length !== 0) {
  all_posts.insertAdjacentHTML("beforeend", `
  <div class="post_container">
    <div class="reply">
      <div class="post_info">
        <img src="kirk.jfif"/>

        <div class="post_user">
          <h5>Charlie_Kirk</h5>
        </div>

        <div class="timestamp">
          <p>&nbsp; just now</p>
        </div>
      </div>

      <div class="post_contents">
       <div class="replying_to_container"><span>${user} said:</span><br><br>
                        <p>
                           ${original_post}
                        </p>
                    </div>
        <p class="reply_contents">${content}</p>
      </div>
    </div>
        <div class="interaction_container">
                    <div> 
                        <button class="like_button">
                            <img class="thumbs_up" src="hand-thumbs-up.svg">
                            <p>0</p>
                        </button>
                    </div>
                    <div> <button class="dislike_button">
                        <img src="hand-thumbs-down.svg">
                        <p>0</p>
                    </button>
                    </div>
                    <div><button class="reply_button">Reply</button></div>
                    
                    </div> 
  </div>
  `);

}
else {
  all_posts.insertAdjacentHTML("beforeend", `
  <div class="post_container">
    <div class="reply">
      <div class="post_info">
        <img src="kirk.jfif"/>

        <div class="post_user">
          <h5>Charlie_Kirk</h5>
        </div>

        <div class="timestamp">
          <p>&nbsp; just now</p>
        </div>
      </div>

      <div class="post_contents">
       <div class="replying_to_container"><span>${user} said:</span><br><br>
                        <p>
                           ${current_post}
                        </p>
                    </div>
        <p class="reply_contents">${content}</p>
      </div>
    </div>
        <div class="interaction_container">
                    <div> 
                        <button class="like_button">
                            <img class="thumbs_up" src="hand-thumbs-up.svg">
                            <p>0</p>
                        </button>
                    </div>
                    <div> <button class="dislike_button">
                        <img src="hand-thumbs-down.svg">
                        <p>0</p>
                    </button>
                    </div>
                    <div><button class="reply_button">Reply</button></div>
                    
                    </div> 
  </div>
  `);

}
  

  textArea.value = "";
});
all_posts.addEventListener('click', (e) => {

  if (e.target.classList.contains('reply_button')) {
    const parent = e.target.parentNode.parentNode.parentNode;
    const contents = parent.querySelector('.post_contents');
    const info = parent.querySelector('.post_info');
    var reply_post = contents.querySelector('.reply_contents');
    var check_post = contents.querySelector("#original_post");
    user = info.querySelector('.post_user').querySelector('h5').textContent;
  
    if(check_post) {
      original_post = check_post.textContent;
      current_post = "";
    } else {
      original_post = "";
      current_post = reply_post.textContent;
    }

    
    reply.classList.add("open");
  }
});

close.addEventListener("click", ()=> {
    reply.classList.remove("open");
})

document.querySelectorAll('.Delete').forEach(element=> {
         element.addEventListener('click', (e) => {
            var parent_div = element.parentElement.parentElement.parentElement
            parent_div.remove();
            console.log(parent_div)
            e.preventDefault(); 
           
        });
    })

document.querySelectorAll('.Edit').forEach(element=> {
         element.addEventListener('click', (e) => {

            var parent_div = element.parentElement.parentElement.parentElement
            var contents = parent_div.querySelector(".post_contents").querySelector(".reply_contents");
           
           
            if(contents) {
            
            contents = parent_div.querySelector(".post_contents").querySelector(".reply_contents");
            
            }
            else {
              contents=parent_div.querySelector(".post_contents").querySelector("p");
            }
            var current_content = contents.innerText;
            contents.innerHTML = `<textarea id="editArea"> ${current_content}</textarea><div id="edit_container">
            <button id="Save">Save </button>
            </div>
        
            ` ;
            var textarea = document.getElementById("editArea");
            var save = document.getElementById("Save");
            textarea.addEventListener("click", function(e) {
            e.preventDefault();
            });
            save.addEventListener("click", function(e) {
                e.preventDefault();
                contents.innerHTML = `<p>${textarea.value} (edited)</p>`
            });
            console.log(current_content)
            e.preventDefault(); 
           
        });
    })

 document.querySelectorAll('.Challenge').forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault(); 
            challenge.classList.add("open");
        });
    });

closeChallenge.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation(); 
    challenge.classList.remove("open");
   
   
});

postBet.addEventListener("click", (e) => {
    let likes = document.getElementById("betLikes").value;
    if(likes > 1){
        e.preventDefault();
        e.stopPropagation(); 
        
        console.log(challenge.classList);
        let roll = Math.floor(Math.random() * 20);
      switch (roll) {
    case 1:
        d20.src = "images/1.png";
        break;
    case 2:
        d20.src = "images/2.png";
        break;
    case 3:
        d20.src = "images/3.png";
        break;
    case 4:
        d20.src = "images/4.png";
        break;
    case 5:
        d20.src = "images/5.png";
        break;
    case 6:
        d20.src = "images/6.png";
        break;
    case 7:
        d20.src = "images/7.png";
        break;
    case 8:
        d20.src = "images/8.png";
        break;
    case 9:
        d20.src = "images/9.png";
        break;
    case 10:
        d20.src = "images/10.png";
        break;
    case 11:
        d20.src = "images/11.png";
        break;
    case 12:
        d20.src = "images/12.png";
        break;
    case 13:
        d20.src = "images/13.png";
        break;
    case 14:
        d20.src = "images/14.png";
        break;
    case 15:
        d20.src = "images/15.png";
        break;
    case 16:
        d20.src = "images/16.png";
        break;
    case 17:
        d20.src = "images/17.png";
        break;
    case 18:
        d20.src = "images/18.png";
        break;
    case 19:
        d20.src = "images/19.png";
        break;
    case 20:
        d20.src = "images/20.png";
        break;
}

            
        
        document.getElementById("betLikes").value = "";
        
        console.log(typeof likes);
    } else {
        alert("Please enter a positive number");
        document.getElementById("betLikes").value = "";
    }
});