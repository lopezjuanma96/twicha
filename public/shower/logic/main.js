const socket = io();

const postList = document.getElementById("postList");

socket.on("ip", (value) => {
    console.log(value)
})

socket.on("distribute", post => {
    if (post) {
        console.log(post.user, 'sent', post.message);
        const postElement = document.createElement('div')
        postElement.className = "postElement"
        postElement.innerHTML = `<b class="postUser">${post.user}: </b><span class="postMsg">${post.message}</span>`
        postList.append(postElement)
    } else console.log('no new messages')
})