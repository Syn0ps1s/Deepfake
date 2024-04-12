const sendButton = document.querySelector(".send-button");

sendButton.addEventListener("click", function (event) {
    event.preventDefault();

    const topic = document.getElementById("topic").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const comments = document.getElementById("comments").value;
    
    const errorMessage = document.getElementById("error-message");
    const successMessage = document.getElementById("success-message");
    const helpSubtitle = document.querySelector(".subTitle");

    if (topic !== "" && name !== "" && email !== "" && comments !== "") {
        console.log("Message sent successfully!");
        if (errorMessage) {
            errorMessage.remove();
        }
        const contactForm = document.getElementById("contact-form");
        contactForm.style.display = "none";
        if (!successMessage) {
            const successText = document.createElement("p");
            successText.id = "success-message";
            successText.style.color = "green";
            successText.style.fontWeight = "bold";
            successText.textContent = "Your message has been sent successfully!";
            contactForm.insertAdjacentElement("afterend", successText);
        }
        if (helpSubtitle) {
            helpSubtitle.style.display = "none";
        }
    } else {
        console.log("Please fill out all fields before sending the message.");
        if (!errorMessage) {
            const errorText = document.createElement("p");
            errorText.id = "error-message";
            errorText.style.color = "red";
            errorText.textContent = "Please fill out all fields before sending the message.";
            const sendButton = document.querySelector(".send-button");
            sendButton.insertAdjacentElement("afterend", errorText);
        }
    }
});
