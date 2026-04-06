// Active navigation + dynamic year + lightweight contact behavior
(() => {
    const bodyPage = document.body.dataset.page;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach((link) => {
        const linkPage = link.dataset.page;
        if (bodyPage && linkPage === bodyPage) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });

    const yearTarget = document.querySelector('[data-year]');
    if (yearTarget) {
        yearTarget.textContent = String(new Date().getFullYear());
    }

    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const submitButton = contactForm.querySelector('button[type="submit"]');
            const feedback = contactForm.querySelector('[data-contact-feedback]');
            if (!submitButton) return;

            const defaultButtonText = submitButton.textContent || 'Send';

            if (feedback) {
                feedback.textContent = '';
                feedback.classList.remove('is-visible', 'is-success', 'is-error');
            }

            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: {
                        Accept: 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Formspree submit failed');
                }

                contactForm.reset();

                if (feedback) {
                    feedback.textContent = 'Thanks! Your message has been sent.';
                    feedback.classList.add('is-visible', 'is-success');
                }
            } catch (error) {
                if (feedback) {
                    feedback.textContent = 'Something went wrong. Please try again.';
                    feedback.classList.add('is-visible', 'is-error');
                }
            } finally {
                submitButton.textContent = defaultButtonText;
                submitButton.disabled = false;
            }
        });
    }

    // Home featured carousel
    const featuredCarousel = document.querySelector('[data-featured-carousel]');
    if (featuredCarousel) {
        const track = featuredCarousel.querySelector('[data-carousel-track]');
        const slides = Array.from(featuredCarousel.querySelectorAll('[data-slide]'));
        const prevButton = featuredCarousel.querySelector('[data-carousel-prev]');
        const nextButton = featuredCarousel.querySelector('[data-carousel-next]');
        const dots = Array.from(document.querySelectorAll('[data-carousel-dot]'));

        let activeIndex = 0;
        const maxIndex = Math.max(slides.length - 1, 0);

        const updateCarousel = () => {
            if (track) {
                track.style.transform = `translateX(-${activeIndex * 100}%)`;
            }

            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === activeIndex);
                dot.setAttribute('aria-current', index === activeIndex ? 'true' : 'false');
            });
        };

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                activeIndex = activeIndex === 0 ? maxIndex : activeIndex - 1;
                updateCarousel();
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                activeIndex = activeIndex === maxIndex ? 0 : activeIndex + 1;
                updateCarousel();
            });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                activeIndex = index;
                updateCarousel();
            });
        });

        updateCarousel();
    }

    // Dynamic project detail content from URL query (?id=...)
    const projectTitle = document.querySelector('[data-project-title]');
    if (projectTitle) {
        const projectIntro = document.querySelector('[data-project-intro]');
        const projectDate = document.querySelector('[data-project-date]');
        const projectType = document.querySelector('[data-project-type]');
        const projectCollab = document.querySelector('[data-project-collab]');
        const projectInsightA = document.querySelector('[data-project-insight-a]');
        const projectInsightB = document.querySelector('[data-project-insight-b]');
        const projectInsightC = document.querySelector('[data-project-insight-c]');
        const projectQuote = document.querySelector('[data-project-quote]');
        const projectHero = document.querySelector('[data-project-hero]');
        const projectGridA = document.querySelector('[data-project-grid-a]');
        const projectGridB = document.querySelector('[data-project-grid-b]');
        const projectFinal = document.querySelector('[data-project-final]');
        const projectCaptionHero = document.querySelector('[data-project-caption-hero]');
        const projectCaptionA = document.querySelector('[data-project-caption-a]');
        const projectCaptionB = document.querySelector('[data-project-caption-b]');
        const projectCaptionFinal = document.querySelector('[data-project-caption-final]');
        const pageDescription = document.querySelector('meta[name="description"]');

        // ============================================================================
        // PROJECT DATA: Replace these Coming Soon placeholders with your real projects.
        // Each key (e.g., 'sunshift-studio') is the project ID from the work.html links.
        // ============================================================================
        const projects = {
            'sunshift-studio': makeComingSoonProject('Coming Soon 01'),
            'dune-motion': makeComingSoonProject('Coming Soon 02'),
            'atelier-north': makeComingSoonProject('Coming Soon 03'),
            'noir-form': makeComingSoonProject('Coming Soon 04'),
            'static-echo': makeComingSoonProject('Coming Soon 05'),
            'nexa-objects': makeComingSoonProject('Coming Soon 06')
        };

        // This helper function generates placeholder data structure.
        // Once you add your real projects below, you can remove this function.
        function makeComingSoonProject(name) {
            return {
                // PAGE TITLE & HEADING
                // titleHtml: The project name shown on the detail page. Use <br /> to break into 2 lines.
                // Example: 'Rebranding<br />Insurance Co' or 'Mobile App<br />Design System'
                titleHtml: name.replace(' ', '<br />'),

                // INTRO TEXT (first paragraph under title)
                // Write a 1-2 sentence summary of the project. This appears right under the title.
                // Example: 'A complete visual identity redesign for a fintech startup...'
                intro: 'Project in progress. Hier komt binnenkort een echte case met concept, proces en eindresultaat.',

                // PROJECT METADATA (date, type, collaboration)
                // date: When did you work on this? E.g., 'March 2025' or 'Q3 2024'
                // type: What's the project type? E.g., 'Brand Design', 'UI/UX', 'Motion Graphics'
                // collab: Who did you work with? E.g., 'Self-directed', 'With Team X', 'Client: Company Name'
                details: {
                    date: 'Coming soon',        // Change e.g., to 'March 2025'
                    type: 'In progress',        // Change e.g., to 'Brand Design'
                    collab: 'TBA'               // Change e.g., to 'Self-directed'
                },

                // 3 KEY INSIGHTS (section headings + descriptions)
                // These appear as 3 columns below the hero image.
                // a = Concept/Direction, b = Process/Methodology, c = Results/Learnings
                insights: {
                    a: 'Binnenkort verschijnt hier het concept en de creatieve richting van dit project.',
                    // Change e.g., to: 'Explored minimalism as design language to reduce visual noise...'

                    b: 'Hier komt uitleg over het proces, iteraties en visuele keuzes.',
                    // Change e.g., to: 'Started with mood boards, iterated through 5 rounds, refined typography...'

                    c: 'Hier komt het eindresultaat met leerpunten en impact.'
                    // Change e.g., to: 'Delivered 40-page brand guidelines. Client reported 25% engagement lift...'
                },

                // PULL QUOTE (large quote on project page)
                // A memorable line from the project, client feedback, or your reflection.
                // Example: 'Simplicity is the ultimate sophistication.'
                quote: 'Coming soon.',

                // IMAGE CAPTIONS (describe each visual in the layout)
                // These appear below/next to the project images.
                // hero: Caption for the main / first image
                // a: Caption for first detail / process image
                // b: Caption for second detail / process image
                // final: Caption for the concluding / results image
                captions: {
                    hero: 'Preview visual - coming soon.',
                    // Change e.g., to: 'Final brand identity system applied across digital & print'

                    a: 'Detail 1 - coming soon.',
                    // Change e.g., to: 'Iteration 3: Typography refinement and grid exploration'

                    b: 'Detail 2 - coming soon.',
                    // Change e.g., to: 'Color palette & component library built in Figma'

                    final: 'Final visual - coming soon.'
                    // Change e.g., to: 'Fully implemented design system deployed to production'
                },

                // PROJECT IMAGES (file paths & alt descriptions)
                // Replace 'images/project-coming-soon.svg' with your actual image files.
                // Files should be in the /images folder, e.g., 'images/projectname-hero.jpg'
                images: {
                    hero: {
                        src: 'images/project-coming-soon.svg',  // Change e.g., to 'images/my-project-hero.jpg'
                        alt: `${name} hero preview`             // Describe the image briefly, e.g., 'Homepage desktop mockup'
                    },
                    gridA: {
                        src: 'images/project-coming-soon.svg',  // Change e.g., to 'images/my-project-process-1.jpg'
                        alt: `${name} detail preview A`         // Describe the image, e.g., 'Sketches and mood boards'
                    },
                    gridB: {
                        src: 'images/project-coming-soon.svg',  // Change e.g., to 'images/my-project-process-2.jpg'
                        alt: `${name} detail preview B`         // Describe the image, e.g., 'Final design in Figma'
                    },
                    final: {
                        src: 'images/project-coming-soon.svg',  // Change e.g., to 'images/my-project-final.jpg'
                        alt: `${name} final preview`            // Describe the image, e.g., 'Design deployed on live site'
                    }
                }
            };
        }

        const selectedId = new URLSearchParams(window.location.search).get('id');
        const project = projects[selectedId] || projects['sunshift-studio'];

        projectTitle.innerHTML = project.titleHtml;
        if (projectIntro) projectIntro.textContent = project.intro;
        if (projectDate) projectDate.textContent = project.details.date;
        if (projectType) projectType.textContent = project.details.type;
        if (projectCollab) projectCollab.textContent = project.details.collab;
        if (projectInsightA) projectInsightA.textContent = project.insights.a;
        if (projectInsightB) projectInsightB.textContent = project.insights.b;
        if (projectInsightC) projectInsightC.textContent = project.insights.c;
        if (projectQuote) projectQuote.textContent = `"${project.quote}"`;
        if (projectCaptionHero) projectCaptionHero.textContent = project.captions.hero;
        if (projectCaptionA) projectCaptionA.textContent = project.captions.a;
        if (projectCaptionB) projectCaptionB.textContent = project.captions.b;
        if (projectCaptionFinal) projectCaptionFinal.textContent = project.captions.final;

        const updateImage = (element, data) => {
            if (!element || !data) return;
            element.src = data.src;
            element.alt = data.alt;
        };

        updateImage(projectHero, project.images.hero);
        updateImage(projectGridA, project.images.gridA);
        updateImage(projectGridB, project.images.gridB);
        updateImage(projectFinal, project.images.final);

        const titlePlain = project.titleHtml.replace(/<br\s*\/?\s*>/gi, ' ').replace(/\s+/g, ' ').trim();
        document.title = `Project - ${titlePlain}`;
        if (pageDescription) {
            pageDescription.setAttribute('content', `${titlePlain} project detail page from the portfolio of Puck Roskamp.`);
        }
    }
})();

