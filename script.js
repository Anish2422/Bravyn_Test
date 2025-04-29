window.addEventListener('scroll', function() {
  document.getElementById('header').classList.toggle('scrolled', window.scrollY > 50);
});

const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      section.classList.add('visible');
    }
  });
});

const form = document.getElementById('contact-form');
const successMessage = document.getElementById('form-success');
const errorMessage = document.getElementById('form-error');
const submitButton = document.getElementById('submit-button');

function showMessage(element) {
  element.style.opacity = '1';
  setTimeout(() => {
    element.style.opacity = '0';
  }, 4000);
}

function validateForm() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !emailRegex.test(email)) {
    return false;
  }
  return true;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    errorMessage.textContent = 'Please enter a valid name and email.';
    showMessage(errorMessage);
    return;
  }

  const formData = new FormData(form);

  // Disable the button and add spinner
  submitButton.disabled = true;
  const originalText = submitButton.innerHTML;
  submitButton.innerHTML = 'Sending <span class="spinner"></span>';

  try {
    const response = await fetch('https://formspree.io/f/xpwdqdjo', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      form.reset();
      successMessage.textContent = 'Thank you! We\'ll be in touch soon.';
      showMessage(successMessage);
    } else {
      throw new Error('Form submission failed');
    }
  } catch (error) {
    errorMessage.textContent = 'Oops! Something went wrong. Please try again.';
    showMessage(errorMessage);
  } finally {
    // Re-enable the button and remove spinner
    submitButton.disabled = false;
    submitButton.innerHTML = originalText;
  }
});

const carousel = document.querySelector('.carousel');
const cards = document.querySelector('.about-cards');

let isDragging = false;
let startX;
let scrollLeft;

carousel.addEventListener('mousedown', (e) => {
  isDragging = true;
  carousel.classList.add('dragging');
  startX = e.pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener('mouseleave', () => {
  isDragging = false;
  carousel.classList.remove('dragging');
});

carousel.addEventListener('mouseup', () => {
  isDragging = false;
  carousel.classList.remove('dragging');
});

carousel.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - carousel.offsetLeft;
  const walk = (x - startX) * 2; // Adjust scroll speed
  carousel.scrollLeft = scrollLeft - walk;
});