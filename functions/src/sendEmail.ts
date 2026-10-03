import * as functions from "firebase-functions";
import * as nodemailer from "nodemailer";

// Configuration - Hardcoded Gmail credentials
const gmailEmail = process.env.GMAIL_EMAIL || "";
const gmailPassword = process.env.GMAIL_PASSWORD || "";

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

/**
 * Cloud Function to handle contact form submissions
 */
export const sendEmail = functions.https.onRequest(async (req, res) => {
  // Set CORS headers
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    res.status(405).json({error: "Method not allowed. Use POST."});
    return;
  }

  try {
    if (!gmailEmail || !gmailPassword) {
      res.status(500).json({error: "Email service is not configured."});
      return;
    }

    // Check for required fields
    const {name, email, message} = req.body;
    if (!name || !email || !message) {
      res.status(400).json({
        error: "Missing required fields: name, email, and " +
          "message are required.",
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({error: "Invalid email format."});
      return;
    }

    // Set up email options
    const mailOptions = {
      from: `"${name}" <${gmailEmail}>`,
      to: gmailEmail,
      replyTo: email,
      subject: `New message from ${name} (${email})`,
      text: message,
      html: `
        <h3>New message from ${name} (${email})</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    res.status(200).json({success: true});
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message :
      "An unknown error occurred";
    console.error("Error sending email:", error);
    res.status(500).json({
      error: "Failed to send email",
      details: errorMessage,
    });
  }
});
