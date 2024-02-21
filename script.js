// Function to check if an element is at least halfway in the viewport
function isInViewport(element) {
    var bounding = element.getBoundingClientRect();
    var windowHeight = window.innerHeight || document.documentElement.clientHeight;
    // Check if the element is at least halfway visible
    return (
        bounding.top <= windowHeight / 2 &&
        bounding.bottom >= windowHeight / 2
    );
}


// Function to handle scroll event for a specific section
function handleScrollForSection(sectionId) {
    var section = document.getElementById(sectionId);
    if (isInViewport(section)) {
        section.classList.add("in-view");
    } else {
        section.classList.remove("in-view");
    }
}

// Function to handle scroll events for all sections
function handleScroll() {
    handleScrollForSection("events");
    handleScrollForSection("courses");
    handleScrollForSection("testimonials");
}

// Listen for scroll events
window.addEventListener("scroll", handleScroll);

// Initial check when the page loads
handleScroll();




// Smooth scrolling function
function smoothScroll(target, duration) {
    var targetSection = document.querySelector(target);
    var targetPosition = targetSection.getBoundingClientRect().top;
    var startPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    var distance = targetPosition - startPosition;
    var startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Easing function
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}
// Smooth scroll to target section when a nav link is clicked
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        var targetSection = this.getAttribute('href');
        smoothScroll(targetSection, 1000); // Adjust duration as needed
    });
});

window.onload = function() {
    // Trigger animation for nav links
    document.querySelectorAll('.nav-links ul li').forEach(link => {
        link.classList.add('animate');
    });
    
    // Trigger animation for logo
    document.querySelector('nav img').classList.add('animate');
};

// Smooth scroll to top function with smoother easing
function scrollToTop() {
    var duration = 1000; // Duration of the scroll animation in milliseconds
    var start = window.pageYOffset;
    var startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

    function scrollStep() {
        var currentTime = 'now' in window.performance ? performance.now() : new Date().getTime();
        var elapsedTime = currentTime - startTime;
        var position = ease(elapsedTime, start, -start, duration);
        window.scrollTo(0, position);
        if (elapsedTime < duration) {
            requestAnimationFrame(scrollStep);
        }
    }

    function ease(t, b, c, d) {
        // Smoother easing function
        t /= d;
        t--;
        return -c * (t * t * t * t - 1) + b;
    }

    requestAnimationFrame(scrollStep);
}

// Show/hide scroll to top button based on scroll position
function toggleScrollToTopButton() {
    var scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
}

// Listen for scroll events to show/hide scroll to top button
window.addEventListener('scroll', toggleScrollToTopButton);

// Smooth scroll to top when the arrow is clicked
document.getElementById('scrollToTopBtn').addEventListener('click', function(e) {
    e.preventDefault();
    scrollToTop();
});


// Function to toggle between light and dark mode
function toggleMode() {
    var body = document.body;
    var toggleButton = document.getElementById('toggleButton');
    
    // Toggle body class for light/dark mode
    body.classList.toggle('dark-mode');
    
    // Change button text based on mode
    if (body.classList.contains('dark-mode')) {
        toggleButton.textContent = 'Dark Mode';
    } else {
        toggleButton.textContent = 'Light Mode';
    }
}

// Add event listener to the toggle button
document.getElementById('toggleButton').addEventListener('click', function() {
    toggleMode(); // Call the toggleMode function when the button is clicked
});


// Get the video thumbnail elements
var videoThumbnails = document.querySelectorAll('.video-thumbnail');

// Function to play video
function playVideo(videoUrl) {
    window.location.href = videoUrl;
}

// Add event listeners to each video thumbnail
videoThumbnails.forEach(function(thumbnail) {
    thumbnail.addEventListener('click', function() {
        // Check which video thumbnail was clicked and play the corresponding video
        if (this.id === 'video1') {
            playVideo('https://player.vimeo.com/video/913061096');
        } else if (this.id === 'video2') {
            playVideo('https://vimeo.com/910534418');
        }
    });
});














