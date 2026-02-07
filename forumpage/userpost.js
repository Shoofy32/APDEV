const replyButton = document.querySelectorAll('.reply_button')
const reply = document.getElementById('reply_container');
const close = document.getElementById('closeReply');
const postReply = document.getElementById('postReply');
const textArea = document.getElementById('content');
const all_posts = document.getElementById('all_posts');
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
