const socket = io();

const newPostTitle = document.getElementById("newPostTitle");
const newPostText = document.getElementById("newPostText");
const newPostContainer = document.getElementById("newPostContainer");
const newPostCard = document.getElementById("newPostCard");
const postList = document.getElementById("postList");

let lastPost;

// build a list of hex nice pastry colors
const colors = [];
for (let i = 0; i < 360; i += 10) {
    colors.push(`hsl(${i}, 100%, 90%)`)
}

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
        newPostCard.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
    } else {
        newPostTitle.innerHTML = "Nobody has said anything yet.."
        newPostText.innerHTML = "Be the first one! Scan the QR code below!"
        newPostCard.style.backgroundColor = "#f0f0f0"
    }
})