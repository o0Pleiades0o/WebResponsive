// Initialize AOS
AOS.init({
    duration: 1000,
    once: true
});

// Counter Animation
const counters = document.querySelectorAll('.counter');
const speed = 200;

const animateCounter = () => {
    counters.forEach(counter => {
        const target = parseInt(counter.innerText);
        const count = +counter.innerText;
        
        const inc = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(animateCounter, 1);
        } else {
            counter.innerText = target;
        }
    });
}

// Trigger counter animation when section is in view
const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
        animateCounter();
        observer.unobserve(entries[0].target);
    }
}, {
    threshold: 0.5
});

const counterSection = document.querySelector('.stats-section');
observer.observe(counterSection);
