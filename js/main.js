document.addEventListener("DOMContentLoaded", () => {
  initPromoSlider();
  initContactForm();
  initStoreLocator();
});

function initPromoSlider() {
  const slides = document.querySelectorAll(".slide");
  if (!slides.length) return;

  let currentIndex = 0;

  setInterval(() => {
    slides[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add("active");
  }, 3500);
}

function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const fullName = document.getElementById("fullName");
  const email = document.getElementById("email");
  const subject = document.getElementById("subject");
  const message = document.getElementById("message");
  const formStatus = document.getElementById("formStatus");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let isValid = true;

    clearError("nameError");
    clearError("emailError");
    clearError("subjectError");
    clearError("messageError");
    formStatus.textContent = "";

    if (fullName.value.trim().length < 2) {
      setError("nameError", "Please enter your full name.");
      isValid = false;
    }

    if (!email.validity.valid || email.value.trim() === "") {
      setError("emailError", "Please enter a valid email address.");
      isValid = false;
    }

    if (subject.value.trim().length < 3) {
      setError("subjectError", "Please enter a subject.");
      isValid = false;
    }

    if (message.value.trim().length < 10) {
      setError("messageError", "Please enter a message with at least 10 characters.");
      isValid = false;
    }

    if (!isValid) return;

    formStatus.textContent = "Your message has been sent successfully.";
    form.reset();
  });
}

function initStoreLocator() {
  const form = document.getElementById("storeForm");
  if (!form) return;

  const cityInput = document.getElementById("city");
  const cityError = document.getElementById("cityError");
  const storeCards = document.querySelectorAll(".store-card");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    cityError.textContent = "";

    const query = cityInput.value.trim().toLowerCase();

    if (!query) {
      cityError.textContent = "Please enter a city or area.";
      cityInput.focus();
      return;
    }

    let matches = 0;

    storeCards.forEach((card) => {
      const city = card.dataset.city.toLowerCase();
      const isMatch = city.includes(query);
      card.style.display = isMatch ? "block" : "none";
      if (isMatch) matches++;
    });

    if (matches === 0) {
      cityError.textContent = "No stores found for that location.";
    }
  });
}

function setError(elementId, message) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = message;
  }
}

function clearError(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = "";
  }
}
