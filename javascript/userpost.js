    let all_posts 
    let add_reply
    let close
    let confirm_reply
    let reply_content
    let id

    document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search)
    id = params.get("id")

    all_posts = document.getElementsByClassName('all_posts')[0]

    add_reply = document.getElementById('reply_container')
    close = document.getElementById('closeReply')
    confirm_reply = document.getElementById('postReply')
    reply_content = document.getElementById('content')

    if (close) {
        close.addEventListener("click", function() {
        add_reply.classList.remove("open")
        })
    }

    
    })
    async function loadPost(id) {
    const response = await fetch(`http://localhost:3000/post/${id}`);
    const post = await response.json()
    
    
    const post_container = document.createElement('div')
    post_container.id = post._id
    post_container.classList.add("post")
    //Post information(Profile, date, username)

    const post_info = document.createElement('div')
    post_info.classList.add("icon_name_date_post")

    const profile_picture = document.createElement('img')
    profile_picture.src = "../resources/users/kirk.jfif"


    
    const userh5 = document.createElement('h5')
    userh5.classList.add('name_post')
    userh5.innerText = post.username

    //TODO ADD DATE LOGIC BACKEND
    const date_post = document.createElement("p")
    date_post.classList.add("date_post")
    date_post.innerHTML = new Date().toLocaleDateString()
    post_info.append(profile_picture, userh5, date_post)

    //Post contents
    
    const post_title = document.createElement('h3')
    post_title.classList.add("title_post")
    post_title.innerText = post.post_title


    const post_body = document.createElement('p')
    post_body.classList.add("description_short_post")
    post_body.innerText = post.post_content
    
    //Interaction Container (likes, dislikes, reply)
    const interaction_container = document.createElement("div")
    interaction_container.classList.add("stats_post")

    const like = document.createElement('div')
    like.classList.add('counter_container')

    const i = document.createElement('i')
    i.classList.add('fa-regular')
    i.classList.add('fa-thumbs-up')

    const total_likes = document.createElement('p')
    total_likes.classList.add('like_counter')
    total_likes.innerText = 0
    like.append(i, total_likes)

    const dislike = document.createElement('div')
    dislike.classList.add('counter_container')

    const i2 = document.createElement('i')
    i2.classList.add('fa-regular')
    i2.classList.add('fa-thumbs-down')

    const total_dislikes = document.createElement('p')
    total_dislikes.classList.add('like_counter')
    total_dislikes.innerText = 0
    dislike.append(i2, total_dislikes)

    const comment = document.createElement('div')
    comment.classList.add('reply_button')

    const i3 = document.createElement('i')
    i3.classList.add('fa-regular')
    i3.classList.add('fa-comment')

    const reply = document.createElement('p')
    reply.classList.add('comment_counter')
    reply.innerText = "Reply"
    comment.append(i3, reply)
    comment.addEventListener("click", function(){
        window.replyPost(post_container); 
    })

    const challenge = document.createElement('div')
    challenge.classList.add('challenge_button')

    const i4 = document.createElement('i')
    i4.classList.add('fa-solid')
    i4.classList.add('fa-bullseye')

    const challenge_text = document.createElement('p')
    challenge_text.classList.add('challenge_text')
    challenge_text.innerText = "Challenge"

    
    challenge.append(i4, challenge_text)

    const delete_edit_container = document.createElement('div')
    delete_edit_container.classList.add('delete_edit_container')
    const delete_button = document.createElement('button')
    delete_button.classList.add("delete_button")

    const delete_text = document.createElement('h4')
    delete_text.innerText = "Delete"

    const delete_image = document.createElement('i')
    delete_image.classList.add('fa-regular', 'fa-trash-can')

    delete_button.append(delete_image, delete_text)

    const edit_button = document.createElement('button')
    edit_button.classList.add("edit_button")
    const edit_text = document.createElement('h4')
    edit_text.innerText = "Edit"

    const edit_image = document.createElement('i')
    edit_image.classList.add('fa-solid', 'fa-pen-to-square')


    edit_button.append(edit_image, edit_text)
    delete_edit_container.append(delete_button, edit_button)

    interaction_container.append(like,dislike, comment, challenge, delete_edit_container)


    post_container.append(post_info, post_title, post_body, interaction_container)

    all_posts.append(post_container)

        
        
    
    

    }


 
    async function reply_post(username, replying_to, original_content, reply_content, unique_post_id ) {

    

    await fetch("http://localhost:3000/add-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username,replying_to, original_content, reply_content, unique_post_id })
    });
    }


    async function loadPosts(id) {
    const response = await fetch(`http://localhost:3000/replies/${id}`);
    const replies = await response.json();
    all_posts = document.getElementsByClassName('all_posts')[0]
    

    replies.forEach(reply => {

        const userPost = document.createElement("div");
        userPost.classList.add("reply");
        const reply_id  = reply._id

        // Container
        const iconNameDate = document.createElement("div");
        iconNameDate.classList.add("icon_name_date_post");

        // Profile image
        const profile = document.createElement("img");
        profile.src = "../resources/users/kirk.jfif";

        // Username
        const name = document.createElement("p");
        name.classList.add("name_post");
        name.textContent = reply.username;

        // Date
        const datePost = document.createElement("p");
        datePost.classList.add("date_post");
        datePost.textContent = new Date().toLocaleDateString();
        iconNameDate.append(profile,name,datePost)
        
        //Content
        const post_contents = document.createElement("div")
        post_contents.classList.add("post_contents")
        const replying_to_container = document.createElement("div")
        replying_to_container.classList.add("replying_to_container")
        const span_reply = document.createElement("span")
        span_reply.classList.add('user_repliedto')
        span_reply.innerHTML = `${reply.replying_to} said:`
        const br1 = document.createElement("br")
        const br2 = document.createElement("br")

    
    
        const replying_paragraph = document.createElement("p")
        replying_paragraph.innerHTML = reply.original_content
        replying_to_container.append(span_reply, br1, br2, replying_paragraph)
        const user_reply = document.createElement("p") //The reply paragraph div
        user_reply.classList.add("description_short_post")
        user_reply.innerHTML = reply.reply_content
        post_contents.append(replying_to_container)
        post_contents.append(user_reply)

        //Interaction
        const interaction_container = document.createElement("div")
        interaction_container.classList.add("stats_post")

        const like = document.createElement('div')
        like.classList.add('counter_container')

        const i = document.createElement('i')
        i.classList.add('fa-regular')
        i.classList.add('fa-thumbs-up')

        const total_likes = document.createElement('p')
        total_likes.classList.add('like_counter')
        total_likes.innerText = 0
        like.append(i, total_likes)

        const dislike = document.createElement('div')
        dislike.classList.add('counter_container')

        const i2 = document.createElement('i')
        i2.classList.add('fa-regular')
        i2.classList.add('fa-thumbs-down')

        const total_dislikes = document.createElement('p')
        total_dislikes.classList.add('like_counter')
        total_dislikes.innerText = 0
        dislike.append(i2, total_dislikes)

        const comment = document.createElement('div')
        comment.classList.add('reply_button')

        const i3 = document.createElement('i')
        i3.classList.add('fa-regular')
        i3.classList.add('fa-comment')

        const replyLang = document.createElement('p')
        replyLang.classList.add('comment_counter')
        replyLang.innerText = "Reply"
        comment.append(i3, replyLang)

        const challenge = document.createElement('div')
        challenge.classList.add('challenge_button')

        const i4 = document.createElement('i')
        i4.classList.add('fa-solid')
        i4.classList.add('fa-bullseye')

        const challenge_text = document.createElement('p')
        challenge_text.classList.add('challenge_text')
        challenge_text.innerText = "Challenge"


        challenge.append(i4, challenge_text)

        const delete_edit_container = document.createElement('div')
        delete_edit_container.classList.add('delete_edit_container')
        const delete_button = document.createElement('button')
        delete_button.classList.add("delete_button")

        const delete_text = document.createElement('h4')
        delete_text.innerText = "Delete"

        const delete_image = document.createElement('i')
        delete_image.classList.add('fa-regular', 'fa-trash-can')
        delete_button.append(delete_image, delete_text)
        delete_button.addEventListener("click", function(){
            alert(reply_id)
            deleteReply(reply_id)
        })



        
        const edit_button = document.createElement('button')
        edit_button.classList.add("edit_button")
        const edit_text = document.createElement('h4')
        edit_text.innerText = "Edit"

        const edit_image = document.createElement('i')
        edit_image.classList.add('fa-solid', 'fa-pen-to-square')


        edit_button.append(edit_image, edit_text)
        delete_edit_container.append(delete_button, edit_button)

        interaction_container.append(like,dislike, comment, challenge, delete_edit_container)

  


        userPost.append(iconNameDate,post_contents, interaction_container)
        all_posts.append(userPost)
        
    });


    }

async function deleteReply(id) {
  alert("backend deletion")
  await fetch(`http://localhost:3000/reply/${id}`, {
    method: "DELETE"
  });

}

async function addReply(username, replying_to, original_content, reply_content, unique_post_id) {
  
  const zero = 0
  await fetch("http://localhost:3000/add-reply", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, replying_to, original_content, reply_content, unique_post_id,zero})
  });

 

}

