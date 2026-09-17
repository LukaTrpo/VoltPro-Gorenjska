const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");
const navigationLinks = document.querySelectorAll(".nav-links a");

menuButton.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", isOpen);

    if (isOpen) {
        menuButton.textContent = "✕";
        menuButton.setAttribute("aria-label", "Close menu");
    } else {
        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-label", "Open menu");
    }
});

navigationLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        closeMenu();
    });
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeMenu();
    }
});

window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
        closeMenu();
    }
});

function closeMenu() {
    navLinks.classList.remove("open");

    menuButton.textContent = "☰";
    menuButton.setAttribute("aria-label", "Open menu");
    menuButton.setAttribute("aria-expanded", "false");
}

/*Sending form without refreshing the page*/

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const submitButton = contactForm.querySelector(".submit-button");

contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    formStatus.textContent = "Sending your enquiry...";
    formStatus.className = "form-status";

    const formData = new FormData(contactForm);

    try {
        const response = await fetch(contactForm.action, {
            method: "POST",
            body: formData,
            headers: {
                Accept: "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Form submission failed.");
        }

        formStatus.textContent =
            "Thank you! Your enquiry has been sent successfully.";

        formStatus.className = "form-status success";

        contactForm.reset();
    } catch (error) {
        console.error(error);

        formStatus.textContent =
            "The message could not be sent. Please try again.";

        formStatus.className = "form-status error";
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Send enquiry";
    }
});



//Project buttons //

const projectButtons = document.querySelectorAll(
    ".project-image-button"
);

const lightbox = document.getElementById("projectLightbox");
const lightboxImage = lightbox.querySelector(".lightbox-image");
const lightboxTitle = lightbox.querySelector(".lightbox-title");
const lightboxCloseButton = lightbox.querySelector(".lightbox-close");

let lastFocusedButton = null;

projectButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        openLightbox(button);
    });
});

function openLightbox(button) {
    const imagePath = button.dataset.image;
    const projectTitle = button.dataset.title;
    const thumbnail = button.querySelector("img");

    lastFocusedButton = button;

    lightboxImage.src = imagePath;
    lightboxImage.alt = thumbnail.alt;
    lightboxTitle.textContent = projectTitle;

    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");

    lightboxCloseButton.focus();
}

function closeLightbox() {
    lightbox.hidden = true;
    document.body.classList.remove("lightbox-open");

    lightboxImage.src = "";

    if (lastFocusedButton) {
        lastFocusedButton.focus();
    }
}

lightboxCloseButton.addEventListener("click", function () {
    closeLightbox();
});

lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !lightbox.hidden) {
        closeLightbox();
    }
});