const socket = io();

const newPostTitle = document.getElementById("newPostTitle");
const newPostText = document.getElementById("newPostText");
const postList = document.getElementById("postList");

let lastPost;

socket.on("ip", (value) => {
    console.log(value)
})

socket.on("distribute", post => {
    if (lastPost) {
        const postElement = document.createElement('div')
        postElement.className = "postElement"
        postElement.innerHTML = `<b class="postUser">${lastPost.user}: </b><span class="postMsg">${lastPost.message}</span>`
        postList.append(postElement)
        lastPost = undefined;
    }
    if (post) {
        console.log(post.user, 'sent', post.message);
        if (post.permanent){;}
        else{
            newPostTitle.innerHTML = `${post.user} just said..`;
            newPostText.innerHTML = post.message;
            lastPost = post;
        }
    } else {
        newPostTitle.innerHTML = "Nobody has said anything yet.."
        newPostText.innerHTML = "Be the first one! Scan the QR code below!"
    }
})