// ======================================
// TEACHER BIRTHDAY CELEBRATION
// Dedicated to Oliver S. Turtor
// FAITHfuls 2026 Students
// ======================================

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

const surpriseBtn = document.getElementById("surpriseBtn");
const celebrateBtn = document.getElementById("celebrateBtn");
const message = document.getElementById("message");
const toast = document.getElementById("toast");

let particles = [];
let animationFrame = null;

let width = 0;
let height = 0;
let pixelRatio = 1;

let isVisible = !document.hidden;
let messageOpened = false;
let isCelebrating = false;

const MAX_PARTICLES = 45;

const colors = [
    "#f7d77a",
    "#fff2c2",
    "#b9e6c8",
    "#ffffff"
];

// ======================================
// CANVAS SETUP
// ======================================

function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;

    pixelRatio = Math.min(
        window.devicePixelRatio || 1,
        1.5
    );

    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    ctx.setTransform(
        pixelRatio,
        0,
        0,
        pixelRatio,
        0,
        0
    );

    createParticles();
    renderParticles();
}

window.addEventListener("resize", resizeCanvas);

// ======================================
// CREATE GOLDEN PARTICLES
// ======================================

function createParticles() {
    particles = [];

    for (let i = 0; i < MAX_PARTICLES; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,

            radius: Math.random() * 2 + 0.5,

            speedY: Math.random() * 0.35 + 0.12,
            speedX: (Math.random() - 0.5) * 0.25,

            alpha: Math.random() * 0.6 + 0.2,

            color: colors[
                Math.floor(Math.random() * colors.length)
            ],

            phase: Math.random() * Math.PI * 2
        });
    }
}

// ======================================
// UPDATE AND DRAW BACKGROUND PARTICLES
// ======================================

function updateParticles() {
    const time = performance.now() * 0.001;

    for (const p of particles) {
        p.y -= p.speedY;

        p.x += p.speedX +
            Math.sin(time + p.phase) * 0.15;

        if (p.y < -5) {
            p.y = height + 5;
            p.x = Math.random() * width;
        }

        if (p.x < -5) {
            p.x = width + 5;
        }

        if (p.x > width + 5) {
            p.x = -5;
        }
    }
}

function drawParticles() {
    for (const p of particles) {
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;

        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.radius,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }

    ctx.globalAlpha = 1;
}

function renderParticles() {
    ctx.clearRect(0, 0, width, height);

    drawParticles();
}

function animate() {
    animationFrame = null;

    if (!isVisible) {
        return;
    }

    updateParticles();

    ctx.clearRect(0, 0, width, height);

    drawParticles();

    animationFrame = requestAnimationFrame(animate);
}

function startAnimation() {
    if (
        isVisible &&
        !animationFrame &&
        !isCelebrating
    ) {
        animationFrame = requestAnimationFrame(animate);
    }
}

function stopAnimation() {
    if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
    }
}

// ======================================
// PAUSE WHEN PAGE IS HIDDEN
// ======================================

document.addEventListener("visibilitychange", () => {
    isVisible = !document.hidden;

    if (isVisible) {
        startAnimation();
    } else {
        stopAnimation();
    }
});

// ======================================
// TOAST NOTIFICATION
// ======================================

let toastTimer;

function showToast(text) {
    toast.textContent = text;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2600);
}

// ======================================
// OPEN BIRTHDAY SURPRISE
// ======================================

surpriseBtn.addEventListener("click", () => {
    if (messageOpened) {
        message.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        showToast("A special birthday wish for Sir Oliver! 💛");

        return;
    }

    messageOpened = true;

    message.classList.remove("hidden");

    requestAnimationFrame(() => {
        message.classList.add("show");

        message.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    });

    surpriseBtn.textContent =
        "💛 YOUR BIRTHDAY SURPRISE IS OPEN";

    showToast("Happy Birthday, Sir Oliver! 🎂");
});

// ======================================
// COLORFUL CELEBRATION EFFECT
// ======================================

function createCelebration() {
    if (isCelebrating) {
        showToast("The celebration is already happening! 🎉");
        return;
    }

    isCelebrating = true;

    stopAnimation();

    const burstColors = [
        "#f7d77a",
        "#ffffff",
        "#ff9fba",
        "#a8e6cf",
        "#c7b8ff",
        "#ffb347"
    ];

    const originX = width / 2;
    const originY = Math.max(100, height * 0.25);

    const burstParticles = [];

    const burstCount = 65;

    for (let i = 0; i < burstCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;

        burstParticles.push({
            x: originX,
            y: originY,

            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 1,

            size: Math.random() * 3 + 1,

            life: 1,

            decay: Math.random() * 0.018 + 0.012,

            color: burstColors[
                Math.floor(Math.random() * burstColors.length)
            ]
        });
    }

    let frame = 0;

    const maxFrames = 100;

    function drawCelebration() {
        animationFrame = null;

        if (!isVisible) {
            isCelebrating = false;
            return;
        }

        ctx.clearRect(0, 0, width, height);

        // Keep the golden background particles moving.

        updateParticles();
        drawParticles();

        // Draw the celebration particles.

        for (const p of burstParticles) {
            p.x += p.vx;
            p.y += p.vy;

            p.vy += 0.045;

            p.life -= p.decay;

            ctx.globalAlpha = Math.max(0, p.life);
            ctx.fillStyle = p.color;

            ctx.beginPath();

            ctx.arc(
                p.x,
                p.y,
                p.size,
                0,
                Math.PI * 2
            );

            ctx.fill();
        }

        ctx.globalAlpha = 1;

        frame++;

        if (frame < maxFrames) {
            animationFrame = requestAnimationFrame(
                drawCelebration
            );
        } else {
            isCelebrating = false;
            startAnimation();
        }
    }

    animationFrame = requestAnimationFrame(
        drawCelebration
    );
}

// ======================================
// CELEBRATION BUTTON
// ======================================

celebrateBtn.addEventListener("click", () => {
    createCelebration();

    showToast(
        "Cheers to an amazing teacher! Happy Birthday! 🎂"
    );
});

// ======================================
// INITIALIZE WEBSITE
// ======================================

resizeCanvas();
startAnimation();
