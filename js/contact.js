import { sendContactForm } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    status.textContent = "Sending...";
    status.style.color = "white";

    const data = {
      name: form.name.value,
      email: form.email.value,
      subject: form.subject.value,
      message: form.message.value
    };

    try {
      const res = await sendContactForm(data);

      if (res.message === "Message received") {
        status.textContent = "Message sent successfully!";
        status.style.color = "lightgreen";
        form.reset();
      } else {
        status.textContent = "Something went wrong.";
        status.style.color = "red";
      }
    } catch (err) {
      status.textContent = "Server error.";
      status.style.color = "red";
      console.error(err);
    }
  });
});
