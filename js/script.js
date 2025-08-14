// Smooth scrolling for navigation links
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

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        function toggleMenu() {
            document.querySelector('.nav-links').classList.toggle('show');
        }

        // Reveal animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => {
            observer.observe(el);
        });

        // Form submission
        document.querySelector('.contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            button.textContent = 'Sending...';
            button.disabled = true;
            
            setTimeout(() => {
                button.textContent = 'Message Sent!';
                button.style.background = 'linear-gradient(135deg, #06d6a0, #059669)';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.background = '';
                    this.reset();
                }, 2000);
            }, 1500);
        });

        // Add cursor trail effect
        let mouseX = 0, mouseY = 0;
        let trail = [];

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function createTrail() {
            trail.push({x: mouseX, y: mouseY});
            if (trail.length > 10) trail.shift();
            
            trail.forEach((point, index) => {
                const div = document.createElement('div');
                div.style.position = 'fixed';
                div.style.left = point.x + 'px';
                div.style.top = point.y + 'px';
                div.style.width = '4px';
                div.style.height = '4px';
                div.style.background = `rgba(99, 102, 241, ${0.8 - index * 0.08})`;
                div.style.borderRadius = '50%';
                div.style.pointerEvents = 'none';
                div.style.zIndex = '9999';
                div.style.transition = 'all 0.1s ease';
                
                document.body.appendChild(div);
                
                setTimeout(() => {
                    div.remove();
                }, 100);
            });
        }

        setInterval(createTrail, 50);