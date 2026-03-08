// Initialize Lucide icons
lucide.createIcons();

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking on a link
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize Charts
document.addEventListener('DOMContentLoaded', function() {
    // Air Quality Chart
    const airQualityCtx = document.getElementById('airQualityChart').getContext('2d');
    const airQualityChart = new Chart(airQualityCtx, {
        type: 'line',
        data: {
            labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
            datasets: [{
                label: 'PM2.5 Levels (µg/m³)',
                data: [42, 40, 38, 36, 35, 33, 32, 31, 29],
                borderColor: '#2E8B57',
                backgroundColor: 'rgba(46, 139, 87, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'PM2.5 (µg/m³)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Year'
                    }
                }
            }
        }
    });

    // Water Conservation Chart
    const waterCtx = document.getElementById('waterChart').getContext('2d');
    const waterChart = new Chart(waterCtx, {
        type: 'bar',
        data: {
            labels: ['Traditional', 'Drip Irrigation', 'Smart Sensors', 'Rainwater Harvesting'],
            datasets: [{
                label: 'Water Usage (m³/hectare)',
                data: [8500, 6500, 5100, 4200],
                backgroundColor: [
                    'rgba(46, 139, 87, 0.7)',
                    'rgba(60, 179, 113, 0.7)',
                    'rgba(144, 238, 144, 0.7)',
                    'rgba(152, 251, 152, 0.7)'
                ],
                borderColor: [
                    '#2E8B57',
                    '#3CB371',
                    '#90EE90',
                    '#98FB98'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Water Usage: ${context.raw}m³/hectare`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Water Usage (m³/hectare)'
                    }
                }
            }
        }
    });

    // Before/After Slider
    const beforeAfterSlider = document.querySelector('.before-after-slider');
    const sliderHandle = document.getElementById('slider-handle');
    const beforeImage = document.getElementById('before-image');
    const afterImage = document.getElementById('after-image');
    
    if (beforeAfterSlider && sliderHandle) {
        let isDragging = false;
        const sliderRect = beforeAfterSlider.getBoundingClientRect();
        
        const updateSlider = (clientX) => {
            const rect = beforeAfterSlider.getBoundingClientRect();
            let x = clientX - rect.left;
            
            // Constrain within bounds
            x = Math.max(0, Math.min(x, rect.width));
            
            // Update slider handle position
            sliderHandle.style.left = `${x}px`;
            
            // Update image clipping
            beforeImage.style.clipPath = `inset(0 ${rect.width - x}px 0 0)`;
            afterImage.style.clipPath = `inset(0 0 0 ${x}px)`;
        };
        
        sliderHandle.addEventListener('mousedown', (e) => {
            isDragging = true;
            sliderHandle.style.cursor = 'grabbing';
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            updateSlider(e.clientX);
        });
        
        document.addEventListener('mouseup', () => {
            isDragging = false;
            sliderHandle.style.cursor = 'grab';
        });
        
        // Touch events for mobile
        sliderHandle.addEventListener('touchstart', (e) => {
            isDragging = true;
            e.preventDefault();
        });
        
        document.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            updateSlider(e.touches[0].clientX);
            e.preventDefault();
        });
        
        document.addEventListener('touchend', () => {
            isDragging = false;
        });
        
        // Initialize slider at 50%
        updateSlider(sliderRect.left + sliderRect.width / 2);
    }

    // Animate counters on scroll
    const counters = document.querySelectorAll('.counter-value');
    const speed = 200;
    
    const animateCounters = () => {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const count = parseInt(counter.innerText);
            const increment = Math.ceil(target / speed);
            
            if (count < target) {
                counter.innerText = count + increment;
                setTimeout(() => animateCounter(counter, target), 1);
            } else {
                counter.innerText = target.toLocaleString();
            }
        });
    };
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('stats-section')) {
                    animateCounters();
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe stats section
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }

    // Update icons on dynamic content (if any)
    setInterval(() => {
        lucide.createIcons();
    }, 1000);
});

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const subscribeForm = document.querySelector('input[type="email"] + button');
    if (subscribeForm) {
        subscribeForm.addEventListener('click', function() {
            const emailInput = this.previousElementSibling;
            if (emailInput.value && emailInput.value.includes('@')) {
                this.innerHTML = 'Subscribed! <i data-lucide="check" class="inline ml-2 w-5 h-5"></i>';
                this.disabled = true;
                this.classList.remove('bg-green-600', 'hover:bg-green-700');
                this.classList.add('bg-green-700');
                emailInput.value = '';
                lucide.createIcons();
                
                setTimeout(() => {
                    this.innerHTML = 'Subscribe for Updates';
                    this.disabled = false;
                    this.classList.remove('bg-green-700');
                    this.classList.add('bg-green-600', 'hover:bg-green-700');
                }, 3000);
            }
        });
    }
});
