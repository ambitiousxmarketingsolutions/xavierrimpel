
document.getElementById("bookingForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    const response = await fetch("http://localhost:3000/book-appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, date, time })
    });

    if (response.ok) {
        document.getElementById("confirmation").innerText = "Appointment booked successfully!";
    } else {
        document.getElementById("confirmation").innerText = "Error booking appointment. Please try again.";
    }
});
