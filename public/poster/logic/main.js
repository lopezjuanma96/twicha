const socket = io();

const postSendButton = document.getElementById("postSendButton");
const postInputUser = document.getElementById("postInputUser");
const postInputMsg = document.getElementById("postInputMsg");

postSendButton.addEventListener("click", e => {
    e.preventDefault();
    const user = postInputUser.value || "someone";
    const msg = postInputMsg.value;
    if (msg) if (msg.length > 0) {
        postInputUser.value = "";
        postInputMsg.value = "";
        console.log(user, "sent this:", msg)
        socket.emit("post", user, msg)
    }
})