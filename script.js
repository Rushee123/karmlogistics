// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations immediately
    initializeAnimations();
    initializeGallery();

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            const headerHeight = 120; // Account for fixed header
            const targetPosition = target.offsetTop - headerHeight;
            
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize animations after loading
function initializeAnimations() {
    // Counter animation for stats
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateCounter(counter, target);
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.animate-fade-in-up, .animate-fade-in-left, .animate-fade-in-right');
    if (animateElements.length > 0) {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) translateX(0)';
                    entry.target.style.transition = 'all 0.8s ease-out';
                }
            });
        }, { threshold: 0.2 });

        animateElements.forEach(element => {
            element.style.opacity = '0';
            if (element.classList.contains('animate-fade-in-up')) {
                element.style.transform = 'translateY(50px)';
            } else if (element.classList.contains('animate-fade-in-left')) {
                element.style.transform = 'translateX(-50px)';
            } else if (element.classList.contains('animate-fade-in-right')) {
                element.style.transform = 'translateX(50px)';
            }
            animationObserver.observe(element);
        });
    }
}

// Counter animation function
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 20);
}

// WhatsApp Form Submission - Actually Works!
document.addEventListener('DOMContentLoaded', function() {
    const whatsappForm = document.getElementById('whatsapp-form');
    if (whatsappForm) {
        whatsappForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value.trim();
            const mobile = document.getElementById('mobile').value.trim();
            const from = document.getElementById('from').value.trim();
            const to = document.getElementById('to').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (!name || !mobile || !from || !to || !email) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Create WhatsApp message
            const whatsappMessage = `🚛 *New Transport Inquiry* 🚛

👤 *Name:* ${name}
📱 *Mobile:* ${mobile}  
📧 *Email:* ${email}
📍 *From:* ${from}
📍 *To:* ${to}
💬 *Message:* ${message || 'No additional message'}

---
*Sent from KARM LOGISTICS Website*`;
            
            // Encode message for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // Your WhatsApp number (replace with your actual number)
            const whatsappNumber = '919601048762';
            
            // Create WhatsApp URL
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;
            
            // Open WhatsApp
            window.open(whatsappUrl, '_blank');
            
            // Show success message and reset form
            alert('Opening WhatsApp... Please send the message to complete your inquiry.');
            this.reset();
        });
    }
});

// Scroll to Top on Page Load
window.addEventListener('load', function() {
    window.scrollTo(0, 0);
});

// Add active class to navigation links based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('text-primary', 'font-semibold');
        link.classList.add('text-gray-700');
        
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.remove('text-gray-700');
            link.classList.add('text-primary', 'font-semibold');
        }
    });
});

// Stats Counter Animation
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.innerHTML = Math.floor(progress * (end - start) + start) + '+';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Intersection Observer for Stats Animation
const statsSection = document.querySelector('.grid.grid-cols-2.md\\:grid-cols-4');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = entry.target.querySelectorAll('.text-4xl.font-bold');
            stats.forEach((stat, index) => {
                const values = [100, 10, 1, 400];
                animateCounter(stat, 0, values[index], 2000);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Loading Animation
window.addEventListener('load', function() {
    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInObserver.observe(section);
    });
});

// Service Cards Hover Effect
document.querySelectorAll('.hover\\:shadow-lg').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('shadow-lg');
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.classList.remove('shadow-lg');
        header.style.backgroundColor = 'white';
        header.style.backdropFilter = 'none';
    }
});

// Testimonial Carousel (if needed in future)
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.bg-gray-50.rounded-lg.p-6.text-center');

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.display = i === index ? 'block' : 'none';
    });
}

// Auto-rotate testimonials every 5 seconds (if carousel is implemented)
// setInterval(() => {
//     currentTestimonial = (currentTestimonial + 1) % testimonials.length;
//     showTestimonial(currentTestimonial);
// }, 5000);

// WhatsApp and Call button animations
document.querySelectorAll('.fixed').forEach(button => {
    if (button.href && (button.href.includes('whatsapp') || button.href.includes('tel:'))) {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
});

// Service Modal Functionality
const serviceData = {
    'truck-transport': {
        title: 'Truck Transport Services',
        content: `
            <div class="space-y-6">
                <div class="flex items-center space-x-4 mb-6">
                    <div class="text-5xl text-primary">
                        <i class="fas fa-truck"></i>
                    </div>
                    <div>
                        <h3 class="text-2xl font-semibold text-gray-800">Professional Truck Transport</h3>
                        <p class="text-gray-600">Reliable and secure transportation solutions</p>
                    </div>
                </div>
                
                <div class="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 class="text-lg font-semibold mb-3 text-primary">Service Features:</h4>
                        <ul class="space-y-2">
                            <li class="flex items-center"><i class="fas fa-check-circle text-green-500 mr-2"></i> Professional drivers</li>
                            <li class="flex items-center"><i class="fas fa-check-circle text-green-500 mr-2"></i> GPS tracking</li>
                            <li class="flex items-center"><i class="fas fa-check-circle text-green-500 mr-2"></i> 24/7 customer support</li>
                            <li class="flex items-center"><i class="fas fa-check-circle text-green-500 mr-2"></i> Insurance coverage</li>
                            <li class="flex items-center"><i class="fas fa-check-circle text-green-500 mr-2"></i> Timely delivery</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-lg font-semibold mb-3 text-primary">Vehicle Types:</h4>
                        <ul class="space-y-2">
                            <li class="flex items-center"><i class="fas fa-truck mr-2 text-secondary"></i> Heavy duty trucks</li>
                            <li class="flex items-center"><i class="fas fa-truck mr-2 text-secondary"></i> Medium trucks</li>
                            <li class="flex items-center"><i class="fas fa-truck mr-2 text-secondary"></i> Light trucks</li>
                            <li class="flex items-center"><i class="fas fa-truck mr-2 text-secondary"></i> Specialized vehicles</li>
                        </ul>
                    </div>
                </div>
                
                <div class="bg-gray-50 p-4 rounded-lg">
                    <p class="text-gray-700">
                        <strong>Ideal for:</strong> Industrial goods, commercial products, bulk materials, machinery, 
                        construction equipment, and general freight transportation across India.
                    </p>
                </div>
                
                <div class="flex space-x-4">
                    <button onclick="closeModal()" class="bg-primary hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">
                        Get Quote
                    </button>
                    <button onclick="closeModal()" class="border border-primary text-primary hover:bg-primary hover:text-white px-6 py-2 rounded-lg transition">
                        Contact Us
                    </button>
                </div>
            </div>
        `
    },
    
    'full-truck-load': {
        title: 'Full Truck Load (FTL) Services',
        content: `
            <div class="space-y-6">
                <div class="flex items-center space-x-4 mb-6">
                    <div class="text-5xl text-secondary">
                        <i class="fas fa-shipping-fast"></i>
                    </div>
                    <div>
                        <h3 class="text-2xl font-semibold text-gray-800">Full Truck Load Solutions</h3>
                        <p class="text-gray-600">Dedicated truck for your complete shipment</p>
                    </div>
                </div>
                
                <div class="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 class="text-lg font-semibold mb-3 text-primary">FTL Advantages:</h4>
                        <ul class="space-y-2">
                            <li class="flex items-center"><i class="fas fa-check-circle text-green-500 mr-2"></i> Dedicated truck</li>
                            <li class="flex items-center"><i class="fas fa-check-circle text-green-500 mr-2"></i> Faster transit time</li>
                            <li class="flex items-center"><i class="fas fa-check-circle text-green-500 mr-2"></i> Direct delivery</li>
                            <li class="flex items-center"><i class="fas fa-check-circle text-green-500 mr-2"></i> Better cargo security</li>
                            <li class="flex items-center"><i class="fas fa-check-circle text-green-500 mr-2"></i> Cost-effective for large loads</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-lg font-semibold mb-3 text-primary">Truck Capacity:</h4>
                        <ul class="space-y-2">
                            <li class="flex items-center"><i class="fas fa-weight-hanging mr-2 text-secondary"></i> 1 ton to 40 tons</li>
                            <li class="flex items-center"><i class="fas fa-weight-hanging mr-2 text-secondary"></i> Various truck sizes</li>
                            <li class="flex items-center"><i class="fas fa-weight-hanging mr-2 text-secondary"></i> Temperature controlled</li>
                            <li class="flex items-center"><i class="fas fa-weight-hanging mr-2 text-secondary"></i> Special handling available</li>
                        </ul>
                    </div>
                </div>
                
                <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-primary">
                    <h4 class="font-semibold text-primary mb-2">Why Choose FTL?</h4>
                    <p class="text-gray-700">
                        Full Truck Load is perfect for large shipments, fragile goods, time-sensitive deliveries, 
                        and when you want complete control over your cargo transportation.
                    </p>
                </div>
            </div>
        `
    },
    
    'open-body-truck': {
        title: 'Open Body Truck Services',
        content: `
            <div class="space-y-6">
                <div class="flex items-center space-x-4 mb-6">
                    <div class="text-5xl text-accent">
                        <i class="fas fa-warehouse"></i>
                    </div>
                    <div>
                        <h3 class="text-2xl font-semibold text-gray-800">Open Body Truck Transport</h3>
                        <p class="text-gray-600">Specialized transport for oversized cargo</p>
                    </div>
                </div>
                
                <div class="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 class="text-lg font-semibold mb-3 text-primary">Perfect For:</h4>
                        <ul class="space-y-2">
                            <li class="flex items-center"><i class="fas fa-check-circle text-green-500 mr-2"></i> Construction materials</li>
                            <li class="flex items-center"><i class="fas fa-check-circle text-green-500 mr-2"></i> Heavy machinery</li>
                            <li class="flex items-center"><i class="fas fa-check-circle text-green-500 mr-2"></i> Steel structures</li>
                            <li class="flex items-center"><i class="fas fa-check-circle text-green-500 mr-2"></i> Large equipment</li>
                            <li class="flex items-center"><i class="fas fa-check-circle text-green-500 mr-2"></i> Bulk materials</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-lg font-semibold mb-3 text-primary">Safety Features:</h4>
                        <ul class="space-y-2">
                            <li class="flex items-center"><i class="fas fa-shield-alt mr-2 text-secondary"></i> Secure tie-downs</li>
                            <li class="flex items-center"><i class="fas fa-shield-alt mr-2 text-secondary"></i> Professional loading</li>
                            <li class="flex items-center"><i class="fas fa-shield-alt mr-2 text-secondary"></i> Route planning</li>
                            <li class="flex items-center"><i class="fas fa-shield-alt mr-2 text-secondary"></i> Safety compliance</li>
                        </ul>
                    </div>
                </div>
                
                <div class="bg-yellow-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-secondary mb-2">Special Handling</h4>
                    <p class="text-gray-700">
                        Our open body trucks are equipped with advanced securing systems and our experienced 
                        team ensures safe transportation of your valuable oversized cargo.
                    </p>
                </div>
            </div>
        `
    },
    
    'part-load-transport': {
        title: 'Part Load Transport Services',
        content: `
            <div class="space-y-6">
                <div class="flex items-center space-x-4 mb-6">
                    <div class="text-5xl text-red-500">
                        <i class="fas fa-boxes"></i>
                    </div>
                    <div>
                        <h3 class="text-2xl font-semibold text-gray-800">Part Load Transport (LTL)</h3>
                        <p class="text-gray-600">Cost-effective solution for smaller shipments</p>
                    </div>
                </div>
                
                <div class="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 class="text-lg font-semibold mb-3 text-primary">Benefits:</h4>
                        <ul class="space-y-2">
                            <li class="flex items-center"><i class="fas fa-check-circle text-green-500 mr-2"></i> Cost-effective pricing</li>
                            <li class="flex items-center"><i class="fas fa-check-circle text-green-500 mr-2"></i> No minimum load requirement</li>
                            <li class="flex items-center"><i class="fas fa-check-circle text-green-500 mr-2"></i> Flexible pickup times</li>
                            <li class="flex items-center"><i class="fas fa-check-circle text-green-500 mr-2"></i> Shared transportation costs</li>
                            <li class="flex items-center"><i class="fas fa-check-circle text-green-500 mr-2"></i> Regular service frequency</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-lg font-semibold mb-3 text-primary">Typical Cargo:</h4>
                        <ul class="space-y-2">
                            <li class="flex items-center"><i class="fas fa-box mr-2 text-red-500"></i> Small packages</li>
                            <li class="flex items-center"><i class="fas fa-box mr-2 text-red-500"></i> Documents</li>
                            <li class="flex items-center"><i class="fas fa-box mr-2 text-red-500"></i> Household goods</li>
                            <li class="flex items-center"><i class="fas fa-box mr-2 text-red-500"></i> Commercial samples</li>
                        </ul>
                    </div>
                </div>
                
                <div class="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                    <h4 class="font-semibold text-red-600 mb-2">Ideal For Small Businesses</h4>
                    <p class="text-gray-700">
                        Part load service is perfect for small businesses, e-commerce sellers, and individuals 
                        who don't have enough cargo to fill an entire truck but need reliable transport.
                    </p>
                </div>
            </div>
        `
    },
    
    'lcv-mini-trucks': {
        title: 'LCV Mini Truck Services',
        content: `
            <div class="space-y-6">
                <div class="flex items-center space-x-4 mb-6">
                    <div class="text-5xl text-purple-500">
                        <i class="fas fa-truck-pickup"></i>
                    </div>
                    <div>
                        <h3 class="text-2xl font-semibold text-gray-800">Light Commercial Vehicle Services</h3>
                        <p class="text-gray-600">Perfect for city deliveries and small loads</p>
                    </div>
                </div>
                
                <div class="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 class="text-lg font-semibold mb-3 text-primary">Vehicle Types:</h4>
                        <ul class="space-y-2">
                            <li class="flex items-center"><i class="fas fa-check-circle text-green-500 mr-2"></i> Tata Ace / Magic</li>
                            <li class="flex items-center"><i class="fas fa-check-circle text-green-500 mr-2"></i> Mahindra Bolero Pickup</li>
                            <li class="flex items-center"><i class="fas fa-check-circle text-green-500 mr-2"></i> Maruti Super Carry</li>
                            <li class="flex items-center"><i class="fas fa-check-circle text-green-500 mr-2"></i> Piaggio Ape</li>
                            <li class="flex items-center"><i class="fas fa-check-circle text-green-500 mr-2"></i> Custom mini trucks</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-lg font-semibold mb-3 text-primary">Best For:</h4>
                        <ul class="space-y-2">
                            <li class="flex items-center"><i class="fas fa-city mr-2 text-purple-500"></i> City deliveries</li>
                            <li class="flex items-center"><i class="fas fa-city mr-2 text-purple-500"></i> Last-mile delivery</li>
                            <li class="flex items-center"><i class="fas fa-city mr-2 text-purple-500"></i> Local transport</li>
                            <li class="flex items-center"><i class="fas fa-city mr-2 text-purple-500"></i> Quick deliveries</li>
                        </ul>
                    </div>
                </div>
                
                <div class="bg-purple-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-purple-600 mb-2">Load Capacity</h4>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div class="bg-white p-3 rounded">
                            <div class="text-2xl font-bold text-purple-500">500kg</div>
                            <div class="text-sm text-gray-600">Mini Load</div>
                        </div>
                        <div class="bg-white p-3 rounded">
                            <div class="text-2xl font-bold text-purple-500">750kg</div>
                            <div class="text-sm text-gray-600">Standard</div>
                        </div>
                        <div class="bg-white p-3 rounded">
                            <div class="text-2xl font-bold text-purple-500">1 Ton</div>
                            <div class="text-sm text-gray-600">Medium</div>
                        </div>
                        <div class="bg-white p-3 rounded">
                            <div class="text-2xl font-bold text-purple-500">1.5 Ton</div>
                            <div class="text-sm text-gray-600">Large</div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    
    'pan-india-service': {
        title: 'Pan India Service Network',
        content: `
            <div class="space-y-6">
                <div class="flex items-center space-x-4 mb-6">
                    <div class="text-5xl text-indigo-500">
                        <i class="fas fa-globe"></i>
                    </div>
                    <div>
                        <h3 class="text-2xl font-semibold text-gray-800">Complete India Coverage</h3>
                        <p class="text-gray-600">Nationwide logistics network</p>
                    </div>
                </div>
                
                <div class="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 class="text-lg font-semibold mb-3 text-primary">Coverage Areas:</h4>
                        <ul class="space-y-2 text-sm">
                            <li class="flex items-center"><i class="fas fa-map-marker-alt mr-2 text-indigo-500"></i> Maharashtra, Karnataka, Andhra Pradesh</li>
                            <li class="flex items-center"><i class="fas fa-map-marker-alt mr-2 text-indigo-500"></i> Telangana, Tamil Nadu, Kerala</li>
                            <li class="flex items-center"><i class="fas fa-map-marker-alt mr-2 text-indigo-500"></i> Goa, Rajasthan, Punjab</li>
                            <li class="flex items-center"><i class="fas fa-map-marker-alt mr-2 text-indigo-500"></i> Haryana, J&K, Bihar</li>
                            <li class="flex items-center"><i class="fas fa-map-marker-alt mr-2 text-indigo-500"></i> West Bengal, Gujarat, MP</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-lg font-semibold mb-3 text-primary">Network Strength:</h4>
                        <div class="grid grid-cols-2 gap-4">
                            <div class="bg-indigo-50 p-3 rounded text-center">
                                <div class="text-2xl font-bold text-indigo-500">500+</div>
                                <div class="text-sm text-gray-600">Cities Covered</div>
                            </div>
                            <div class="bg-indigo-50 p-3 rounded text-center">
                                <div class="text-2xl font-bold text-indigo-500">25+</div>
                                <div class="text-sm text-gray-600">Branch Offices</div>
                            </div>
                            <div class="bg-indigo-50 p-3 rounded text-center">
                                <div class="text-2xl font-bold text-indigo-500">24/7</div>
                                <div class="text-sm text-gray-600">Support</div>
                            </div>
                            <div class="bg-indigo-50 p-3 rounded text-center">
                                <div class="text-2xl font-bold text-indigo-500">GPS</div>
                                <div class="text-sm text-gray-600">Tracking</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg">
                    <h4 class="font-semibold text-indigo-600 mb-3 text-lg">Why Choose Our Pan India Network?</h4>
                    <div class="grid md:grid-cols-2 gap-4">
                        <ul class="space-y-2">
                            <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i> Extensive network coverage</li>
                            <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i> Reliable delivery schedules</li>
                            <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i> Real-time tracking</li>
                        </ul>
                        <ul class="space-y-2">
                            <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i> Competitive pricing</li>
                            <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i> Professional handling</li>
                            <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i> Insurance coverage</li>
                        </ul>
                    </div>
                </div>
            </div>
        `
    }
};

// About Modal Data
const aboutData = {
    title: 'About KARM LOGISTICS',
    content: `
        <div class="space-y-6">
            <div class="flex items-center space-x-4 mb-6">
                <div class="text-5xl text-primary">
                    <i class="fas fa-building"></i>
                </div>
                <div>
                    <h3 class="text-2xl font-semibold text-gray-800">Leading Transport & Logistics Company</h3>
                    <p class="text-gray-600">Your trusted partner for reliable transportation solutions</p>
                </div>
            </div>
            
            <div class="grid md:grid-cols-2 gap-6">
                <div>
                    <h4 class="text-lg font-semibold mb-3 text-primary">Our Mission</h4>
                    <p class="text-gray-700 mb-4">
                        To provide world-class logistics and transportation services that exceed customer expectations 
                        through innovation, reliability, and commitment to excellence.
                    </p>
                    
                    <h4 class="text-lg font-semibold mb-3 text-primary">Our Vision</h4>
                    <p class="text-gray-700">
                        To be India's most trusted and preferred logistics partner, connecting businesses and 
                        communities through efficient and sustainable transport solutions.
                    </p>
                </div>
                <div>
                    <h4 class="text-lg font-semibold mb-3 text-primary">Why Choose Us</h4>
                    <ul class="space-y-2">
                        <li class="flex items-center"><i class="fas fa-check-circle text-green-500 mr-2"></i> 10+ years of experience</li>
                        <li class="flex items-center"><i class="fas fa-check-circle text-green-500 mr-2"></i> Pan-India network coverage</li>
                        <li class="flex items-center"><i class="fas fa-check-circle text-green-500 mr-2"></i> Modern fleet of vehicles</li>
                        <li class="flex items-center"><i class="fas fa-check-circle text-green-500 mr-2"></i> Professional & trained drivers</li>
                        <li class="flex items-center"><i class="fas fa-check-circle text-green-500 mr-2"></i> Real-time tracking system</li>
                        <li class="flex items-center"><i class="fas fa-check-circle text-green-500 mr-2"></i> 24/7 customer support</li>
                        <li class="flex items-center"><i class="fas fa-check-circle text-green-500 mr-2"></i> Competitive pricing</li>
                        <li class="flex items-center"><i class="fas fa-check-circle text-green-500 mr-2"></i> Insurance coverage</li>
                    </ul>
                </div>
            </div>
            
            <div class="bg-primary/10 p-6 rounded-lg">
                <h4 class="text-lg font-semibold mb-3 text-primary">Company Highlights</h4>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div class="text-center">
                        <div class="text-3xl font-bold text-primary">500+</div>
                        <div class="text-sm text-gray-600">Happy Customers</div>
                    </div>
                    <div class="text-center">
                        <div class="text-3xl font-bold text-secondary">50+</div>
                        <div class="text-sm text-gray-600">Fleet Size</div>
                    </div>
                    <div class="text-center">
                        <div class="text-3xl font-bold text-accent">25+</div>
                        <div class="text-sm text-gray-600">Branch Offices</div>
                    </div>
                    <div class="text-center">
                        <div class="text-3xl font-bold text-primary">1000+</div>
                        <div class="text-sm text-gray-600">Deliveries</div>
                    </div>
                </div>
            </div>
            
            <div class="bg-gray-50 p-6 rounded-lg">
                <h4 class="text-lg font-semibold mb-3 text-primary">Our Services Include</h4>
                <div class="grid md:grid-cols-2 gap-4">
                    <ul class="space-y-2">
                        <li class="flex items-center"><i class="fas fa-truck mr-2 text-primary"></i> Full Truck Load (FTL)</li>
                        <li class="flex items-center"><i class="fas fa-boxes mr-2 text-primary"></i> Part Load Transport (LTL)</li>
                        <li class="flex items-center"><i class="fas fa-warehouse mr-2 text-primary"></i> Warehousing Solutions</li>
                    </ul>
                    <ul class="space-y-2">
                        <li class="flex items-center"><i class="fas fa-shield-alt mr-2 text-primary"></i> Insurance Coverage</li>
                        <li class="flex items-center"><i class="fas fa-map-marked-alt mr-2 text-primary"></i> GPS Tracking</li>
                        <li class="flex items-center"><i class="fas fa-headset mr-2 text-primary"></i> 24/7 Support</li>
                    </ul>
                </div>
            </div>
            
            <div class="text-center">
                <p class="text-gray-600 mb-4">
                    <strong>Established in 2014,</strong> KARM LOGISTICS has been serving businesses across India 
                    with dedication and commitment to excellence in logistics and transportation.
                </p>
                <div class="flex justify-center space-x-4">
                    <button onclick="closeModal(); document.querySelector('#contact').scrollIntoView({behavior: 'smooth'})" class="bg-primary hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">
                        Contact Us
                    </button>
                    <button onclick="openQuoteModal()" class="border border-primary text-primary hover:bg-primary hover:text-white px-6 py-2 rounded-lg transition">
                        Get Quote
                    </button>
                </div>
            </div>
        </div>
    `
};

// Quote Modal Data
const quoteData = {
    title: 'Get Free Quote',
    content: `
        <div class="space-y-6">
            <div class="text-center mb-6">
                <div class="text-5xl text-secondary mb-4">
                    <i class="fas fa-calculator"></i>
                </div>
                <h3 class="text-2xl font-semibold text-gray-800">Request Your Free Quote</h3>
                <p class="text-gray-600">Get instant pricing for your transportation needs</p>
            </div>
            
            <form id="quote-form" class="space-y-4">
                <div class="grid md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                        <input type="text" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary" placeholder="Enter your name">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                        <input type="tel" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary" placeholder="Enter phone number">
                    </div>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input type="email" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary" placeholder="Enter email address">
                </div>
                
                <div class="grid md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Pick-up Location *</label>
                        <input type="text" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary" placeholder="From city">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Delivery Location *</label>
                        <input type="text" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary" placeholder="To city">
                    </div>
                </div>
                
                <div class="grid md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Service Type *</label>
                        <select required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary">
                            <option value="">Select service</option>
                            <option value="full-truck-load">Full Truck Load (FTL)</option>
                            <option value="part-load">Part Load (LTL)</option>
                            <option value="mini-truck">Mini Truck</option>
                            <option value="open-body">Open Body Truck</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Approximate Weight</label>
                        <input type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary" placeholder="e.g., 5 tons">
                    </div>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Cargo Description</label>
                    <textarea rows="3" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary" placeholder="Describe your cargo (optional)"></textarea>
                </div>
                
                <div class="grid md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Preferred Pick-up Date</label>
                        <input type="date" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Urgency</label>
                        <select class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary">
                            <option value="normal">Normal</option>
                            <option value="urgent">Urgent</option>
                            <option value="emergency">Emergency</option>
                        </select>
                    </div>
                </div>
                
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-gray-800 mb-2">What happens next?</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                        <li>✓ We'll review your requirements within 1 hour</li>
                        <li>✓ Our team will call you with a competitive quote</li>
                        <li>✓ Once approved, we'll arrange pickup at your convenience</li>
                        <li>✓ Track your shipment in real-time</li>
                    </ul>
                </div>
                
                <div class="flex space-x-4">
                    <button type="submit" class="bg-secondary hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition flex-1">
                        <i class="fas fa-paper-plane mr-2"></i>
                        Get My Quote
                    </button>
                    <button type="button" onclick="closeModal()" class="border border-gray-300 text-gray-600 hover:bg-gray-50 px-6 py-3 rounded-lg transition">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    `
};

function openServiceModal(serviceId) {
    console.log('Opening modal for service:', serviceId);
    const modal = document.getElementById('modal-backdrop');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    
    console.log('Modal elements found:', {modal: !!modal, title: !!title, body: !!body});
    
    if (serviceData[serviceId]) {
        console.log('Service data found for:', serviceId);
        title.textContent = serviceData[serviceId].title;
        body.innerHTML = serviceData[serviceId].content;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
    } else {
        console.error('Service data not found for:', serviceId);
        console.log('Available services:', Object.keys(serviceData));
    }
}

function openAboutModal() {
    const modal = document.getElementById('modal-backdrop');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    
    title.textContent = aboutData.title;
    body.innerHTML = aboutData.content;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function openQuoteModal() {
    const modal = document.getElementById('modal-backdrop');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    
    title.textContent = quoteData.title;
    body.innerHTML = quoteData.content;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Add form submission handler
    setTimeout(() => {
        const form = document.getElementById('quote-form');
        if (form) {
            form.addEventListener('submit', handleQuoteSubmission);
        }
    }, 100);
}

function handleQuoteSubmission(e) {
    e.preventDefault();
    
    // Show success message
    alert('Thank you for your quote request! Our team will contact you within 1 hour with a competitive quote.');
    
    // Close modal and reset form
    closeModal();
    e.target.reset();
}

function closeModal() {
    const modal = document.getElementById('modal-backdrop');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside or on close button
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal-backdrop');
    const closeBtn = document.getElementById('modal-close');
    
    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Click outside modal to close
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});

// Gallery and Lightbox functionality
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const closeLightbox = document.getElementById('close-lightbox');
    const prevButton = document.getElementById('prev-image');
    const nextButton = document.getElementById('next-image');
    
    if (!lightboxModal) return; // Exit if gallery elements don't exist
    
    let currentImageIndex = 0;
    const galleryImages = Array.from(galleryItems).map(item => ({
        src: item.dataset.image,
        title: item.dataset.title
    }));
    
    // Open lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = index;
            showLightbox();
        });
    });
    
    function showLightbox() {
        const currentImage = galleryImages[currentImageIndex];
        lightboxImage.src = currentImage.src;
        lightboxTitle.textContent = currentImage.title;
        lightboxModal.classList.remove('hidden');
        lightboxModal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }
    
    function hideLightbox() {
        lightboxModal.classList.add('closing');
        setTimeout(() => {
            lightboxModal.classList.remove('flex', 'closing');
            lightboxModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 300);
    }
    
    // Close lightbox
    if (closeLightbox) {
        closeLightbox.addEventListener('click', hideLightbox);
    }
    
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            hideLightbox();
        }
    });
    
    // Navigation
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
            showLightbox();
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
            showLightbox();
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightboxModal.classList.contains('hidden')) {
            if (e.key === 'Escape') {
                hideLightbox();
            } else if (e.key === 'ArrowLeft' && prevButton) {
                prevButton.click();
            } else if (e.key === 'ArrowRight' && nextButton) {
                nextButton.click();
            }
        }
    });
    
    // Animate gallery items on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `imageLoad 0.6s ease-out ${Math.random() * 0.5}s forwards`;
                galleryObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    galleryItems.forEach(item => {
        galleryObserver.observe(item);
    });
    
    // Load more functionality
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            // Smooth scroll to top of gallery
            const gallerySection = document.getElementById('work-gallery');
            if (gallerySection) {
                gallerySection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Add click tracking for navigation analytics
    document.querySelectorAll('a[href="#work-gallery"]').forEach(link => {
        link.addEventListener('click', () => {
            // Optional: Add analytics tracking here
            console.log('Work Gallery navigation clicked');
        });
    });
}