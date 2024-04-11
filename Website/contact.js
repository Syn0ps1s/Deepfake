const sendButton = document.querySelector(".send-button");

sendButton.addEventListener("click", function (event) {
    event.preventDefault();

    const topic = document.getElementById("topic").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const comments = document.getElementById("comments").value;
    //check if the input fields have been filled out
    if (topic !== "" && name !== "" && email !== "" && comments !== "") {
        console.log("Message sent successfully!");
    } else {
        console.log("Please fill out all fields before sending the message.");
    }
});