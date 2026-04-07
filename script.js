/* ============================================================
   SCRIPT — Abdul Wahab Portfolio
   Aurora Borealis Animation | Theme Toggle | Scroll Effects
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // =============================
    // AURORA BOREALIS Background
    // =============================
    const canvas = document.getElementById('aurora-canvas');
    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function getAuroraColors() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
            return [
                { r: 240, g: 184, b: 255, a: 0.04 },   // Vaporwave pink
                { r: 253, g: 160, b: 53, a: 0.03 },    // Orange
                { r: 100, g: 80, b: 200, a: 0.05 },    // Deep purple
                { r: 60, g: 180, b: 255, a: 0.025 },   // Cyan
                { r: 180, g: 60, b: 200, a: 0.035 },   // Magenta
            ];
        }
        return [
            { r: 253, g: 160, b: 53, a: 0.06 },     // Orange
            { r: 240, g: 184, b: 255, a: 0.06 },    // Lavender
            { r: 120, g: 200, b: 255, a: 0.04 },    // Sky blue
            { r: 180, g: 255, b: 220, a: 0.03 },    // Mint
            { r: 255, g: 220, b: 180, a: 0.04 },    // Peach
        ];
    }

    function drawAurora() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const colors = getAuroraColors();
        time += 0.003;

        for (let i = 0; i < colors.length; i++) {
            const c = colors[i];
            const layers = 3;

            for (let l = 0; l < layers; l++) {
                ctx.beginPath();

                const yBase = canvas.height * (0.15 + i * 0.18);
                const amplitude = 80 + i * 30 + l * 20;
                const frequency = 0.001 + i * 0.0003;
                const phase = time * (0.5 + i * 0.2) + l * 0.8;

                ctx.moveTo(0, yBase);

                for (let x = 0; x <= canvas.width; x += 4) {
                    const y = yBase +
                        Math.sin(x * frequency + phase) * amplitude +
                        Math.sin(x * frequency * 2.3 + phase * 1.5) * (amplitude * 0.4) +
                        Math.cos(x * frequency * 0.7 + phase * 0.8) * (amplitude * 0.3);
                    ctx.lineTo(x, y);
                }

                ctx.lineTo(canvas.width, canvas.height);
                ctx.lineTo(0, canvas.height);
                ctx.closePath();

                const gradient = ctx.createLinearGradient(0, yBase - amplitude, 0, yBase + amplitude * 2);
                gradient.addColorStop(0, `rgba(${c.r}, ${c.g}, ${c.b}, 0)`);
                gradient.addColorStop(0.3, `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a * (1 - l * 0.25)})`);
                gradient.addColorStop(0.6, `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a * 0.7 * (1 - l * 0.25)})`);
                gradient.addColorStop(1, `rgba(${c.r}, ${c.g}, ${c.b}, 0)`);

                ctx.fillStyle = gradient;
                ctx.fill();
            }
        }

        // Floating particles
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const particleCount = 25;
        for (let i = 0; i < particleCount; i++) {
            const px = (Math.sin(time * 0.5 + i * 2.39) * 0.5 + 0.5) * canvas.width;
            const py = (Math.cos(time * 0.3 + i * 1.73) * 0.5 + 0.5) * canvas.height;
            const radius = 1.5 + Math.sin(time + i) * 1;
            const alpha = isDark ? 0.15 + Math.sin(time * 2 + i) * 0.08 : 0.08 + Math.sin(time * 2 + i) * 0.04;

            ctx.beginPath();
            ctx.arc(px, py, radius, 0, Math.PI * 2);
            if (isDark) {
                ctx.fillStyle = `rgba(240, 184, 255, ${alpha})`;
            } else {
                ctx.fillStyle = `rgba(253, 160, 53, ${alpha})`;
            }
            ctx.fill();
        }

        animationId = requestAnimationFrame(drawAurora);
    }

    drawAurora();

    // =============================
    // THEME TOGGLE
    // =============================
    const themeToggle = document.getElementById('theme-toggle');
    const themeLabel = themeToggle.querySelector('.theme-label');

    // Load saved theme
    const savedTheme = localStorage.getItem('aw-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeLabel(savedTheme);

    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('aw-theme', next);
        updateThemeLabel(next);
        lucide.createIcons();
    });

    function updateThemeLabel(theme) {
        themeLabel.textContent = theme === 'light' ? 'Dark' : 'Light';
    }

    // =============================
    // NAVBAR SCROLL EFFECT
    // =============================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = scrollY;
    });

    // =============================
    // HAMBURGER MENU
    // =============================
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // =============================
    // SCROLL REVEAL ANIMATIONS
    // =============================
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-in').forEach((el) => {
        observer.observe(el);
    });

    // =============================
    // ACTIVE NAV LINK TRACKING
    // =============================
    const sections = document.querySelectorAll('.section[id]');
    const navLinks = document.querySelectorAll('.nav-link[data-section]');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0,
    });

    sections.forEach(section => sectionObserver.observe(section));

    // =============================
    // LANGUAGE BANDS (0-9)
    // =============================
    const langContainers = document.querySelectorAll('.lang-bands');
    langContainers.forEach(container => {
        const score = parseInt(container.getAttribute('data-score'), 10) || 0;
        for (let i = 1; i <= 9; i++) {
            const band = document.createElement('div');
            band.className = 'lang-band';
            if (i <= score) {
                band.classList.add('active');
            }
            container.appendChild(band);
        }
    });

    const langObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const bands = entry.target.querySelectorAll('.lang-band.active');
                bands.forEach((band, idx) => {
                    band.style.opacity = '0';
                    band.style.transform = 'scale(0.5)';
                    setTimeout(() => {
                        band.style.transition = 'all 0.3s ease';
                        band.style.opacity = '1';
                        band.style.transform = 'scale(1)';
                    }, idx * 100);
                });
                langObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    langContainers.forEach(container => langObserver.observe(container));

    // =============================
    // SMOOTH SCROLL for NAV LINKS
    // =============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // =============================
    // STAGGER ANIMATION FOR GRIDS
    // =============================
    const staggerContainers = document.querySelectorAll('.projects-grid, .skills-grid, .cert-grid, .profiles-grid');
    
    staggerContainers.forEach(container => {
        const staggerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        child.style.opacity = '0';
                        child.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            child.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                    staggerObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        staggerObserver.observe(container);
    });

    // =============================
    // PROJECT DEEP-DIVE MODAL & GALLERY
    // =============================
    const projectData = {
        'flush-driven': {
            title: 'Universal Flush-Driven Aerosol Air Freshener Mechanism',
            images: [
                'assets/images/projects/project_1/complete assembly.JPG',
                'assets/images/projects/project_1/bill_of_material_manual_mechanism.JPG',
                'assets/images/projects/project_1/rod_b-imageonline.co-merged.jpg',
                'assets/images/projects/project_1/spring.JPG'
            ],
            tags: ['Mechanical Design', 'Automation', 'Sustainable'],
            problem: 'In most residential and public washrooms, air fresheners are either manually operated or rely on electronic systems. Manual spraying depends on user effort and is often neglected. Electronic air fresheners increase cost, require regular battery replacement, and may fail due to moisture exposure.',
            solution: 'The proposed flush-driven aerosol air freshener eliminates these issues by using a fully mechanical mechanism integrated with the toilet flush system. When the flush lever is activated, motion is transmitted through a flexible shaft to a set of rods and a spring-loaded actuator that presses the aerosol button.',
            howTitle: '⚙️ How It Works',
            how: [
                'Transfers flush lever motion using a flexible shaft',
                'Converts motion through a rod-based mechanical linkage',
                'Presses the aerosol can nozzle using a spring-loaded rod',
                'Automatically resets after each flush cycle'
            ],
            benefits: [
                'Hands-free and automatic air freshening',
                'Operates without electricity or batteries',
                'Low maintenance and durable mechanical design',
                'Cost-effective compared to electronic dispensers',
                'Compatible with universal English-type commode flush systems',
                'Works with universally available aerosol cans'
            ]
        },
        'mixture-machine': {
            title: 'Modular Mixture Machine',
            images: [
                'assets/images/projects/project_2/1.jpeg',
                'assets/images/projects/project_2/2.jpeg',
                'assets/images/projects/project_2/3.jpeg',
                'assets/images/projects/project_2/4.jpeg'
            ],
            tags: ['Product Design', 'Consumer Goods', 'USB-C'],
            problem: 'Traditional blenders are countertop-bound, difficult to clean, and over-engineered for single-serve use. Fixed blade assemblies trap food residue, while cord dependency limits use to kitchen environments.',
            solution: 'A cordless, modular personal mixer engineered in SolidWorks with a 5-piece quick-assembly architecture. The design vertically integrates a stabilized conical drive base, borosilicate glass vessel, and dual-lid system—enabling blending, filtering, and portable consumption from a single compact unit.',
            howTitle: '⚙️ Technical Details',
            how: [
                'Drive: Conical ABS housing, 18V DC motor @ 15,000–20,000 RPM',
                'Vessel: 300–400ml borosilicate glass with dual-thread interface',
                'Cutting: 4-fin 304 stainless steel impeller',
                'Safety: Double-click capacitive start, Hall-effect sensor',
                'Power: 2000mAh lithium-ion, USB-C charging'
            ],
            benefits: [
                'Space Efficiency: 40% smaller footprint; stores in standard cup holders',
                'Hygienic Serviceability: Tool-free disassembly for complete sanitization',
                'Portability: USB-C rechargeable — kitchen, office, or travel',
                'Dual-Function: Integrated strainer lid + drinking lid converts to travel bottle'
            ]
        },
        'cli-toothbrush': {
            title: 'CLI Sonic Toothbrush',
            images: [
                'assets/images/projects/project_3/1.PNG',
                'assets/images/projects/project_3/2.PNG',
                'assets/images/projects/project_3/3.PNG',
                'assets/images/projects/project_3/4.PNG'
            ],
            tags: ['Sonic Tech', 'UV-C Sanitization', 'Travel'],
            problem: 'Manual brushes accumulate bacterial biomass in damp environments and generate non-recyclable polymer waste. Conventional electric systems lack integrated sanitization, while bulky charging bases prevent field deployment.',
            solution: 'The CLI system combines sonic drive technology with UV-C sanitization in a sliding-interlock travel case. Modular architecture features recyclable brush heads with snap-fit interfaces, housed within slimline polypropylene shells that charge via USB-C induction dock.',
            howTitle: '⚙️ Technical Details',
            how: [
                'UV Sterilization: Auto-triggered 2-minute cycle, mercury-free LED',
                'Modular Interface: Tool-free head replacement with SS pins',
                'Power: 800mAh Li-Po, USB-C PD charging, 30-day standby'
            ],
            benefits: [
                'Sanitization: UV-C LED (265nm) — 99.88% bacterial elimination',
                'Sustainability: Replaceable heads reduce polymer waste',
                'Portability: ≈18mm thickness with dual-rail sliding mechanism',
                'Protection: Enclosed case keeps brush clean'
            ]
        },
        'mini-projects': {
            title: 'Mechanical Engineering Mini Projects',
            images: [
                'assets/images/projects/project_4/1.PNG',
                'assets/images/projects/project_4/2.PNG',
                'assets/images/projects/project_4/3.PNG',
                'assets/images/projects/project_4/4.PNG',
                'assets/images/projects/project_4/5.PNG',
                'assets/images/projects/project_4/6.PNG'
            ],
            tags: ['CAD Proficiency', 'Industrial', 'Conceptual'],
            problem: 'Mechanical design portfolios require demonstration of versatile CAD proficiency across industrial, consumer, and conceptual domains—spanning fluid power systems, thermal management, and complex geometric forms.',
            solution: 'Curated collection of seven parametric SolidWorks projects: industrial shell-and-tube heat exchanger, centrifugal pump, solar thermal parabolic trough, bottle cap, smartphone casing, sculptural table, and mathematical Mobius ring.',
            howTitle: '⚙️ Functions Developed',
            how: [
                'Fluid power generation (pump)',
                'Thermal energy transfer (exchanger)',
                'Solar radiation concentration (trough)',
                'Containment sealing (cap)',
                'Device protection (casing)',
                'Structural support (table)',
                'Kinetic mathematical demonstration (Mobius ring)'
            ],
            benefits: [
                'Versatility: Part modeling, assemblies, and structural design',
                'Manufacturing Focus: Injection molding, machining, and fabrication',
                'Technical Range: Industrial equipment to consumer goods',
                'Parametric Proficiency: Fully constrained sketches, design tables'
            ]
        }
    };

    const modal = document.getElementById('project-modal');
    const modalGallery = document.getElementById('modal-gallery');
    const modalTitle = document.getElementById('modal-title');
    const modalTags = document.getElementById('modal-tags');
    const modalProblem = document.getElementById('modal-problem');
    const modalSolution = document.getElementById('modal-solution');
    const modalHowSection = document.getElementById('modal-how-section');
    const modalHowTitle = modalHowSection.querySelector('h3');
    const modalHow = document.getElementById('modal-how');
    const modalBenefits = document.getElementById('modal-benefits');
    const modalClose = document.getElementById('modal-close');

    // Lightbox Elements
    const lightbox = document.getElementById('lightbox-overlay');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    function openModal(projectId) {
        const data = projectData[projectId];
        if (!data) return;

        modalTitle.textContent = data.title;
        
        // Populate Gallery
        modalGallery.innerHTML = '';
        data.images.forEach(imgSrc => {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = data.title;
            img.className = 'modal-gallery-img';
            img.addEventListener('click', () => openLightbox(imgSrc));
            modalGallery.appendChild(img);
        });

        // Populate Tags
        modalTags.innerHTML = '';
        data.tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'skill-tag';
            span.textContent = tag;
            modalTags.appendChild(span);
        });

        modalProblem.textContent = data.problem;
        modalSolution.textContent = data.solution;
        
        // How It Works / Technical Details
        modalHowTitle.innerHTML = `<i data-lucide="${projectId === 'flush-driven' ? 'settings' : 'cpu'}"></i> ${data.howTitle}`;
        modalHow.innerHTML = '';
        data.how.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            modalHow.appendChild(li);
        });

        // Benefits
        modalBenefits.innerHTML = '';
        data.benefits.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            modalBenefits.appendChild(li);
        });

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => modalGallery.scrollTo(0, 0), 10);
        lucide.createIcons();
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function openLightbox(src) {
        lightboxImg.src = src;
        lightbox.classList.add('active');
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
    }

    // Event Listeners for Output Actions
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-go-deep')) {
            const projectId = e.target.getAttribute('data-project');
            openModal(projectId);
        }
    });

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (lightbox.classList.contains('active')) closeLightbox();
            else if (modal.classList.contains('active')) closeModal();
        }
    });

    // =============================
    // TYPING EFFECT FOR HERO NAME (Subtle)
    // =============================
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        const text = heroName.textContent;
        heroName.textContent = '';
        heroName.style.opacity = '1';
        let charIndex = 0;

        const typeInterval = setInterval(() => {
            heroName.textContent += text[charIndex];
            charIndex++;
            if (charIndex >= text.length) {
                clearInterval(typeInterval);
            }
        }, 60);
    }
});

