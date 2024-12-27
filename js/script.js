// Access the camera and display the live feed
const cameraFeed = document.getElementById("cameraFeed");
const captureCanvas = document.getElementById("captureCanvas");
const captureButton = document.getElementById("captureButton");

navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        cameraFeed.srcObject = stream;
    })
    .catch(error => {
        console.error("Error accessing camera:", error);
        alert("Unable to access camera. Please check your permissions.");
    });

// Capture the image from the video feed
function captureImage() {
    const canvasContext = captureCanvas.getContext("2d");
    captureCanvas.width = cameraFeed.videoWidth;
    captureCanvas.height = cameraFeed.videoHeight;

    // Draw the current frame from the video feed onto the canvas
    canvasContext.drawImage(cameraFeed, 0, 0, captureCanvas.width, captureCanvas.height);

    // Convert the canvas image to a Blob and send it to the server
    captureCanvas.toBlob(blob => {
        sendImage(blob);
    }, "image/jpeg");
}

// Send the captured image to the server
function sendImage(imageBlob) {
    const formData = new FormData();
    formData.append("image", imageBlob, "captured_image.jpg");

    // Show loading message
    document.getElementById("matchMessage").textContent = "Processing...";

    fetch("/upload", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.message.startsWith("Image Matched")) {
            document.getElementById("matchMessage").textContent = data.message;
            document.getElementById("description").textContent = data.description;

            // Set audio source and play
            const audioPlayer = document.getElementById("audioPlayer");
            document.getElementById("audioSource").src = data.audio;
            audioPlayer.style.display = "block";
            audioPlayer.load();
            audioPlayer.play();

            // Set video source and play
            const videoPlayer = document.getElementById("videoPlayer");
            document.getElementById("videoSource").src = data.video;
            videoPlayer.style.display = "block";
            videoPlayer.load();
            videoPlayer.play();
        } else {
            document.getElementById("matchMessage").textContent = data.message;
        }
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("matchMessage").textContent = "An error occurred. Please try again.";
    });
}
