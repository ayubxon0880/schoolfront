// Get the video element
const video = document.getElementById('video');
// Get the canvas element
const canvas = document.getElementById('canvas');
// Get the canvas context
const context = canvas.getContext('2d');
// Set the canvas width and height to match the video
canvas.width = video.width;
canvas.height = video.height;

// Request access to the webcam
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    // Set the video source to the stream
    video.srcObject = stream;
    // Play the video
    video.play();
    // Call the captureImage function every 2 seconds
    setInterval(captureImage, 4000);
  })
  .catch(error => {
    // Handle the error
    console.error(error);
  });

// Define a function to capture the image and send it to the server
function captureImage() {
  // Draw the current video frame onto the canvas
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  // Convert the canvas image to a data URL
  const dataURL = canvas.toDataURL('image/jpeg');
  // Create a new XMLHttpRequest object
  const xhr = new XMLHttpRequest();
  // Set the request method and URL
  // Replace 'http://example.com/upload' with the URL of your Spring Boot web service
  xhr.open('POST', 'https://asd-oprs.onrender.com/upload');
  // Set the request header
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  // Define a function to handle the response
  xhr.onload = function() {
    // Check if the request was successful
    if (xhr.status === 200) {
      // Log the response
      console.log(xhr.responseText);
    } else {
      // Throw an error
      throw new Error('Something went wrong');
    }
  };
  // Send the data URL as a parameter
  xhr.send('data=' + encodeURIComponent(dataURL));
}
