document.querySelectorAll(".dropdown").forEach((dropdown) => {
	dropdown.addEventListener("mouseenter", () => {
		const menu = dropdown.querySelector(".dropdown-menu");
		menu.style.display = "block";
		menu.style.opacity = "0";
		setTimeout(() => {
			menu.style.opacity = "1";
			menu.style.transition = "opacity 0.3s ease";
		}, 10);
	});

	dropdown.addEventListener("mouseleave", () => {
		const menu = dropdown.querySelector(".dropdown-menu");
		menu.style.opacity = "0";
		setTimeout(() => {
			menu.style.display = "none";
		}, 300);
	});
});

function SignUp() {
	window.location.href = "../auth-page/signup.html";
}

function LogIn() {
	window.location.href = "../auth-page/login.html";
}

let currentTestimonial = 0;
const testimonials = document.querySelectorAll(".testimonial-content");

function showTestimonial(index) {
	testimonials.forEach((testimonial, i) => {
		testimonial.classList.remove("active");
		if (i === index) {
			testimonial.classList.add("active");
		}
	});
}

function showPrevious() {
	currentTestimonial =
		(currentTestimonial - 1 + testimonials.length) % testimonials.length;
	showTestimonial(currentTestimonial);
}

function showNext() {
	currentTestimonial = (currentTestimonial + 1) % testimonials.length;
	showTestimonial(currentTestimonial);
}
