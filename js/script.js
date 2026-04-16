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

    // Homepage typewriter intro on the hero name.
    const heroTitle = document.querySelector('.hero-title');
    if (bodyPage === 'home' && heroTitle) {
        const originalText = (heroTitle.textContent || '').trim();
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (originalText.length > 0 && !reducedMotion) {
            heroTitle.classList.add('is-typewriter');
            heroTitle.setAttribute('aria-label', originalText);
            heroTitle.textContent = '';

            let index = 0;
            const typeNextCharacter = () => {
                heroTitle.textContent = originalText.slice(0, index + 1);
                index += 1;

                if (index < originalText.length) {
                    setTimeout(typeNextCharacter, 85);
                } else {
                    heroTitle.classList.add('is-complete');
                }
            };

            setTimeout(typeNextCharacter, 280);
        } else {
            heroTitle.textContent = originalText;
        }
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
        const projectHeroImage = document.querySelector('[data-project-hero-image], [data-project-hero]');
        let projectHeroEmbed = document.querySelector('[data-project-hero-embed]');
        const projectGridA = document.querySelector('[data-project-grid-a]');
        const projectGridB = document.querySelector('[data-project-grid-b]');
        const projectFinal = document.querySelector('[data-project-final]');
        const projectCaptionHero = document.querySelector('[data-project-caption-hero]');
        const projectCaptionA = document.querySelector('[data-project-caption-a]');
        const projectCaptionB = document.querySelector('[data-project-caption-b]');
        const projectCaptionFinal = document.querySelector('[data-project-caption-final]');
        const projectHeroFigure = document.querySelector('.project-hero-image');
        const projectFlowSection = document.querySelector('[data-project-flow-section]');
        const projectFlow = document.querySelector('[data-project-flow]');
        const projectFlowVisuals = Array.from(document.querySelectorAll('.project-flow .project-visual'));
        const projectConceptVisual = document.querySelector('.project-flow-row:first-child .project-visual');
        const projectRoleSection = document.querySelector('[data-project-role-section]');
        const projectRoleLabel = document.querySelector('[data-project-role-label]');
        const projectRoleTitle = document.querySelector('[data-project-role-title]');
        const projectRoleText = document.querySelector('[data-project-role-text]');
        const projectLiveLink = document.querySelector('[data-project-live-link]');
        const projectDownloadLink = document.querySelector('[data-project-download-link]');
        const projectVideoSection = document.querySelector('[data-project-video-section]');
        const projectVideoTitle = document.querySelector('[data-project-video-title]');
        const projectVideoAboutFilm = document.querySelector('[data-project-video-about-film]');
        const projectVideoWhy = document.querySelector('[data-project-video-why]');
        const projectVideoCaption = document.querySelector('[data-project-video-caption]');
        const projectVideo = document.querySelector('[data-project-video]');
        const videoPlayButton = document.querySelector('[data-video-play]');
        const videoPauseButton = document.querySelector('[data-video-pause]');
        const videoReplayButton = document.querySelector('[data-video-replay]');
        const videoTimeTarget = document.querySelector('[data-video-time]');
        const videoProgress = document.querySelector('[data-video-progress]');
        const projectPostersSection = document.querySelector('[data-project-posters-section]');
        const projectPostersGrid = document.querySelector('[data-project-posters-grid]');
        const pageDescription = document.querySelector('meta[name="description"]');

        // ============================================================================
        // PROJECT DATA (MAIN PROJECTS)
        // IMPORTANT:
        // - Keep these keys equal to work.html links (project.html?id=...)
        // - Replace per project: titleHtml, intro, details, insights, quote, captions, images
        // - Image paths should point to /images, for example: images/my-project-hero.jpg
        // ============================================================================
        const projects = {
            // Card 01 -> project.html?id=project1
            'project1': {
                titleHtml: 'Squeaky Clean<br />Typeface',
                intro: 'Voor Squeaky Clean maakte ik lettervormen met groen afwasmiddel van Jumbo op een wit bord. Door een fysiek materiaal als basis te gebruiken kreeg de typeface een speelse, vloeibare uitstraling.',
                details: {
                    date: 'April 2026',
                    type: 'Typography',
                    collab: 'Zelfstandig experiment'
                },
                insights: {
                    a: 'Ik wilde typografie maken die letterlijk voelt als schoonmaakmiddel, met druppelachtige vormen en organische contouren in plaats van strakke geometrie.',
                    b: 'Ik maakte alle letters met afwasmiddel op een wit bord, fotografeerde iedere letter apart en heb alle beelden daarna in Illustrator bewerkt. Met Image Trace zette ik de foto\'s om naar vectorvormen en schoonde ik elke letter handmatig op voor een consistente set.',
                    c: 'Een experimentele display-typeface met een herkenbare “squeaky clean” vibe. Het project combineert analoog materiaalonderzoek met digitale uitwerking en heeft mijn blik op letterconstructie verbreed.'
                },
                quote: 'Van afwasmiddel op een bord naar een complete, bruikbare letterset.',
                captions: {
                    hero: 'Squeaky Clean typeface toegepast als visueel statement.',
                    a: 'Experiment met afwasmiddel als basis voor organische lettervormen.',
                    b: 'Van foto naar vector: Image Trace en handmatige opschoning in Illustrator.',
                    final: 'Eindresultaat van de Squeaky Clean letterset.'
                },
                images: {
                    hero: { src: 'images/project1-card.svg', alt: 'Squeaky Clean typeface hero visual' },
                    gridA: { src: 'images/project1-card.svg', alt: 'Squeaky Clean concept visual met vloeibare lettervormen' },
                    gridB: { src: 'images/illustrator-project1.png', alt: 'Illustrator uitwerking van de Squeaky Clean letters' },
                    final: { src: 'images/squeakyclean-result.svg', alt: 'Eindresultaat van de Squeaky Clean typeface' }
                },
                download: {
                    label: 'Download font ↓',
                    url: 'fonts/SqueakyClean-Regular.ttf',
                    fileName: 'SqueakyClean-Regular.ttf'
                },
                hideConceptVisual: true
            },

            // Card 02 -> project.html?id=project2
            'project2': {
                titleHtml: 'Maastricht<br />Photo Grid',
                intro: 'Een fotografische collage van Maastricht, opgebouwd uit spontane straatbeelden, details en sfeerfoto\'s uit de stad.',
                details: {
                    date: 'April 2026',
                    type: 'Fotocollage / Stadsfotografie',
                    collab: 'Zelfstandig'
                },
                insights: {
                    a: 'Voor dit project draait het om ritme in beeld: architectuur, mensen, texturen en lichtmomenten uit Maastricht samengebracht in een visuele serie.',
                    b: 'Ik fotografeer op locatie in de stad en curate daarna de selectie op contrast, compositie en kleur, zodat de beelden als collage samenhang houden.',
                    c: 'Het eindresultaat is een dynamisch grid dat de sfeer van Maastricht vangt in één overzichtelijke, visuele narratief.'
                },
                quote: 'Maastricht in fragmenten: straat, licht, ritme en detail.',
                captions: {
                    hero: '',
                    a: '',
                    b: '',
                    final: ''
                },
                images: {
                    hero: { src: 'images/project-coming-soon.svg', alt: 'Project 02 hero image' },
                    gridA: { src: 'images/project-coming-soon.svg', alt: 'Project 02 process image A' },
                    gridB: { src: 'images/project-coming-soon.svg', alt: 'Project 02 process image B' },
                    final: { src: 'images/project-coming-soon.svg', alt: 'Project 02 final image' }
                },
                photoGrid: [
                    { src: 'images/project-coming-soon.svg', alt: 'Maastricht street photo 01' },
                    { src: 'images/project-coming-soon.svg', alt: 'Maastricht street photo 02' },
                    { src: 'images/project-coming-soon.svg', alt: 'Maastricht street photo 03' },
                    { src: 'images/project-coming-soon.svg', alt: 'Maastricht street photo 04' },
                    { src: 'images/project-coming-soon.svg', alt: 'Maastricht street photo 05' },
                    { src: 'images/project-coming-soon.svg', alt: 'Maastricht street photo 06' },
                    { src: 'images/project-coming-soon.svg', alt: 'Maastricht street photo 07' },
                    { src: 'images/project-coming-soon.svg', alt: 'Maastricht street photo 08' }
                ],
                hideHeroVisual: true,
                hideFlowSection: true
            },

            // Card 03 -> project.html?id=project3
            'project3': {
                titleHtml: 'Spark — Coding Workshop for Students',
                intro: 'Spark is ontwikkeld binnen een blokproject in het eerste jaar van Communication & Multimedia Design. De opdracht was om in teamverband een interactieve workshop te ontwerpen voor middelbare scholieren, waarin zij op een toegankelijke en speelse manier kennismaken met coderen.',
                details: {
                    date: '2025',
                    type: 'Schoolproject — Teamproject',
                    collab: 'Teamproject met medestudenten binnen CMD'
                },
                insights: {
                    a: 'Het concept draaide om leren door te doen. Door middel van interactieve opdrachten, visuele elementen en een speelse aanpak maakten we coderen begrijpelijk en leuk voor een jonge doelgroep zonder technische voorkennis.',
                    b: 'Tijdens het project werkten we in teamverband aan zowel de inhoud als de vormgeving van de workshop. Mijn focus lag op de branding van Spark, waarbij ik onder andere mascottes ontwierp en een brandboard ontwikkelde om een consistente visuele identiteit neer te zetten. Daarnaast documenteerde ik de workshop door foto’s en video’s te maken, inclusief interviews en promotiemateriaal.',
                    c: 'Het eindresultaat is een interactieve workshop waarin leerlingen actief kennismaken met coderen in een laagdrempelige en leuke setting. De visuele stijl en branding zorgen voor een samenhangende ervaring, terwijl de vastgelegde foto- en videomaterialen zijn gebruikt voor promotie en documentatie van het project.'
                },
                quote: 'Leren coderen begint met nieuwsgierigheid en plezier.',
                captions: {
                    hero: 'Website die de workshop en bijbehorende beleving visueel en inhoudelijk vastlegt.',
                    a: 'Kleurenpalet en visuele stijl vastgelegd in het brandboard.',
                    b: 'Leerling aan het werk met p5.js tijdens de interactieve workshop.',
                    final: 'Ontwikkelde mascottes als onderdeel van de visuele identiteit van Spark.'
                },
                images: {
                    hero: { src: 'images/project3-spark-workshops.svg', alt: 'Project 03 hero image' },
                    gridA: { src: 'images/spark-color.svg', alt: 'Project 03 process image A' },
                    gridB: { src: 'images/closeup-jongen.jpg', alt: 'Project 03 process image B' },
                    final: { src: 'images/spark-mascottes.svg', alt: 'Project 03 final image' }
                },
                website: {
                    label: 'Bekijk website ↗',
                    url: 'https://sparkworkshop.nl/'
                },
                embed: {
                    url: 'https://sparkworkshop.nl/',
                    title: 'Spark workshop live preview'
                }
            },

            // Card 04 -> project.html?id=project4
            'project4': {
                titleHtml: 'My Handwriting<br />Portfolio Font',
                intro: 'Ik digitaliseerde mijn persoonlijke handschrift om mijn werk een herkenbare en authentieke touch te geven. Het font gebruik ik in mijn portfolio als visueel accent binnen de branding en titels.',
                details: {
                    date: '2026',
                    type: 'Typography / Brand section',
                    collab: 'Zelfstandig'
                },
                insights: {
                    a: 'Ik wilde mijn persoonlijke handschrift digitaliseren om mijn werk een herkenbare en authentieke touch te geven.',
                    b: 'Met Calligrapher heb ik mijn handschrift ingescand, letters verfijnd en als werkend font geëxporteerd.',
                    c: 'Een uniek, bruikbaar font dat ik toepas in mijn portfolio voor titels en accenten, waardoor mijn visuele stijl persoonlijker wordt.'
                },
                quote: 'Een persoonlijk font maakt de brand section direct eigen.',
                captions: {
                    hero: '',
                    a: '',
                    b: '',
                    final: ''
                },
                images: {
                    hero: { src: 'images/handwriting-result.svg', alt: 'Project 04 handwriting font hero image' },
                    gridA: { src: 'images/project-coming-soon.svg', alt: 'Project 04 handwriting process image A' },
                    gridB: { src: 'images/project-coming-soon.svg', alt: 'Project 04 handwriting process image B' },
                    final: { src: 'images/handwriting-result.svg', alt: 'Project 04 handwriting final image' }
                },
                role: {
                    label: 'Typography & Brand Design',
                    title: 'Mijn rol in dit project',
                    text: 'Ik heb mijn eigen handschrift gedigitaliseerd, het font technisch uitgewerkt en vervolgens toegepast als herkenbaar merkaccent binnen mijn portfolio.'
                },
                hideVisuals: true,
                download: {
                    label: 'Download font ↓',
                    url: 'fonts/Myhandwriting-Regular.ttf',
                    fileName: 'Myhandwriting-Regular.ttf'
                }
            },

            // Card 05 -> project.html?id=project5
            'project5': {
                titleHtml: 'Digital Narrative Story — CBS Data',
                intro: 'Dit project is ontwikkeld binnen een blokproject in het tweede jaar van Communication & Multimedia Design. In samenwerking met het CBS werkten we met bestaande datasets, die we vertaalden naar een interactieve digital narrative story. Het doel was om complexe data begrijpelijk en toegankelijk te maken voor een breed publiek. Door middel van visuele storytelling en interactie hebben we de data omgezet in een helder en boeiend verhaal.',
                details: {
                    date: '2026',
                    type: 'Schoolproject — Teamproject',
                    collab: 'Centraal Bureau voor de Statistiek (CBS)'
                },
                insights: {
                    a: 'Het concept draaide om het vertalen van abstracte cijfers naar een visueel en verhalend geheel, waarbij de gebruiker stap voor stap door de data wordt geleid.',
                    b: 'Tijdens het proces analyseerden we de dataset, selecteerden we relevante inzichten en bepaalden we hoe deze het best verteld konden worden via interactie en visuele elementen. Hierbij stond de balans tussen inhoud, vormgeving en gebruikservaring centraal.',
                    c: 'Het eindresultaat is een interactieve story waarin data, visuals en tekst samenkomen tot een helder en boeiend verhaal. Door middel van scroll-based interactie en visuele hiërarchie wordt de gebruiker meegenomen in de inzichten uit de data.'
                },
                quote: 'Data krijgt betekenis wanneer het wordt verteld als een verhaal.',
                captions: {
                    hero: 'Caption hero image',
                    a: 'Caption image A',
                    b: 'Caption image B',
                    final: 'Caption final image'
                },
                images: {
                    hero: { src: 'images/project-coming-soon.svg', alt: 'Project 05 hero image' },
                    gridA: { src: 'images/project-coming-soon.svg', alt: 'Project 05 process image A' },
                    gridB: { src: 'images/project-coming-soon.svg', alt: 'Project 05 process image B' },
                    final: { src: 'images/project-coming-soon.svg', alt: 'Project 05 final image' }
                },
                website: {
                    label: 'Bekijk website ↗',
                    url: 'https://jelger1.github.io/story/'
                },
                embed: {
                    url: 'https://jelger1.github.io/story/',
                    title: 'CBS Data story live preview'
                },
                role: {
                    label: 'Data Storytelling & Visual Design',
                    title: 'Mijn rol in dit project',
                    text: 'Binnen dit teamproject lag mijn focus op visual design en storytelling. Ik vertaalde data naar een duidelijke visuele structuur, werkte aan de stijl en hiërarchie van de pagina, en zorgde dat de gebruikersflow logisch bleef van eerste inzicht tot eindconclusie.'
                },
                hideVisuals: true
            },

            // Card 06 -> project.html?id=project6
            'project6': {
                titleHtml: 'Poster Archive<br />Collection',
                intro: 'Een verzameling van posters die ik in verschillende projecten en periodes heb ontworpen.',
                details: {
                    date: '2024 - 2026',
                    type: 'Poster collectie',
                    collab: 'Zelfstandige experimenten'
                },
                insights: {
                    a: 'Concept: beschrijf hier de creatieve richting en het centrale idee.',
                    b: 'Proces: leg hier iteraties, tools en keuzes uit.',
                    c: 'Resultaat: benoem hier het eindresultaat en wat je hebt geleerd.'
                },
                quote: 'Vervang deze quote met een kernzin van het project.',
                captions: {
                    hero: 'Caption hero image',
                    a: 'Caption image A',
                    b: 'Caption image B',
                    final: 'Caption final image'
                },
                images: {
                    hero: { src: 'images/project-coming-soon.svg', alt: 'Project 06 hero image' },
                    gridA: { src: 'images/project-coming-soon.svg', alt: 'Project 06 process image A' },
                    gridB: { src: 'images/project-coming-soon.svg', alt: 'Project 06 process image B' },
                    final: { src: 'images/project-coming-soon.svg', alt: 'Project 06 final image' }
                },
                posterGrid: [
                    { src: 'images/DISFIGURED GRACE.png', mockupSrc: 'images/mockup-poster1.png', alt: 'Poster 1', caption: 'Disfigured Grace' },
                    { src: 'images/orchid-poster.png', mockupSrc: 'images/mockup-orchid.png', alt: 'Poster 2', caption: 'Orchid' },
                    { src: 'images/a_is_for_impact_poster.png', mockupSrc: 'images/a-poster-mockup.png', alt: 'Poster 3', caption: 'A is for Impact' },
                    { src: 'images/project-coming-soon.svg', mockupSrc: 'images/project-coming-soon.svg', alt: 'Poster 4', caption: 'Poster 04' },
                    { src: 'images/teeth-star-poster.png', mockupSrc: 'images/teeth-mockup.png', alt: 'Poster 5', caption: 'Soft Bite' },
                    { src: 'images/project-coming-soon.svg', mockupSrc: 'images/project-coming-soon.svg', alt: 'Poster 6', caption: 'Poster 06' },

                ],
                hideHeroVisual: true
            },

            // After Effects project with optional video section
            'ae-sound-of-metal': {
                titleHtml: 'Sound of Metal<br />Title Sequence',
                intro: 'Eindproject voor After Effects Basics. Een typografische title sequence waarin ritme, stilte en spanning uit de film visueel samenkomen.',
                details: {
                    date: 'April 2026',
                    type: 'After Effects Basics',
                    collab: 'Zelfstandig (schoolproject)'
                },
                insights: {
                    a: 'Sound of Metal volgt Ruben, een drummer die plotseling zijn gehoor verliest. Die overgang tussen geluid en stilte maakte de film visueel interessant om te vertalen.',
                    b: 'Ik koos deze film omdat de emotionele shift heel sterk voelbaar is. In de sequence speel ik met timing, pacing en typografie om dat spanningsveld op te bouwen.',
                    c: 'Het resultaat wordt een korte title sequence waarin motion, contrast en ritme de kern van het verhaal ondersteunen.'
                },
                quote: 'Van ruis naar stilte, van chaos naar focus.',
                captions: {
                    hero: 'Stijlframe van de direction voor de title sequence.',
                    a: 'Eerste tests met typografie, timing en compositie in After Effects.',
                    b: 'Iteratie op ritme en overgangen, afgestemd op de sfeer van de film.',
                    final: 'Hier komt de uiteindelijke still uit de final sequence.'
                },
                images: {
                    hero: { src: 'images/ae-sound-of-metal.svg', alt: 'Sound of Metal title sequence hero frame' },
                    gridA: { src: 'images/ae-sound-of-metal.svg', alt: 'Process frame with typography tests' },
                    gridB: { src: 'images/ae-sound-of-metal.svg', alt: 'Motion and transition iteration frame' },
                    final: { src: 'images/ae-sound-of-metal.svg', alt: 'Final title sequence frame preview' }
                },
                video: {
                    title: 'Title Sequence Preview',
                    aboutFilm: 'Over de film: Sound of Metal (2019) gaat over identiteit, verlies en acceptatie wanneer een muzikant geconfronteerd wordt met plots gehoorverlies.',
                    whyChosen: 'Waarom deze film: ik koos deze film omdat je de spanning tussen geluid en stilte sterk kunt vertalen naar typography, cuts en motion timing.',
                    caption: '',
                    src: 'images/title-sequence-placeholder.mp4',
                    poster: 'images/ae-sound-of-metal.svg'
                },
                hideHeroVisual: true,
                hideFlowSection: true
            }
        };

        const selectedId = new URLSearchParams(window.location.search).get('id');
        const project = projects[selectedId] || projects['project1'];

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

        updateImage(projectHeroImage, project.images.hero);
        updateImage(projectGridA, project.images.gridA);
        updateImage(projectGridB, project.images.gridB);
        updateImage(projectFinal, project.images.final);

        const titlePlain = project.titleHtml.replace(/<br\s*\/?\s*>/gi, ' ').replace(/\s+/g, ' ').trim();

        if (projectHeroFigure) {
            projectHeroFigure.hidden = Boolean(project.hideHeroVisual);
        }

        if (projectFlowSection) {
            const hasPosterGrid = Array.isArray(project.posterGrid) && project.posterGrid.length > 0;
            const hasPhotoGrid = Array.isArray(project.photoGrid) && project.photoGrid.length > 0;
            projectFlowSection.hidden = Boolean(project.hideFlowSection || hasPosterGrid || hasPhotoGrid);
        }

        if (projectFlow) {
            const hideVisuals = Boolean(project.hideVisuals);
            projectFlow.classList.toggle('is-text-only', hideVisuals);
            projectFlowVisuals.forEach((visual) => {
                visual.hidden = hideVisuals;
            });

            if (projectConceptVisual) {
                projectConceptVisual.hidden = hideVisuals || Boolean(project.hideConceptVisual);
            }

            if (projectCaptionHero) {
                projectCaptionHero.hidden = hideVisuals;
            }
        }

        if (projectRoleSection && projectRoleTitle && projectRoleText) {
            const hasRole = Boolean(project.role && project.role.text);
            projectRoleSection.hidden = !hasRole;
            if (hasRole) {
                if (projectRoleLabel) {
                    projectRoleLabel.textContent = project.role.label || 'ROL';
                }
                projectRoleTitle.textContent = project.role.title || 'Mijn rol in dit project';
                projectRoleText.textContent = project.role.text;
            }
        }

        if (projectPostersSection && projectPostersGrid) {
            const hasPosterGrid = Array.isArray(project.posterGrid) && project.posterGrid.length > 0;
            const hasPhotoGrid = Array.isArray(project.photoGrid) && project.photoGrid.length > 0;
            projectPostersSection.hidden = !(hasPosterGrid || hasPhotoGrid);

            if (hasPosterGrid || hasPhotoGrid) {
                projectPostersGrid.innerHTML = '';
                projectPostersGrid.classList.toggle('is-collage', hasPhotoGrid);

                if (hasPhotoGrid) {
                    project.photoGrid.slice(0, 12).forEach((photo, index) => {
                        const figure = document.createElement('figure');
                        figure.className = 'project-photo-tile';

                        if (index % 5 === 0) figure.classList.add('is-wide');
                        if (index % 3 === 1) figure.classList.add('is-tall');

                        const image = document.createElement('img');
                        image.src = photo.src;
                        image.alt = photo.alt || `Maastricht photo ${index + 1}`;

                        figure.appendChild(image);
                        projectPostersGrid.appendChild(figure);
                    });

                    return;
                }

                project.posterGrid.slice(0, 8).forEach((poster, index) => {
                    const figure = document.createElement('figure');
                    figure.className = 'project-poster-card';

                    const media = document.createElement('div');
                    media.className = 'project-poster-media';
                    media.setAttribute('aria-label', `Poster galerij ${index + 1}`);

                    const track = document.createElement('div');
                    track.className = 'project-poster-track';

                    const slides = [
                        {
                            src: poster.src,
                            alt: poster.alt || `Poster ${index + 1}`,
                            label: 'Poster'
                        },
                        {
                            src: poster.mockupSrc || poster.src,
                            alt: poster.mockupAlt || `${poster.alt || `Poster ${index + 1}`} mockup`,
                            label: 'Mockup'
                        }
                    ];

                    slides.forEach((slide) => {
                        const slideEl = document.createElement('div');
                        slideEl.className = 'project-poster-slide';

                        const image = document.createElement('img');
                        image.src = slide.src;
                        image.alt = slide.alt;

                        slideEl.appendChild(image);
                        track.appendChild(slideEl);
                    });

                    const prevButton = document.createElement('button');
                    prevButton.type = 'button';
                    prevButton.className = 'project-poster-nav project-poster-nav-prev';
                    prevButton.setAttribute('aria-label', 'Vorige weergave');
                    prevButton.textContent = '←';

                    const nextButton = document.createElement('button');
                    nextButton.type = 'button';
                    nextButton.className = 'project-poster-nav project-poster-nav-next';
                    nextButton.setAttribute('aria-label', 'Volgende weergave');
                    nextButton.textContent = '→';

                    const state = document.createElement('p');
                    state.className = 'project-poster-state';

                    const dots = document.createElement('div');
                    dots.className = 'project-poster-dots';

                    const dotButtons = slides.map((slide, slideIndex) => {
                        const dot = document.createElement('button');
                        dot.type = 'button';
                        dot.className = 'project-poster-dot';
                        dot.setAttribute('aria-label', `Ga naar ${slide.label.toLowerCase()}`);
                        dot.addEventListener('click', () => {
                            activeSlide = slideIndex;
                            updateActiveSlide();
                        });
                        dots.appendChild(dot);
                        return dot;
                    });

                    const caption = document.createElement('figcaption');
                    caption.textContent = poster.caption || `Poster ${String(index + 1).padStart(2, '0')}`;

                    let activeSlide = 0;
                    const updateActiveSlide = () => {
                        track.style.transform = `translateX(-${activeSlide * 100}%)`;
                        state.textContent = slides[activeSlide].label;
                        dotButtons.forEach((dot, dotIndex) => {
                            const isActive = dotIndex === activeSlide;
                            dot.classList.toggle('is-active', isActive);
                            dot.setAttribute('aria-current', isActive ? 'true' : 'false');
                        });
                    };

                    prevButton.onclick = () => {
                        activeSlide = activeSlide === 0 ? slides.length - 1 : activeSlide - 1;
                        updateActiveSlide();
                    };

                    nextButton.onclick = () => {
                        activeSlide = activeSlide === slides.length - 1 ? 0 : activeSlide + 1;
                        updateActiveSlide();
                    };

                    let touchStartX = 0;
                    media.addEventListener('touchstart', (event) => {
                        touchStartX = event.changedTouches[0].clientX;
                    }, { passive: true });

                    media.addEventListener('touchend', (event) => {
                        const touchEndX = event.changedTouches[0].clientX;
                        const swipeDistance = touchEndX - touchStartX;

                        if (Math.abs(swipeDistance) < 40) return;

                        if (swipeDistance < 0) {
                            nextButton.click();
                        } else {
                            prevButton.click();
                        }
                    }, { passive: true });

                    updateActiveSlide();

                    media.appendChild(track);
                    media.appendChild(prevButton);
                    media.appendChild(nextButton);
                    figure.appendChild(media);
                    figure.appendChild(state);
                    figure.appendChild(dots);
                    figure.appendChild(caption);
                    projectPostersGrid.appendChild(figure);
                });
            }
        }

        if (projectHeroImage) {
            const hasEmbed = Boolean(project.embed && project.embed.url);
            if (hasEmbed) {
                if (!projectHeroEmbed) {
                    projectHeroEmbed = document.createElement('iframe');
                    projectHeroEmbed.setAttribute('data-project-hero-embed', '');
                    projectHeroEmbed.title = 'Live project preview';
                    projectHeroImage.insertAdjacentElement('afterend', projectHeroEmbed);
                }
                projectHeroImage.hidden = true;
                projectHeroImage.style.display = 'none';
                projectHeroEmbed.hidden = false;
                projectHeroEmbed.style.display = 'block';
                projectHeroEmbed.src = project.embed.url;
                projectHeroEmbed.title = project.embed.title || titlePlain;
            } else {
                projectHeroImage.hidden = false;
                projectHeroImage.style.display = 'block';
                if (projectHeroEmbed) {
                    projectHeroEmbed.hidden = true;
                    projectHeroEmbed.style.display = 'none';
                    projectHeroEmbed.removeAttribute('src');
                }
            }
        }

        if (projectLiveLink) {
            const hasWebsite = Boolean(project.website && project.website.url);
            if (hasWebsite) {
                projectLiveLink.hidden = false;
                projectLiveLink.href = project.website.url;
                projectLiveLink.textContent = project.website.label || 'Bekijk website ↗';
            } else {
                projectLiveLink.hidden = true;
                projectLiveLink.removeAttribute('href');
            }
        }

        if (projectDownloadLink) {
            const hasDownload = Boolean(project.download && project.download.url);
            if (hasDownload) {
                projectDownloadLink.hidden = false;
                projectDownloadLink.href = project.download.url;
                projectDownloadLink.textContent = project.download.label || 'Download font ↓';

                if (project.download.fileName) {
                    projectDownloadLink.setAttribute('download', project.download.fileName);
                } else {
                    projectDownloadLink.setAttribute('download', '');
                }
            } else {
                projectDownloadLink.hidden = true;
                projectDownloadLink.removeAttribute('href');
                projectDownloadLink.setAttribute('download', '');
            }
        }

        const formatVideoTime = (value) => {
            if (!Number.isFinite(value) || value < 0) return '00:00';
            const minutes = Math.floor(value / 60);
            const seconds = Math.floor(value % 60);
            return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        };

        if (projectVideoSection && projectVideo && project.video) {
            projectVideoSection.hidden = false;
            if (projectVideoTitle) projectVideoTitle.textContent = project.video.title;
            if (projectVideoAboutFilm) projectVideoAboutFilm.textContent = project.video.aboutFilm;
            if (projectVideoWhy) projectVideoWhy.textContent = project.video.whyChosen;
            if (projectVideoCaption) {
                const hasCaption = Boolean(project.video.caption && project.video.caption.trim());
                projectVideoCaption.textContent = hasCaption ? project.video.caption : '';
                projectVideoCaption.hidden = !hasCaption;
            }

            projectVideo.src = project.video.src;
            if (project.video.poster) {
                projectVideo.poster = project.video.poster;
            } else {
                projectVideo.removeAttribute('poster');
            }
            projectVideo.setAttribute('aria-label', `${titlePlain} video preview`);

            const setActiveControl = (control) => {
                [videoPlayButton, videoPauseButton].forEach((button) => {
                    if (!button) return;
                    const isActive = button === control;
                    button.classList.toggle('is-active', isActive);
                    button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
                });
            };

            const updateVideoTime = () => {
                if (!videoTimeTarget) return;
                const current = formatVideoTime(projectVideo.currentTime);
                const duration = formatVideoTime(projectVideo.duration);
                videoTimeTarget.textContent = `${current} / ${duration}`;
            };

            const updateVideoProgress = () => {
                if (!videoProgress) return;
                const duration = projectVideo.duration;
                if (!Number.isFinite(duration) || duration <= 0) {
                    videoProgress.value = '0';
                    videoProgress.style.setProperty('--progress', '0%');
                    return;
                }

                const percent = (projectVideo.currentTime / duration) * 100;
                videoProgress.value = String(percent);
                videoProgress.style.setProperty('--progress', `${percent}%`);
            };

            updateVideoTime();
            updateVideoProgress();

            if (videoPlayButton) {
                videoPlayButton.onclick = () => {
                    projectVideo.play().catch(() => {
                        // Playback may be blocked by browser gesture policies.
                    });
                    setActiveControl(videoPlayButton);
                };
            }

            if (videoPauseButton) {
                videoPauseButton.onclick = () => {
                    projectVideo.pause();
                    setActiveControl(videoPauseButton);
                };
            }

            if (videoReplayButton) {
                videoReplayButton.onclick = () => {
                    projectVideo.currentTime = 0;
                    projectVideo.play().catch(() => {
                        // Playback may be blocked by browser gesture policies.
                    });
                    setActiveControl(videoPlayButton || null);
                    updateVideoProgress();
                };
            }

            if (videoProgress) {
                videoProgress.oninput = () => {
                    const duration = projectVideo.duration;
                    if (!Number.isFinite(duration) || duration <= 0) return;

                    const percent = Number(videoProgress.value);
                    projectVideo.currentTime = (percent / 100) * duration;
                    videoProgress.style.setProperty('--progress', `${percent}%`);
                    updateVideoTime();
                };
            }

            projectVideo.onloadedmetadata = updateVideoTime;
            projectVideo.ontimeupdate = () => {
                updateVideoTime();
                updateVideoProgress();
            };
            projectVideo.onloadedmetadata = () => {
                updateVideoTime();
                updateVideoProgress();
            };
            projectVideo.onended = () => {
                setActiveControl(videoPauseButton || null);
                updateVideoTime();
                updateVideoProgress();
            };
        } else if (projectVideoSection) {
            projectVideoSection.hidden = true;
        }
        document.title = `Project - ${titlePlain}`;
        if (pageDescription) {
            pageDescription.setAttribute('content', `${titlePlain} project detail page from the portfolio of Puck Roskamp.`);
        }
    }
})();

