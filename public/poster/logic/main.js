const socket = io();

const postSendButton = document.getElementById("postSendButton");
const postInput = document.getElementById("postInput")

postSendButton.addEventListener("click", e => {
    e.preventDefault();
    const msg = postInput.value;
    if (msg) if (msg.length > 0) {
        postInput.value = "";
        console.log("message is", msg)
        socket.emit("post", msg, "USERUSER")
    }
})
