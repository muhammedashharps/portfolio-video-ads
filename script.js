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

    /* -----------------------------------------
       9. Creative Stickman Engagement Visualizer (2D Canvas)
       ----------------------------------------- */
    const canvas = document.getElementById('brain-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let active = false;

        // Dimensions and layout variables
        let logicalWidth = 0;
        let logicalHeight = 0;
        let floorY = 0;
        let adCard = {
            x: 0,
            y: 0,
            width: 130,
            height: 170,
            pulseScale: 1.0,
            angle: 0
        };

        let stickman = {
            x: -40,
            y: 0, // calculated from floorY
            scale: 0.9,
            angle: 0,
            yOffset: 0
        };

        const initScene = () => {
            floorY = logicalHeight * 0.72;
            stickman.y = floorY;
            adCard.x = logicalWidth * 0.75;
            adCard.y = logicalHeight * 0.38;
        };

        // Resize handler to match container client dimensions and handle high-DPI (Retina/Mobile) screens
        const resizeCanvas = () => {
            const wrap = document.getElementById('neural-canvas-wrap');
            if (wrap) {
                logicalWidth = wrap.clientWidth;
                logicalHeight = wrap.clientHeight;
                const dpr = window.devicePixelRatio || 1;
                canvas.width = logicalWidth * dpr;
                canvas.height = logicalHeight * dpr;
                canvas.style.width = logicalWidth + 'px';
                canvas.style.height = logicalHeight + 'px';
                ctx.scale(dpr, dpr);
            }
        };
        resizeCanvas();
        initScene();
        window.addEventListener('resize', () => {
            resizeCanvas();
            initScene();
        });

        // State variables
        let state = 'walking'; // 'walking', 'hooked', 'drawn', 'clicking', 'celebrating', 'walking_off'
        let animTime = 0;
        let stateElapsedTime = 0;
        let lastTime = 0;
        let lastRingSpawn = 0;
        let hasClicked = false;
        let flowParticleTimer = 0;

        // Particles System
        let particles = [];
        let attentionRings = [];

        function spawnExplosion(x, y) {
            const colors = ['#d4af37', '#c5a880', '#efede8', '#ffeaa7', '#ffe66d'];
            for (let i = 0; i < 120; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = 150 + Math.random() * 350;
                particles.push({
                    x: x,
                    y: y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed - (80 + Math.random() * 180),
                    size: 2 + Math.random() * 5,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    alpha: 1.0,
                    decay: 0.6 + Math.random() * 0.8,
                    gravity: 600,
                    type: Math.random() < 0.25 ? 'dollar' : (Math.random() < 0.25 ? 'star' : 'coin')
                });
            }
        }

        function spawnFlowParticles(startX, startY, endX, endY, dt) {
            flowParticleTimer += dt;
            if (flowParticleTimer > 0.05) {
                flowParticleTimer = 0;
                const colors = ['#d4af37', '#c5a880', '#ffffff'];
                particles.push({
                    x: startX,
                    y: startY,
                    startX: startX,
                    startY: startY,
                    targetX: endX,
                    targetY: endY,
                    vx: -180 - Math.random() * 120,
                    vy: (Math.random() - 0.5) * 160,
                    size: 1.5 + Math.random() * 3,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    alpha: 1.0,
                    decay: 0.8,
                    type: 'flow',
                    amplitude: 6 + Math.random() * 10,
                    freq: 3.0 + Math.random() * 3.0,
                    phase: Math.random() * Math.PI * 2
                });
            }
        }

        function spawnPhoneSpark(x, y) {
            for (let i = 0; i < 15; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = 80 + Math.random() * 120;
                particles.push({
                    x: x,
                    y: y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed - 60,
                    size: 1 + Math.random() * 2,
                    color: '#7ed6df',
                    alpha: 1.0,
                    decay: 2.2,
                    gravity: 400,
                    type: 'spark'
                });
            }
        }

        let flipFrame = 0;
        let flipDuration = 45;

        // Draw Stickman function
        function drawStickman(ctx, x, y, scale, state, animTime, angleOffset = 0, stateTimer = 0) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angleOffset);
            ctx.scale(scale, scale);

            ctx.strokeStyle = '#c5a880';
            ctx.lineWidth = 4;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.shadowBlur = 15;
            ctx.shadowColor = 'rgba(197, 168, 128, 0.6)';

            let torsoLen = 40;
            let limbLen = 25;
            let headRadius = 10;

            let neckX = 0, neckY = -torsoLen;
            let headX = 0, headY = -torsoLen - headRadius - 2;

            let leftArmAngle = 0;
            let rightArmAngle = 0;
            let leftElbowAngle = 0;
            let rightElbowAngle = 0;

            let leftLegAngle = 0;
            let rightLegAngle = 0;
            let leftKneeAngle = 0;
            let rightKneeAngle = 0;

            if (state === 'walking' || state === 'walking_off') {
                const speed = state === 'walking_off' ? 1.0 : 0.6;
                const cycle = animTime * 4 * speed;
                leftLegAngle = Math.sin(cycle) * 0.3;
                rightLegAngle = -Math.sin(cycle) * 0.3;
                leftKneeAngle = 0.2 + Math.cos(cycle) * 0.15;
                rightKneeAngle = 0.2 - Math.cos(cycle) * 0.15;

                leftArmAngle = Math.sin(cycle + Math.PI) * 0.25;
                leftElbowAngle = 0.15;

                if (state === 'walking') {
                    rightArmAngle = 0.55;
                    rightElbowAngle = -0.7;
                    headX = 3;
                    headY = -torsoLen - headRadius - 1;
                } else {
                    rightArmAngle = -0.6 + Math.sin(animTime * 6) * 0.3;
                    rightElbowAngle = -0.15;
                }
            }
            else if (state === 'hooked') {
                leftLegAngle = -0.04;
                rightLegAngle = 0.04;

                leftArmAngle = -0.15;
                rightArmAngle = -0.1;

                headX = -1;
                headY = -torsoLen - headRadius - 3;
            }
            else if (state === 'drawn') {
                const cycle = animTime * 3;
                leftLegAngle = Math.sin(cycle) * 0.2;
                rightLegAngle = -Math.sin(cycle) * 0.2;
                leftKneeAngle = 0.1;
                rightKneeAngle = 0.1;

                leftArmAngle = 0.8;
                leftElbowAngle = -0.15;
                rightArmAngle = 0.9;
                rightElbowAngle = -0.2;

                headX = 1;
                headY = -torsoLen - headRadius - 1;
            }
            else if (state === 'clicking') {
                leftLegAngle = -0.04;
                rightLegAngle = 0.04;

                leftArmAngle = 0.15;
                leftElbowAngle = 0.1;

                // Reach arm forward over time
                const reachProgress = Math.min(stateTimer / 2.0, 1.0); // reaches full extension over 2.0 seconds
                rightArmAngle = reachProgress * 1.35;
                rightElbowAngle = reachProgress * -0.1;

                headX = 1.5;
                headY = -torsoLen - headRadius - 1;
            }
            else if (state === 'celebrating') {
                const cycle = animTime * 6;
                const sway = Math.sin(cycle) * 0.08;
                ctx.rotate(sway);

                leftArmAngle = -2.1 + Math.sin(cycle) * 0.3;
                rightArmAngle = 2.1 + Math.sin(cycle) * 0.3;
                leftElbowAngle = -0.25;
                rightElbowAngle = -0.25;

                leftLegAngle = -0.12 + Math.sin(cycle * 0.5) * 0.08;
                rightLegAngle = 0.12 - Math.sin(cycle * 0.5) * 0.08;
                leftKneeAngle = 0.05;
                rightKneeAngle = 0.05;

                headY = -torsoLen - headRadius - 3 + Math.sin(cycle) * 1.0;
            }

            // Draw Torso
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(neckX, neckY);
            ctx.stroke();

            // Draw Head
            ctx.beginPath();
            ctx.arc(headX, headY, headRadius, 0, Math.PI * 2);
            ctx.stroke();

            // Draw Left Leg
            let leftKneeX = Math.sin(leftLegAngle) * limbLen;
            let leftKneeY = Math.cos(leftLegAngle) * limbLen;
            let leftFootX = leftKneeX + Math.sin(leftLegAngle + leftKneeAngle) * limbLen;
            let leftFootY = leftKneeY + Math.cos(leftLegAngle + leftKneeAngle) * limbLen;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(leftKneeX, leftKneeY);
            ctx.lineTo(leftFootX, leftFootY);
            ctx.stroke();

            // Draw Right Leg
            let rightKneeX = Math.sin(rightLegAngle) * limbLen;
            let rightKneeY = Math.cos(rightLegAngle) * limbLen;
            let rightFootX = rightKneeX + Math.sin(rightLegAngle + rightKneeAngle) * limbLen;
            let rightFootY = rightKneeY + Math.cos(rightLegAngle + rightKneeAngle) * limbLen;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(rightKneeX, rightKneeY);
            ctx.lineTo(rightFootX, rightFootY);
            ctx.stroke();

            // Draw Left Arm
            let leftElbowX = neckX + Math.sin(leftArmAngle) * limbLen * 0.8;
            let leftElbowY = neckY + Math.cos(leftArmAngle) * limbLen * 0.8;
            let leftHandX = leftElbowX + Math.sin(leftArmAngle + leftElbowAngle) * limbLen * 0.8;
            let leftHandY = leftElbowY + Math.cos(leftArmAngle + leftElbowAngle) * limbLen * 0.8;
            ctx.beginPath();
            ctx.moveTo(neckX, neckY);
            ctx.lineTo(leftElbowX, leftElbowY);
            ctx.lineTo(leftHandX, leftHandY);
            ctx.stroke();

            // Draw Right Arm
            let rightElbowX = neckX + Math.sin(rightArmAngle) * limbLen * 0.8;
            let rightElbowY = neckY + Math.cos(rightArmAngle) * limbLen * 0.8;
            let rightHandX = rightElbowX + Math.sin(rightArmAngle + rightElbowAngle) * limbLen * 0.8;
            let rightHandY = rightElbowY + Math.cos(rightArmAngle + rightElbowAngle) * limbLen * 0.8;
            ctx.beginPath();
            ctx.moveTo(neckX, neckY);
            ctx.lineTo(rightElbowX, rightElbowY);
            ctx.lineTo(rightHandX, rightHandY);
            ctx.stroke();

            if (state === 'walking') {
                ctx.strokeStyle = '#7ed6df';
                ctx.lineWidth = 2;
                ctx.shadowColor = '#7ed6df';
                ctx.beginPath();
                ctx.moveTo(rightHandX - 1, rightHandY - 4);
                ctx.lineTo(rightHandX + 3, rightHandY + 2);
                ctx.stroke();
            }

            ctx.restore();
        }

        // Animation Loop
        function updateAndRender(timestamp) {
            if (!active) {
                lastTime = 0;
                animationFrameId = requestAnimationFrame(updateAndRender);
                return;
            }

            if (!timestamp) timestamp = performance.now();
            if (!lastTime) lastTime = timestamp;
            const dt = Math.min((timestamp - lastTime) / 1000, 0.1);
            lastTime = timestamp;

            const dpr = window.devicePixelRatio || 1;
            const logicalWidth = canvas.clientWidth;
            const logicalHeight = canvas.clientHeight;
            if (canvas.width !== logicalWidth * dpr || canvas.height !== logicalHeight * dpr) {
                canvas.width = logicalWidth * dpr;
                canvas.height = logicalHeight * dpr;
                ctx.scale(dpr, dpr);
            }

            ctx.clearRect(0, 0, logicalWidth, logicalHeight);

            floorY = logicalHeight * 0.72;
            adCard.x = logicalWidth * 0.75;
            adCard.y = logicalHeight * 0.38;

            animTime += dt;
            stateElapsedTime += dt;

            // Draw grid lines
            ctx.strokeStyle = 'rgba(197, 168, 128, 0.035)';
            ctx.lineWidth = 1;
            const gridSize = 50;
            for (let x = 0; x < logicalWidth; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, logicalHeight);
                ctx.stroke();
            }
            for (let y = 0; y < logicalHeight; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(logicalWidth, y);
                ctx.stroke();
            }

            // Ground line
            ctx.strokeStyle = 'rgba(239, 237, 232, 0.12)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, floorY);
            ctx.lineTo(logicalWidth, floorY);
            ctx.stroke();

            // 1. Update positions by state
            if (state === 'walking') {
                stickman.x += 60 * dt;
                stickman.y = floorY;
                stickman.angle = 0;
                stickman.yOffset = 0;

                if (timestamp - lastRingSpawn > 3000) {
                    attentionRings.push({ r: 10, maxR: 160, alpha: 0.8 });
                    lastRingSpawn = timestamp;
                }

                if (stickman.x >= logicalWidth * 0.38) {
                    state = 'hooked';
                    stateElapsedTime = 0;
                    spawnPhoneSpark(stickman.x + 8, floorY - 20);
                }
            }
            else if (state === 'hooked') {
                stickman.y = floorY;
                if (stateElapsedTime > 4.0) {
                    state = 'drawn';
                    stateElapsedTime = 0;
                }
            }
            else if (state === 'drawn') {
                const targetX = adCard.x - 70;
                stickman.x += (targetX - stickman.x) * (1 - Math.exp(-1.5 * dt));
                stickman.y = floorY;
                stickman.yOffset = 0;

                spawnFlowParticles(adCard.x - 20, adCard.y + 40, stickman.x, stickman.y - 25, dt);

                // Guarantee at least 5.0 seconds for Stage 3 text reading
                if (stateElapsedTime > 5.0 && Math.abs(stickman.x - targetX) < 15) {
                    state = 'clicking';
                    stateElapsedTime = 0;
                    hasClicked = false;
                }
            }
            else if (state === 'clicking') {
                stickman.y = floorY;
                stickman.yOffset = 0;

                // Reach arm and trigger click at 2.5 seconds (reaches full extension over 2.0s)
                if (stateElapsedTime >= 2.5 && !hasClicked) {
                    spawnExplosion(adCard.x, adCard.y + adCard.height * 0.7);
                    hasClicked = true;
                }

                // Transition to celebrating after 5.0 seconds total of Stage 4
                if (stateElapsedTime > 5.0) {
                    state = 'celebrating';
                    stateElapsedTime = 0;
                }
            }
            else if (state === 'celebrating') {
                stickman.angle = 0;
                stickman.yOffset = 0;
                stickman.y = floorY;

                // 5.0 seconds of Stage 5 text reading
                if (stateElapsedTime > 5.0) {
                    state = 'walking_off';
                    stateElapsedTime = 0;
                }
            }
            else if (state === 'walking_off') {
                stickman.x += 90 * dt;
                stickman.y = floorY;
                stickman.yOffset = 0;
                stickman.angle = 0;

                if (stickman.x > logicalWidth + 50) {
                    stickman.x = -50;
                    state = 'walking';
                    stateElapsedTime = 0;
                }
            }

            // 2. Draw Ad card
            ctx.save();
            ctx.translate(adCard.x, adCard.y);
            adCard.angle = Math.sin(animTime * 1.5) * 0.05;
            ctx.rotate(adCard.angle);

            ctx.shadowBlur = 20;
            ctx.shadowColor = 'rgba(197, 168, 128, 0.4)';
            ctx.fillStyle = 'rgba(16, 16, 17, 0.75)';
            ctx.strokeStyle = '#c5a880';
            ctx.lineWidth = 2;

            ctx.beginPath();
            ctx.roundRect(-adCard.width / 2, 0, adCard.width, adCard.height, 12);
            ctx.fill();
            ctx.stroke();

            ctx.shadowBlur = 5;
            ctx.fillStyle = '#c5a880';
            ctx.textAlign = 'center';
            ctx.font = '10px "DM Mono", monospace';
            ctx.fillText("CAMPAIGN AD", 0, 22);

            ctx.strokeStyle = 'rgba(197, 168, 128, 0.2)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(-adCard.width / 2 + 10, 30);
            ctx.lineTo(adCard.width / 2 - 10, 30);
            ctx.stroke();

            if (state === 'walking' || state === 'hooked') {
                ctx.fillStyle = 'rgba(197, 168, 128, 0.1)';
                ctx.beginPath();
                ctx.arc(0, 80, 25, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#c5a880';
                ctx.lineWidth = 2;
                ctx.stroke();

                ctx.fillStyle = '#c5a880';
                ctx.beginPath();
                ctx.moveTo(-5, 70);
                ctx.lineTo(10, 80);
                ctx.lineTo(-5, 90);
                ctx.closePath();
                ctx.fill();

                ctx.font = '8px "DM Mono", monospace';
                ctx.fillText("AWAITING VIEW", 0, 130);

                if (Math.floor(animTime * 2) % 2 === 0) {
                    ctx.fillStyle = '#d4af37';
                    ctx.beginPath();
                    ctx.arc(0, 145, 3, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            else if (state === 'drawn') {
                const heartScale = 1.0 + Math.sin(animTime * 6) * 0.15;
                ctx.save();
                ctx.scale(heartScale, heartScale);
                ctx.fillStyle = '#d4af37';
                ctx.shadowColor = '#d4af37';
                ctx.shadowBlur = 10;
                ctx.beginPath();
                ctx.moveTo(0, 68);
                ctx.bezierCurveTo(-12, 58, -20, 72, 0, 92);
                ctx.bezierCurveTo(20, 72, 12, 58, 0, 68);
                ctx.fill();
                ctx.restore();

                ctx.font = '10px "DM Mono", monospace';
                ctx.fillStyle = '#ffe66d';
                ctx.fillText("EMOTION STAGE", 0, 128);
                ctx.font = '7px "DM Mono", monospace';
                ctx.fillText("VIEWER ENGAGED", 0, 142);
            }
            else if (state === 'clicking' || state === 'celebrating' || state === 'walking_off') {
                ctx.fillStyle = '#d4af37';
                ctx.beginPath();
                ctx.roundRect(-adCard.width / 2 + 15, 60, adCard.width - 30, 40, 6);
                ctx.fill();

                ctx.fillStyle = '#080808';
                ctx.font = 'bold 11px "Plus Jakarta Sans", sans-serif';
                ctx.fillText("CONVERT", 0, 84);

                ctx.fillStyle = '#c5a880';
                ctx.font = '10px "DM Mono", monospace';
                if (state === 'clicking') {
                    ctx.fillText("DECISION STAGE", 0, 130);
                } else {
                    ctx.fillStyle = '#6ab04c';
                    ctx.fillText("SUCCESS! 100%", 0, 130);
                }
            }
            ctx.restore();

            // 3. Draw attention waves
            ctx.lineWidth = 1.5;
            for (let i = attentionRings.length - 1; i >= 0; i--) {
                const ring = attentionRings[i];
                ring.r += 90 * dt;
                ring.alpha -= 0.48 * dt;
                if (ring.alpha <= 0) {
                    attentionRings.splice(i, 1);
                    continue;
                }
                ctx.save();
                ctx.strokeStyle = `rgba(197, 168, 128, ${ring.alpha})`;
                ctx.shadowBlur = 10;
                ctx.shadowColor = 'rgba(197, 168, 128, 0.4)';
                ctx.beginPath();
                ctx.arc(adCard.x, adCard.y + 80, ring.r, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            }

            // 4. Draw stickman
            drawStickman(ctx, stickman.x, stickman.y + stickman.yOffset, stickman.scale, state, animTime, stickman.angle, stateElapsedTime);

            // 5. Update and Draw particles
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];

                if (p.type === 'flow') {
                    p.x += p.vx * dt;
                    const wave = Math.sin(animTime * 15 + p.phase) * p.amplitude * p.alpha;
                    p.y = p.targetY + p.vy * dt + wave + (p.startY - p.targetY) * p.alpha;
                    p.x = p.targetX + (p.x - p.targetX) * Math.exp(-4 * dt);

                    p.alpha -= p.decay * dt;
                    if (p.alpha <= 0 || p.x <= p.targetX) {
                        particles.splice(i, 1);
                        continue;
                    }

                    ctx.fillStyle = p.color;
                    ctx.shadowBlur = 6;
                    ctx.shadowColor = p.color;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                }
                else if (p.type === 'spark' || p.type === 'coin' || p.type === 'dollar' || p.type === 'star') {
                    p.x += p.vx * dt;
                    p.vy += p.gravity * dt;
                    p.y += p.vy * dt;
                    p.alpha -= p.decay * dt;

                    if (p.alpha <= 0 || p.y > floorY + 40) {
                        particles.splice(i, 1);
                        continue;
                    }

                    ctx.save();
                    ctx.globalAlpha = p.alpha;
                    ctx.fillStyle = p.color;
                    ctx.shadowBlur = p.type === 'spark' ? 5 : 8;
                    ctx.shadowColor = p.color;

                    if (p.type === 'spark') {
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                        ctx.fill();
                    }
                    else if (p.type === 'coin') {
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.strokeStyle = '#080808';
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                    else if (p.type === 'dollar') {
                        ctx.font = `bold ${Math.floor(p.size * 2) + 6}px Arial`;
                        ctx.fillText("$", p.x, p.y);
                    }
                    else if (p.type === 'star') {
                        ctx.font = `${Math.floor(p.size * 2) + 6}px Arial`;
                        ctx.fillText("★", p.x, p.y);
                    }
                    ctx.restore();
                }
            }

            // 6. Draw narrative labels
            ctx.save();
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            let tagText = "";
            let tagColor = "#c5a880";

            if (state === 'walking') {
                tagText = "STAGE 1: SCROLL STOPPING";
                tagColor = "#8a8885";
            }
            else if (state === 'hooked') {
                tagText = "STAGE 2: ATTENTION TRIGGERED";
                tagColor = "#7ed6df";
            }
            else if (state === 'drawn') {
                tagText = "STAGE 3: EMOTIONAL RESONANCE";
                tagColor = "#d4af37";
            }
            else if (state === 'clicking') {
                tagText = "STAGE 4: CALL TO ACTION";
                tagColor = "#ffe66d";
            }
            else if (state === 'celebrating') {
                tagText = "STAGE 5: SUCCESSFUL CONVERSION";
                tagColor = "#2ecc71";
            }
            else if (state === 'walking_off') {
                tagText = "CAMPAIGN METRIC: 100% RETENTION";
                tagColor = "#c5a880";
            }

            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.fillStyle = tagColor;
            ctx.font = 'bold 12px "DM Mono", monospace';
            ctx.fillText(tagText, logicalWidth / 2, 55);

            ctx.restore();

            animationFrameId = requestAnimationFrame(updateAndRender);
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                active = entry.isIntersecting;
                if (active) {
                    lastTime = performance.now();
                }
            });
        }, { threshold: 0.1 });
        observer.observe(canvas);

        updateAndRender();
    }

});
