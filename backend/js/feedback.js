// feedback.js
document.getElementById("feedbackForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from submitting normally

    document.getElementById('feedbackForm').classList.add('hidden');
    document.getElementById('thankYouMessage').classList.remove('hidden');
    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        cpuAlgorithm: document.getElementById("cpu-algorithm").value,
        feedback: document.getElementById("feedback").value,
    };

    fetch("/send-feedback", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
        .then((response) => {
            if (response.ok) {
                document.getElementById("thankYouMessage").classList.remove("hidden");
                document.getElementById("feedbackForm").reset();
            } else {
                alert("Failed to send feedback. Please try again.");
            }
        })
        .catch((error) => console.error("Error:", error));
});