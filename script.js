/* ==========================================
   PERSONAL AI VIDEO PRODUCTION PORTFOLIO - INTERACTIVE LOGIC
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* Custom Cursor Logic Disabled - using standard browser cursor */

    /* -----------------------------------------
       2. Scroll-Activated Header
       ----------------------------------------- */
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* Mobile Drawer Navigation Removed */

    /* -----------------------------------------
       4. Floating Follower Removed (Grid is now visible directly)
       ----------------------------------------- */

    /* -----------------------------------------
       5. Duplicate Testimonial Marquee
       ----------------------------------------- */
    const marqueeTrack = document.getElementById('marquee-track-1');
    if (marqueeTrack) {
        const originalContent = marqueeTrack.innerHTML;
        // Duplicate once to make it seamless
        marqueeTrack.innerHTML = originalContent + originalContent;
    }

    /* -----------------------------------------
       6. Reveal-on-Scroll Observer
       ----------------------------------------- */
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* Mad-Libs Form Handlers Removed */

    /* -----------------------------------------
       8. Widescreen Lightbox Detail Pane
       ----------------------------------------- */
    // Database of project metrics
    const projectsArchive = {
        "1": {
            title: "FitFeast Protein Chips",
            tag: "9:16 PORTRAIT AD",
            goal: "A dynamic, high energy product showcase for healthy Protein Chips to make the snack look mouth watering and irresistible.",
            palette: ["#d35400", "#c0392b", "#f1c40f"],
            videoSrc: "https://vimeo.com/1199216701?fl=ip&fe=ec"
        },
        "2": {
            title: "Mamaearth Ubtan Wash",
            tag: "9:16 SOCIAL REEL",
            goal: "A glowing, organic beauty ad for tan removal face wash to highlight natural turmeric ingredients.",
            palette: ["#f39c12", "#e67e22", "#27ae60"],
            videoSrc: "https://vimeo.com/1199216777?fl=ip&fe=ec"
        },
        "3": {
            title: "WOX Energy Drink",
            tag: "9:16 PRODUCT COMMERCIAL",
            goal: "A bold, high contrast energy commercial featuring a red-can Energy Drink to create an intense brand feel.",
            palette: ["#e74c3c", "#1a1a1a", "#f39c12"],
            videoSrc: "https://vimeo.com/1199216604?share=copy&fl=sv&fe=ci"
        },
        "4": {
            title: "7up Pink Lemonade",
            tag: "9:16 MOBILE AD",
            goal: "A dreamy, summer themed pink 7up lemonade commercial to establish a refreshing product aesthetic.",
            palette: ["#ff6b8b", "#fcd846", "#2ecc71"],
            videoSrc: "https://vimeo.com/1199216669?share=copy&fl=sv&fe=ci"
        },
        "5": {
            title: "Dr. Rashel Skin Essence",
            tag: "9:16 BEAUTY CAMPAIGN",
            goal: "An elegant laboratory inspired ten second commercial for Glass Skin Essence to convey clinical skincare efficacy.",
            palette: ["#7ed6df", "#ffffff"],
            videoSrc: "https://vimeo.com/1199216911?fl=ip&fe=ec"
        }
    };

    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxVideo = document.getElementById('lightbox-video');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxTag = document.getElementById('lightbox-tag');
    const lightboxGoal = document.getElementById('lightbox-goal');
    const lightboxPalette = document.getElementById('lightbox-palette');

    const workCards = document.querySelectorAll('.work-card');
    workCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project-id');
            const data = projectsArchive[projectId];

            if (data) {
                // Populate contents
                lightboxTag.textContent = data.tag;
                lightboxTitle.textContent = data.title;
                lightboxGoal.textContent = data.goal;

                // Clear and rebuild color palette swatches
                lightboxPalette.innerHTML = '';
                data.palette.forEach(color => {
                    const swatch = document.createElement('div');
                    swatch.className = 'palette-swatch';
                    swatch.style.backgroundColor = color;
                    swatch.title = color;
                    lightboxPalette.appendChild(swatch);
                });

                // Handle Video Source (Check if Vimeo)
                const screenContainer = document.getElementById('lightbox-screen-container');

                // Remove any existing iframe
                const existingIframe = screenContainer.querySelector('iframe');
                if (existingIframe) {
                    existingIframe.remove();
                }

                if (data.videoSrc.includes('vimeo.com')) {
                    // Hide native video tag
                    lightboxVideo.style.display = 'none';
                    lightboxVideo.src = '';

                    // Create Vimeo iframe (handles standard, player, or sharing links)
                    let vimeoId = '';
                    if (data.videoSrc.includes('player.vimeo.com/video/')) {
                        vimeoId = data.videoSrc.split('/video/')[1].split('?')[0];
                    } else {
                        vimeoId = data.videoSrc.split('/').pop().split('?')[0];
                    }

                    const iframe = document.createElement('iframe');
                    iframe.src = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&loop=1&background=0&muted=0&quality=1080p`;
                    iframe.style.width = '100%';
                    iframe.style.height = '100%';
                    iframe.style.border = 'none';
                    iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
                    iframe.setAttribute('allowfullscreen', '');
                    screenContainer.appendChild(iframe);
                } else {
                    // Show native video tag
                    lightboxVideo.style.display = 'block';
                    lightboxVideo.src = data.videoSrc;

                    // Play video
                    lightboxVideo.muted = false;
                    lightboxVideo.play().catch(e => {
                        console.log("Audio block prevented play. Playing muted instead.", e);
                        lightboxVideo.muted = true;
                        lightboxVideo.play();
                    });
                }

                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // Lock background scroll
            }
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore background scroll

        // Pause and clear native video
        lightboxVideo.pause();
        lightboxVideo.src = '';

        // Remove Vimeo iframe if it exists
        const screenContainer = document.getElementById('lightbox-screen-container');
        const iframe = screenContainer.querySelector('iframe');
        if (iframe) {
            iframe.remove();
        }
    }

    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

});
