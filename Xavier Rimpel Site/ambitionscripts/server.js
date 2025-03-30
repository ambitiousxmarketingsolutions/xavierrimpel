const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors({ origin: "http://127.0.0.1:5500" }));
app.use(bodyParser.json());
app.use(express.static("public")); // Serves static files (HTML, CSS, JS)

// Email configuration
const transporter = nodemailer.createTransport({
    service: "Gmail", // Use your email provider
    auth: {
        user: "ambitiousxcuts@gmail.com", // Replace with your email
        pass: "mabz zylf lqnr xbec"  // Replace with your email password
    }
});



app.post("/book-appointment", (req, res) => {
    const { name, email, date, time } = req.body;
    const barberEmail = "ambitiousxcuts@gmail.com"; // Barber's email address
    const message = `
        Appointment Details:
        - Name: ${name}
        - Email: ${email}
        - Date: ${date}
        - Time: ${time}
    `;

    const clientMailOptions = {
        from: "ambitiousxcuts@gmail.com",
        to: email,
        subject: "Appointment Confirmation",
        text: `Hi ${name},\n\nYour appointment is confirmed.\n\n${message}`
    };

    const barberMailOptions = {
        from: "ambitiousxcuts@gmail.com",
        to: barberEmail,
        subject: "New Appointment Booked",
        text: message
    };

    Promise.all([
        transporter.sendMail(clientMailOptions),
        transporter.sendMail(barberMailOptions)
    ])
    .then(() => res.status(200).send("Appointment booked successfully"))
    .catch(error => {
        console.error(error);
        res.status(500).send("Error booking appointment");
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
