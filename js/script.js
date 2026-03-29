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

        const projects = {
            'sunshift-studio': {
                titleHtml: 'Sunshift<br />Studio',
                intro: 'Een tweedejaars CMD-project rond ritme, leesrichting en visuele rust in een editorial portfolio-opzet. In dit project onderzocht ik hoe je een portfolio niet alleen mooi kunt maken, maar ook inhoudelijk sterk kunt laten aanvoelen voor stages en creatieve samenwerkingen.',
                details: { date: 'Maart 2026', type: 'Schoolproject', collab: 'Zelf geïnitieerd' },
                insights: {
                    a: 'Sunshift Studio begon als portfolio-concept om werk niet alleen te tonen, maar ook voelbaar te maken in tempo en compositie. Ik wilde dat elke sectie leest als een kleine redactionele spread, zodat de bezoeker stap voor stap door het project wordt meegenomen.',
                    b: 'Door grote typografie te combineren met strakke witruimte ontstaat er spanning zonder visuele ruis. De hiërarchie is bewust opgebouwd: eerst aandacht trekken, daarna uitleg geven, en tenslotte rust creëren zodat het werk zelf blijft spreken.',
                    c: 'Het resultaat is rustig, scherp en persoonlijk: beeld en tekst ondersteunen elkaar in plaats van te concurreren. Deze balans maakt de pagina professioneler, maar laat ook duidelijk mijn eigen signatuur als ontwerper zien.'
                },
                quote: 'Minder elementen, meer karakter: het grid bepaalt de orde, de typografie bepaalt de toon.',
                captions: {
                    hero: 'Hero-frame met veel witruimte zodat typografie het ritme bepaalt.',
                    a: 'Kleuraccenten sturen focus en bouwen visuele hiërarchie op.',
                    b: 'Asymmetrische compositie houdt de pagina levend en editorial.',
                    final: 'Eindbeeld waarin schaal, ritme en consistentie samenkomen.'
                },
                images: {
                    hero: { src: 'images/project-01.svg', alt: 'Sunshift Studio hero visual' },
                    gridA: { src: 'images/project-02.svg', alt: 'Sunshift Studio detail view' },
                    gridB: { src: 'images/project-03.svg', alt: 'Sunshift Studio typography composition' },
                    final: { src: 'images/project-04.svg', alt: 'Sunshift Studio final showcase section' }
                }
            },
            'dune-motion': {
                titleHtml: 'Dune<br />Motion',
                intro: 'Een editorial experiment waarin cinematografische beelden worden vertaald naar een heldere, ritmische projectpagina. De uitdaging lag in het combineren van sfeer en structuur: visueel rijk, maar nog steeds duidelijk en prettig om doorheen te scrollen.',
                details: { date: 'Februari 2026', type: 'Persoonlijk project', collab: 'Geen externe partner' },
                insights: {
                    a: 'Dune Motion draait om sfeer: warme kleuren en sequenties zorgen voor filmisch momentum. In plaats van losse beelden naast elkaar te plaatsen, heb ik bewust gekozen voor een opbouw waarbij elk beeld het volgende voorbereidt.',
                    b: 'De layout blijft bewust minimalistisch zodat elk beeld meer gewicht krijgt. Korte tekstblokken functioneren hier als ankerpunten: ze geven context, maar laten voldoende ruimte over voor emotie en visuele impact.',
                    c: 'De serie voelt nu atmosferisch maar nog steeds gecontroleerd en leesbaar. Daardoor blijft het project niet hangen in alleen “mooi”, maar communiceert het ook een duidelijke ontwerpintentie.'
                },
                quote: 'Cinematisch hoeft niet druk te zijn; ritme ontstaat juist door weglaten.',
                captions: {
                    hero: 'Openingsbeeld zet direct de toon met warmte en contrast.',
                    a: 'Detailshot laat de overgang tussen beeldblokken zien.',
                    b: 'Typografie blijft terughoudend zodat beeld het verhaal draagt.',
                    final: 'Laatste frame sluit af met balans tussen spanning en rust.'
                },
                images: {
                    hero: { src: 'images/project-02.svg', alt: 'Dune Motion hero visual' },
                    gridA: { src: 'images/project-03.svg', alt: 'Dune Motion visual detail' },
                    gridB: { src: 'images/project-05.svg', alt: 'Dune Motion layout detail' },
                    final: { src: 'images/project-06.svg', alt: 'Dune Motion final showcase section' }
                }
            },
            'atelier-north': {
                titleHtml: 'Atelier<br />North',
                intro: 'Een high-contrast merkconcept met focus op geometrie, grid-discipline en krachtige typografische hiërarchie. Dit project gaat over precisie: hoe je met minimale middelen toch een sterke, herkenbare en eigentijdse merktaal kunt neerzetten.',
                details: { date: 'Januari 2026', type: 'Schoolproject', collab: 'Blokproject CMD' },
                insights: {
                    a: 'Atelier North onderzoekt hoe ver contrast kan gaan zonder leesbaarheid te verliezen. Ik heb veel getest met zwart-witverhoudingen en typografische schaal om spanning op te bouwen zonder dat het visueel zwaar wordt.',
                    b: 'Strakke gridlijnen en schaalwissels zorgen voor een gecontroleerde, moderne uitstraling. Die systematische opbouw helpt om verschillende contenttypen — van beeld tot copy — consistent binnen één taal te houden.',
                    c: 'Zo ontstaat een identiteit die tegelijk systematisch en uitgesproken aanvoelt. Voor mij was dit project vooral waardevol omdat het laat zien dat strenge structuur ook veel creatieve vrijheid kan opleveren.'
                },
                quote: 'Precisie is niet saai: het maakt ruimte voor krachtige keuzes.',
                captions: {
                    hero: 'Hero met geometrische spanning en sterke hiërarchie.',
                    a: 'Detail toont hoe witruimte de compositie laat ademen.',
                    b: 'Grid en type werken als één visueel systeem.',
                    final: 'Final frame bevestigt de merktoon in een clean geheel.'
                },
                images: {
                    hero: { src: 'images/project-03.svg', alt: 'Atelier North hero visual' },
                    gridA: { src: 'images/project-01.svg', alt: 'Atelier North detail view' },
                    gridB: { src: 'images/project-06.svg', alt: 'Atelier North composition detail' },
                    final: { src: 'images/project-02.svg', alt: 'Atelier North final showcase section' }
                }
            },
            'noir-form': {
                titleHtml: 'Noir<br />Form',
                intro: 'Monochroom concept dat architecturale vormen, negatieve ruimte en rustige pacing centraal zet. De kern van dit project is reductie: minder kleur, minder afleiding, en daardoor meer focus op compositie, materiaal en ritme.',
                details: { date: 'December 2025', type: 'Persoonlijk project', collab: 'Zelf geïnitieerd' },
                insights: {
                    a: 'Noir Form startte vanuit één vraag: hoe maak je spanning met bijna geen kleur? Door te werken met contrast in vorm en schaal kon ik die spanning opbouwen zonder afhankelijk te zijn van opvallende kleuraccenten.',
                    b: 'Door sectionering en ritmische overgangen blijft het minimalistisch maar niet leeg. Elke overgang is bewust geplaatst om de lezer door het project te leiden, bijna als een visuele ademhaling tussen de beelden.',
                    c: 'Het eindresultaat voelt volwassen, stil en doelbewust. Juist door die ingetogen aanpak krijgt de pagina meer karakter en een duidelijkere editoriale identiteit.'
                },
                quote: 'Beperking in kleur opent ruimte voor vorm, contrast en nuance.',
                captions: {
                    hero: 'Monochrome hero legt focus op vorm en textuur.',
                    a: 'Close-up laat de rol van negatieve ruimte zien.',
                    b: 'Beeldblokken bouwen spanning op zonder extra decoratie.',
                    final: 'Final frame houdt het stil, strak en overtuigend.'
                },
                images: {
                    hero: { src: 'images/project-04.svg', alt: 'Noir Form hero visual' },
                    gridA: { src: 'images/project-01.svg', alt: 'Noir Form detail view' },
                    gridB: { src: 'images/project-05.svg', alt: 'Noir Form layout detail' },
                    final: { src: 'images/project-03.svg', alt: 'Noir Form final showcase section' }
                }
            },
            'static-echo': {
                titleHtml: 'Static<br />Echo',
                intro: 'Digitaal concept met donkere contrasten, interfacespanning en duidelijke visuele hiërarchie. In dit project wilde ik een energieke digitale sfeer neerzetten zonder de overzichtelijkheid van een sterke editorial layout te verliezen.',
                details: { date: 'November 2025', type: 'Blokproject', collab: 'Interne schoolopdracht' },
                insights: {
                    a: 'Static Echo onderzoekt hoe een donkere stijl toch editorial en leesbaar kan blijven. Ik heb contrast niet alleen in kleur gebruikt, maar ook in ritme: afwisselend dense en rustige zones in de layout.',
                    b: 'Hoge contrasten worden geankerd met consistente tekstblokken en spacing. Daardoor blijft de pagina stabiel, ook wanneer de visuals expressiever en drukker worden.',
                    c: 'Zo ontstaat een energiek maar gecontroleerd visueel systeem. Het project laat zien dat een uitgesproken stijl en functionele helderheid prima kunnen samengaan.'
                },
                quote: 'Bold visuals werken pas echt als de structuur kalm blijft.',
                captions: {
                    hero: 'Hero gebruikt contrast om direct focus te pakken.',
                    a: 'Detail toont de balans tussen interface en editorial layout.',
                    b: 'Type-ankers zorgen voor rust in een expressieve stijl.',
                    final: 'Final frame bundelt energie en consistentie.'
                },
                images: {
                    hero: { src: 'images/project-05.svg', alt: 'Static Echo hero visual' },
                    gridA: { src: 'images/project-06.svg', alt: 'Static Echo detail view' },
                    gridB: { src: 'images/project-02.svg', alt: 'Static Echo composition detail' },
                    final: { src: 'images/project-04.svg', alt: 'Static Echo final showcase section' }
                }
            },
            'nexa-objects': {
                titleHtml: 'Nexa<br />Objects',
                intro: 'Productgericht concept waarin spacing, vorm en typografie samen een helder visueel verhaal opbouwen. Het doel was om objecten niet als losse renders te tonen, maar als onderdeel van een samenhangende, redactionele presentatie.',
                details: { date: 'Oktober 2025', type: 'Schoolproject', collab: 'Samenwerking met medestudenten' },
                insights: {
                    a: 'Nexa Objects presenteert productbeelden op een rustige, bijna museale manier. Door grote marges en een heldere beeldvolgorde krijgt elk object visueel gewicht en een eigen moment.',
                    b: 'Korte tekstblokken geven context zonder de visuele flow te onderbreken. De copy ondersteunt vooral materiaalkeuzes, vormtaal en gebruiksscenario’s, in plaats van alleen algemene beschrijving.',
                    c: 'Daardoor wordt het niet alleen mooi, maar ook inhoudelijk overtuigend. Je ziet niet alleen wat het eindresultaat is, maar ook waarom bepaalde ontwerpkeuzes gemaakt zijn.'
                },
                quote: 'Een sterk case-study ritme laat keuzes zien, niet alleen eindbeelden.',
                captions: {
                    hero: 'Hero combineert productfocus met editorial pacing.',
                    a: 'Detail benadrukt materiaal, vorm en lichtval.',
                    b: 'Compositie laat zien hoe type en beeld elkaar versterken.',
                    final: 'Final frame sluit af met heldere visuele continuïteit.'
                },
                images: {
                    hero: { src: 'images/project-06.svg', alt: 'Nexa Objects hero visual' },
                    gridA: { src: 'images/project-05.svg', alt: 'Nexa Objects detail view' },
                    gridB: { src: 'images/project-03.svg', alt: 'Nexa Objects composition detail' },
                    final: { src: 'images/project-01.svg', alt: 'Nexa Objects final showcase section' }
                }
            }
        };

        const selectedId = new URLSearchParams(window.location.search).get('id');
        const project = projects[selectedId] || projects['sunshift-studio'];

        const loremContent = {
            titleHtml: 'Lorem<br />Ipsum',
            intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            date: 'Lorem ipsum',
            type: 'Dolor sit',
            collab: 'Amet consectetur',
            insightA: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
            insightB: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
            insightC: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet consectetur.',
            quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            captionHero: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            captionA: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            captionB: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
            captionFinal: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.'
        };

        projectTitle.innerHTML = loremContent.titleHtml;
        if (projectIntro) projectIntro.textContent = loremContent.intro;
        if (projectDate) projectDate.textContent = loremContent.date;
        if (projectType) projectType.textContent = loremContent.type;
        if (projectCollab) projectCollab.textContent = loremContent.collab;
        if (projectInsightA) projectInsightA.textContent = loremContent.insightA;
        if (projectInsightB) projectInsightB.textContent = loremContent.insightB;
        if (projectInsightC) projectInsightC.textContent = loremContent.insightC;
        if (projectQuote) projectQuote.textContent = `“${loremContent.quote}”`;
        if (projectCaptionHero) projectCaptionHero.textContent = loremContent.captionHero;
        if (projectCaptionA) projectCaptionA.textContent = loremContent.captionA;
        if (projectCaptionB) projectCaptionB.textContent = loremContent.captionB;
        if (projectCaptionFinal) projectCaptionFinal.textContent = loremContent.captionFinal;

        const updateImage = (element, data) => {
            if (!element || !data) return;
            element.src = data.src;
            element.alt = data.alt;
        };

        updateImage(projectHero, project.images.hero);
        updateImage(projectGridA, project.images.gridA);
        updateImage(projectGridB, project.images.gridB);
        updateImage(projectFinal, project.images.final);

        const titlePlain = loremContent.titleHtml.replace(/<br\s*\/?\s*>/gi, ' ').replace(/\s+/g, ' ').trim();
        document.title = `Project — ${titlePlain}`;
        if (pageDescription) {
            pageDescription.setAttribute('content', `${titlePlain} project detail page from the portfolio of Puck Roskamp.`);
        }
    }
})();
