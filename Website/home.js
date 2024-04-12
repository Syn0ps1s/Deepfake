const inputImg = document.getElementById("input-img");
const imageView = document.getElementById("upload-box");
const detectButtonContainer = document.getElementById("detect-button-container");

inputImg.addEventListener("change", uploadImage);

function uploadImage() {
    const file = inputImg.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                imageView.innerHTML = '';
                imageView.appendChild(img);

                const detectButton = document.createElement("button");
                detectButton.textContent = "Analyze Image";
                detectButton.addEventListener("click", function() {
                    const imageData = event.target.result.split(',')[1];
                    detectImage(imageData);
                });

                detectButtonContainer.innerHTML = '';
                detectButtonContainer.appendChild(detectButton);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
}

imageView.addEventListener("dragover", function(e) {
    e.preventDefault();
});

imageView.addEventListener("drop", function(e) {
    e.preventDefault();
    inputImg.files = e.dataTransfer.files;
    uploadImage();
});

async function detectImage(imageData) {
    try {
        const response = await fetch('http://127.0.0.1:5000/detect_deepfake', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image: imageData })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error('Error:', error);
    }
}
