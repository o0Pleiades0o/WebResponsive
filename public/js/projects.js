// Initialize AOS
AOS.init({
    duration: 800,
    once: true
});

// Project data
const projects = [
    {
        id: 1,
        title: "Modern Villa",
        category: "residential",
        image: "https://drive.apt.london/2021/10/_cache/b881ac11b6132efad4698bb6ece482fa_9f561edf62e0d49641b869d0c357cb4c.jpg",
        location: "กรุงเทพมหานคร",
        year: "2023"
    },
    // Add more projects as needed
];

// DOM Elements
const projectsContainer = document.getElementById('projects-container');
const filterButtons = document.querySelectorAll('.filter-buttons button');
const loadMoreBtn = document.getElementById('load-more');

let currentFilter = 'all';
let visibleProjects = 6;

// Create project card
function createProjectCard(project) {
    return `
        <div class="col-md-6 col-lg-4 project-item ${project.category}" data-aos="fade-up">
            <div class="project-card">
                <img src="${project.image}" alt="${project.title}">
                <div class="project-overlay">
                    <div class="project-info">
                        <h4 class="mb-2">${project.title}</h4>
                        <p class="mb-3">${project.location} | ${project.year}</p>
                        <a href="${project.image}" data-lightbox="projects" class="btn btn-outline-light">ดูรายละเอียด</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Filter projects
function filterProjects(filter) {
    currentFilter = filter;
    const filteredProjects = filter === 'all' 
        ? projects 
        : projects.filter(project => project.category === filter);
    
    projectsContainer.innerHTML = '';
    
    filteredProjects.slice(0, visibleProjects).forEach(project => {
        projectsContainer.innerHTML += createProjectCard(project);
    });
    
    loadMoreBtn.style.display = filteredProjects.length > visibleProjects ? 'block' : 'none';
}

// Event Listeners
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        filterProjects(button.getAttribute('data-filter'));
    });
});

loadMoreBtn.addEventListener('click', () => {
    visibleProjects += 3;
    filterProjects(currentFilter);
});

// Counter Animation
const counters = document.querySelectorAll('.counter');
const speed = 200;

const animateCounter = () => {
    counters.forEach(counter => {
        const target = +counter.innerText;
        const count = +counter.innerText;
        
        const inc = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(animateCounter, 1);
        } else {
            counter.innerText = target;
        }
    });
};

// Trigger counter animation when in viewport
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter();
        }
    });
}, observerOptions);

document.querySelector('.project-stats').querySelectorAll('.stat-item').forEach(stat => {
    observer.observe(stat);
});

// Initialize Lightbox
lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true
});

// Initial load
filterProjects('all');