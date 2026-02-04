const replyButton = document.querySelectorAll('.reply_button')
const reply = document.getElementById('reply_container');
const close = document.getElementById('closeReply');
const postReply = document.getElementById('postReply');
const textArea = document.getElementById('content');
const all_posts = document.getElementById('all_posts');


postReply.addEventListener("click", () => {
  const content = textArea.value.trim();
  if (!content) return;

  reply.classList.remove("open");

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
       <div class="replying_to_container"><span>Charlie_Kirk said:</span><br><br>
                        <p>
                            Man DLSU pc's are the best!!! How could you not love the dlsu pcs? They have RTX 5090 in them. 
                        It is so good that my groupmates in INFOM used its CPU to generate AI code!!! Thank you Lasalle Gaming. It is good that my wife remarried me!
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa   
                        </p>
                    </div>
        <p class="reply_contents">${content}</p>
      </div>
    </div>
  </div>
  `);

  textArea.value = "";
});
replyButton.forEach(element => {
element.addEventListener('click', () => {
   
  reply.classList.add("open");
    })
})

close.addEventListener("click", ()=> {
    reply.classList.remove("open");
})
