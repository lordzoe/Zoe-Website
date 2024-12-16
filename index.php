<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zoé Victoria Lord - Home</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
    <!-- Navigation -->
    <?php include 'navigation.html'; ?>

    <!-- Animated Background -->
    <canvas id="orb-canvas"></canvas>

    <!-- Main Content -->
    <main>
        <h2>Welcome to Zoé Victoria Lord's website</h2>
        <p>Here you will find information about me and my projects.</p>

        <section class="content-container">

            <!-- Content Box 1 -->
            <div class="content-box" onclick="expandBox(this)">
                <div class="content-image">
                    <img src="image.png" alt="Silk Roads">
                </div>
                <div class="content-info">
                    <h2>Silk Roads</h2>
                    <p>Exhibition: 26 September 2024 – 23 February 2025</p>
                </div>
                <div class="content-details">
                    <?php include('silk_roads.html'); ?>
                </div>
            </div>

            <!-- Content Box 2 -->
            <div class="content-box" onclick="expandBox(this)">
                <div class="content-image">
                    <img src="image.png" alt="Hew Locke">
                </div>
                <div class="content-info">
                    <h2>Hew Locke</h2>
                    <p>Exhibition: 17 October 2024 – 9 February 2025</p>
                </div>
                <div class="content-details">
                    <?php include('hew_locke.html'); ?>
                </div>
            </div>

            <!-- Content Box 3 -->
            <div class="content-box" onclick="expandBox(this)">
                <div class="content-image">
                    <img src="image.png" alt="Picasso">
                </div>
                <div class="content-info">
                    <h2>Picasso</h2>
                    <p>Exhibition: 7 November 2024 – 30 March 2025</p>
                </div>
                <div class="content-details">
                    <?php include('picasso.html'); ?>
                </div>
            </div>

        </section>
    </main>

    <!-- Blur Overlay -->
    <div class="blur-overlay" onclick="closeBox()"></div>

    <script>
        function expandBox(box) {
            document.querySelectorAll('.content-box').forEach(b => b.classList.remove('expanded'));
            box.classList.add('expanded');
            document.querySelector('.blur-overlay').classList.add('active');
        }

        function closeBox() {
            document.querySelectorAll('.content-box').forEach(b => b.classList.remove('expanded'));
            document.querySelector('.blur-overlay').classList.remove('active');
        }

        // Orbs Animation
        document.addEventListener("DOMContentLoaded", () => {
            const canvas = document.getElementById('orb-canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const orbs = [];
            const numOrbs = 150; // Total number of orbs
            const maxOrbRadius = 8; // Maximum size for orbs
            const fadeDistance = 50; // Distance near edges where orbs fade

            // Initialize orbs
            function createOrbs() {
                for (let i = 0; i < numOrbs; i++) {
                    const distance = Math.random() * canvas.width * 0.5; // Spawn within 50% radius
                    const angle = Math.random() * Math.PI * 2;

                    orbs.push({
                        x: canvas.width / 2 + Math.cos(angle) * distance,
                        y: canvas.height / 2 + Math.sin(angle) * distance,
                        radius: Math.random() * 2 + 1, // Initial small radius
                        speed: Math.random() * 0.3 + 0.1, // Very slow speed
                        angle: angle,
                        growth: Math.random() * 0.02 + 0.005, // Slow growth
                        opacity: 1 // Opacity for fade effect
                    });
                }
            }

            // Update and draw orbs
            function animateOrbs() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                orbs.forEach((orb, index) => {
                    // Move orb
                    orb.x += Math.cos(orb.angle) * orb.speed;
                    orb.y += Math.sin(orb.angle) * orb.speed;
                    orb.radius = Math.min(orb.radius + orb.growth, maxOrbRadius);

                    // Fade near edges
                    const fadeX = Math.min(orb.x, canvas.width - orb.x);
                    const fadeY = Math.min(orb.y, canvas.height - orb.y);
                    const distanceToEdge = Math.min(fadeX, fadeY);
                    orb.opacity = Math.max(0, distanceToEdge / fadeDistance);

                    // Draw orb with glow effect
                    ctx.save();
                    ctx.globalAlpha = orb.opacity;
                    ctx.beginPath();
                    const gradient = ctx.createRadialGradient(
                        orb.x, orb.y, 0, orb.x, orb.y, orb.radius
                    );
                    gradient.addColorStop(0, 'white');
                    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)');
                    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Outer glow
                    ctx.fillStyle = gradient;

                    ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();

                    // Reset orb if it fades out
                    if (orb.opacity <= 0) {
                        const distance = Math.random() * canvas.width * 0.5;
                        const angle = Math.random() * Math.PI * 2;

                        orbs[index] = {
                            x: canvas.width / 2 + Math.cos(angle) * distance,
                            y: canvas.height / 2 + Math.sin(angle) * distance,
                            radius: Math.random() * 2 + 1,
                            speed: Math.random() * 0.3 + 0.1,
                            angle: angle,
                            growth: Math.random() * 0.02 + 0.005,
                            opacity: 1
                        };
                    }
                });

                requestAnimationFrame(animateOrbs);
            }

            // Responsive canvas resizing
            window.addEventListener('resize', () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                orbs.length = 0; // Reset orbs
                createOrbs();
            });

            // Initialize animation
            createOrbs();
            animateOrbs();
        });
    </script>

    <?php include 'footer.html'; ?>
</body>
</html>
