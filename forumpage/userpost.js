

const documentId = window.location.href
const index = documentId.indexOf("id=")
const id = documentId.slice(index + 3)
const all_posts = document.getElementById('all_posts')
async function loadPost(id) {
  const response = await fetch("http://localhost:5000/user");
  const posts = await response.json()

  posts.forEach(element => {
    if(element._id === id) {
        const post_container = document.createElement('div')
        post_container.classList.add("post_container")
        //Post information(Profile, date, username)
       
        const post_info = document.createElement('div')
        post_info.classList.add("post_info")
        const image_div = document.createElement('div')
        const profile_picture = document.createElement('img')
        profile_picture.src = "../resources/users/kirk.jfif"
        post_info.append(profile_picture)


        post_container.append(post_info)

        alert("hi")
        all_posts.append(post_container)

    }
    
  });
 

}

document.addEventListener("DOMContentLoaded", () => {
    alert("hello")
    loadPost(id);
    
   
});
