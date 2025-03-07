document.getElementById("feedbackForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from submitting normally

    // Hide the form and show the thank-you message
    document.getElementById("feedbackForm").classList.add("hidden");
    document.getElementById("thankYouMessage").classList.remove("hidden");

    // Collect form data
    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        cpuAlgorithm: document.getElementById("cpu-algorithm").value,
        feedback: document.getElementById("feedback").value,
    };

    // Send data to the server
    fetch("http://localhost:5500/submit-feedback", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
        .then((response) => {
            if (response.ok) {
                console.log("Feedback submitted successfully.");
                document.getElementById("feedbackForm").reset();
            } else {
                alert("Failed to send feedback. Please try again.");
                // Re-show the form if submission failed
                document.getElementById("feedbackForm").classList.remove("hidden");
                document.getElementById("thankYouMessage").classList.add("hidden");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("An error occurred. Please try again later.");
            // Re-show the form in case of error
            document.getElementById("feedbackForm").classList.remove("hidden");
            document.getElementById("thankYouMessage").classList.add("hidden");
        });
});
