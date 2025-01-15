// Initialize AOS
AOS.init({
    duration: 1000,
    once: true
});

// Team Members Data
const teamMembers = [
    {
        name: 'สมศักดิ์ รักงาม',
        position: 'Senior Architect',
        image: 'https://drive.apt.london/2021/04/_cache/21014ff1eb183ca24d92bf3fe5eac5dc_3c91967c185cc213f812d7a425cf8040.jpg',
        category: 'architect',
        social: {
            linkedin: '#',
            instagram: '#'
        }
    },
    {
        name: 'สมศรี บุญมี',
        position: 'Senior Interior',
        image: 'https://drive.apt.london/2024/12/_cache/30b051b76fa1ced1a21dcd58a508e25b_220c0ff88c60203fcafa28f9ae8c2d3c.JPG',
        category: 'interior',
        social: {
            linkedin: '#',
            instagram: '#'
        }
    },
    // Add more team members here
];

// Filter Team Members
const filterButtons = document.querySelectorAll('.filter-buttons .btn');
const teamGrid = document.querySelector('.team-grid');

function loadTeamMembers(filter = 'all') {
    teamGrid.innerHTML = '';
    
    teamMembers.forEach(member => {
        if (filter === 'all' || member.category === filter) {
            const memberHTML = `
                <div class="col-lg-3 col-md-6 mb-4" data-aos="fade-up">
                    <div class="team-card">
                        <div class="team-image">
                            <img src="${member.image}" alt="${member.name}" class="img-fluid">
                            <div class="team-overlay">
                                <div class="team-social">
                                    <a href="${member.social.linkedin}"><i class="fab fa-linkedin"></i></a>
                                    <a href="${member.social.instagram}"><i class="fab fa-instagram"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="team-info">
                            <h3>${member.name}</h3>
                            <p class="position">${member.position}</p>
                        </div>
                    </div>
                </div>
            `;
            teamGrid.innerHTML += memberHTML;
        }
    });
}

// Load initial team members
loadTeamMembers();

// Add click event to filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        loadTeamMembers(button.getAttribute('data-filter'));
    });
});

// Add click event to load more button
const loadMoreBtn = document.getElementById('load-more');
loadMoreBtn.addEventListener('click', () => {
    loadTeamMembers(currentFilter);
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