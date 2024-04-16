const inputImg = document.getElementById("input-img");
const imageView = document.getElementById("upload-box");
const detectButtonContainer = document.getElementById("detect-button-container");
const resultContainer = document.getElementById("result-container");

inputImg.addEventListener("change", uploadImage);

function uploadImage() {
    const file = inputImg.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                imageView.innerHTML = "";
                imageView.appendChild(img);
                const detectButton = document.createElement("button");
				detectButton.classList.add("detect-button");
                detectButton.textContent = "Analyze Image";
                detectButton.addEventListener("click", function() {
                    detectImage(event.target.result.split(',')[1]);
                });
                detectButtonContainer.innerHTML = "";
                detectButtonContainer.appendChild(detectButton);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
}
async function detectImage(base64Data) {
    const blob = await fetch(`data:image/jpeg;base64,${base64Data}`).then(res => res.blob());
    try {
        const response = await fetch('http://127.0.0.1:5000/detect_deepfake', {
            method: 'POST',
            body: blob,
            headers: {
                'Content-Type': 'application/octet-stream'
            }
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const jsonResponse = await response.json();
        const result = jsonResponse.result;
        resultContainer.innerHTML = "";
        const resultText = document.createElement("p");
        resultText.textContent = result === "Fake" ? "This image is fake." : "This image is real.";
        resultText.style.fontSize = "25px";
        resultText.style.color = result === "Fake" ? "red" : "green";
        resultText.style.fontWeight = "bold";
        resultContainer.appendChild(resultText);
		const analyzeAnotherButton = document.createElement("button");
		analyzeAnotherButton.textContent = "Analyze Another Image";
		analyzeAnotherButton.classList.add("detect-button");
		analyzeAnotherButton.addEventListener("click", function() {
			window.location.href = "home.html";
		});
		detectButtonContainer.innerHTML = "";
		detectButtonContainer.appendChild(analyzeAnotherButton);
    } catch (error) {
        console.error("Error:", error);
    }
}