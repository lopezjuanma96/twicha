const socket = io();

const postList = document.getElementById("postList");

socket.on("ip", (value) => {
    console.log(value)
})

socket.on("distribute", (msg, user) => {
    console.log(user, "sent", msg);
    const postElement = document.createElement('div')
    postElement.className = "postElement"
    postElement.innerHTML = `<b class="postUser">${user}: </b><span class="postMsg">${msg}</span>`
    postList.append(
        postElement
    )
})