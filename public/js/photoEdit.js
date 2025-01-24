// script.js

// Handle image preview when a file is selected
const imageUploadInput = document.getElementById('imageUpload');
const imagePreview = document.getElementById('imagePreview');
const uploadBtn = document.getElementById('uploadBtn');

imageUploadInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            imagePreview.src = e.target.result; // Set the preview to the selected image
        };
        
        reader.readAsDataURL(file); // Convert the image to base64 and display it
    }
});

// Handle image upload button click
uploadBtn.addEventListener('click', () => {
    const file = imageUploadInput.files[0];

    if (!file) {
        alert("Please select an image to upload!");
        return;
    }

    // You can send the file to your server here using FormData
    // For now, we just log it as a placeholder
    console.log('Uploading image:', file);
    
    // You can replace the following with your actual upload logic
    alert("Image uploaded successfully!");
});
