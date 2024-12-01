// Wait for the page to load
document.addEventListener("DOMContentLoaded", () => {
    // Get all testimonials
    const testimonials = document.querySelectorAll(".testimonial");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");
  
    // Start with the first testimonial
    let currentIndex = 0;
  
    // Function to show the current testimonial
    function showTestimonial(index) {
      // Hide all testimonials
      testimonials.forEach((testimonial) => testimonial.classList.remove("active"));
      // Show the selected testimonial
      testimonials[index].classList.add("active");
    }
  
    // Show the previous testimonial
    prevButton.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
      showTestimonial(currentIndex);
    });
  
    // Show the next testimonial
    nextButton.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      showTestimonial(currentIndex);
    });
  
    // Initialize the slider by showing the first testimonial
    showTestimonial(currentIndex);
  });
  