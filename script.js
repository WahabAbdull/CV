/* ============================================================
   SCRIPT — Abdul Wahab Portfolio
   "Scholarly Elegance" Interactions
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // =============================
    // ENGINEERING PRELOADER ANIMATION
    // =============================
    const preloader = document.getElementById('preloader');
    if (preloader) {
        const line = document.querySelector('.preloader-line');
        const nodeConsistency = document.querySelector('.node-consistency');
        const nodeHardworking = document.querySelector('.node-hardworking');
        const nodeSuccess = document.querySelector('.node-success');
        const statusText = document.getElementById('preloader-status');

        // Prevent scrolling while preloader is active
        document.body.style.overflow = 'hidden';

        // Animation sequence
        setTimeout(() => {
            // Stage 1: Move to Consistency
            line.style.width = '33.33%';
            statusText.textContent = 'Establishing Consistency...';
            
            setTimeout(() => {
                nodeConsistency.classList.add('active-gold');
                line.style.background = 'var(--clr-accent-1)';
                line.style.boxShadow = '0 0 10px var(--clr-accent-1)';
                
                setTimeout(() => {
                    // Stage 2: Move to Hard Working
                    line.style.width = '66.66%';
                    statusText.textContent = 'Applying Hard Work...';
                    
                    setTimeout(() => {
                        nodeHardworking.classList.add('active-diamond');
                        line.style.background = '#E0FFFF';
                        line.style.boxShadow = '0 0 15px #00FFFF';
                        
                        setTimeout(() => {
                            // Stage 3: Move to Success
                            line.style.width = '100%';
                            statusText.textContent = 'Achieving Success...';
                            
                            setTimeout(() => {
                                nodeSuccess.classList.add('active-success');
                                line.style.background = 'linear-gradient(90deg, var(--clr-accent-1), #00FFFF)';
                                line.style.boxShadow = '0 0 20px var(--clr-accent-1), 0 0 20px #00FFFF';
                                statusText.textContent = 'System Ready.';
                                
                                // Fade out preloader
                                setTimeout(() => {
                                    preloader.classList.add('hidden');
                                    document.body.style.overflow = ''; // Restore scrolling
                                    setTimeout(() => {
                                        preloader.remove(); // Remove from DOM after fade
                                    }, 800);
                                }, 1200); // Hold success state
                                
                            }, 500); // Time to reach node 3
                            
                        }, 700); // Hold Hard Working state
                        
                    }, 500); // Time to reach node 2
                    
                }, 700); // Hold Consistency state
                
            }, 500); // Time to reach node 1
            
        }, 500); // Initial delay
    }

    // =============================
    // READING PROGRESS BAR
    // =============================
    const progressBar = document.getElementById('reading-progress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / scrollTotal) * 100;
            progressBar.style.width = `${progress}%`;
        });
    }

    // =============================
    // AURORA BOREALIS Background (Subtle Academic Style)
    // =============================
    const canvas = document.getElementById('aurora-canvas');
    if (canvas) {
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
                    { r: 212, g: 168, b: 75, a: 0.02 },   // Academic Gold
                    { r: 107, g: 142, b: 181, a: 0.02 },  // Steel Blue
                    { r: 160, g: 140, b: 120, a: 0.015 }, // Warm Grey
                ];
            }
            return [
                { r: 200, g: 150, b: 62, a: 0.03 },    // Academic Gold
                { r: 91, g: 127, b: 164, a: 0.03 },    // Slate Blue
                { r: 160, g: 140, b: 120, a: 0.02 },   // Warm Grey
            ];
        }

        function drawAurora() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const colors = getAuroraColors();
            time += 0.002; // Slower, more elegant movement

            for (let i = 0; i < colors.length; i++) {
                const c = colors[i];
                const layers = 2; // Reduced layers for subtlety

                for (let l = 0; l < layers; l++) {
                    ctx.beginPath();

                    const yBase = canvas.height * (0.2 + i * 0.2);
                    const amplitude = 60 + i * 20 + l * 15;
                    const frequency = 0.0008 + i * 0.0002;
                    const phase = time * (0.3 + i * 0.1) + l * 0.5;

                    ctx.moveTo(0, yBase);

                    for (let x = 0; x <= canvas.width; x += 5) {
                        const y = yBase +
                            Math.sin(x * frequency + phase) * amplitude +
                            Math.sin(x * frequency * 2.0 + phase * 1.2) * (amplitude * 0.3) +
                            Math.cos(x * frequency * 0.5 + phase * 0.5) * (amplitude * 0.2);
                        ctx.lineTo(x, y);
                    }

                    ctx.lineTo(canvas.width, canvas.height);
                    ctx.lineTo(0, canvas.height);
                    ctx.closePath();

                    const gradient = ctx.createLinearGradient(0, yBase - amplitude, 0, yBase + amplitude * 2);
                    gradient.addColorStop(0, `rgba(${c.r}, ${c.g}, ${c.b}, 0)`);
                    gradient.addColorStop(0.3, `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a * (1 - l * 0.3)})`);
                    gradient.addColorStop(0.6, `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a * 0.5 * (1 - l * 0.3)})`);
                    gradient.addColorStop(1, `rgba(${c.r}, ${c.g}, ${c.b}, 0)`);

                    ctx.fillStyle = gradient;
                    ctx.fill();
                }
            }

            // Subtle floating particles
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const particleCount = 15; // Reduced count
            for (let i = 0; i < particleCount; i++) {
                const px = (Math.sin(time * 0.3 + i * 2.39) * 0.5 + 0.5) * canvas.width;
                const py = (Math.cos(time * 0.2 + i * 1.73) * 0.5 + 0.5) * canvas.height;
                const radius = 1 + Math.sin(time + i) * 0.8;
                const alpha = isDark ? 0.1 + Math.sin(time * 1.5 + i) * 0.05 : 0.05 + Math.sin(time * 1.5 + i) * 0.03;

                ctx.beginPath();
                ctx.arc(px, py, radius, 0, Math.PI * 2);
                if (isDark) {
                    ctx.fillStyle = `rgba(212, 168, 75, ${alpha})`;
                } else {
                    ctx.fillStyle = `rgba(200, 150, 62, ${alpha})`;
                }
                ctx.fill();
            }

            animationId = requestAnimationFrame(drawAurora);
        }

        drawAurora();
    }

    // =============================
    // IMPACT METRICS COUNTER
    // =============================
    const metrics = document.querySelectorAll('.metric-number');
    const metricsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'), 10);
                if (isNaN(target)) return;
                
                let count = 0;
                const duration = 1500; // ms
                const increment = target / (duration / 16); // 60fps approx
                
                const updateCounter = () => {
                    count += increment;
                    if (count < target) {
                        entry.target.innerText = Math.ceil(count) + '+';
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.innerText = target + '+';
                    }
                };
                updateCounter();
                metricsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    metrics.forEach(metric => metricsObserver.observe(metric));

    // =============================
    // THEME TOGGLE
    // =============================
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
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
    }

    // =============================
    // NAVBAR SCROLL EFFECT
    // =============================
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // =============================
    // HAMBURGER MENU
    // =============================
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburger && mobileMenu) {
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
    }

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
    const staggerContainers = document.querySelectorAll('.projects-grid, .skills-grid, .cert-grid, .profiles-grid, .methodology-pipeline');
    
    staggerContainers.forEach(container => {
        const staggerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        child.style.opacity = '0';
                        child.style.transform = 'translateY(15px)';
                        setTimeout(() => {
                            child.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
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
            title: 'Universal Flush-Driven Aerosol Mechanism',
            images: [
                'assets/images/projects/project_1/complete assembly.JPG',
                'assets/images/projects/project_1/bill_of_material_manual_mechanism.JPG',
                'assets/images/projects/project_1/rod_b-imageonline.co-merged.jpg',
                'assets/images/projects/project_1/spring.JPG'
            ],
            tags: ['Mechanical Design', 'Automation', 'Sustainable'],
            problem: 'In most residential and public washrooms, air fresheners are either manually operated or rely on electronic systems. Manual spraying depends on user effort and is often neglected. Electronic air fresheners increase cost, require regular battery replacement, and may fail due to moisture exposure.',
            solution: 'The proposed flush-driven aerosol air freshener eliminates these issues by using a fully mechanical mechanism integrated with the toilet flush system. When the flush lever is activated, motion is transmitted through a flexible shaft to a set of rods and a spring-loaded actuator that presses the aerosol button.',
            howTitle: 'Methodology Implementation',
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
            howTitle: 'Technical Specifications',
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
            howTitle: 'Technical Specifications',
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
            title: 'Industrial Systems Library',
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
            howTitle: 'Functions Developed',
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
        },
        'project-5': {
            title: 'Medical Device Development — Controlled Flow Mechanical System',
            images: [],
            tags: ['Medical Technology', 'Flow Control', 'ANSYS'],
            problemTitle: 'Industry',
            problemIcon: 'briefcase',
            problem: 'Medical Technology\n\nWorked on the mechanical development of a medical device involving controlled fluid/gas management and precision mechanical components.',
            solutionTitle: 'Key Contributions',
            solutionIcon: 'award',
            solution: [
                'Designed mechanical components for controlled flow and operational safety.',
                'Developed assemblies involving valves, filters, actuators, and flow-control components.',
                'Applied mechanical design principles related to pressure management, thermal considerations, and fluid behavior.',
                'Implemented DFM and DFA methodologies for manufacturing readiness.',
                'Performed simulation-based design validation.'
            ],
            howTitle: 'Challenges Managed',
            howIcon: 'alert-circle',
            how: [
                'Maintaining reliable mechanical operation under strict performance requirements.',
                'Improved design reliability through engineering analysis and simulation.'
            ],
            benefitsTitle: 'Tools Used',
            benefitsIcon: 'wrench',
            benefits: [
                'SolidWorks (CAD Modeling & Motion Analysis)',
                'ANSYS (Simulation & Validation)'
            ]
        },
        'project-6': {
            title: 'Fitness Product Development — Mechanical Dispensing System',
            images: [],
            tags: ['Fitness & Consumer Products', 'Kinematics', 'SolidWorks'],
            problemTitle: 'Industry',
            problemIcon: 'briefcase',
            problem: 'Fitness & Consumer Products\n\nDesigned and developed a compact mechanical dispensing mechanism requiring controlled operation through a user-actuated system.',
            solutionTitle: 'Key Contributions',
            solutionIcon: 'award',
            solution: [
                'Designed mechanical assemblies involving gears, rack mechanisms, springs, sliding mechanisms, and functional interfaces.',
                'Developed solutions for multi-function operation within limited mechanical movement constraints.',
                'Performed multiple design iterations to improve mechanism reliability and manufacturability.',
                'Applied DFM and DFA principles for production-oriented design.',
                'Conducted motion analysis and mechanical validation.'
            ],
            howTitle: 'Challenges Managed',
            howIcon: 'alert-circle',
            how: [
                'Optimizing complex mechanical interactions while maintaining compact design requirements.',
                'Achieved functional mechanism performance through iterative CAD refinement and simulation.'
            ],
            benefitsTitle: 'Tools Used',
            benefitsIcon: 'wrench',
            benefits: [
                'SolidWorks (3D Modeling, Assembly Design, Motion Analysis)',
                'Altair EDEM (Simulation)'
            ]
        },
        'project-7': {
            title: 'Medical Fluid Delivery System',
            images: [],
            tags: ['Medical Technology', 'DFM/DFA', 'Subsystem Integration'],
            problemTitle: 'Industry',
            problemIcon: 'briefcase',
            problem: 'Medical Technology\n\nCurrently involved in the development of an integrated medical delivery system combining mechanical, fluidic, and electronic subsystems.',
            solutionTitle: 'Key Contributions',
            solutionIcon: 'award',
            solution: [
                'Designed multi-component mechanical assemblies integrating structural, fluidic, and electronic elements.',
                'Developed interfaces between mechanical components and electronic subsystems.',
                'Applied DFM/DFA principles to improve manufacturability and assembly efficiency.',
                'Optimized product aesthetics, mechanical functionality, and tolerance requirements through iterative design.',
                'Supported integration of pumps, sensors, connectors, and fluid delivery components.'
            ],
            howTitle: 'Challenges Managed',
            howIcon: 'alert-circle',
            how: [
                'Balancing product aesthetics, mechanical performance, tolerance requirements, and subsystem integration.',
                'Improved product design through iterative CAD development and engineering evaluation.'
            ],
            benefitsTitle: 'Tools Used',
            benefitsIcon: 'wrench',
            benefits: [
                'SolidWorks (3D Modeling, Assembly Design, Motion Analysis)'
            ]
        }
    };

    const modal = document.getElementById('project-modal');
    if (modal) {
        const modalGallery = document.getElementById('modal-gallery');
        const modalTitle = document.getElementById('modal-title');
        const modalTags = document.getElementById('modal-tags');
        const modalProblemTitle = document.getElementById('modal-problem-title');
        const modalProblem = document.getElementById('modal-problem');
        const modalSolutionTitle = document.getElementById('modal-solution-title');
        const modalSolution = document.getElementById('modal-solution');
        const modalHowSection = document.getElementById('modal-how-section');
        const modalHowTitle = modalHowSection.querySelector('h3');
        const modalHow = document.getElementById('modal-how');
        const modalBenefitsTitle = document.getElementById('modal-benefits-title');
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
            if (data.images && data.images.length > 0) {
                modalGallery.style.display = 'flex';
                data.images.forEach(imgSrc => {
                    const img = document.createElement('img');
                    img.src = imgSrc;
                    img.alt = data.title;
                    img.className = 'modal-gallery-img';
                    img.addEventListener('click', () => openLightbox(imgSrc));
                    modalGallery.appendChild(img);
                });
            } else {
                modalGallery.style.display = 'none';
            }

            // Populate Tags
            modalTags.innerHTML = '';
            data.tags.forEach(tag => {
                const span = document.createElement('span');
                span.className = 'skill-tag';
                span.textContent = tag;
                modalTags.appendChild(span);
            });

            // Populate Titles and Icons
            const problemIcon = data.problemIcon || 'alert-triangle';
            modalProblemTitle.innerHTML = `<i data-lucide="${problemIcon}"></i> ${data.problemTitle || 'Problem Statement'}`;

            const solutionIcon = data.solutionIcon || 'lightbulb';
            modalSolutionTitle.innerHTML = `<i data-lucide="${solutionIcon}"></i> ${data.solutionTitle || 'Engineering Solution'}`;

            const howIcon = data.howIcon || (projectId === 'flush-driven' ? 'settings' : 'cpu');
            modalHowTitle.innerHTML = `<i data-lucide="${howIcon}"></i> ${data.howTitle || 'Technical Implementation'}`;

            const benefitsIcon = data.benefitsIcon || 'check-circle-2';
            modalBenefitsTitle.innerHTML = `<i data-lucide="${benefitsIcon}"></i> ${data.benefitsTitle || 'Measurable Benefits'}`;

            // Populate Content
            modalProblem.style.whiteSpace = 'pre-line';
            modalProblem.textContent = data.problem;

            if (Array.isArray(data.solution)) {
                modalSolution.innerHTML = `<ul style="list-style-type: disc; padding-left: 1.5rem; font-size: 0.95rem; line-height: 1.8;">${data.solution.map(item => `<li style="margin-bottom: 0.5rem;">${item}</li>`).join('')}</ul>`;
            } else {
                modalSolution.style.whiteSpace = 'pre-line';
                modalSolution.textContent = data.solution;
            }
            
            // How It Works / Technical Details / Challenges Managed
            modalHow.innerHTML = '';
            data.how.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                modalHow.appendChild(li);
            });

            // Benefits / Tools Used
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
    }

    // =============================
    // BEFORE / AFTER SLIDER
    // =============================
    const baSlider = document.querySelector('.ba-slider');
    if (baSlider) {
        const baOverlay = document.querySelector('.ba-overlay');
        const baHandle = document.querySelector('.ba-handle');
        const baWrapper = document.querySelector('.ba-wrapper');
        const baOverlayImage = baOverlay.querySelector('img');
        
        function updateBAslider() {
            if (!baWrapper || !baOverlayImage) return;
            // Keep the overlay image width same as wrapper so it doesn't squish
            baOverlayImage.style.width = baWrapper.offsetWidth + 'px';
            
            const val = baSlider.value;
            baOverlay.style.width = val + '%';
            baHandle.style.left = val + '%';
        }
        
        baSlider.addEventListener('input', updateBAslider);
        window.addEventListener('resize', updateBAslider);
        // Initial call after images might have loaded
        setTimeout(updateBAslider, 100);
    }

    // =============================
    // PARALLAX BACKGROUNDS
    // =============================
    const parallaxContainers = document.querySelectorAll('.parallax-container');
    if (parallaxContainers.length > 0) {
        window.addEventListener('scroll', () => {
            requestAnimationFrame(() => {
                parallaxContainers.forEach(container => {
                    const rect = container.getBoundingClientRect();
                    // Check if in viewport
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        // Calculate percentage of scroll through the element
                        const scrolled = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                        const bg = container.querySelector('.parallax-bg');
                        if (bg) {
                            // Move from -20% to 0% (or similar)
                            const yOffset = -20 + (scrolled * 20);
                            bg.style.transform = `translateY(${yOffset}%)`;
                        }
                    }
                });
            });
        });
    }
});
