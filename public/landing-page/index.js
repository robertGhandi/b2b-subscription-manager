function SignUp() {
	window.location.href = "../auth-page/signup.html";
}

function LogIn() {
	window.location.href = "../auth-page/login.html";
}


const slides = document.querySelectorAll(".testimonial-slide");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentSlide = 0;
const delay = 5000; // 5 seconds delay between slides
let autoSlideInterval;

// Function to update slides and dots
function updateSlides(index) {
	slides.forEach((slide, i) => {
		slide.classList.toggle("active", i === index);
	});
	dots.forEach((dot, i) => {
		dot.classList.toggle("active", i === index);
	});
}

// Function to show the next slide
function nextSlide() {
	currentSlide = (currentSlide + 1) % slides.length;
	updateSlides(currentSlide);
}

// Function to show the previous slide
function prevSlide() {
	currentSlide = (currentSlide - 1 + slides.length) % slides.length;
	updateSlides(currentSlide);
}

// Event listeners for navigation buttons
prevBtn.addEventListener("click", () => {
	prevSlide();
	resetAutoSlide();
});

nextBtn.addEventListener("click", () => {
	nextSlide();
	resetAutoSlide();
});

// Dot navigation
dots.forEach((dot, i) => {
	dot.addEventListener("click", () => {
		currentSlide = i;
		updateSlides(currentSlide);
		resetAutoSlide();
	});
});

// Function to reset the auto-slide timer
function resetAutoSlide() {
	clearInterval(autoSlideInterval);
	autoSlideInterval = setInterval(nextSlide, delay);
}

// Start auto-sliding on page load
autoSlideInterval = setInterval(nextSlide, delay);
