// Initialize AOS
AOS.init({
    duration: 800,
    once: true
});

// Initialize Google Map
function initMap() {
    const location = { lat: 13.7563, lng: 100.5018 }; // Bangkok coordinates
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: location,
        styles: [
            {
                "featureType": "all",
                "elementType": "geometry",
                "stylers": [{"saturation": "-100"}]
            },
            {
                "featureType": "all",
                "elementType": "labels.text",
                "stylers": [{"color": "#333333"}]
            }
        ]
    });

    // Add marker
    const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: 'Architect Studio',
        animation: google.maps.Animation.DROP
    });

    // Add info window
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div style="padding: 10px;">
                <h5 style="margin: 0 0 5px;">Architect Studio</h5>
                <p style="margin: 0;">123 ถนนสุขุมวิท<br>กรุงเทพมหานคร 10110</p>
            </div>
        `
    });

    // Show info window on marker click
    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
}

// Form Validation and Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Basic validation
        if (!validateForm(formData)) {
            return;
        }

        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> กำลังส่ง...';
        submitBtn.disabled = true;

        try {
            // Simulate API call (replace with actual API endpoint)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            showNotification('ส่งข้อความเรียบร้อยแล้ว! เราจะติดต่อกลับโดยเร็วที่สุด', 'success');
            
            // Reset form
            contactForm.reset();
        } catch (error) {
            // Show error message
            showNotification('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง', 'error');
        } finally {
            // Restore button state
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

// Form validation function
function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9-+\s()]{8,}$/;

    if (!data.name.trim()) {
        showNotification('กรุณากรอกชื่อ-นามสกุล', 'error');
        return false;
    }

    if (!emailRegex.test(data.email)) {
        showNotification('กรุณากรอกอีเมลให้ถูกต้อง', 'error');
        return false;
    }

    if (data.phone && !phoneRegex.test(data.phone)) {
        showNotification('กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง', 'error');
        return false;
    }

    if (!data.subject) {
        showNotification('กรุณาเลือกหัวข้อที่ต้องการติดต่อ', 'error');
        return false;
    }

    if (!data.message.trim()) {
        showNotification('กรุณากรอกข้อความ', 'error');
        return false;
    }

    return true;
}

// Notification system
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add notification to DOM
    document.body.appendChild(notification);

    // Show notification with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Remove notification after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Dynamic form label animation
const formInputs = document.querySelectorAll('.form-control, .form-select');
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.closest('.form-floating').classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            input.closest('.form-floating').classList.remove('focused');
        }
    });
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 4px;
        background: white;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        transform: translateX(120%);
        transition: transform 0.3s ease;
        z-index: 1000;
    }

    .notification.show {
        transform: translateX(0);
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .notification.success {
        border-left: 4px solid #28a745;
    }

    .notification.error {
        border-left: 4px solid #dc3545;
    }

    .notification i {
        font-size: 1.2em;
    }

    .notification.success i {
        color: #28a745;
    }

    .notification.error i {
        color: #dc3545;
    }
`;
document.head.appendChild(style);