document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form submission

    // Hide the form and show thank you message
    document.getElementById('feedbackForm').classList.add('hidden');
    document.getElementById('thankYouMessage').classList.remove('hidden');

    // Optionally, you can send form data to a server here using AJAX or fetch API
});