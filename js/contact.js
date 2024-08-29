function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const formMessage = document.getElementById('formMessage');


    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === "") {
        formMessage.textContent = "Please enter your name.";
        return false;
    }

    if (!emailPattern.test(email)) {
        formMessage.textContent = "Please enter a valid email address.";
        return false;
    }

    if (message === "") {
        formMessage.textContent = "Please enter your message.";
        return false;
    }

    formMessage.textContent = "Form submitted successfully!";
    formMessage.style.color = "#5cb85c";


    return false;
}
