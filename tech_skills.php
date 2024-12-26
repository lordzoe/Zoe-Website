<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="images/favicon.png" type="image/png" sizes="16x16">
    <link rel="icon" href="images/favicon.png" type="image/png" sizes="32x32">
    <link rel="apple-touch-icon" href="images/favicon.png">
    <title>Technical Skills - Zoé Victoria Lord</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>

<body>
    <!-- Navigation -->
    <?php include 'navigation.html'; ?>

    <!-- Animated Background -->
    <canvas id="orb-canvas"></canvas>

    <!-- Tech Skills Section -->
    <main class="tech-container">
        <!-- Header Title -->
        <div class="tech-header speaking-header">
            <h1>Technical Skills</h1>
        </div>

        <!-- Section 1 -->
        <section class="tech-section" style="background-image: url('images/headshot_image.jpg');">
            <div class="tech-content">
                <div class="tech-box">
                    <div class="tech-text">
                        <h2>Virtual Reality Gaming Development</h2>
                        <p>
                            Developed immersive gaming experiences using Unity Engine, focusing on interactive environments and gameplay mechanics.
                        </p>
                    </div>
                    <div class="tech-skills">
                        <div class="skill-divider"></div>
                        <ul class="skills-list">
                            <li>Virtual Reality (VR)</li>
                            <li>Unity Engine</li>
                            <li>C#</li>
                        </ul>
                    </div>
                </div>
                <div class="tech-media">
                    <div class="tech-gallery">
                        <button class="gallery-arrow left-arrow" onclick="moveGallery(this, -1)">&#10094;</button>
                        <div class="gallery-items">
                            <img src="images/vr_1.jpg" alt="VR Project 1">
                            <img src="images/vr_2.jpg" alt="VR Project 2">
                            <video autoplay muted loop>
                                <source src="videos/vr_project.mp4" type="video/mp4">
                            </video>
                        </div>
                        <button class="gallery-arrow right-arrow" onclick="moveGallery(this, 1)">&#10095;</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section 2 -->
        <section class="tech-section" style="background-image: url('images/headshot_image.jpg');">
            <div class="tech-content">
                <div class="tech-box">
                    <div class="tech-text">
                        <h2>Virtual Reality Gaming Development</h2>
                        <p>
                            Developed immersive gaming experiences using Unity Engine, focusing on interactive environments and gameplay mechanics.
                        </p>
                    </div>
                    <div class="tech-skills">
                    <div class="skill-divider"></div>
                        <ul class="skills-list">
                            <li>Virtual Reality (VR)</li>
                            <li>Unity Engine</li>
                            <li>C#</li>
                        </ul>
                    </div>
                </div>
                <div class="tech-media">
                    <div class="tech-gallery">
                        <button class="gallery-arrow left-arrow" onclick="moveGallery(this, -1)">&#10094;</button>
                        <div class="gallery-items">
                            <img src="images/vr_1.jpg" alt="VR Project 1">
                            <img src="images/vr_2.jpg" alt="VR Project 2">
                            <video autoplay muted loop>
                                <source src="videos/vr_project.mp4" type="video/mp4">
                            </video>
                        </div>
                        <button class="gallery-arrow right-arrow" onclick="moveGallery(this, 1)">&#10095;</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section 3 -->
        <section class="tech-section" style="background-image: url('images/headshot_image.jpg');">
            <div class="tech-content">
                <div class="tech-box">
                    <div class="tech-text">
                        <h2>Virtual Reality Gaming Development</h2>
                        <p>
                            Developed immersive gaming experiences using Unity Engine, focusing on interactive environments and gameplay mechanics.
                        </p>
                    </div>
                    <div class="tech-skills">
                    <div class="skill-divider"></div>
                        <ul class="skills-list">
                            <li>Virtual Reality (VR)</li>
                            <li>Unity Engine</li>
                            <li>C#</li>
                        </ul>
                    </div>
                </div>
                <div class="tech-media">
                    <div class="tech-gallery">
                        <button class="gallery-arrow left-arrow" onclick="moveGallery(this, -1)">&#10094;</button>
                        <div class="gallery-items">
                            <img src="images/vr_1.jpg" alt="VR Project 1">
                            <img src="images/vr_2.jpg" alt="VR Project 2">
                            <video autoplay muted loop>
                                <source src="videos/vr_project.mp4" type="video/mp4">
                            </video>
                        </div>
                        <button class="gallery-arrow right-arrow" onclick="moveGallery(this, 1)">&#10095;</button>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <?php include 'footer.html'; ?>

    <!-- JavaScript -->
    <script src="script.js"></script>

</body>
</html>
