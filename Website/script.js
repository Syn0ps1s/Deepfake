const inputImg = document.getElementById("input-img");
const imageView = document.getElementById("upload-box");
const detectButtonContainer = document.getElementById("detect-button-container");

inputImg.addEventListener("change", uploadImage);

function uploadImage() 
{
    let linkImg = URL.createObjectURL(inputImg.files[0]);
    imageView.style.backgroundImage = `url(${linkImg})`;
    imageView.textContent = "";

    //detect button
    const detectButton = document.createElement("button");
    detectButton.textContent = "Analyze Image";
    detectButton.addEventListener("click", detectImage);
    
    //remove the content in the upload box
    detectButtonContainer.innerHTML = "";
    imageView.style.border = linkImg ? "none" : "2px dashed #696969";
    //append the button to the container
    detectButtonContainer.appendChild(detectButton);
}

function detectImage() 
{
    console.log("Detecting image...");
}