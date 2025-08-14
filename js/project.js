// Project data - You can expand this array with more projects
const projectsData = [
    {
        id: 1,
        title: "E-Commerce Flutter App",
        category: "mobile",
        description: "A comprehensive e-commerce mobile application featuring user authentication, product browsing, shopping cart functionality, secure payment integration, and order tracking. Built with modern Flutter architecture and state management.",
        image: "🛍️",
        status: "completed",
        difficulty: "Advanced",
        date: "2024-01-15",
        metrics: { screens: "15+", code: "5k+", components: "30+" },
        tech: ["Flutter", "Dart", "Firebase", "Provider", "REST API", "Stripe"],
        demoUrl: "#",
        codeUrl: "#"
    },
    {
        id: 2,
        title: "React Admin Dashboard",
        category: "web",
        description: "Modern admin dashboard with real-time data visualization, user management, analytics, and reporting features. Built with React and modern web technologies for optimal performance and user experience.",
        image: "📊",
        status: "completed",
        difficulty: "Intermediate",
        date: "2024-02-20",
        metrics: { components: "20+", charts: "8", responsive: "100%" },
        tech: ["React", "TypeScript", "Material-UI", "Chart.js", "Redux", "Node.js"],
        demoUrl: "#",
        codeUrl: "#"
    },
    {
        id: 3,
        title: "Task Management App",
        category: "mobile",
        description: "Collaborative task management application with offline synchronization, team collaboration features, deadline tracking, and intuitive user interface. Supporting both individual and team productivity workflows.",
        image: "✅",
        status: "ongoing",
        difficulty: "Advanced",
        date: "2024-03-10",
        metrics: { screens: "12", progress: "85%", features: "25" },
        tech: ["Flutter", "Dart", "SQLite", "BLoC", "Hive", "Push Notifications"],
        demoUrl: "#",
        codeUrl: "#"
    },
    {
        id: 4,
        title: "Personal Portfolio Website",
        category: "web",
        description: "Modern, responsive portfolio website showcasing projects, skills, and professional experience. Features smooth animations, interactive elements, and optimized performance across all devices.",
        image: "🌟",
        status: "completed",
        difficulty: "Beginner",
        date: "2024-01-05",
        metrics: { pagespeed: "95+", sections: "5", mobile: "100%" },
        tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Animations"],
        demoUrl: "developer_portfolio.html",
        codeUrl: "#"
    },
    {
        id: 5,
        title: "Food Delivery App Design",
        category: "ui-ux",
        description: "Complete UI/UX design for a food delivery application featuring modern design principles, intuitive navigation, and engaging user interactions. Includes wireframes, prototypes, and design system.",
        image: "🍕",
        status: "completed",
        difficulty: "Intermediate",
        date: "2023-12-15",
        metrics: { screens: "25", components: "50+", flows: "3" },
        tech: ["Figma", "Adobe XD", "Prototyping", "User Research", "Design System"],
        demoUrl: "#",
        codeUrl: "#"
    },
    {
        id: 6,
        title: "Weather Forecast App",
        category: "mobile",
        description: "Beautiful weather application with detailed forecasts, interactive maps, weather alerts, and location-based services. Features elegant animations and comprehensive weather data visualization.",
        image: "🌤️",
        status: "upcoming",
        difficulty: "Intermediate",
        date: "2024-06-01",
        metrics: { screens: "10", progress: "0%", features: "15" },
        tech: ["Flutter", "Weather API", "Maps", "Animations", "Location Services"],
        demoUrl: "#",
        codeUrl: "#"
    },
    {
        id: 7,
        title: "REST API Server",
        category: "backend",
        description: "Scalable REST API server with authentication, database integration, caching, and comprehensive documentation. Built with Node.js and Express, featuring modern development practices.",
        image: "🔧",
        status: "completed",
        difficulty: "Advanced",
        date: "2024-02-28",
        metrics: { endpoints: "25+", tests: "90%", uptime: "99.9%" },
        tech: ["Node.js", "Express", "MongoDB", "JWT", "Redis", "Docker"],
        demoUrl: "#",
        codeUrl: "#"
    },
    {
        id: 8,
        title: "Chat Application",
        category: "web",
        description: "Real-time chat application with multiple rooms, file sharing, emoji support, and modern UI. Features WebSocket communication and responsive design for all devices.",
        image: "💬",
        status: "ongoing",
        difficulty: "Intermediate",
        date: "2024-04-15",
        metrics: { rooms: "∞", messages: "Real-time", users: "Multi" },
        tech: ["React", "Socket.io", "Node.js", "MongoDB", "WebRTC"],
        demoUrl: "#",
        codeUrl: "#"
    }
];

// State management
let currentProjects = [...projectsData];
let displayedProjects = [];
let currentFilter = 'all';
let currentSort = 'newest';
let currentView = 'grid';
let projectsPerPage = 6;
let currentPage = 1;

// DOM elements
const projectsContainer = document.getElementById('projectsContainer');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const emptyState = document.getElementById('emptyState');
const filterButtons = document.querySelectorAll('.filter-btn');
const viewButtons = document.querySelectorAll('.view-btn');
const totalProjectsCounter = document.getElementById('totalProjects');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    updateProjectCount();
    filterAndSortProjects();
    setupEventListeners();
    animateProjectCards();
});

// Event listeners setup
function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', debounce(handleSearch, 300));
    
    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', handleFilter);
    });
    
    // Sort dropdown
    sortSelect.addEventListener('change', handleSort);
    
    // View toggle
    viewButtons.forEach(btn => {
        btn.addEventListener('click', handleViewToggle);
    });
    
    // Load more button
    loadMoreBtn.addEventListener('click', loadMoreProjects);
}

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle search functionality
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        currentProjects = [...projectsData];
    } else {
        currentProjects = projectsData.filter(project => 
            project.title.toLowerCase().includes(searchTerm) ||
            project.description.toLowerCase().includes(searchTerm) ||
            project.tech.some(tech => tech.toLowerCase().includes(searchTerm)) ||
            project.category.toLowerCase().includes(searchTerm)
        );
    }
    
    currentPage = 1;
    filterAndSortProjects();
}

// Handle filter functionality
function handleFilter(e) {
    // Update active filter button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    currentFilter = e.target.dataset.filter;
    currentPage = 1;
    
    // Apply filter
    if (currentFilter === 'all') {
        currentProjects = [...projectsData];
    } else {
        currentProjects = projectsData.filter(project => 
            project.category === currentFilter
        );
    }
    
    // Apply search if active
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm !== '') {
        currentProjects = currentProjects.filter(project => 
            project.title.toLowerCase().includes(searchTerm) ||
            project.description.toLowerCase().includes(searchTerm) ||
            project.tech.some(tech => tech.toLowerCase().includes(searchTerm))
        );
    }
    
    filterAndSortProjects();
}

// Handle sort functionality
function handleSort(e) {
    currentSort = e.target.value;
    filterAndSortProjects();
}

// Handle view toggle
function handleViewToggle(e) {
    viewButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    currentView = e.target.dataset.view;
    projectsContainer.className = currentView === 'masonry' ? 'masonry-layout' : 'projects-container';
    
    renderProjects();
}

// Filter and sort projects
function filterAndSortProjects() {
    // Sort projects
    currentProjects.sort((a, b) => {
        switch (currentSort) {
            case 'newest':
                return new Date(b.date) - new Date(a.date);
            case 'oldest':
                return new Date(a.date) - new Date(b.date);
            case 'name':
                return a.title.localeCompare(b.title);
            case 'category':
                return a.category.localeCompare(b.category);
            case 'status':
                const statusOrder = { completed: 0, ongoing: 1, upcoming: 2 };
                return statusOrder[a.status] - statusOrder[b.status];
            default:
                return 0;
        }
    });
    
    renderProjects();
}

// Render projects
function renderProjects() {
    const projectsToShow = currentProjects.slice(0, currentPage * projectsPerPage);
    displayedProjects = projectsToShow;
    
    if (projectsToShow.length === 0) {
        projectsContainer.innerHTML = '';
        emptyState.style.display = 'block';
        loadMoreBtn.style.display = 'none';
        return;
    }
    
    emptyState.style.display = 'none';
    loadMoreBtn.style.display = projectsToShow.length < currentProjects.length ? 'block' : 'none';
    
    projectsContainer.innerHTML = projectsToShow.map(project => createProjectCard(project)).join('');
    animateProjectCards();
}

// Create project card HTML
function createProjectCard(project) {
    const statusClass = `status-${project.status}`;
    const difficultyColor = getDifficultyColor(project.difficulty);
    
    return `
        <div class="project-card" data-category="${project.category}" style="animation-delay: ${Math.random() * 0.5}s">
            <div class="project-image">
                <div class="project-status ${statusClass}">${capitalizeFirst(project.status)}</div>
                <div class="difficulty-badge" style="background: ${difficultyColor}">${project.difficulty}</div>
                <span>${project.image}</span>
            </div>
            <div class="project-content">
                <div class="project-header">
                    <div>
                        <h3 class="project-title">${project.title}</h3>
                        <div class="project-category">${getCategoryName(project.category)}</div>
                    </div>
                </div>
                <p class="project-description">${project.description}</p>
                
                <div class="project-metrics">
                    ${Object.entries(project.metrics).map(([key, value]) => `
                        <div class="metric">
                            <span class="metric-value">${value}</span>
                            <span class="metric-label">${capitalizeFirst(key)}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="project-tech-stack">
                    ${project.tech.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                </div>
                
                <div class="project-actions">
                    <a href="${project.demoUrl}" class="action-btn btn-primary" target="_blank">
                        <i class="fas fa-external-link-alt"></i> Live Demo
                    </a>
                    <a href="${project.codeUrl}" class="action-btn btn-secondary" target="_blank">
                        <i class="fab fa-github"></i> Code
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Load more projects
function loadMoreProjects() {
    const spinner = loadMoreBtn.querySelector('.loading-spinner');
    const btnText = loadMoreBtn.childNodes[2];
    
    // Show loading state
    spinner.style.display = 'inline-block';
    btnText.textContent = 'Loading...';
    loadMoreBtn.disabled = true;
    
    // Simulate loading delay
    setTimeout(() => {
        currentPage++;
        renderProjects();
        
        // Reset button state
        spinner.style.display = 'none';
        btnText.textContent = 'Load More Projects';
        loadMoreBtn.disabled = false;
    }, 1000);
}

// Animate project cards
function animateProjectCards() {
    const cards = document.querySelectorAll('.project-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        observer.observe(card);
    });
}

// Update project count
function updateProjectCount() {
    totalProjectsCounter.textContent = `${projectsData.length}+`;
}

// Utility functions
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getCategoryName(category) {
    const categoryNames = {
        'mobile': 'Mobile Development',
        'web': 'Web Development',
        'ui-ux': 'UI/UX Design',
        'backend': 'Backend Development'
    };
    return categoryNames[category] || category;
}

function getDifficultyColor(difficulty) {
    const colors = {
        'Beginner': 'rgba(6, 214, 160, 0.8)',
        'Intermediate': 'rgba(255, 165, 0, 0.8)',
        'Advanced': 'rgba(220, 53, 69, 0.8)'
    };
    return colors[difficulty] || 'rgba(139, 92, 246, 0.8)';
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Add scroll effect to navigation
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(15, 23, 42, 0.98)';
    } else {
        nav.style.background = 'rgba(15, 23, 42, 0.95)';
    }
});

// Add hover effects to project cards
document.addEventListener('mouseover', (e) => {
    if (e.target.closest('.project-card')) {
        const card = e.target.closest('.project-card');
        card.style.zIndex = '10';
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.closest('.project-card')) {
        const card = e.target.closest('.project-card');
        card.style.zIndex = '1';
    }
});

// Handle window resize for responsive behavior
window.addEventListener('resize', debounce(() => {
    if (window.innerWidth <= 768) {
        projectsPerPage = 4;
    } else if (window.innerWidth <= 1200) {
        projectsPerPage = 6;
    } else {
        projectsPerPage = 8;
    }
    
    // Re-render if needed
    if (displayedProjects.length > projectsPerPage) {
        currentPage = Math.ceil(displayedProjects.length / projectsPerPage);
        renderProjects();
    }
}, 300));

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key to clear search
    if (e.key === 'Escape' && searchInput.value) {
        searchInput.value = '';
        handleSearch({ target: { value: '' } });
        searchInput.blur();
    }
    
    // Enter key on focused filter button
    if (e.key === 'Enter' && e.target.classList.contains('filter-btn')) {
        e.target.click();
    }
});

// Add touch support for mobile devices
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchStartY - touchEndY;
    
    // Swipe up to load more (if at bottom of page)
    if (swipeDistance > swipeThreshold && 
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
        loadMoreBtn.style.display !== 'none') {
        loadMoreProjects();
    }
}

// Performance optimization: Lazy load project images
function setupLazyLoading() {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const projectImage = entry.target;
                // Add any image loading logic here if needed
                imageObserver.unobserve(projectImage);
            }
        });
    });

    document.querySelectorAll('.project-image').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add error handling for demo/code links
document.addEventListener('click', (e) => {
    if (e.target.closest('.action-btn')) {
        const link = e.target.closest('.action-btn');
        if (link.href === '#' || link.href.endsWith('#')) {
            e.preventDefault();
            showNotification('This demo is not available yet. Coming soon!');
        }
    }
});

// Simple notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: rgba(99, 102, 241, 0.9);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}